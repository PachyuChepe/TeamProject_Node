import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class StoreRepository {
  getStores = async () => {
    const stores = await prisma.Store.findMany();

    return stores;
  };

  getStore = async (id) => {
    const store = await prisma.Store.findFirst({
      where: { id: +id },
    });
    return store;
  };

  uploadStore = async (
    ownerId,
    name,
    storedescription,
    foodtype,
    storeaddresses,
    businesslicense,
  ) => {
    const uploadedStore = await prisma.Store.create({
      data: {
        owner: {
          connect: {
            id: ownerId,
          },
        },
        name,
        description: storedescription,
        // foodtype,
        // storeaddresses,
        // businesslicense,
      },
    });
    return uploadedStore;
  };

  updateStore = async (
    id,
    ownerId, //프론트 로그인 기능 후 제거
    name,
    storedescription,
    foodtype,
    storeaddresses,
  ) => {
    const store = await prisma.Store.update({
      data: {
        name,
        description: storedescription,
        // foodtype,
        // storeaddresses,
      },
      where: {
        id: +id,
      },
    });
    return store;
  };

  deleteStore = async (id) => {
    await prisma.Store.delete({
      where: { id: +id },
    });
  };

  getStoreById = async (ownerId) => {
    const storeid = await prisma.Store.findMany({
      select: { id: true },
      where: { ownerId: +ownerId },
    });
    return storeid.id;
  };
}

export default StoreRepository;
