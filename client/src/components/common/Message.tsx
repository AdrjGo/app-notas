export default function Message({ message, type }: any) {
  return (
    <div
      className={`${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white p-4 rounded-lg mt-4`}
    >
      {message}
    </div>
  );
}