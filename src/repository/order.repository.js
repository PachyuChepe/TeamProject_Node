// 주문 관리 , 조회
// 업장 1 : 메뉴 N / 메뉴 1 : 주문 N

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class OrderRepository {
  // 고객 : 주문 생성 및 저장 post / menuid Int , quantity Int / 고객 1 : 주문 N
  createOrder = async (
    // orderId,
    customerId,
    menuId,
    quantity,
    totalPrice,
    // createdAt,
    // updatedAt,
  ) => {
    const createdOrder = await prisma.Order.create({
      data: {
        customerId,
        menuId,
        //   order: {
        //     connect: {
        //       menuId,
        //     },
        //   },
        // },
        quantity,
        totalPrice,
        // status,
        // createdAt,
        //   updatedAt,
      }
    });
    return createdOrder;
  };

  // 사장 : 주문 관리 update / status String : 배달중, 배달완료, 준비중(?)
  updateOrder = async (
    id,
    menuId,
    quantity,
    totalPrice,
    status,
    // createdAt,
    updatedAt,
  ) => {
    const order = await prisma.Order.update({
      data: { menuId, quantity, totalPrice, status },
      where: { id: +id },
    });
    return order;
  };

  // 사장 : 주문 취소 delete (개인적 사유로 사장의 일방적 취소)
  cancelOrder = async (menuId) => {
    await prisma.Order.delete({
      where: { menuId: +menuId },
    });
  };

  // 공통? 고객? : 주문 전체 조회
  getOrders = async () => {
    const orders = await prisma.Order.findMany();

    return orders;
  };

  // 공통? 사장? : 주문 상세 조회
  // router.get('/orders/:orderId', isLoggedIn, orderController.getOrder);
}
export default OrderRepository;
