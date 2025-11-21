import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const EditableField = ({
  initialValue,
  onSave,
  as: Component = 'p',
  className,
  inputType = 'text',
  isEditable = false,
  formatDate,
  ...props
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

const startEditing = (e) => {
    if (!isEditable) return;

    // Csak dupla kattintásra induljon el a szerkesztés
    if (e.detail < 2) {
      // egyszeri kattintás: hagyjuk, hogy a Link működjön (navigáció)
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
  };
  const handleBlur = () => {
    if (value !== initialValue) {
      onSave(value);
    }
    setIsEditing(false);
  };
  
  const handleChange = (e) => {
    setValue(e.target.value);
    if (inputType === 'date') {
       onSave(e.target.value);
       setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputType !== 'textarea') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setValue(initialValue);
      setIsEditing(false);
    }
  };

  if (isEditing && isEditable) {
    if (inputType === 'textarea') {
      return (
        <Textarea
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          className={className}
          {...props}
        />
      );
    }
    return (
      <Input
        type={inputType}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
        className={className}
        {...props}
      />
    );
  }

  const editableClasses = isEditable 
    ? 'cursor-pointer hover:bg-gray-100/50 p-1 -m-1 rounded-md transition-colors' 
    : 'p-1 -m-1';
  
  const displayValue = inputType === 'date' && formatDate ? formatDate(value) : value;

  return (
    <Component
      onClick={startEditing}
      className={`${className} ${editableClasses}`}
      {...props}
    >
      {displayValue}
    </Component>
  );
};

export default EditableField;