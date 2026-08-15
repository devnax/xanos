import { User } from "../../database";
import XanosConfig from "../classes/XanosConfig";

const useAuth = () => {
  return {
    get: () => {},
    signin: async (email: string, password: string) => {
      const user = await User.findOne({
        where: { email, password },
      });
      if (!user) {
        throw new Error("Invalid email or password");
      }
      XanosConfig.set("auth", true);
      return user;
    },
    signout: async () => {
      XanosConfig.set("auth", false);
    },
  };
};

export default useAuth;
