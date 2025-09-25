'use client';
import { useState } from 'react';
import { FaTimes, FaUpload, FaTrash } from 'react-icons/fa';

interface DpUploadModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (file: File | null) => void; // allow null for removal
}

export default function DpUploadModal({ open, onClose, onSave }: DpUploadModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  if (!open) return null; // Don’t render if modal is closed

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const maxSize = 2 * 1024 * 1024; // 2 MB

    if (!validTypes.includes(selected.type)) {
      setError('Only PNG and JPG files are allowed.');
      setFile(null);
      setPreview(null);
      return;
    }

    if (selected.size > maxSize) {
      setError('File size must be under 2 MB.');
      setFile(null);
      setPreview(null);
      return;
    }

    setError('');
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSave = () => {
    onSave(file); // Pass file (can be null if removed)
    onClose();
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setError('');
    onSave(null); // Inform parent that image is removed
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-2xl w-full max-w-md p-6 relative shadow-xl">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition cursor-pointer"
          onClick={onClose}
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <h5 className="text-2xl font-regular text-white mb-6 text-center">
          Upload Display Picture
        </h5>

        {/* Preview */}
        <div className="flex flex-col items-center">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-62 h-62 rounded-full object-cover border-1 border-gray-700 mb-4"
            />
          ) : (
            <label className="cursor-pointer w-62 h-62 rounded-full bg-gray-700 flex items-center justify-center mb-4">
            <FaUpload className="w-8 h-8 text-gray-400" />
            <input
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          )}

          {error && (
            <p className="text-red-400 text-sm mt-3 text-center">{error}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-6 gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-gray-300 hover:text-white transition cursor-pointer"
          >
            Cancel
          </button>
          {file && (
            <button
              onClick={handleRemove}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium transition flex items-center gap-1 cursor-pointer"
            >
              <FaTrash className="w-3 h-3" />
              Remove
            </button>
          )}
          <button
            disabled={!file}
            onClick={handleSave}
            className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-1 cursor-pointer
            ${file ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
