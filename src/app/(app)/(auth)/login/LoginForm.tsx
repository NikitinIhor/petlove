"use client";

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";

interface RegisterFormProps {}

interface InitialValuesProps {
  email: string;
  password: string;
}

const initialValues: InitialValuesProps = {
  email: "",
  password: "",
};

const FeedbackSchema = Yup.object().shape({
  email: Yup.string().email("Must be a valid email!").required("Required"),
  password: Yup.string()
    .min(3, "Too short")
    .max(256, "Too long")
    .required("Required"),
});

const handleSubmit = (
  values: InitialValuesProps,
  actions: FormikHelpers<InitialValuesProps>
) => {
  actions.resetForm();
};

const LoginForm: NextPage<RegisterFormProps> = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
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
                touched.email
                  ? errors.email
                    ? "border-red-500"
                    : "border-green-500"
                  : "border-[#26262626] hover:border-[var(--yellow)]"
              }`}
            >
              <Field
                type="email"
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
                onClick={handleShowPassword}
                className="absolute right-3"
              >
                {showPassword ? (
                  <svg
                    width={18}
                    height={18}
                    fill="white"
                    stroke="var(--yellow)"
                  >
                    <use href="/icons/sprite.svg#icon-eye" />
                  </svg>
                ) : (
                  <svg
                    width={18}
                    height={18}
                    fill="white"
                    stroke="var(--yellow)"
                  >
                    <use href="/icons/sprite.svg#icon-eye-off" />
                  </svg>
                )}
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="span"
              className="text-[#EF2447] text-[12px] pl-2"
            />
          </div>

          <button
            type="submit"
            className="mb-3 mt-6 uppercase text-[14px] text-white font-bold h-12 w-full 
          rounded-[30px] bg-[var(--yellow)] cursor-pointer
          hover:bg-[#F9B020] transition-colors duration-200 ease-in"
          >
            Log In
          </button>
          <Link
            className="text-[12px] flex items-center justify-center gap-1"
            href="/register"
          >
            <p className="text-[#26262680]">Don’t have an account?</p>
            <span className="text-[var(--yellow)]">Register</span>
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
