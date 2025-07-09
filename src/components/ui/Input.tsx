import React from 'react';
import { clsx } from 'clsx';

interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  className,
  required = false,
  disabled = false
}) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className={clsx(
        'w-full px-4 py-3 border border-gray-300 rounded-xl',
        'focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500',
        'outline-none transition-all duration-200',
        'placeholder-gray-400',
        disabled && 'bg-gray-100 cursor-not-allowed',
        className
      )}
    />
  );
};
