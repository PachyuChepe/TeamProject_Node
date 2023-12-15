import ApiError from '../middleware/apiError.middleware.js';
import ReviewRepository from '../repository/reviews.repository.js';

class ReviewService {
  reviewRepository = new ReviewRepository();

  // 리뷰 생성
  createReview = async (customerId, storeId, rating, comment) => {
    const review = await this.reviewRepository.createReview(
      customerId,
      storeId,
      rating,
      comment,
    );
    return review;
  };

  // 특정 가게의 리뷰 조회
  getStoreReviews = async (storeId) => {
    const reviews = await this.reviewRepository.getStoreReviews(storeId);
    return reviews;
  };

  // 특정 고객의 리뷰 조회
  getUserReviews = async (customerId) => {
    const reviews = await this.reviewRepository.getUserReviews(customerId);
    return reviews;
  };

  // 특정 리뷰 조회
  getReviewById = async (reviewId) => {
    const review = await this.reviewRepository.getReviewById(reviewId);
    if (!review) {
      throw ApiError.NotFound('리뷰를 찾을 수 없습니다.');
    }
    return review;
  };

  // 리뷰 수정
  updateReview = async (reviewId, rating, comment, userId) => {
    // 수정
    const updatedReview = await this.reviewRepository.updateReview(
      reviewId,
      rating,
      comment,
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
