import Image from "next/image";
import Info from "./Info";
import RegisterForm from "./RegisterForm";

const Register: React.FC = () => {
  return (
    <div className="container">
      <div className="relative md:bg-[var(--yellow)] md:rounded-[30px]">
        <div className="mb-9 w-[335px] h-full mx-auto md:mx-0 md:ml-auto md:mr-[50px]">
          <Image
            src="/images/register.png"
            alt="image of a cat"
            width={335}
            height={280}
          />
        </div>
        <Info />
      </div>

      <div className="py-7 px-4 bg-white rounded-[30px]">
        <h2 className="text-[28px] font-bold mb-3">Registration</h2>
        <p className="text-sm mb-5">
          Thank you for your interest in our platform.
        </p>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
