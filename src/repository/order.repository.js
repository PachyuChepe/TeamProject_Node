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
    status,
  ) => {
    const createdOrder = await prisma.Order.create({
      data: {
        customerId,
        menuId: +menuId,
        quantity: +quantity,
        totalPrice: +totalPrice,
        status
      }
    });
    return createdOrder;
  };

  // 사장 : 주문 관리 update / status String : 배달중, 배달완료, 준비중(?)
  updateOrder = async (orderid, status) => {
    const order = await prisma.order.update({
      data: { status },
      where: { id: +orderid },
    });

    return order;
  };

  // 사장 : 주문 취소 delete (개인적 사유로 사장의 일방적 취소)
  cancelOrder = async (orderid) => {
    await prisma.Order.delete({
      where: { id: +orderid },
    });
  };

  // 공통? 고객? : 주문 전체 조회
  getOrders = async () => {
    const orders = await prisma.Order.findMany();

    return orders;
  };

  // 공통? 사장? : 주문 상세 조회
  getOrder = async (orderid) => {
    const order = await prisma.order.findFirst({
      select: {
        quantity: true,
        totalPrice: true,
        status: true,
      },
      where: { id: +orderid },
    });
    return order;
  };
}
export default OrderRepository;
