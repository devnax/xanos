import { PermissionList, PermissionStore } from "./core";

export type Permissions = Record<
  string,
  {
    title: string;
    description: string;
    default?: boolean;
    section?: string;
  }
>;

class Permission<P extends Permissions> {
  readonly permissions: (role: string) => P;
  readonly module: string;

  constructor(module: string, permissions: (role: string) => P) {
    this.module = module;
    this.permissions = permissions;
    PermissionList.set(module, this);
  }

  is(key: keyof P) {
    return PermissionStore.is(this.module, key as string);
  }
}

export default Permission;
