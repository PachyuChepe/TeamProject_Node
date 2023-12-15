// StoreRepository.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class StoreRepository {
  async getStores() {
    return prisma.Store.findMany();
  }

  async getStore(id) {
    return prisma.Store.findUnique({
      where: { id: parseInt(id, 10) },
    });
  }

  async createStore(
    ownerId,
    categoryId,
    name,
    storedescription,
    foodtype,
    storeaddresses,
    businesslicense,
  ) {
    return prisma.Store.create({
      data: {
        owner: {
          connect: {
            id: +ownerId,
          },
        },
        category: {
          connect: {
            id: +categoryId,
          },
        },
        name,
        description: storedescription,
        foodtype: foodtype,
        storeaddresses,
        businesslicense,
      },
    });
  }

  updateStore = async (
    id,
    categoryId,
    name,
    storedescription,
    foodtype,
    storeaddresses,
  ) => {
    const store = await prisma.Store.update({
      data: {
        categoryId: +categoryId,
        name,
        description: storedescription,
        foodtype,
        storeaddresses,
      },
      where: {
        id: +id,
      },
    });
  };

  async deleteStore(id) {
    await prisma.Store.delete({
      where: { id: parseInt(id, 10) },
    });
  }

  async getStoreById(id) {
    return prisma.Store.findUnique({
      where: { id: parseInt(id, 10) },
      include: { owner: true },
    });
  }
}

export default StoreRepository;
