
import React from 'react';
import { cn } from '@/lib/utils';

interface TotalDisplayProps {
  amount: number;
  label?: string;
  className?: string;
}

const TotalDisplay = ({ amount, label = "Total Amount", className }: TotalDisplayProps) => {
  return (
    <div className={cn("border-t pt-4 mt-4 flex justify-between items-center", className)}>
      <span className="font-medium text-muted-foreground">{label}</span>
      <span className="font-bold text-lg text-foreground">
        ${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
    </div>
  );
};

export default TotalDisplay;
