import { SchemaShape, xt } from "xansql";
import { Model } from "xansql";
import RoleSchema from "./UserRole.js";
import UserMetaSchema from "./UserMeta.js";
import BranchSchema from "./Branch.js";

class UserSchema extends Model {
  get table() {
    return "users";
  }
  schema(): SchemaShape {
    return {
      id: xt.id(),
      name: xt.string().min(3).max(100),
      email: xt.email(),
      password: xt.password(),
      username: xt.username().nullable(),
      role: xt.one(RoleSchema, "users"),
      creator: xt.one(UserSchema, "creator_users"),
      organization: xt.one(UserSchema, "organization_users").nullable(),
      branch: xt.one(BranchSchema, "users").nullable(),

      created_at: xt.createdAt(),
      updated_at: xt.updatedAt(),

      metas: xt.many(UserMetaSchema, "user"),
      branches: xt.many(BranchSchema, "organization"),
    };
  }
}

export default UserSchema;
