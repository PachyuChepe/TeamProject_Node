// 주문 관리 , 조회
// 업장 1 : 메뉴 N / 메뉴 1 : 주문 N

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class OrderRepository {
  // 고객 : 주문 생성 및 저장 post / menuid Int , quantity Int / 고객 1 : 주문 N
  createOrder = async (
    menuId,
    customerId,
    quantity,
    totalPrice,
    status,
  ) => {
    const createdOrder = await prisma.Order.create({
      data: {
        menu: {
          connect: {
            id: +menuId,
          },
        },
        customer: {
          connect: {
            id: +customerId,
          },
        },
        quantity: +quantity,
        totalPrice: +totalPrice,
        status,
      },
    });
    return createdOrder;
  };

  // 결제 완료 포인트 업데이트
  paymentCompleted = async (menuId, customerId, totalPrice) => {
    // 매장 id 조회
    const storeId = await prisma.menu.findUnique({
      where: { id: +menuId },
      include: { store: { select: { id: true } } }
    });

    // 사장 id 조회
    const ownerId = await prisma.store.findUnique({
      where: { id: +storeId.store.id },
      include: { owner: { select: { id: true } } }
    });

    // 고객 포인트 조회
    const user = await prisma.user.findUnique({
      where: { id: +customerId },
      select: { points: true }
    });

    if (user.points < totalPrice) {
      throw new Error("잔액이 부족합니다.");
    }

    // 고객 포인트 차감
    const decreasePoint = await prisma.user.update({
      data: { points: +user.points - totalPrice },
      where: { id: +customerId },
    });

    // 사장 포인트 조회
    const ownerPoint = await prisma.user.findUnique({
      where: { id: +ownerId.id },
      select: { points: true }
    });

    // 사장 포인트 추가
    const increasePoint = await prisma.user.update({
      data: { points: +ownerPoint.points + totalPrice },
      where: { id: +ownerId.id },
    });
  };


  // 결제 취소 포인트 업데이트
  paymentCancled = async (menuId, customerId, totalPrice) => {
    // 매장 id 조회
    const storeId = await prisma.menu.findUnique({
      where: { id: +menuId },
      include: { store: { select: { id: true } } }
    });

    // 사장 id 조회
    const ownerId = await prisma.store.findUnique({
      where: { id: +storeId.store.id },
      include: { owner: { select: { id: true } } }
    });

    // 사장 포인트 조회
    const owner = await prisma.user.findUnique({
      where: { id: +ownerId.id },
      select: { points: true }
    });

    if (owner.points < totalPrice) {
      throw new Error("잔액이 부족합니다.");
    }

    // 사장 포인트 차감
    const decreasePoint = await prisma.user.update({
      data: { points: +user.points - totalPrice },
      where: { id: +ownerId.id },
    });

    // 고객 포인트 조회
    const ownerPoint = await prisma.user.findUnique({
      where: { id: +customerId },
      select: { points: true }
    });

    // 고객 포인트 추가
    const increasePoint = await prisma.user.update({
      data: { points: +ownerPoint.points + totalPrice },
      where: { id: +customerId },
    });
  };

  // 사장 : 주문 관리 update / status String : 배달중, 배달완료, 준비중(?)
  updateOrder = async (orderId, status) => {
    const order = await prisma.order.update({
      data: { status },
      where: { id: +orderId.id },
    });

    return order;
  };

  // 사장 : 주문 취소 delete (개인적 사유로 사장의 일방적 취소)
  cancelOrder = async (orderId) => {
    await prisma.Order.delete({
      where: { id: +orderId.id },
    });
  };

  // 사장 : 주문 전체 조회
  // 그 머시기냐 배달전 눌렀을 때 배달중, 배달 완료로 변경하는 기능 추가 필요
  getStoreOrders = async (storeId) => {
    const orders = await prisma.order.findMany({
      where: {
        menu: {
          storeId: +storeId
        }
      },
      include: {
        menu: {
          select: {
            name: true,
            imageUrl: true,
            store: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        customer: {
          select: {
            name: true,
            address: true
          }
        }
      }
    });
    return orders;
  };

  // 고객 : 주문 전체 조회
  getUserOrders = async (customerId) => {
    const orders = await prisma.Order.findMany({
      where: { customerId },
      include: {
        menu: {
          select: {
            name: true,
            imageUrl: true,
            store: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        review: {
          select: {
            id: true,
            rating: true,
            comment: true
          }
        }
      }
    });
    return orders;
  };

  // 공통? 사장? : 주문 상세 조회
  getOrder = async (orderId) => {
    const order = await prisma.order.findFirst({
      select: {
        quantity: true,
        totalPrice: true,
        status: true,
      },
      where: { id: +orderId },
    });
    return order;
  };
}
export default OrderRepository;
