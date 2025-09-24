import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

interface AttentionModalProps {
  onClose: () => void;
}

const AttentionModal: NextPage<AttentionModalProps> = ({ onClose }) => {
  return (
    <div>
      <div className="mx-auto mb-5 w-[80px] h-[80px] rounded-full bg-[var(--yellow-light)] flex items-center justify-center">
        <Image
          src="/images/dog.png"
          alt="image of a gog"
          width={80}
          height={80}
        />
      </div>
      <h3
        className="text-[rgba(246,184,61,1)] text-[20px] font-extrabold text-center mb-5
      xl:text-[24px]"
      >
        Attention
      </h3>
      <div>
        <p className="text-center mb-6">
          We would like to remind you that certain functionality is available
          only to authorized users.If you have an account, please log in with
          your credentials. If you do not already have an account, you must
          register to access these features.
        </p>
      </div>
      <div className="flex justify-center items-center gap-2">
        <Link
          href="/login"
          className="flex justify-center text-[14px] items-center border border-white text-white uppercase w-full md:w-[120px] h-10 bg-[var(--yellow)] rounded-full
           hover:bg-[#F9B020] transition-colors duration-200 ease-in"
        >
          Log In
        </Link>
        <Link
          className="flex justify-center text-[14px] items-center text-[#F6B83D] uppercase w-full md:w-[150px] h-10 bg-[var(--yellow-light)] rounded-full
           hover:bg-[#FBE7C1] transition-colors duration-200 ease-in"
          href="/register"
        >
          Registration
        </Link>
      </div>
    </div>
  );
};

export default AttentionModal;
