import { prisma } from '../utils/prisma/index.js';

class StoreRepository {
  uploadStore = async (
    ownerId,
    name,
    storedescription,
    foodtype,
    storestatus,
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
        // storestatus,
        // businesslicense,
      },
    });
    return uploadedStore;
  };

  updateStore = async (
    id,
    ownerId,
    name,
    storedescription,
    foodtype,
    storestatus) => {
    console.log('id~~~: ', id);
    const store = await prisma.Store.update({
      data: {
        name,
        description: storedescription,
        // foodtype,
        // storestatus,
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
