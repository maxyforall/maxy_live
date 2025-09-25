const User = require('../models/UserModel');

/**
 * Generate a unique Maxy ID
 * Format: MAXY + 6-digit random number + checksum
 * Example: MAXY123456A
 */
const generateMaxyId = async () => {
    const MAX_ATTEMPTS = 10;
    let attempts = 0;
    
    while (attempts < MAX_ATTEMPTS) {
        // Generate 6-digit random number
        const randomNum = Math.floor(100000 + Math.random() * 900000);
        
        // Calculate simple checksum (A-Z)
        const checksum = String.fromCharCode(65 + (randomNum % 26));
        
        // Create Maxy ID
        const maxyId = `MAXY${randomNum}${checksum}`;
        
        // Check if ID already exists
        const existingUser = await User.findOne({ maxy_id: maxyId });
        
        if (!existingUser) {
            return maxyId;
        }
        
        attempts++;
    }
    
    throw new Error('Unable to generate unique Maxy ID after maximum attempts');
};

/**
 * Validate Maxy ID format
 */
const validateMaxyId = (maxyId) => {
    const maxyIdRegex = /^MAXY\d{6}[A-Z]$/;
    return maxyIdRegex.test(maxyId);
};

/**
 * Check if Maxy ID can be modified (30-day restriction)
 */
const canModifyMaxyId = (maxyIdCreatedAt) => {
    if (!maxyIdCreatedAt) return false;
    
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
    const currentTime = new Date().getTime();
    const creationTime = new Date(maxyIdCreatedAt).getTime();
    
    return (currentTime - creationTime) >= thirtyDaysInMs;
};

module.exports = {
    generateMaxyId,
    validateMaxyId,
    canModifyMaxyId
};