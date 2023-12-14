import express from 'express';
const router = express.Router();
import { isLoggedIn } from '../middleware/verifyToken.middleware.js';
import {
  validateUploadstore,
  validateUpdatestore,
} from '../middleware/storeValidation.middleware.js';
import StoreController from '../controller/store.controller.js';

const storeController = new StoreController();

// 업장 등록
router.post(
  '/uploadstore',
  validateUploadstore,
  isLoggedIn,
  storeController.uploadStore,
);
// 업장 정보 수정
router.put(
  '/updatestore/:id',
  validateUpdatestore,
  isLoggedIn,
  storeController.updateStore,
);
// 업장 삭제
router.delete('/deletestore/:id',
  isLoggedIn,
  storeController.deleteStore
);

// 업장 전체 조회
router.get('/store', storeController.getStores);

// 업장 상세 조회
router.get('/store/:id', storeController.getStore);

export default router;
