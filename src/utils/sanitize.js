import DOMPurify from 'dompurify';

/**
 * Sanitizes an HTML string to prevent XSS.
 * @param {string} html The dirty HTML string.
 * @returns {string} The clean HTML string.
 */
export function sanitizeHTML(html) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  });
}

/**
 * Sanitizes a plain text string.
 * @param {string} text The dirty text.
 * @returns {string} The clean text.
 */
export function sanitizeText(text) {
  if (!text) return '';
  return text.replace(/[<>]/g, '');
}
