import express from 'express';
import { isLoggedIn } from '../middleware/verifyToken.middleware.js';
import UserAllGetController from '../controller/userAllGet.controller.js';

const router = express.Router();

const userAllGetController = new UserAllGetController();

// 사장
router.get('/user-info', isLoggedIn, userAllGetController.getUserInfo);

// 특정 '고객' 유저의 리뷰와 주문 상세 조회 라우터
router.get(
  '/customer-details',
  isLoggedIn,
  userAllGetController.getCustomerDetails,
);

export default router;
