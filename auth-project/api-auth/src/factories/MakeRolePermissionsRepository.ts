import RolePermissionsRepository from '../repositories/RolePermissionsRepository';

export default function makeRolePermissionsRepository() {
  return new RolePermissionsRepository();
}
