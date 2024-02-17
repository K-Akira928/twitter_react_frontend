export const PrimaryRoundedButton = (props) => {
  const { children } = props;
  return (
    <button
      className={`
      bg-orange-500
      text-white
      font-bold
      rounded-full
      flex
      justify-center
      items-center
      w-full
      py-2
      transition-all
      duration-200
      hover:bg-opacity-90
      `}
    >
      {children}
    </button>
  );
};
