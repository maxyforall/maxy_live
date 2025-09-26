import bcrypt from 'bcrypt';

/**
 * Validate password strength
 */
export const validatePasswordStrength = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const errors = [];

    if (password.length < minLength) {
        errors.push(`Password must be at least ${minLength} characters long`);
    }
    if (!hasUpperCase) errors.push('Password must contain at least one uppercase letter');
    if (!hasLowerCase) errors.push('Password must contain at least one lowercase letter');
    if (!hasNumbers)  errors.push('Password must contain at least one number');
    if (!hasSpecialChar) errors.push('Password must contain at least one special character');

    return {
        isValid: errors.length === 0,
        errors,
        strength: getPasswordStrength(password)
    };
};

/**
 * Calculate password strength score
 */
export const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;

    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

    if (/(.*[a-z].*[A-Z])|(.*[A-Z].*[a-z])/.test(password)) score += 1;
    if (/(.*\d.*[a-zA-Z])|(.*[a-zA-Z].*\d)/.test(password)) score += 1;

    if (score <= 3) return 'weak';
    if (score <= 5) return 'medium';
    if (score <= 7) return 'strong';
    return 'very-strong';
};

/**
 * Sanitize password input
 */
export const sanitizePassword = (password) => password.trim();

/**
 * Check if new password is different from current password
 */
export const isPasswordDifferent = async (newPassword, currentPasswordHash) => {
    const isSame = await bcrypt.compare(newPassword, currentPasswordHash);
    return !isSame;
};
