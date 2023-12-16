import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class userAllGetRepository {
  getUserInfo = async (userId) => {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        password: true,
        role: true,
        points: true,
        createdAt: true,
        stores: {
          select: {
            id: true,
            ownerId: true,
            categoryId: true,
            name: true,
            description: true,
            foodtype: true,
            storeaddresses: true,
            businesslicense: true,
            createdAt: true,
            // updatedAt: false, // updatedAt 필드 제외
            menus: true,
            reviews: true,
          },
        },
        orders: {
          select: {
            id: true,
            customerId: true,
            menuId: true,
            quantity: true,
            totalPrice: true,
            status: true,
            createdAt: true,
            // updatedAt: false, // updatedAt 필드 제외
            menu: true,
          },
        },
        reviews: true,
        addresses: true,
      },
    });
  };

  getCustomerDetails = async (userId, role) => {
    return await prisma.user.findUnique({
      where: {
        id: userId,
        role: '고객', // '고객' 역할 필터 적용
      },
      include: {
        reviews: true, // 리뷰 관련 모든 정보 포함
        orders: {
          include: {
            menu: true, // 주문과 관련된 메뉴 정보 포함
          },
        },
      },
    });
  };
}
export default userAllGetRepository;
