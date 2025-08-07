"use client";

import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { NextPage } from "next";
import Link from "next/link";
import * as Yup from "yup";

interface RegisterFormProps {}

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

const handleSubmit = (
  values: InitialValuesProps,
  actions: FormikHelpers<InitialValuesProps>
) => {
  actions.resetForm();
};

const RegisterForm: NextPage<RegisterFormProps> = () => {
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
              className={`p-3 rounded-[30px] border ${
                touched.name
                  ? errors.name
                    ? "border-red-500"
                    : "border-green-500"
                  : "border-[#26262626]"
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
              className={`p-3 rounded-[30px] border ${
                touched.email
                  ? errors.email
                    ? "border-red-500"
                    : "border-green-500"
                  : "border-[#26262626]"
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

          <div>
            <div
              className={`p-3 rounded-[30px] border ${
                touched.password
                  ? errors.password
                    ? "border-red-500"
                    : "border-green-500"
                  : "border-[#26262626]"
              }`}
            >
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full border-none focus:outline-none"
              />
            </div>
            <ErrorMessage
              name="password"
              component="span"
              className="text-[#EF2447] text-[12px] pl-2"
            />
          </div>

          <div>
            <div
              className={`p-3 rounded-[30px] border ${
                touched.confirmPassword
                  ? errors.confirmPassword
                    ? "border-red-500"
                    : "border-green-500"
                  : "border-[#26262626]"
              }`}
            >
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                className="w-full border-none focus:outline-none"
              />
            </div>
            <ErrorMessage
              name="confirmPassword"
              component="span"
              className="text-[#EF2447] text-[12px] pl-2"
            />
          </div>

          <button
            type="submit"
            className="mb-3 mt-6 uppercase text-[14px] text-white font-bold h-12 w-full 
          rounded-[30px] bg-[var(--yellow)] cursor-pointer
          hover:bg-[var(--yellow-light)] hover:text-[#F6B83D] transition-colors duration-200 ease-in"
          >
            Registration
          </button>
          <Link
            className="text-[12px] flex items-center justify-center gap-1"
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
