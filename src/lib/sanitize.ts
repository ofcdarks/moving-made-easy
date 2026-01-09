/**
 * Sanitization utilities for user input
 * Prevents XSS attacks and injection attempts
 */

/**
 * Sanitize a string by removing HTML tags and dangerous characters
 */
export const sanitizeText = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  return input
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script-related patterns
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    // Remove null bytes
    .replace(/\x00/g, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Sanitize email address
 */
export const sanitizeEmail = (email: string): string => {
  if (!email || typeof email !== 'string') return '';
  
  return email
    .toLowerCase()
    .trim()
    // Remove any characters that shouldn't be in an email
    .replace(/[<>'"\\]/g, '')
    // Only allow valid email characters
    .replace(/[^a-z0-9.@_+-]/g, '');
};

/**
 * Sanitize phone number - keep only digits and formatting characters
 */
export const sanitizePhone = (phone: string): string => {
  if (!phone || typeof phone !== 'string') return '';
  
  return phone
    .trim()
    // Keep only digits, spaces, parentheses, and dashes
    .replace(/[^0-9\s()+-]/g, '')
    .slice(0, 20);
};

/**
 * Sanitize address - more permissive but still safe
 */
export const sanitizeAddress = (address: string): string => {
  if (!address || typeof address !== 'string') return '';
  
  return address
    // Remove dangerous characters but allow common address characters
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
    .slice(0, 500);
};

/**
 * Sanitize message/text area content
 */
export const sanitizeMessage = (message: string): string => {
  if (!message || typeof message !== 'string') return '';
  
  return message
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script-related patterns
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    // Remove null bytes
    .replace(/\x00/g, '')
    .trim()
    .slice(0, 1000);
};

/**
 * Sanitize a name
 */
export const sanitizeName = (name: string): string => {
  if (!name || typeof name !== 'string') return '';
  
  return name
    // Remove anything that looks like HTML or scripts
    .replace(/<[^>]*>/g, '')
    .replace(/javascript:/gi, '')
    // Allow letters, spaces, hyphens, and apostrophes (for names like O'Brien)
    .replace(/[^a-zA-ZÀ-ÿ\s'-]/g, '')
    .trim()
    .slice(0, 100);
};

/**
 * Sanitize form data object
 */
export const sanitizeFormData = <T extends Record<string, unknown>>(
  data: T,
  fieldTypes: Record<keyof T, 'text' | 'email' | 'phone' | 'address' | 'message' | 'name' | 'skip'>
): T => {
  const sanitized = { ...data };
  
  for (const [key, type] of Object.entries(fieldTypes)) {
    const value = sanitized[key as keyof T];
    
    if (typeof value !== 'string') continue;
    
    switch (type) {
      case 'email':
        (sanitized as Record<string, unknown>)[key] = sanitizeEmail(value);
        break;
      case 'phone':
        (sanitized as Record<string, unknown>)[key] = sanitizePhone(value);
        break;
      case 'address':
        (sanitized as Record<string, unknown>)[key] = sanitizeAddress(value);
        break;
      case 'message':
        (sanitized as Record<string, unknown>)[key] = sanitizeMessage(value);
        break;
      case 'name':
        (sanitized as Record<string, unknown>)[key] = sanitizeName(value);
        break;
      case 'text':
        (sanitized as Record<string, unknown>)[key] = sanitizeText(value);
        break;
      case 'skip':
        // Don't sanitize
        break;
    }
  }
  
  return sanitized;
};
