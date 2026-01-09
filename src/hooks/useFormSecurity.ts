import { useState, useCallback, useRef, useEffect } from 'react';

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
}

interface FormSecurityResult {
  honeypotProps: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    tabIndex: number;
    autoComplete: string;
    style: React.CSSProperties;
    'aria-hidden': boolean;
  };
  isBot: boolean;
  isRateLimited: boolean;
  rateLimitMessage: string;
  recordAttempt: () => boolean; // Returns true if allowed, false if rate limited
  resetAttempts: () => void;
  validateSubmission: () => { isValid: boolean; error?: string };
  formStartTime: number;
}

const STORAGE_KEY = 'form_attempts';
const MIN_SUBMISSION_TIME_MS = 2000; // Minimum 2 seconds to fill form (bots are faster)

interface StoredAttempts {
  attempts: number[];
}

/**
 * Custom hook for form security with honeypot field and rate limiting
 */
export const useFormSecurity = (
  formId: string,
  config: RateLimitConfig = { maxAttempts: 5, windowMs: 60000 }
): FormSecurityResult => {
  const [honeypotValue, setHoneypotValue] = useState('');
  const [isBot, setIsBot] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const formStartTime = useRef(Date.now());

  // Check rate limit on mount
  useEffect(() => {
    checkRateLimit();
  }, []);

  const getStoredAttempts = useCallback((): StoredAttempts => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_${formId}`);
      if (!stored) return { attempts: [] };
      return JSON.parse(stored);
    } catch {
      return { attempts: [] };
    }
  }, [formId]);

  const setStoredAttempts = useCallback((data: StoredAttempts) => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_${formId}`, JSON.stringify(data));
    } catch {
      // Ignore storage errors
    }
  }, [formId]);

  const checkRateLimit = useCallback(() => {
    const { attempts } = getStoredAttempts();
    const now = Date.now();
    const windowStart = now - config.windowMs;
    
    // Filter attempts within the window
    const recentAttempts = attempts.filter(time => time > windowStart);
    
    // Update stored attempts
    setStoredAttempts({ attempts: recentAttempts });
    
    const limited = recentAttempts.length >= config.maxAttempts;
    setIsRateLimited(limited);
    return limited;
  }, [config.maxAttempts, config.windowMs, getStoredAttempts, setStoredAttempts]);

  const recordAttempt = useCallback(() => {
    const { attempts } = getStoredAttempts();
    const now = Date.now();
    const windowStart = now - config.windowMs;
    
    // Filter and add new attempt
    const recentAttempts = attempts.filter(time => time > windowStart);
    recentAttempts.push(now);
    
    setStoredAttempts({ attempts: recentAttempts });
    
    const limited = recentAttempts.length >= config.maxAttempts;
    setIsRateLimited(limited);
    return !limited;
  }, [config.maxAttempts, config.windowMs, getStoredAttempts, setStoredAttempts]);

  const resetAttempts = useCallback(() => {
    setStoredAttempts({ attempts: [] });
    setIsRateLimited(false);
  }, [setStoredAttempts]);

  const handleHoneypotChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setHoneypotValue(e.target.value);
    if (e.target.value) {
      setIsBot(true);
    }
  }, []);

  const validateSubmission = useCallback((): { isValid: boolean; error?: string } => {
    // Check honeypot
    if (honeypotValue) {
      return { isValid: false, error: 'Submission blocked' };
    }

    // Check if form was filled too quickly (bot behavior)
    const timeTaken = Date.now() - formStartTime.current;
    if (timeTaken < MIN_SUBMISSION_TIME_MS) {
      setIsBot(true);
      return { isValid: false, error: 'Por favor, preencha o formulário com calma' };
    }

    // Check rate limit
    if (isRateLimited) {
      return { 
        isValid: false, 
        error: 'Muitas tentativas. Por favor, aguarde alguns minutos.' 
      };
    }

    return { isValid: true };
  }, [honeypotValue, isRateLimited]);

  const getRateLimitMessage = useCallback(() => {
    if (!isRateLimited) return '';
    const waitMinutes = Math.ceil(config.windowMs / 60000);
    return `Muitas tentativas. Por favor, aguarde ${waitMinutes} minuto(s) antes de tentar novamente.`;
  }, [isRateLimited, config.windowMs]);

  return {
    honeypotProps: {
      value: honeypotValue,
      onChange: handleHoneypotChange,
      tabIndex: -1,
      autoComplete: 'off',
      style: {
        position: 'absolute',
        left: '-9999px',
        height: 0,
        width: 0,
        overflow: 'hidden',
        visibility: 'hidden' as const,
      },
      'aria-hidden': true,
    },
    isBot,
    isRateLimited,
    rateLimitMessage: getRateLimitMessage(),
    recordAttempt,
    resetAttempts,
    validateSubmission,
    formStartTime: formStartTime.current,
  };
};
