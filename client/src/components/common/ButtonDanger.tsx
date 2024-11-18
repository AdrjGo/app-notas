interface Props {
  textoBtn: string;
}

export default function ButtonDanger({textoBtn}: Props) {
  return (
    <div>
      <button className="bg-red-600 rounded-lg p-2 text-[1vw]">{textoBtn}</button>
    </div>
  )
}
