// middleware/userValidation.middleware.js

import ApiError from "./apiError.middleware.js";


// 회원가입 요청의 유효성을 검증하는 미들웨어
export const validateEditMenu = (req, res, next) => {
  const { name, price,
    // imageUrl
  } = req.body; // body 값 조회

  if (!name || !price) {
    throw ApiError.BadRequest("필수 입력 정보가 누락되었습니다.");
  }
  next();
};
