import ButtonDanger from "../components/common/ButtonDanger";
import CardNote from "../components/common/CardNote";
import InputFormNote from "../components/common/InputFormNote";

export default function Dashboard() {
  return (
    <div className="grid place-items-center h-screen">
      <section className=" flex flex-col items-center justify-center border-2 p-5 rounded-lg max-lg:w-[90%] max-h-[75vh]">
        <div className="flex justify-between items-center w-[50vw] max-lg:w-full">
          <h1 className="text-[2vw] font-bold">Mis notas</h1>
          <ButtonDanger textoBtn="Cerrar sesión" />
        </div>
        <CardNote />
        <InputFormNote />
      </section>
    </div>
  );
}
