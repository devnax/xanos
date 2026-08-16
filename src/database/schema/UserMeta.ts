import { SchemaShape, xt } from "xansql";
import { Model } from "xansql";
import UserSchema from "./User.js";

class UserMetaSchema extends Model {
  get table() {
    return "user_metas";
  }
  schema(): SchemaShape {
    return {
      id: xt.id(),
      key: xt.string().min(2).max(100),
      value: xt.string().min(2).max(100),
      user: xt.one(UserSchema, "metas").nullable(),
      created_at: xt.createdAt(),
      updated_at: xt.updatedAt(),
    };
  }
}

export default UserMetaSchema;
