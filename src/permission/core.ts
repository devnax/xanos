import Permission from ".";

export type PermissionModule = string;
export const PermissionList = new Map<PermissionModule, Permission<any>>();

export type PermissionSchema = {
  grant: boolean;
  modules: Record<
    string,
    { grant: boolean; permissions: Record<string, boolean> }
  >;
};

export class PermissionStore {
  static permissions: PermissionSchema = { grant: false, modules: {} };

  static is(module: PermissionModule, key: string) {
    const modulePermissions = this.permissions.modules[module];
    if (!modulePermissions) return false;
    if (this.permissions.grant || modulePermissions.grant) return true;
    return modulePermissions.permissions[key] ?? false;
  }
}
