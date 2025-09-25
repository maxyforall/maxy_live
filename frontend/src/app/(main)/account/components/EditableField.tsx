// 'use client';

// import { useState } from 'react';
// import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
// import { toast } from 'react-hot-toast';
// import { useProfile, UpdateProfileData } from '../hooks/useProfile';

// interface EditProfileModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   field: string;
//   currentValue: string;
//   label: string;
//   onSave: (field: string, value: string) => void;
//   fieldType?: string;
//   fieldOptions?: string[];
// }

// export const EditProfileModal: React.FC<EditProfileModalProps> = ({
//   isOpen,
//   onClose,
//   field,
//   currentValue,
//   label,
//   fieldType = 'text',
//   fieldOptions = []
// }) => {
//   const { updateProfile, updating } = useProfile();
//   const [value, setValue] = useState(currentValue);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Validate input before submission
//     if (field === 'email' && value) {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(value.trim())) {
//         toast.error('Please enter a valid email address');
//         return;
//       }
//     }
    
//     if (field === 'name' && value) {
//       const nameParts = value.trim().split(' ');
//       if (nameParts.length < 2) {
//         toast.error('Please enter both first and last name');
//         return;
//       }
//     }
    
//     if (field === 'dateOfBirth' && value) {
//       const birthDate = new Date(value);
//       const today = new Date();
//       let age = today.getFullYear() - birthDate.getFullYear();
//       const monthDiff = today.getMonth() - birthDate.getMonth();
      
//       if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//         age--;
//       }
      
//       if (age < 13) {
//         toast.error('You must be at least 13 years old');
//         return;
//       }
      
//       if (age > 120) {
//         toast.error('Please enter a valid date of birth');
//         return;
//       }
//     }
    
//     const updateData: UpdateProfileData = {};
//     (updateData as any)[field] = value;

//     const result = await updateProfile(updateData);
    
//     if (result.success) {
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
//           Edit {label}
//         </h5>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//             {label}
//           </label>
//           {fieldType === 'select' && fieldOptions.length > 0 ? (
//             <select
//               value={value}
//               onChange={(e) => setValue(e.target.value)}
//               className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               disabled={updating}
//             >
//               {fieldOptions.map((option) => (
//                 <option key={option} value={option}>
//                   {option.charAt(0).toUpperCase() + option.slice(1).replace('_', ' ')}
//                 </option>
//               ))}
//             </select>
//           ) : (
//             <input
//               type={fieldType}
//               value={value}
//               onChange={(e) => setValue(e.target.value)}
//               className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               disabled={updating}
//               required
//               placeholder={field === 'name' ? 'Enter your full name (First Last)' : 
//                           field === 'email' ? 'Enter your email address' :
//                           field === 'dateOfBirth' ? 'YYYY-MM-DD' :
//                           'Enter your ' + label}
//               max={field === 'dateOfBirth' ? new Date().toISOString().split('')[0] : undefined}
//               min={field === 'dateOfBirth' ? '1900-01-01' : undefined}
//             />
//           )}
//           </div>

//           <div className="flex gap-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
//               disabled={updating}
//             >
//               <FaTimes className="inline mr-2" />
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
//               disabled={updating}
//             >
//               <FaSave className="inline mr-2" />
//               {updating ? 'Saving...' : 'Save'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// interface EditableFieldProps {
//   label: string;
//   value: string;
//   field: string;
//   type?: string;
//   options?: string[];
//   canEdit?: boolean;
// }

// export const EditableField: React.FC<EditableFieldProps> = ({
//   label,
//   value,
//   field,
//   type = 'text',
//   options,
//   canEdit = true
// }) => {
//   const [isEditing, setIsEditing] = useState(false);

//   return (
//     <>
//       <div className="flex items-center justify-between py-5 border-b border-gray-800">
//         <div className="flex-1">
//           <label className="text-sm text-gray-400 block mb-1 font-medium">{label}</label>
//           <span className="text-white text-lg">{value}</span>
//         </div>
//         {canEdit && (
//           <button
//             onClick={() => setIsEditing(true)}
//             className="text-blue-400 hover:text-blue-300 transition p-2"
//           >
//             <FaEdit className="w-4 h-4" />
//           </button>
//         )}
//       </div>

//       <EditProfileModal
//         onSave={() => {}}
//         isOpen={isEditing}
//         onClose={() => setIsEditing(false)}
//         field={field}
//         currentValue={value}
//         label={label}
//         fieldType={type}
//         fieldOptions={options}
//       />
//     </>
//   );
// };