import express from 'express';
import { isLoggedIn } from '../middleware/verifyToken.middleware.js';
import { validateReview } from '../middleware/reviewValidation.middleware.js';
import ReviewController from '../controller/reviews.controller.js';
import uploadImage from '../middleware/multer.middleware.js';

const reviewController = new ReviewController();
const reviewRouter = express.Router();

// 리뷰 생성
reviewRouter.post(
  '/reviews',
  isLoggedIn,
  uploadImage.single('imageUrl'),
  validateReview,
  reviewController.createReview,
);

// 가게 이름 조회
reviewRouter.get('/storeName/:storeId', reviewController.getStoreName);

// 특정 가게 리뷰 조회
reviewRouter.get('/reviews/store/:storeId', reviewController.getStoreReviews);

// 특정 고객 리뷰 조회
reviewRouter.get('/reviews/user', isLoggedIn, reviewController.getUserReviews);

// 특정 리뷰 조회
reviewRouter.get('/reviews/:reviewId', reviewController.getReviewById);

// 리뷰 수정
reviewRouter.put(
  '/reviews/:reviewId',
  isLoggedIn,
  uploadImage.single('imageUrl'),
  validateReview,
  reviewController.updateReview,
);

// 리뷰 삭제
reviewRouter.delete(
  '/reviews/:reviewId',
  isLoggedIn,
  reviewController.deleteReview,
);

export default reviewRouter;
