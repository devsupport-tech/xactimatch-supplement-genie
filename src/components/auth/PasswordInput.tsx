
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps {
  id: string;
  name: string;
  value: string;
  placeholder?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput = ({
  id,
  name,
  value,
  placeholder = "••••••••",
  className,
  onChange
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="relative">
      <Input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className={`pr-10 ${className || ''}`}
        value={value}
        onChange={onChange}
      />
      <button 
        type="button"
        className="absolute right-3 top-3"
        onClick={togglePasswordVisibility}
        tabIndex={-1}
      >
        {showPassword ? 
          <EyeOff className="h-4 w-4 text-muted-foreground" /> : 
          <Eye className="h-4 w-4 text-muted-foreground" />
        }
      </button>
    </div>
  );
};

export default PasswordInput;
