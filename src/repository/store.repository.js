// StoreRepository.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class StoreRepository {
  getStores = async () => {
    const stores = await prisma.Store.findMany({
      include: {
        category: true, // FoodCategory 정보 포함
      },
    });

    return stores;
  };

  getStore = async (id) => {
    const store = await prisma.Store.findUnique({
      where: { id: +id },
      include: {
        category: true, // FoodCategory 정보 포함
        owner: {
          select: {
            points: true
          }
        }
      },
    });
    return store;
  };

  createStore = async (
    ownerId,
    categoryId,
    name,
    storedescription,
    foodtype,
    storeaddresses,
    businesslicense,
    imageUrl,
  ) => {
    const createdStore = await prisma.Store.create({
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
        imageUrl,
      },
    });
    return createdStore;
  };

  updateStore = async (
    id,
    categoryId,
    name,
    storedescription,
    foodtype,
    storeaddresses,
    imageUrl,
  ) => {
    const store = await prisma.Store.update({
      data: {
        categoryId: +categoryId,
        name,
        description: storedescription,
        foodtype,
        storeaddresses,
        imageUrl,
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
    const storeId = await prisma.Store.findMany({
      select: { id: true },
      where: { ownerId: +ownerId },
    });
    return storeId.id;
  };
}

export default StoreRepository;
