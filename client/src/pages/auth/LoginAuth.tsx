import AuthForm from "../../components/auth/AuthForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Message from "../../components/common/Message";
// @ts-ignore
import { loginUser } from "../../../server/services/auth-service/controller/authController";

export default function RegisterAuth() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setErrorMessage("Por favor, ingresa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
        credentials: "include", // Incluir cookies si es necesario
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al iniciar sesión");
      }

      // Almacenar el token en localStorage después de iniciar sesión
      localStorage.setItem("token", data.token); // Aquí se guarda el token recibido

      setSuccessMessage(data.message);
      setErrorMessage("");
      navigate("/"); // Redirige al usuario a la página principal
      console.log("Formulario de login enviado");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setErrorMessage(
        err instanceof Error ? err.message : "Error al iniciar sesión"
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <AuthForm
        title="Iniciar sesión"
        buttonText="Iniciar sesión"
        onSubmit={handleLogin}
        footerFormText="¿No tienes una cuenta?"
        footerFormUrl="/register"
      />
      <Message message={successMessage} type="success" />
      <Message message={errorMessage} type="error" />
    </div>
  );
}
