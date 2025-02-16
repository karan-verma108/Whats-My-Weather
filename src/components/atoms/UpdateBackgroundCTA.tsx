export default function UpdateBackgroundCTA({
  bgColor,
  setIsOpen,
}: {
  bgColor: string | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  return (
    <button
      className={`absolute text-sm ${
        bgColor === 'bg-cyan-200'
          ? 'bg-black text-white'
          : 'bg-white text-black'
      } cursor-pointer underline top-[105%] py-1.5 px-2 rounded-lg`}
      onClick={() => setIsOpen(true)}
    >
      Update Background
    </button>
  );
}
