// 주문 관리 , 조회
// 업장 1 : 메뉴 N / 메뉴 1 : 주문 N

// 고객 : 주문 생성 및 저장 post / menuid Int , quantity Int / 고객 1 : 주문 N

// 사장 : 주문 관리 update / status String : 배달중, 배달완료, 준비중(?)

// 사장 : 주문 취소 delete (개인적 사유로 사장의 일방적 취소)

// 공통? 고객? : 주문 전체 조회 (우선)

// 공통? 사장? : 주문 상세 조회

// 업장 1 : 메뉴 N / 메뉴 1 : 주문 N

// 공통 : 주문 전체 조회와, 주문 상세 조회
// {
//     "success": "Boolean",
//     "orders": [
//     {
//     "id": "Integer",
//     "customerId": "Integer",
//     "menuId": "Integer",
//     "quantity": "Integer",
//     "total_price": "String",
//     "status": "String",
//     "created_at": "Timestamp"
//     },
//     ...
//     ]
//     }

import express from 'express';
const router = express.Router();
import { isLoggedIn } from '../middleware/verifyToken.middleware.js';
import OrderController from '../controller/order.controller.js';

const orderController = new OrderController();

// 주문 관리 , 조회
// 업장 1 : 메뉴 N / 메뉴 1 : 주문 N

// 고객 : 주문 생성 및 저장 post / menuid Int , quantity Int / 고객 1 : 주문 N
router.post('/orders', isLoggedIn, orderController.createOrder);

// 사장 : 주문 관리 update / status String : 배달중, 배달완료, 준비중(?)
router.patch('/orders/:orderid', isLoggedIn, orderController.updateOrder);

// 사장 : 주문 취소 delete (개인적 사유로 사장의 일방적 취소)
router.delete('/orders/:orderid', isLoggedIn, orderController.cancelOrder);

// 공통? 고객? : 주문 전체 조회
router.get('/orders/user/:userid', isLoggedIn, orderController.getOrders);

// 공통? 사장? : 주문 상세 조회
router.get('/orders/:orderid', isLoggedIn, orderController.getOrder);

// 주문 전체 조회
// {
//     "success": "Boolean",
//     "orders": [
//     {
//     "id": "Integer",
//     "customerId": "Integer",
//     "menuId": "Integer",
//     "quantity": "Integer",
//     "total_price": "String",
//     "status": "String",
//     "created_at": "Timestamp"
//     },
//     ...
//     ]
//     }

export default router;
