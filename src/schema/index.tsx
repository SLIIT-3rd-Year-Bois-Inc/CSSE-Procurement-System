import * as yup from "yup";

/**
 *  This file defines the schemas used for form validation
 *  in the UI
 */

export const loginSchema = yup.object().shape({
  email: yup.string().email().label("Email").required(),
  password: yup.string().min(6).label("Password").required(),
});

export const deliverySchema = yup.object().shape({
  eta: yup.date().label("ETA").required(),
  quantity: yup.number().label("Quantity").required(),
  note: yup.string().label("Note"),
});
