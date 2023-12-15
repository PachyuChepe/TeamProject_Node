import ApiError from '../middleware/apiError.middleware.js';
import ReviewRepository from '../repository/review.repository.js';

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
    // 리뷰 조회
    const existingReview = await this.getReviewById(reviewId);

    // 리뷰가 없으면 NotFound 에러 반환
    if (!existingReview) {
      throw ApiError.NotFound('수정할 리뷰를 찾을 수 없습니다.');
    }

    // 리뷰 작성자와 현재 사용자 ID 비교해서 권한 확인
    if (existingReview.customerId !== userId) {
      throw ApiError.Forbidden('리뷰를 수정할 권한이 없습니다.');
    }

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
    // 리뷰 조회
    const existingReview = await this.getReviewById(reviewId);

    // 리뷰가 없으면 NotFound 에러 반환
    if (!existingReview) {
      throw ApiError.NotFound('삭제할 리뷰를 찾을 수 없습니다.');
    }

    // 리뷰 작성자와 현재 사용자 ID 비교해서 권한 확인
    if (existingReview.customerId !== userId) {
      throw ApiError.Forbidden('리뷰를 삭제할 권한이 없습니다.');
    }

    // 삭제
    const deletedReview = await this.reviewRepository.deleteReview(reviewId);
    return deletedReview;
  };
}

export default ReviewService;
