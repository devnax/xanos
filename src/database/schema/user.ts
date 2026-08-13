import { SchemaShape, xt } from "xansql";
import { Model } from "xansql";
import RoleSchema from "./Role.js";

class UserSchema extends Model {
  get table() {
    return "users";
  }
  schema(): SchemaShape {
    return {
      id: xt.id(),
      // agent: xt.one(AuthSchema, "agents").nullable(),
      name: xt.string().min(3).max(100),
      email: xt.email(),
      password: xt.password(),
      username: xt.username().nullable(),
      role: xt.one(RoleSchema, "users").nullable(),
      created_at: xt.createdAt(),
      updated_at: xt.updatedAt(),
    };
  }
}

export default UserSchema;
