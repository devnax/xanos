import { SchemaShape, xt } from "xansql";
import { Model } from "xansql";
import UserSchema from "./User.js";

class UserBranchSchema extends Model {
  get table() {
    return "user_branches";
  }

  schema(): SchemaShape {
    return {
      id: xt.id(),
      name: xt.string().min(3).max(100),
      address: xt.string().min(3).max(200).nullable(),
      organization: xt.one(UserSchema, "branches"),
      created_at: xt.createdAt(),
      updated_at: xt.updatedAt(),
    };
  }

  protected async beforeCreate({ data }: any) {
    const count = await this.count({
      name: data.name,
      organization: data.organization,
    });
    if (count) {
      throw new Error(`branch name "${data.name}" already exists.`);
    }

    return {
      ...data,
      name: data.name.toLowerCase().trim(),
    };
  }
}

export default UserBranchSchema;
