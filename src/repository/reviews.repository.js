import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ReviewRepository {
  // 리뷰 생성 시 사용할 주문 ID 조회
  getOrderId = async (customerId) => {
    const orderId = await prisma.order.findFirst({
      where: {
        customerId: +customerId,
      },
      select: {
        id: true,
      },
    });
    return orderId.id;
  };

  // 리뷰 생성
  createReview = async (orderId, rating, comment, imageUrl) => {
    const review = await prisma.review.create({
      data: {
        orderId,
        rating: +rating,
        comment,
        imageUrl,
      },
    });
    return review;
  };

  // 매장 정보 조회
  getStoreName = async (storeId) => {
    const store = await prisma.Store.findUnique({
      where: { id: +storeId },
      select: {
        name: true,
      },
    });
    return store;
  };

  // 매장의 메뉴 ID 조회
  getStoreMenuIds = async (storeId) => {
    const menuIds = await prisma.menu
      .findMany({
        where: {
          storeId: +storeId,
        },
        select: {
          id: true,
        },
      })
      .then((menus) => menus.map((menu) => menu.id));
    return menuIds;
  };

  // 주문 ID 조회
  getStoreOrderIds = async (menuIds) => {
    const orderIds = await prisma.order
      .findMany({
        where: {
          menuId: {
            in: menuIds, // 숫자 배열 사용
          },
        },
        select: {
          id: true,
        },
      })
      .then((orders) => orders.map((order) => order.id));
    return orderIds;
  };

  // 특정 가게의 리뷰 조회
  getStoreReviews = async (orderIds) => {
    const reviews = await prisma.review.findMany({
      where: {
        orderId: {
          in: orderIds,
        },
      },
      include: {
        order: {
          select: {
            menu: {
              select: {
                name: true,
              }
            },
            customer: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return { reviews };
  };

  // 고객의 메뉴 ID 조회
  getUserOrderIds = async (customerId) => {
    const orders = await prisma.order.findMany({
      where: {
        customerId,
      },
      select: {
        id: true,
      },
    });
    return orders.map((order) => order.id);
  };

  // 특정 고객의 리뷰 조회
  getUserReviews = async (orderIds) => {
    const reviews = await prisma.review.findMany({
      where: {
        orderId: {
          in: orderIds,
        },
      },
      include: {
        order: {
          select: {
            menu: {
              select: {
                name: true,
                store: {
                  select: {
                    name: true, // Store의 이름
                  },
                },
              },
            },
          },
        },
      },
    });
    return reviews;
  };

  // 특정 리뷰 조회
  getReviewById = async (reviewId) => {
    const review = await prisma.review.findUnique({
      where: {
        id: +reviewId,
      },
      include: {
        order: {
          select: {
            menu: {
              select: {
                store: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return review;
  };

  // 리뷰 수정
  updateReview = async (reviewId, rating, comment, imageUrl) => {
    const updatedReview = await prisma.review.update({
      where: { id: +reviewId },
      data: {
        rating: +rating,
        comment,
        imageUrl,
      },
    });

    return updatedReview;
  };

  // 리뷰 삭제
  deleteReview = async (reviewId) => {
    const deletedReview = await prisma.review.delete({
      where: {
        id: +reviewId,
      },
    });
    return deletedReview;
  };
}

export default ReviewRepository;
