import User from '../models/UserModel.js';

/**
 * Generate a unique Maxy ID
 * Format: MAXY + 6-digit random number + checksum
 * Example: MAXY123456A
 */
export const generateMaxyId = async () => {
  const MAX_ATTEMPTS = 10;
  let attempts = 0;

  while (attempts < MAX_ATTEMPTS) {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const checksum = String.fromCharCode(65 + (randomNum % 26));
    const maxyId = `MAXY${randomNum}${checksum}`;
    const existingUser = await User.findOne({ maxy_id: maxyId });

    if (!existingUser) return maxyId;
    attempts++;
  }

  throw new Error('Unable to generate unique Maxy ID after maximum attempts');
};

export const validateMaxyId = (maxyId) => {
  const maxyIdRegex = /^MAXY\d{6}[A-Z]$/;
  return maxyIdRegex.test(maxyId);
};

export const canModifyMaxyId = (maxyIdCreatedAt) => {
  if (!maxyIdCreatedAt) return false;
  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
  return (Date.now() - new Date(maxyIdCreatedAt).getTime()) >= thirtyDaysInMs;
};
