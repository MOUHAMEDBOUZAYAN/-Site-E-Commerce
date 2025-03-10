import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const registerSchema = yup.object().shape({
    username: yup.string().required("Required"),
    email: yup.string().email("Please enter a valid email").required("Required"),
    isAdmin: yup.boolean().required(),
    password: yup
        .string()
        .min(5)
        .matches(passwordRules, {message:"Please create a stronger password"})
        .required("Required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Password must match")
})