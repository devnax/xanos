import { SchemaShape, xt } from "xansql";
import { Model } from "xansql";
import UserSchema from "./User.js";

class BranchSchema extends Model {
  get table() {
    return "branches";
  }

  schema(): SchemaShape {
    return {
      id: xt.id(),
      name: xt.string().min(3).max(100),
      address: xt.string().min(3).max(200).nullable(),
      organization: xt.one(UserSchema, "branches").nullable(),
      created_at: xt.createdAt(),
      updated_at: xt.updatedAt(),
    };
  }
}

export default BranchSchema;
