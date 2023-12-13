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
        ownerId,
        name,
        storedescription,
        foodtype,
        storestatus,
        businesslicense,
      },
    });
    return uploadedStore;
  };

  updateStore = async (
    storeId,
    name,
    storedescription,
    foodtype,
    storestatus,
  ) => {
    const store = await prisma.Store.update({
      data: {
        storeId,
        name,
        storedescription,
        foodtype,
        storestatus,
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
}

export default StoreRepository;
