import * as yup from "yup";

export const signupSechma = yup.object({
  name: yup
    .string()
    .required("cannot be empty")
    .min(4, "must contain more than 4 characters"),
  email: yup.string().required("cannot be empty").email(),
  password: yup
    .string()
    .required("cannot be empty")
    .min(6, "must contain more than 6 characters"),
  cpassword: yup
    .string()
    .required("cannot be empty")
    .oneOf([yup.ref("password")], "must match password"),
});
