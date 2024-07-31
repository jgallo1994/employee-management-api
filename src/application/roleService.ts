import { Role } from '@prisma/client';
import { RoleRepository } from '../domain/repository/roleRepository';

export class RoleService {
  private roleRepository: RoleRepository;

  constructor() {
    this.roleRepository = new RoleRepository();
  }

  async createRole(
    name: string,
    permissions?: { name: string }[],
  ): Promise<Role> {
    const roleData = {
      name,
      permissions: permissions?.map((permission) => ({
        name: permission.name,
      })),
    };
    return await this.roleRepository.create(roleData as Omit<Role, 'id'>);
  }

  async getAllRoles(): Promise<Role[]> {
    return await this.roleRepository.findAll();
  }

  async getRoleById(id: number): Promise<Role | null> {
    return await this.roleRepository.findById(id);
  }

  async updateRole(
    id: number,
    name?: string,
    permissions?: { id: number; name: string }[],
  ): Promise<Role | null> {
    const roleData: Partial<Omit<Role, 'id'>> & {
      permissions?: Array<{ id: number; name: string }>;
    } = {
      ...(name && { name }),
      ...(permissions && { permissions }),
    };

    return await this.roleRepository.update(id, roleData);
  }

  async deleteRole(id: number): Promise<Role | null> {
    return await this.roleRepository.delete(id);
  }
}
