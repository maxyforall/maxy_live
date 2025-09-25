'use client';

import { useState, useRef, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useProfile } from '../hooks/useProfile';

interface InlineEditableFieldProps {
  label: string;
  value: string;
  field: string;
  type?: 'text' | 'email' | 'date' | 'select';
  options?: string[];
  canEdit?: boolean;
  onSave: (field: string, value: string) => void;
  placeholder?: string;
  validate?: (value: string) => string | null;
}

export const InlineEditableField: React.FC<InlineEditableFieldProps> = ({
  label,
  value,
  field,
  type = 'text',
  options,
  canEdit = true,
  onSave,
  placeholder,
  validate
}) => {
  const { updating } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);

  useEffect(() => setEditValue(value), [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (type === 'text' || type === 'email') {
        (inputRef.current as HTMLInputElement).select();
      }
    }
  }, [isEditing, type]);

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (validate) {
        const validationError = validate(editValue);
        if (validationError) {
          setError(validationError);
          return;
        }
      }
      if (editValue !== value) await onSave(field, editValue);
      setIsEditing(false);
      setError(null);
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditValue(value);
      setError(null);
    }
  };

  const baseInput =
    'w-full px-3 py-2 rounded-md border border-gray-700 bg-gray-900 text-white ' +
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ' +
    'placeholder-gray-400';

  const renderInput = () => {
    if (type === 'select' && options) {
      return (
        <select
          ref={inputRef as React.RefObject<HTMLSelectElement>}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={baseInput}
          disabled={updating}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1).replace('_', ' ')}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type={type}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={baseInput}
        disabled={updating}
        maxLength={type === 'date' ? 10 : undefined}
      />
    );
  };

  return (
    <div className="flex flex-col py-4 border-b border-gray-800">
      <label className="text-sm text-gray-400 mb-1 font-medium">{label}</label>
      {isEditing ? (
        <div className="flex flex-col">
          {renderInput()}
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
      ) : (
        <div
          className="flex items-center justify-between cursor-text hover:bg-gray-800 px-2 py-1 rounded"
          onClick={() => canEdit && setIsEditing(true)}
        >
          <span className="text-white">{value || 'Not specified'}</span>
          {canEdit && <FaEdit className="text-blue-400 ml-2 w-4 h-4" />}
        </div>
      )}
    </div>
  );
};
