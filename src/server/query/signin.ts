import { SecurequServer } from "securequ";
import { User } from "../../database/index.js";

const signin = async (server: SecurequServer) => {
  server.post("/signin", async (req) => {
    const { email, password } = req.body as any;

    try {
      const user = await User.findOne({
        where: { email, password },
      });
      if (!user) {
        throw new Error("Invalid email or password");
      }
      throw new Error("Signin successful");
    } catch (error) {
      throw new Error("Invalid email or password");
    }
  });
};

export default signin;
