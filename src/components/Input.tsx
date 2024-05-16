type InputProps = { label: string, type: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, autoComplete: string, required: boolean, link?: string, linkLabel?: string };

export default function Input({ label, type, value, onChange, autoComplete, required, link, linkLabel }: InputProps) {
  return (
    <div>
      {link && (
        <div className="flex items-center justify-between">
          <label htmlFor={label} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
          <div className="text-sm">
            <a href={link} className="font-semibold text-indigo-600 hover:text-indigo-500">{linkLabel}</a>
          </div>
        </div>
      )}

      {!link && (
        <label htmlFor={label} className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      )}

      <div className="mt-2">
        <input id={label} name={label} type={type} value={value} onChange={onChange} autoComplete={autoComplete} required={required} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
    </div>
  );
}