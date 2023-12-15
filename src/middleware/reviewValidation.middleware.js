import ApiError from './apiError.middleware.js';

// 리뷰 작성 요청의 유효성을 검증하는 미들웨어
export const validateReview = (req, res, next) => {
  const { rating, comment } = req.body; // 요청 본문에서 필요한 값 추출

  // 필수 입력 값이 누락된 경우 오류 응답
  if (!rating || !comment) {
    throw ApiError.BadRequest('평점과 코멘트는 필수 입력 정보입니다.');
  }

  // 평점이 유효한 범위인지 확인
  if (rating < 1 || rating > 5) {
    throw ApiError.BadRequest('평점은 1부터 5까지의 범위에서 설정해야 합니다.');
  }

  next();
};
