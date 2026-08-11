import { xt } from "xansql";
import { USER_ROLES, USER_STATUS } from "./constant.js";
import { Model } from "xansql";

export class UserModel extends Model {
  get table() {
    return "users";
  }
  schema() {
    return {
      id: xt.id(),
      agent: xt.one(UserModel, "agents").nullable(),
      name: xt.string().min(3).max(100),
      email: xt.email(),
      password: xt.password(),
      username: xt.username().nullable(),
      phone: xt.phone().index().nullable(),
      status: xt.enum(USER_STATUS).index().default(USER_STATUS.ACTIVE),
      role: xt.enum(USER_ROLES).index().default(USER_ROLES.AGENT_STUDENT),
      photo: xt.photo().nullable(),

      created_at: xt.createdAt(),
      updated_at: xt.updatedAt(),
    };
  }
}
