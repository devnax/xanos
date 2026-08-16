import Stack from "@xanui/ui/Stack";
import SigninForm from "./Signin.js";
import SignupForm from "./Signup.js";
import ForgotForm from "./Forgot.js";
import AuthFormState from "./state.js";

const AuthForm = () => {
  const formType = AuthFormState.get("formType");

  return (
    <Stack height={"100vh"} alignItems={"center"} justifyContent={"center"}>
      {formType === "signin" && <SigninForm />}
      {formType === "signup" && <SignupForm />}
      {formType === "forgot" && <ForgotForm />}
    </Stack>
  );
};

export default AuthForm;
