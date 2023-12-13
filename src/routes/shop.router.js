import express from 'express';
const router = express.Router();
import { isLoggedIn } from '../middleware/verifyToken.middleware.js';
import ShopController from '../controller/shop.controller.js';

const shopController = new ShopController();

// 업장 등록
router.post('/uploadshop', isLoggedIn, shopController.uploadShop);
// 업장 정보 수정
router.put('/updateshop', isLoggedIn, shopController.updateShop);
// 업장 삭제
router.delete('/deleteshop', isLoggedIn, shopController.deleteShop);

// 업장 전체 조회 ?
// 업장 정보 조회 ?

export default router;
