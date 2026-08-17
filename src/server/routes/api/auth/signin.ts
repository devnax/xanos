import { crypto, SecurequServer } from "securequ";
import { User } from "../../../../database/index.js";

const signin = async (server: SecurequServer) => {
  server.post("/signin", async (req) => {
    const { username, password } = req.body as any;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);
    const where: any = {};
    if (isEmail) {
      where.email = username;
    } else {
      where.username = username;
    }

    const user = await User.findOne({
      where: { ...where, password },
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }
    const token = await crypto.createToken(
      {
        userId: user.id,
        username: user.username,
        email: user.email,
      },
      "wellknownclientsecret",
    );
    console.log(token);

    throw token;
  });
};

export default signin;
