"use client";

import { registerUser } from "@/app/redux/auth/ops";
import { AppDispatch } from "@/app/redux/store";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

interface InitialValuesProps {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: InitialValuesProps = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const FeedbackSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Must be a valid email!").required("Required"),
  password: Yup.string()
    .min(3, "Too short")
    .max(256, "Too long")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const handleSubmit = async (
    values: InitialValuesProps,
    actions: FormikHelpers<InitialValuesProps>
  ) => {
    try {
      await dispatch(
        registerUser({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      ).unwrap();

      actions.resetForm();

      toast.success(`${values.name} was successfully registered`, {
        duration: 4000,
        position: "top-right",
      });

      router.push("/profile");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message, {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-4">
          <div>
            <div
              className={`p-3 md:p-4 rounded-[30px] border transition-colors duration-200 ${
                touched.name
                  ? errors.name
                    ? "border-red-500"
                    : "border-green-500"
                  : "border-[#26262626] hover:border-[var(--yellow)]"
              }`}
            >
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="w-full border-none focus:outline-none"
              />
            </div>
            <ErrorMessage
              name="name"
              component="span"
              className="text-[#EF2447] text-[12px] pl-2"
            />
          </div>

          <div>
            <div
              className={`p-3 md:p-4 rounded-[30px] border transition-colors duration-200 ${
                touched.email
                  ? errors.email
                    ? "border-red-500"
                    : "border-green-500"
                  : "border-[#26262626] hover:border-[var(--yellow)]"
              }`}
            >
              <Field
                type="text"
                name="email"
                placeholder="Email"
                className="w-full border-none focus:outline-none"
              />
            </div>
            <ErrorMessage
              name="email"
              component="span"
              className="text-[#EF2447] text-[12px] pl-2"
            />
          </div>

          <div className="relative">
            <div
              className={`p-3 md:p-4 rounded-[30px] border transition-colors duration-200 ${
                touched.password
                  ? errors.password
                    ? "border-red-500"
                    : "border-green-500"
                  : "border-[#26262626] hover:border-[var(--yellow)]"
              }`}
            >
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full border-none focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 cursor-pointer"
              >
                <svg width={18} height={18} fill="white" stroke="var(--yellow)">
                  <use
                    href={`/icons/sprite.svg#icon-${
                      showPassword ? "eye" : "eye-off"
                    }`}
                  />
                </svg>
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="span"
              className="text-[#EF2447] text-[12px] pl-2"
            />
          </div>

          <div className="relative">
            <div
              className={`p-3 md:p-4 rounded-[30px] border transition-colors duration-200 ${
                touched.confirmPassword
                  ? errors.confirmPassword
                    ? "border-red-500"
                    : "border-green-500"
                  : "border-[#26262626] hover:border-[var(--yellow)]"
              }`}
            >
              <Field
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                className="w-full border-none focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 cursor-pointer"
              >
                <svg width={18} height={18} fill="white" stroke="var(--yellow)">
                  <use
                    href={`/icons/sprite.svg#icon-${
                      showConfirmPassword ? "eye" : "eye-off"
                    }`}
                  />
                </svg>
              </button>
            </div>
            <ErrorMessage
              name="confirmPassword"
              component="span"
              className="text-[#EF2447] text-[12px] pl-2"
            />
          </div>

          <button
            type="submit"
            className="uppercase text-[14px] md:text-base text-white font-bold h-12 w-full 
    rounded-[30px] bg-[var(--yellow)] cursor-pointer
    hover:bg-[#F9B020] transition-colors duration-200 ease-in"
          ></button>
          <Link
            className="text-[12px] md:text-[14px] flex items-center justify-center gap-1"
            href="/login"
          >
            <p className="text-[#26262680]">Already have an account?</p>
            <span className="text-[var(--yellow)]">Login</span>
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
