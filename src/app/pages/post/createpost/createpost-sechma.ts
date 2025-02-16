import * as yup from "yup";

export const createPostSechma = yup.object({
  title: yup.string().required("cannot be empty"),
  Image: yup.mixed(),
});
