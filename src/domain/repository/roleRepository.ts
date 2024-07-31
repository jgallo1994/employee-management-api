import { Role, Permission } from '@prisma/client';
import prismaClient from '../../infrastructure/prismaClient';

export class RoleRepository {
  async create(
    roleData: Omit<Role, 'id'> & {
      permissions?: Omit<Permission, 'id' | 'roleId'>[];
    },
  ) {
    return prismaClient.role.create({
      data: {
        name: roleData.name,
        permissions: {
          create:
            roleData.permissions?.map((permission) => ({
              name: permission.name,
            })) || [],
        },
      },
      include: {
        permissions: true,
      },
    });
  }

  async findAll() {
    return prismaClient.role.findMany({
      include: {
        permissions: true,
      },
    });
  }

  async findById(id: number) {
    return prismaClient.role.findUnique({
      where: { id },
      include: {
        permissions: true,
      },
    });
  }

  async update(
    id: number,
    roleData: Partial<
      Omit<Role, 'id'> & { permissions?: Array<{ id: number; name: string }> }
    >,
  ) {
    return prismaClient.role.update({
      where: { id },
      data: {
        ...(roleData.name && { name: roleData.name }), // Asigna solo si `name` está definido
        permissions: {
          update:
            roleData.permissions?.map((permission) => ({
              where: { id: permission.id },
              data: { name: permission.name },
            })) || [],
        },
      },
      include: {
        permissions: true,
      },
    });
  }

  async delete(id: number) {
    return prismaClient.role.delete({
      where: { id },
    });
  }
}
