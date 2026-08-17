import { SchemaShape, xt } from "xansql";
import { Model } from "xansql";
import UserSchema from "./User.js";

export type UserRoleSchemaType = {
  id: number;
  name: string;
  creator: UserSchema | null;
  created_at: Date;
  updated_at: Date;
  users: any[] | null;
};

class UserRoleSchema extends Model {
  get table() {
    return "user_roles";
  }

  schema(): SchemaShape {
    return {
      id: xt.id(),
      name: xt.string().min(2).max(30),
      type: xt.enum(["admin", "organization", "user"]).default("user"),
      creator: xt.one(UserSchema, "creator_roles").nullable(), // if null then this is root admin role
      visibility: xt.enum(["public", "private"]).default("private"),
      comments: xt.string().max(100).nullable(),
      permission: xt
        .record(
          xt.string().min(2).max(30), // module id like products, orders, users, etc
          xt.object({
            grant: xt.boolean().default(false),
            permissions: xt.record(
              xt.string().min(2).max(30), // permission id like create, read, update, delete, etc
              xt.boolean().default(false),
            ),
          }),
        )
        .default({})
        .nullable(),
      created_at: xt.createdAt(),
      updated_at: xt.updatedAt(),

      users: xt.many(UserSchema, "role"),
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

export default UserRoleSchema;
