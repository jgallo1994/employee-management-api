import prismaClient from '../../../infrastructure/prismaClient';

beforeAll(async () => {
  await prismaClient.$connect();
});

afterAll(async () => {
  await prismaClient.$disconnect();
});

test('should create a new employee', async () => {
  const role = await prismaClient.role.findFirst({ where: { name: 'Admin' } });
  if (!role) {
    throw new Error('Role not found');
  }

  const employeeData = { name: 'John Doe', roleId: role.id };
  const employee = await prismaClient.employee.create({
    data: employeeData,
  });

  expect(employee).toHaveProperty('id');
  expect(employee.name).toBe(employeeData.name);
});
