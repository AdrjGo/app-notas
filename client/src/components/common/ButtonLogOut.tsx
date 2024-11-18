import { useNavigate } from "react-router-dom";

interface Props {
  textoBtn: string;
}

export default function ButtonLogOut({ textoBtn }: Props) {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <button
        className="bg-red-600 hover:bg-red-800 rounded-lg p-2 text-[1vw]"
        onClick={handleLogOut}
      >
        {textoBtn}
      </button>
    </div>
  );
}
