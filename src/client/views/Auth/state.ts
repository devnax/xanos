import { createBucket } from "react-state-bucket";
import { xv } from "xanv";
const AuthFormState = createBucket({
  formType: xv.enum(["signin", "signup", "forgot", "reset"]).default("signin"),
  email: xv.string().email(),
  password: xv.string().min(6).max(20),
});

export default AuthFormState;
