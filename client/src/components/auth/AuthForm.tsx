interface Props {
    title: string;
    buttonText: string;
    footerFormText: string;
    footerFormUrl: string;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function AuthForm({
  title,
  buttonText,
  footerFormText,
  footerFormUrl,
  onSubmit,
}: Props) {
  return (
    <section className="w-full grid place-items-center">
      <div className="w-1/3 max-lg:w-2/5 max-md:w-full p-4">
        <div className="text-center mb-4">
          <h1 className="text-5xl font-bold mb-2">{title}</h1>
          <p className="text-gray-600">Ingresa tus credenciales para acceder</p>
        </div>
        <form
          onSubmit={onSubmit}
          className="[&>div>label]:grid [&>div>label]:gap-2 [&>div>label]:font-medium [&>div>label]:text-lg [&>div>label>input]:border [&>div>label>input]:rounded-md [&>div>label>input]:p-2 [&>div]:pb-4"
        >
          <div>
            <label htmlFor="email">
              Correo electrónico
              <input
                id="email"
                placeholder="Correo@ejemplo.com"
                required
                type="email"
                name="email"
              />
            </label>
          </div>

          <div>
            <label htmlFor="password">
              Contraseña
              <input id="password" required type="password" name="password" />
            </label>
          </div>

          <button
            className="bg-blue-600 w-full py-4 rounded-md text-white font-bold"
            type="submit"
          >
            {buttonText}
          </button>
        </form>

        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-md">
            <span className="bg-[#242424] px-2 text-muted-foreground">
              O continúa con
            </span>
          </div>
        </div>

        <div className="text-center text-sm mt-4">
          {footerFormText}{" "}
          <a
            href={footerFormUrl}
            className="font-semibold text-primary underline"
          >
            Ingresa aquí
          </a>
        </div>
      </div>
    </section>
  );
}
