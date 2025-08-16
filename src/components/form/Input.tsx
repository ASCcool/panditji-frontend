export default function Input(props: React.InputHTMLAttributes<HTMLInputElement> & {label?:string}) {
    const { label, className="", ...rest } = props;
    return (
      <label className="block space-y-1">
        {label && <span className="text-sm text-gray-700">{label}</span>}
        <input {...rest} className={`border rounded px-3 py-2 w-full ${className}`} />
      </label>
    );
  }
  