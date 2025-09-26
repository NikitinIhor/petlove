import Image from "next/image";
import Info from "./Info";
import RegisterForm from "./RegisterForm";

const Register: React.FC = () => {
  return (
    <div className="container xl:flex gap-8">
      <div className="relative md:bg-[var(--yellow)] md:rounded-[60px] xl:flex-1/2">
        <div
          className="mb-9 h-full mx-auto md:mx-0 md:ml-auto md:mr-[50px]
        xl:mx-auto xl:w-[536px] xl:h-[623px] xl:mb-0"
        >
          <Image
            src="/images/register.png"
            alt="image of a cat"
            width={335}
            height={280}
            className="xl:w-[536px] xl:h-[623px] object-cover"
          />
        </div>
        <Info />
      </div>

      <div
        className="py-7 px-4 bg-white rounded-[30px]
      md:py-[30px] md:px-[140px] xl:flex-1/2 xl:py-[77px] xl:px-[84px]"
      >
        <h2 className="text-[28px] font-bold mb-3 md:text-[54px] md:mb-8">
          Registration
        </h2>
        <p className="text-sm mb-5 md:text-[18px]">
          Thank you for your interest in our platform.
        </p>

        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
