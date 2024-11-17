import AuthForm from "../../components/auth/AuthForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Message from "../../components/common/Message";

export default function RegisterAuth() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      setErrorMessage("Por favor, ingresa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al registrar usuario");
      }

      setSuccessMessage(data.message);
      setErrorMessage("");
      navigate("/login");
    } catch (err) {
      console.error("Error al registrar usuario:", err);
      setErrorMessage(
        err instanceof Error ? err.message : "Error al registrar usuario"
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <AuthForm
        title="Registrarse"
        buttonText="Registrarse"
        onSubmit={handleRegister}
        footerFormText="¿Ya tienes una cuenta?"
        footerFormUrl="/login"
      />
      <Message message={successMessage} type="success" />
      <Message message={errorMessage} type="error" />
    </div>
  );
}
