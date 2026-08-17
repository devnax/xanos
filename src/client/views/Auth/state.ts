import { createBucket } from "react-state-bucket";
import { xv } from "xanv";
const AuthFormState = createBucket({
  formType: xv.enum(["signin", "signup", "forgot", "reset"]).default("signin"),
  email: xv.string().email(),
  username: xv.string().max(70).default("admin@xanos.com"),
  password: xv.string().min(6).max(20).default("admin123"),
});

export default AuthFormState;
