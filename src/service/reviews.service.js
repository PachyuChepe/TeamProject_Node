import ApiError from '../middleware/apiError.middleware.js';
import ReviewRepository from '../repository/reviews.repository.js';

class ReviewService {
  reviewRepository = new ReviewRepository();

  // 리뷰 생성
  createReview = async (orderId, rating, comment, imageUrl) => {
    const review = await this.reviewRepository.createReview(
      orderId,
      rating,
      comment,
      imageUrl
    );
    return review;
  };

  // 가게 이름 조회
  getStoreName = async (storeId) => {
    const storeName = await this.reviewRepository.getStoreName(storeId);
    return storeName;
  };

  // 특정 가게의 리뷰 조회
  getStoreReviews = async (storeId) => {
    const menuIds = await this.reviewRepository.getStoreMenuIds(storeId);
    const orderIds = await this.reviewRepository.getStoreOrderIds(menuIds);
    const reviews = await this.reviewRepository.getStoreReviews(orderIds);
    return reviews;
  };

  // 특정 고객의 리뷰 조회
  getUserReviews = async (customerId) => {
    const orderIds = await this.reviewRepository.getUserOrderIds(customerId);
    const reviews = await this.reviewRepository.getUserReviews(orderIds);
    return reviews;
  };

  // 특정 리뷰 조회
  getReviewById = async (reviewId) => {
    const review = await this.reviewRepository.getReviewById(reviewId);
    return review;
  };

  // 리뷰 수정
  updateReview = async (reviewId, rating, comment, imageUrl) => {
    // 수정
    const updatedReview = await this.reviewRepository.updateReview(
      reviewId,
      rating,
      comment,
      imageUrl
    );

    return updatedReview;
  };

  // 리뷰 삭제
  deleteReview = async (reviewId, userId) => {
    // 삭제
    const deletedReview = await this.reviewRepository.deleteReview(reviewId);
    return deletedReview;
  };
}

export default ReviewService;
