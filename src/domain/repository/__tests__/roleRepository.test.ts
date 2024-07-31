import prismaClient from '../../../infrastructure/prismaClient';

beforeAll(async () => {
  await prismaClient.$connect();
});

afterAll(async () => {
  await prismaClient.$disconnect();
});

test('should upsert a role with permissions', async () => {
  const roleData = {
    name: 'Admin',
  };

  const role = await prismaClient.role.upsert({
    where: {
      name: roleData.name,
    },
    update: {},
    create: {
      name: roleData.name,
    },
  });

  expect(role).toHaveProperty('id');
  expect(role.name).toBe(roleData.name);

  const permissionsData = [
    { name: 'create-employee' },
    { name: 'update-employee' },
  ];

  for (const perm of permissionsData) {
    await prismaClient.permission.upsert({
      where: {
        name: perm.name,
      },
      update: {
        roleId: role.id,
      },
      create: {
        name: perm.name,
        roleId: role.id,
      },
    });
  }

  const permissions = await prismaClient.permission.findMany({
    where: { roleId: role.id },
  });

  expect(permissions).toHaveLength(2);
  expect(permissions.map((p) => p.name)).toContain('create-employee');
  expect(permissions.map((p) => p.name)).toContain('update-employee');
});
