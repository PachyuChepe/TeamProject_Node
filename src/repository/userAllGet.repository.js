import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 유저의 정보
router.get('/user-info', isLoggedIn, async (req, res) => {
  try {
    const userId = res.locals.user.id; // 로그인된 사용자의 ID
    const user = await prisma.user.findUnique({
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

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== '사장') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// 특정 '고객' 유저의 리뷰와 주문 상세 조회 라우터
router.get('/customer-details', isLoggedIn, async (req, res) => {
  const userId = res.locals.user.id; // 로그인된 사용자의 ID

  try {
    const user = await prisma.user.findUnique({
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

    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found or not a customer' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
