type InputProps = { children?: string, label: string, name: string, type: string, autoComplete: string, required?: boolean, link?: string, linkLabel?: string };

export default function Input({ children, label, name, type = "text", autoComplete, required = false, link, linkLabel }: InputProps) {
  return (
    <div>
      {link && (
        <div className="flex items-center justify-between">
          <label htmlFor={label} className="block text-sm font-medium leading-6 text-white">{label}</label>
          <div className="text-sm">
            <a href={link} className="font-semibold text-indigo-600 hover:text-indigo-500">{linkLabel}</a>
          </div>
        </div>
      )}

      {!link && (
        <label htmlFor={name} className="block text-sm font-medium leading-6 text-white">{label}</label>
      )}

      <div className="mt-2">
        <input id={name} name={name} type={type} autoComplete={autoComplete} placeholder={children} required={required} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
    </div>
  );
}