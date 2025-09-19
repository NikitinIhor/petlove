import { NextPage } from "next";
import { GoPencil } from "react-icons/go";

interface EditUserBtnProps {}

const EditUserBtn: NextPage<EditUserBtnProps> = () => {
  return (
    <button
      type="button"
      className="cursor-pointer w-10 h-10 flex justify-center items-center rounded-full bg-[var(--yellow-light)]
      hover:bg-[rgba(246,184,61,0.5)] transition-colors duration-200 ease-in"
    >
      <GoPencil size={20} color="rgba(246,184,61,1)" />
    </button>
  );
};

export default EditUserBtn;
