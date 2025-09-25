/**
 * Middleware for validating contact form submissions
 */
export const validateContactForm = (req, res, next) => {
  const { fullname, email, subject, description } = req.body;
  const errors = [];

  // Check required fields
  if (!fullname) errors.push('Full name is required');
  if (!email) errors.push('Email is required');
  if (!subject) errors.push('Subject is required');
  if (!description) errors.push('Description is required');

  // Basic email validation
  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push('Please provide a valid email address');
  }

  // If there are errors, return them
  if (errors.length > 0) {
    return res.status(400).json({ 
      success: false, 
      errors 
    });
  }

  

  // If validation passes, proceed
  next();
};

export const validateMaxyId = (id) => {
  const pattern = /^[a-z]+(\.[a-z]+)?_[0-9]{4}$/;
  return pattern.test(id);
};

export const validatePassword = (password) => {
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return {
    minLength,
    hasUpperCase,
    hasLowerCase,
    hasNumbers,
    hasSpecialChar,
    isValid: minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
  };
};


