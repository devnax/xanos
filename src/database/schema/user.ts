import { SchemaShape, xt } from "xansql";
import { Model } from "xansql";
import RoleSchema from "./UserRole.js";
import UserMetaSchema from "./UserMeta.js";
import UserBranchSchema from "./UserBranch.js";

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
      status: xt
        .enum(["active", "pending", "inactive", "suspended"])
        .default("active"),
      role: xt.one(RoleSchema, "users"),
      creator: xt.one(UserSchema, "creator_users").nullable(),
      organization: xt.one(UserSchema, "organization_users").nullable(),
      branch: xt.one(UserBranchSchema, "users").nullable(),

      created_at: xt.createdAt(),
      updated_at: xt.updatedAt(),

      metas: xt.many(UserMetaSchema, "user"),
      branches: xt.many(UserBranchSchema, "organization"),
    };
  }

  protected async beforeCreate({ data }: any) {
    if (!data.creator) {
      const count = await this.count({
        creator: null,
      });
      if (count) {
        throw new Error(`creator is required for ${this.table} table`);
      }
    }
  }
}

export default UserSchema;
