"use client";

import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import * as Yup from "yup";

import { editUser } from "@/app/redux/auth/ops";
import {
  selectIsLoading,
  selectUserAvatar,
  selectUserEmail,
  selectUserName,
  selectUserPhone,
  setDefaultAvatar,
} from "@/app/redux/auth/slice";
import { AppDispatch } from "@/app/redux/store";
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ButtonUpload from "./ButtonUpload";

interface EditModalProps {}

interface FormValues {
  name: string;
  email: string;
  avatar: string;
  phone: string;
}

const EditModal: NextPage<EditModalProps> = () => {
  const userAvatar = useSelector(selectUserAvatar);
  const userName = useSelector(selectUserName);
  const userEmail = useSelector(selectUserEmail);
  const userPhone = useSelector(selectUserPhone);
  const isLoading = useSelector(selectIsLoading);

  const [avatarPreview, setAvatarPreview] = useState<string>(userAvatar || "");
  const [avatarError, setAvatarError] = useState<boolean>(false);
  const [avatarUploading, setAvatarUploading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const initialValues: FormValues = {
    name: userName || "",
    email: userEmail || "",
    avatar: userAvatar || "",
    phone: userPhone || "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too short!").max(20, "Too long!"),
    email: Yup.string().matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Email must be valid"
    ),
    avatar: Yup.string().matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      "Avatar URL must be valid"
    ),
    phone: Yup.string().matches(/^\+38\d{10}$/, "Phone must be valid"),
  });

  const handleAvatarChange = (
    value: string,
    setFieldValue: (field: string, value: string) => void
  ) => {
    setFieldValue("avatar", value);

    if (value && /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/.test(value)) {
      setAvatarPreview(value);
      setAvatarError(false);
    } else if (!value) {
      setAvatarPreview("");
      setAvatarError(false);
    }
  };

  const handleAvatarError = () => {
    setAvatarError(true);
    if (avatarPreview === userAvatar) {
      dispatch(setDefaultAvatar());
    }
  };

  const handleFileUpload = async (
    file: File,
    setFieldValue: (field: string, value: string) => void
  ) => {
    setAvatarUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        const localPreview = e.target?.result as string;
        setAvatarPreview(localPreview);
        setAvatarError(false);
      };
      reader.readAsDataURL(file);

      const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
      const CLOUDINARY_UPLOAD_PRESET = import.meta.env
        .VITE_CLOUDINARY_UPLOAD_PRESET;

      if (!CLOUDINARY_URL || !CLOUDINARY_UPLOAD_PRESET) {
        throw new Error("Cloudinary configuration is missing");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Upload failed");
      }

      const data = await response.json();
      const cloudinaryUrl = data.secure_url;

      setFieldValue("avatar", cloudinaryUrl);
      setAvatarPreview(cloudinaryUrl);
    } catch (error) {
      error instanceof Error ? error.message : "Failed to upload photo",
        {
          variant: "error",
        };
      setAvatarError(true);
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleSubmit = async (values: FormikValues): Promise<void> => {
    const userData: Partial<FormValues> = {};

    if (values.name) userData.name = values.name;
    if (values.email) userData.email = values.email;
    if (values.phone) userData.phone = values.phone;
    if (values.avatar) userData.avatar = values.avatar;

    if (Object.keys(userData).length === 0) {
      toast.error("No changes to save.", {
        duration: 4000,
        position: "top-right",
      });
      return;
    }

    try {
      await dispatch(editUser(userData)).unwrap();
    } catch (error) {
      toast.error(`Update failed: ${error}`, {
        duration: 4000,
        position: "top-right",
      });
    }
  };

  return (
    <div>
      <h3>Edit information</h3>

      <div>
        {!avatarPreview || avatarError ? (
          <FaUserAlt color="var(--yellow)" size={30} />
        ) : (
          <span>
            <Image
              src={avatarPreview}
              alt="User avatar"
              width={110}
              height={110}
            />
          </span>
        )}
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, values, setFieldValue, touched }) => (
          <Form>
            <div>
              <label htmlFor="avatar">
                <div>
                  <Field
                    type="text"
                    name="avatar"
                    id="avatar"
                    placeholder="https://"
                    autoComplete="off"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleAvatarChange(e.target.value, setFieldValue)
                    }
                  />
                  <ErrorMessage name="avatar" component="span" />
                </div>
                <ButtonUpload
                  onFileSelect={(file) => handleFileUpload(file, setFieldValue)}
                  onInvalidFile={(msg) =>
                    toast.error(`Update failed: ${msg}`, {
                      duration: 4000,
                      position: "top-right",
                    })
                  }
                  loading={avatarUploading}
                  accept="image/*"
                />
              </label>

              <label htmlFor="name">
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  autoComplete="off"
                />
                <ErrorMessage name="name" component="span" />
              </label>

              <label htmlFor="email">
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@gmail.com"
                  autoComplete="off"
                />
                <ErrorMessage name="email" component="span" />
              </label>

              <label htmlFor="phone">
                <Field
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="+380"
                  autoComplete="off"
                />
                <ErrorMessage name="phone" component="span" />
              </label>
            </div>

            <button disabled={isLoading || avatarUploading}>
              {isLoading ? "Saving..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditModal;
