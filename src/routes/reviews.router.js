import express from 'express';
import { isLoggedIn } from '../middleware/verifyToken.middleware.js';
import { validateReview } from '../middleware/reviewValidation.middleware.js';
import ReviewController from '../controller/reviews.controller.js';

const reviewController = new ReviewController();
const reviewRouter = express.Router();

// 리뷰 생성
reviewRouter.post(
  '/api/reviews',
  isLoggedIn,
  validateReview,
  reviewController.createReview,
);

// 특정 가게의 리뷰 조회
reviewRouter.get(
  '/api/reviews/store/:storeId',
  reviewController.getStoreReviews,
);

// 특정 리뷰 조회
reviewRouter.get('/api/reviews/:reviewId', reviewController.getReviewById);

// 리뷰 수정
reviewRouter.put(
  '/api/reviews/:reviewId',
  isLoggedIn,
  validateReview,
  reviewController.updateReview,
);

// 리뷰 삭제
reviewRouter.delete(
  '/api/reviews/:reviewId',
  isLoggedIn,
  reviewController.deleteReview,
);

export default reviewRouter;
