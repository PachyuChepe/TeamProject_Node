import OrderRepository from '../repository/order.repository.js';
import ApiError from '../middleware/apiError.middleware.js';

class OrderService {
  orderRepository = new OrderRepository();

  // 주문 관리 , 조회
  // 업장 1 : 메뉴 N / 메뉴 1 : 주문 N

  // 고객 : 주문 생성 및 저장 post / menuid Int , quantity Int / 고객 1 : 주문 N
  createOrder = async (
    menuId,
    // orderId,
    customerId,
    quantity,
    totalPrice,
    status,
  ) => {
    const order = await this.orderRepository.createOrder(
      menuId,
      // orderId,
      customerId,
      quantity,
      totalPrice,
      status,
    );
    return order;
  };

  // 사장 : 주문 관리 update / status String : 배달중, 배달완료, 준비중(?)
  updateOrder = async (orderid, status) => {
    const order = await this.orderRepository.updateOrder(orderid, status);
    return order;
  };

  // 사장 : 주문 취소 delete (개인적 사유로 사장의 일방적 취소)
  cancelOrder = async (orderid) => {
    await this.orderRepository.cancelOrder(orderid);
  };

  // 공통? 고객? : 주문 전체 조회
  getOrders = async () => {
    const orders = await this.orderRepository.getOrders();
    orders.sort((a, b) => b.createdAt - a.createdAt);

    return orders.map((order) => {
      return {
        id: order.id,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        status: order.status,
      };
    });
  };

  // 공통? 사장? : 주문 상세 조회 customerId? --menuId
  getOrder = async (orderid) => {
    const existsOrder = await this.orderRepository.getOrder(orderid);
    if (existsOrder.length === 0) {
      throw ApiError.Noutfound('주문이 존재하지 않습니다.');
    }

    const order = await this.orderRepository.getOrder(orderid);
    return order;
  };
}
export default OrderService;
