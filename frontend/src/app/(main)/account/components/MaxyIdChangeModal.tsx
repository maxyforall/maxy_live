'use client';

import { useState } from 'react';
import { FaUser, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useProfile, UpdateMaxyIdData } from '../hooks/useProfile';

export const MaxyIdChangeModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  currentMaxyId: string;
  canChange: boolean;
  daysRemaining: number;
  profileCreatedAt?: string;
}> = ({ isOpen, onClose, currentMaxyId, canChange, daysRemaining, profileCreatedAt }) => {
  const { updateMaxyId, updating } = useProfile();
  const [newMaxyId, setNewMaxyId] = useState('');
  const [validationError, setValidationError] = useState('');

  const validateMaxyId = (value: string): string => {
    if (value.length < 3) return 'Maxy ID must be at least 3 characters long';
    if (value.length > 20) return 'Maxy ID must be no more than 20 characters long';
    if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
      return 'Maxy ID can only contain letters, numbers, underscores, and hyphens';
    }
    if (value === currentMaxyId) return 'New Maxy ID must be different from current one';
    return '';
  };

  const handleMaxyIdChange = (value: string) => {
    setNewMaxyId(value.toLowerCase());
    const error = validateMaxyId(value);
    setValidationError(error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canChange) {
      const changeDate = getChangeAvailableDate();
      toast.error(`You can change your Maxy ID from ${changeDate}`);
      return;
    }

    if (validationError) {
      toast.error(validationError);
      return;
    }

    if (!newMaxyId.trim()) {
      toast.error('Please enter a new Maxy ID');
      return;
    }

    try {
      const result = await updateMaxyId({ newMaxyId });
      
      if (result.success) {
        toast.success('Maxy ID updated successfully!');
        setNewMaxyId('');
        setValidationError('');
        onClose();
        // Trigger profile refresh
        window.dispatchEvent(new CustomEvent('profileUpdated'));
      } else {
        toast.error(result.error || 'Failed to update Maxy ID');
      }
    } catch (error) {
      console.error('Error updating Maxy ID:', error);
      toast.error('An unexpected error occurred');
    }
  };

  const getChangeAvailableDate = (): string => {
    if (!profileCreatedAt) return 'soon';
    
    try {
      const createdAt = new Date(profileCreatedAt);
      const changeAvailableDate = new Date(createdAt);
      changeAvailableDate.setDate(createdAt.getDate() + 30);
      
      return changeAvailableDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Error calculating change date:', error);
      return 'soon';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-2xl">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <h5 className="mb-6 text-center text-2xl font-semibold text-white tracking-wide">
          Change Maxy ID
        </h5>

        {!canChange && (
          <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
            <div className="flex items-start gap-3">
              <FaInfoCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-yellow-300 font-medium">Maxy ID Change Restricted</p>
                <p className="text-yellow-400 text-sm mt-1">
                  You can change your Maxy ID from {getChangeAvailableDate()}.
                  This restriction ensures account security and prevents abuse.
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Current Maxy ID
            </label>
            <input
              type="text"
              value={currentMaxyId}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              New Maxy ID
            </label>
            <input
              type="text"
              value={newMaxyId}
              onChange={(e) => handleMaxyIdChange(e.target.value)}
              className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent transition-colors ${
                validationError 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-700 focus:ring-blue-500'
              } ${(!canChange || updating) ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!canChange || updating}
              placeholder="Enter new Maxy ID"
              maxLength={20}
              minLength={3}
              required
            />
            {validationError && (
              <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                <span className="text-red-400">✗</span>
                {validationError}
              </p>
            )}
            {newMaxyId && !validationError && canChange && (
              <p className="mt-2 text-sm text-green-400 flex items-center gap-1">
                <span className="text-green-400">✓</span>
                Maxy ID is available
              </p>
            )}
          </div>

          <div className="text-sm text-gray-400 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <p className="font-medium mb-3 text-gray-300">Maxy ID Requirements:</p>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${newMaxyId.length >= 3 && newMaxyId.length <= 20 ? 'bg-green-400' : 'bg-gray-500'}`}></span>
                3-20 characters long
              </li>
              <li className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${/^[a-zA-Z0-9_-]*$/.test(newMaxyId) ? 'bg-green-400' : 'bg-gray-500'}`}></span>
                Only letters, numbers, underscores, and hyphens
              </li>
              <li className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${newMaxyId !== currentMaxyId && newMaxyId.length > 0 ? 'bg-green-400' : 'bg-gray-500'}`}></span>
                Must be different from current ID
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                Cannot be changed again for 30 days
              </li>
            </ul>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 font-medium"
              disabled={updating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 font-medium flex items-center justify-center gap-2"
              disabled={!canChange || updating || !!validationError || !newMaxyId.trim()}
            >
              {updating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Changing...
                </>
              ) : (
                'Change Maxy ID'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// 'use client';

// import { useState } from 'react';
// import { FaUser, FaTimes, FaInfoCircle } from 'react-icons/fa';
// import { toast } from 'react-hot-toast';
// import { useProfile, UpdateMaxyIdData } from '../hooks/useProfile';

// export const MaxyIdChangeModal: React.FC<{
//   isOpen: boolean;
//   onClose: () => void;
//   currentMaxyId: string;
//   canChange: boolean;
//   daysRemaining: number;
// }> = ({ isOpen, onClose, currentMaxyId, canChange, daysRemaining }) => {
//   const { updateMaxyId, updating } = useProfile();
//   const [newMaxyId, setNewMaxyId] = useState('');
//   const [validationError, setValidationError] = useState('');

//   const validateMaxyId = (value: string): string => {
//     if (value.length < 3) return 'Maxy ID must be at least 3 characters long';
//     if (value.length > 20) return 'Maxy ID must be no more than 20 characters long';
//     if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
//       return 'Maxy ID can only contain letters, numbers, underscores, and hyphens';
//     }
//     if (value === currentMaxyId) return 'New Maxy ID must be different from current one';
//     return '';
//   };

//   const handleMaxyIdChange = (value: string) => {
//     setNewMaxyId(value.toLowerCase());
//     const error = validateMaxyId(value);
//     setValidationError(error);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!canChange) {
//       toast.error(`You can change your Maxy ID in ${daysRemaining} days`);
//       return;
//     }

//     if (validationError) {
//       toast.error(validationError);
//       return;
//     }

//     const result = await updateMaxyId({ newMaxyId });
    
//     if (result.success) {
//       setNewMaxyId('');
//       setValidationError('');
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
//       <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 shadow-2xl">
//         <button
//           className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
//           onClick={onClose}
//           aria-label="Close"
//         >
//           <FaTimes className="w-5 h-5" />
//         </button>

//         <h5 className="mb-6 text-center text-2xl font-semibold text-white tracking-wide">
//           Change Maxy ID
//         </h5>

//         {!canChange && (
//           <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
//             <div className="flex items-start gap-3">
//               <FaInfoCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
//               <div>
//                 <p className="text-yellow-300 font-medium">Maxy ID Change Restricted</p>
//                 <p className="text-yellow-400 text-sm mt-1">
//                   You can change your Maxy ID again in {daysRemaining} days.
//                   This restriction ensures account security and prevents abuse.
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Current Maxy ID
//             </label>
//             <input
//               type="text"
//               value={currentMaxyId}
//               className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
//               disabled
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               New Maxy ID
//             </label>
//             <input
//               type="text"
//               value={newMaxyId}
//               onChange={(e) => handleMaxyIdChange(e.target.value)}
//               className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent ${
//                 validationError 
//                   ? 'border-red-500 focus:ring-red-500' 
//                   : 'border-gray-700 focus:ring-blue-500'
//               }`}
//               disabled={!canChange || updating}
//               placeholder="Enter new Maxy ID"
//               required
//             />
//             {validationError && (
//               <p className="mt-1 text-sm text-red-400">{validationError}</p>
//             )}
//             {newMaxyId && !validationError && (
//               <p className="mt-1 text-sm text-green-400">✓ Maxy ID is valid</p>
//             )}
//           </div>

//           <div className="text-sm text-gray-400 bg-gray-800/50 p-4 rounded-lg">
//             <p className="font-medium mb-2">Maxy ID Requirements:</p>
//             <ul className="space-y-1 text-xs">
//               <li>• 3-20 characters long</li>
//               <li>• Only letters, numbers, underscores, and hyphens</li>
//               <li>• Must be unique across the platform</li>
//               <li>• Cannot be changed again for 30 days</li>
//             </ul>
//           </div>

//           <div className="flex gap-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
//               disabled={updating}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
//               disabled={!canChange || updating || !!validationError || !newMaxyId}
//             >
//               {updating ? 'Changing...' : 'Change Maxy ID'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };