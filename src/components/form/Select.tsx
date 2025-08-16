export default function Select(
    props: React.SelectHTMLAttributes<HTMLSelectElement> & {label?:string}
  ) {
    const { label, className="", children, ...rest } = props;
    return (
      <label className="block space-y-1">
        {label && <span className="text-sm text-gray-700">{label}</span>}
        <select {...rest} className={`border rounded px-3 py-2 w-full ${className}`}>
          {children}
        </select>
      </label>
    );
  }
  