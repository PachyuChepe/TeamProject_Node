// StoreRepository.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class StoreRepository {
  getStores = async () => {
    const stores = await prisma.store.findMany({
      include: {
        category: true,
        menus: {
          include: {
            orders: {
              include: {
                _count: {
                  select: { review: true },
                },
              },
            },
          },
        },
      },
    });

    // 클라이언트 측에서 각 스토어별로 리뷰 개수 집계
    const storeReviewCounts = stores.map((store) => {
      const totalReviews = store.menus.reduce((count, menu) => {
        const menuReviews = menu.orders.reduce((menuCount, order) => {
          // order._count.reviews가 정의되어 있고 숫자인지 확인
          return menuCount + (order._count.review || 0);
        }, 0);
        return count + menuReviews;
      }, 0);
      return {
        storeId: store.id,
        reviewCount: totalReviews,
      };
    });

    return { stores, storeReviewCounts };
  };

  getStore = async (id) => {
    const store = await prisma.Store.findUnique({
      where: { id: +id },
      include: {
        category: true, // FoodCategory 정보 포함
        owner: {
          select: {
            points: true,
          },
        },
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
