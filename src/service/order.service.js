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
  updateOrder = async (orderId, status) => {
    const order = await this.orderRepository.updateOrder(orderId, status);
    return order;
  };

  // 사장 : 주문 취소 delete (개인적 사유로 사장의 일방적 취소)
  cancelOrder = async (orderId) => {
    await this.orderRepository.cancelOrder(orderId);
  };

  // 사장 : 주문 전체 조회
  getStoreOrders = async (storeId) => {
    const orders = await this.orderRepository.getStoreOrders(storeId);
    orders.sort((a, b) => b.createdAt - a.createdAt);
    return orders;
  };

  // 고객 : 주문 전체 조회
  getUserOrders = async (customerId) => {
    const orders = await this.orderRepository.getUserOrders(customerId);
    orders.sort((a, b) => b.createdAt - a.createdAt);
    return orders;
  };

  // 공통? 사장? : 주문 상세 조회 customerId? --menuId
  getOrder = async (orderId) => {
    const existsOrder = await this.orderRepository.getOrder(orderId);
    if (existsOrder.length === 0) {
      throw ApiError.Noutfound('주문이 존재하지 않습니다.');
    }

    const order = await this.orderRepository.getOrder(orderId);
    return order;
  };
}
export default OrderService;
