import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().label("Email").required(),
  password: yup.string().min(6).label("Password").required(),
});
