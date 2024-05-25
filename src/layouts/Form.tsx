type FormProps = { children: React.ReactNode, title: string, action: (payloud: FormData) => void };

export default function Form({ children, title, action }: FormProps) {
  return (
    <div className="flex flex-col justify-center px-6 py-12 lg:px-8 bg-white dark:bg-gray-900 h-screen">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="FacePalm Logo" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">{title}</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action={action}>
          {children}
        </form>
      </div>
    </div>
  );
}