export default function Input(props: React.InputHTMLAttributes<HTMLInputElement> & {label?:string}) {
    const { label, className="", disabled, ...rest } = props;
    return (
      <label className="block space-y-2">
        {label && (
          <span className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
            {label}
          </span>
        )}
        <input 
          {...rest} 
          disabled={disabled}
          className={`
            border rounded-lg px-4 py-3 w-full 
            transition-all duration-300 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
            hover:border-purple-300
            ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-900'}
            ${className}
          `} 
        />
      </label>
    );
  }
  