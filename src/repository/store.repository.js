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
    name,
    storedescription,
    foodtype,
    storeaddresses,
    businesslicense,
  ) {
    return prisma.Store.create({
      data: {
        ownerId,
        name,
        description: storedescription,
        foodtype,
        storeaddresses,
        businesslicense,
      },
    });
  }

  async updateStore(id, name, storedescription, foodtype, storeaddresses) {
    return prisma.Store.update({
      where: { id: parseInt(id, 10) },
      data: {
        name,
        description: storedescription,
        foodtype,
        storeaddresses,
      },
    });
  }

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
