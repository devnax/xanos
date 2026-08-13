import { SchemaShape, xt } from "xansql";
import { Model } from "xansql";
import UserSchema from "./User.js";
import { permission } from "node:process";

export type RoleSchemaType = {
  id: number;
  name: string;
  creator: UserSchema | null;
  created_at: Date;
  updated_at: Date;
  users: any[] | null;
};

// role only shows in the admin and organization panel
class RoleSchema extends Model {
  get table() {
    return "user_roles";
  }

  protected async beforeCreate({ data }: any) {
    if (data.type === "admin") {
      const existingAdminRole = await this.findOne({
        where: { type: "admin" },
      });
      if (existingAdminRole) {
        throw new Error(
          "An admin role already exists. Only one admin role is allowed.",
        );
      }
    }
  }

  schema(): SchemaShape {
    return {
      id: xt.id(),
      name: xt.string().min(2).max(30),
      type: xt
        .enum(["admin", "admin_user", "organization", "user"])
        .default("user"),
      creator: xt.one(UserSchema, "creator_roles").nullable(),
      permission: xt
        .object({
          grant: xt.boolean().default(false),
          modules: xt.record(
            xt.string().min(2).max(30), // module id like products, orders, users, etc
            xt.object({
              grant: xt.boolean().default(false),
              permissions: xt.record(
                xt.string().min(2).max(30), // permission id like create, read, update, delete, etc
                xt.boolean().default(false),
              ),
            }),
          ),
        })
        .default({
          grant: false,
          modules: {},
        })
        .nullable(),
      created_at: xt.createdAt(),
      updated_at: xt.updatedAt(),

      users: xt.many(UserSchema, "role"),
    };
  }
}

export default RoleSchema;
