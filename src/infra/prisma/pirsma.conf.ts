import { PrismaClient, Prisma } from '@prisma/client';

const auditoryFieldsExt = Prisma.defineExtension({
  name: 'auditoryFields',
  model: {
    $allModels: {
      async delete<M, A>(
        this: M,
        where: Prisma.Args<M, 'delete'>['where'],
      ): Promise<Prisma.Result<M, A, 'update'>> {
        const context = Prisma.getExtensionContext(this);

        return (context as any).update({
          where,
          data: {
            deletedAt: new Date(),
            active: false,
          },
        });
      },
      async deleteMany<M, A>(
        this: M,
        where: Prisma.Args<M, 'deleteMany'>['where'],
      ): Promise<Prisma.Result<M, A, 'updateMany'>> {
        const context = Prisma.getExtensionContext(this);
        return (context as any).updateMany({
          where,
          data: {
            deletedAt: new Date(),
            active: false,
          },
        });
      },
    },
  },
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        if (
          operation === 'findUnique' ||
          operation === 'findFirst' ||
          operation === 'findMany'
        ) {
          args.where = {
            ...args.where,
            deletedAt: null,
            active: true,
          };
        } else if (operation === 'update' || operation === 'updateMany') {
          args.data = {
            ...args.data,
            updatedAt: new Date(),
          };
        }

        return query(args);
      },
    },
  },
});

//function to give us a prismaClient with extensions we want
const customPrismaClient = (prismaClient: PrismaClient) => {
  return prismaClient.$extends(auditoryFieldsExt);
};

//Create a type to our funtion
type CustomPrismaClient = ReturnType<typeof customPrismaClient>;

//Our Custom Prisma Client with the client set to the customPrismaClient with extension
export class PrismaClientExtended extends PrismaClient {
  customPrismaClient: CustomPrismaClient;

  get client() {
    if (!this.customPrismaClient)
      this.customPrismaClient = customPrismaClient(this);

    return this.customPrismaClient;
  }
}
