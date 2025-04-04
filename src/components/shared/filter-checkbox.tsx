import React from 'react';
import { Checkbox } from '@/components/ui';

export interface FilterChecboxProps {
    text: string;
    value: string;
    endAdornment?: React.ReactNode;
    onCheckedChange?: (checked: boolean) => void;
    checked?: boolean;
    name?: string;
}

export const FilterCheckbox: React.FC<FilterChecboxProps> = ({
    text,
    value,
    onCheckedChange,
    checked,
    name,
}) => {
    return (
        <div className="flex items-center space-x-2 mb-2 last:mb-0">
            <Checkbox
                onCheckedChange={onCheckedChange}
                checked={checked}
                value={value}
                className="w-6 h-6 rounded-none"
                id={`checkbox-${String(name)}-${String(value)}`}
            />
            <label
                htmlFor={`checkbox-${String(name)}-${String(value)}`}
                className="leading-none cursor-pointer flex-1">
                {text}
            </label>
        </div>
    );
};
