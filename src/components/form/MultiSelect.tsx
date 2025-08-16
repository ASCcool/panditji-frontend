import React, { useState, useRef, useEffect } from "react";

interface MultiSelectProps {
  label?: string;
  value: (string | number)[];
  onChange: (value: (string | number)[]) => void;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
  getOptionLabel?: (value: string | number) => string;
}

export default function MultiSelect({
  label,
  value = [],
  onChange,
  children,
  required,
  className = "",
  getOptionLabel
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(value);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedValues(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (optionValue: string | number) => {
    const newSelectedValues = selectedValues.includes(optionValue)
      ? selectedValues.filter(v => v !== optionValue)
      : [...selectedValues, optionValue];
    
    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return "Select options...";
    if (selectedValues.length === 1) return `1 option selected`;
    return `${selectedValues.length} options selected`;
  };



  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <span className="block truncate">{getDisplayText()}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            <div className="py-1">
              {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === 'option') {
                  const optionValue = (child.props as any).value;
                  const isSelected = selectedValues.includes(optionValue);
                  
                  return (
                    <div
                      key={optionValue}
                      onClick={() => handleOptionClick(optionValue)}
                      className={`px-3 py-2 cursor-pointer hover:bg-purple-50 ${
                        isSelected ? 'bg-purple-100 text-purple-900' : 'text-gray-900'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 border rounded mr-2 flex items-center justify-center ${
                          isSelected ? 'bg-purple-600 border-purple-600' : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        {(child.props as any).children}
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        )}
      </div>

      {/* Selected items display */}
      {selectedValues.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {selectedValues.map((val) => (
                          <span
                key={val}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
              >
                {getOptionLabel ? getOptionLabel(val) : String(val)}
                <button
                type="button"
                onClick={() => handleOptionClick(val)}
                className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-purple-400 hover:bg-purple-200 hover:text-purple-500"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
  