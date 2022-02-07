import Prisma from "@prisma/client";

const prisma = new Prisma.PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model == 'Prodct') {
    if (params.action == 'delete') {
      params.action = 'update';
      params.args['data'] = { deleted: true };
    }

    if (params.action == 'deleteMany') {
      params.action = 'updateMany';
      if (params.args.data != undefined) {
        params.args.data['deleted'] = true;
      } else {
        params.args['data'] = { deleted: true };
      }
    }

    if (params.action == 'findMany') {
      if (params.args.where != undefined) {
        if (params.args.where.deleted == undefined) {
          params.args.where['deleted'] = false
        }
      } else {
        params.args['where'] = { deleted: false }
      }
    }

    if (params.action == 'updateMany') {
      if (params.args.where != undefined) {
        params.args.where['deleted'] = false
      } else {
        params.args['where'] = { deleted: false }
      }
    }
  }
  
  return next(params);
})

export default prisma;