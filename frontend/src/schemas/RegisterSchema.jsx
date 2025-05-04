import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    username: yup.string().required("Required"),
    email: yup.string().email("Please enter a valid email").required("Required"),
    isAdmin: yup.boolean().required(),
    password: yup
        .string()
        .min(5)
        .required("Required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Password must match").required("Required")
})