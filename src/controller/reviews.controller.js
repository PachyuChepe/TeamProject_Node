import ReviewService from '../service/reviews.service.js';

class ReviewController {
  constructor() {
    this.reviewService = new ReviewService();
  }

  // 리뷰 생성
  createReview = async (req, res, next) => {
    try {
      const { orderId, rating, comment } = req.body;
      const imageUrl = req.file ? req.file.location : null; // 이미지 URL 추출

      const review = await this.reviewService.createReview(
        orderId,
        rating,
        comment,
        imageUrl,
      );

      res.status(201).json({
        success: true,
        message: '리뷰가 성공적으로 생성되었습니다.',
        data: review,
      });
    } catch (error) {
      next(error);
    }
  };

  getStoreName = async (req, res, next) => {
    try {
      const { storeId } = req.params;
      const storeName = await this.reviewService.getStoreName(storeId);
      res.status(200).json({
        success: true,
        message: '매장명을 성공적으로 가져왔습니다.',
        data: storeName,
      });
    } catch (error) {
      next(error);
    }
  };

  // 특정 가게의 리뷰 조회
  getStoreReviews = async (req, res, next) => {
    try {
      const { storeId, order } = req.params;
      const sortOrder = order === 'desc' ? -1 : 1;

      let reviews = await this.reviewService.getStoreReviews(storeId);

      // 작성 일자 기준 정렬
      reviews = reviews.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder * (dateA - dateB);
      });

      res.status(200).json({
        success: true,
        message: '가게의 리뷰를 성공적으로 가져왔습니다.',
        data: reviews,
      });
    } catch (error) {
      next(error);
    }
  };

  // 특정 고객의 리뷰 조회
  getUserReviews = async (req, res, next) => {
    try {
      const { order } = req.params;
      const customerId = res.locals.user.id;
      const sortOrder = order === 'desc' ? -1 : 1;

      let reviews = await this.reviewService.getUserReviews(customerId);

      // 작성 일자 기준 정렬
      reviews = reviews.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder * (dateA - dateB);
      });

      res.status(200).json({
        success: true,
        message: '사용자의 리뷰를 성공적으로 가져왔습니다.',
        data: reviews,
      });
    } catch (error) {
      next(error);
    }
  };

  // 특정 리뷰 조회
  getReviewById = async (req, res, next) => {
    try {
      const { reviewId } = req.params;

      const review = await this.reviewService.getReviewById(reviewId);

      res.status(200).json({
        success: true,
        message: '리뷰를 성공적으로 가져왔습니다.',
        data: review,
      });
    } catch (error) {
      next(error);
    }
  };

  // 리뷰 수정
  updateReview = async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const { rating, comment } = req.body;
      const imageUrl = req.file ? req.file.location : null; // 이미지 URL 추출
      // 수정 사항이 없는 경우
      if (!rating && !comment) {
        return res.status(400).json({
          success: false,
          message: '수정한 내용이 없습니다.',
        });
      }

      const updatedReview = await this.reviewService.updateReview(
        reviewId,
        rating,
        comment,
        imageUrl,
      );

      res.status(200).json({
        success: true,
        message: '리뷰가 성공적으로 수정되었습니다.',
        data: updatedReview,
      });
    } catch (error) {
      next(error);
    }
  };

  // 리뷰 삭제
  deleteReview = async (req, res, next) => {
    try {
      const { reviewId } = req.params;

      await this.reviewService.deleteReview(reviewId);

      res
        .status(200)
        .json({ success: true, message: '리뷰가 성공적으로 삭제되었습니다.' });
    } catch (error) {
      next(error);
    }
  };
}

export default ReviewController;
