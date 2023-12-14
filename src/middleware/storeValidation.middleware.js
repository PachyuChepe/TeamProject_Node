import ApiError from './apiError.middleware.js';

// 업장 신규 등록 시 요구 조건들
export const validatecreatestore = (req, res, next) => {
  const { name, storedescription, foodtype, storeaddresses, businesslicense } =
    req.body;

  // if (!user) {
  //   throw ApiError.NotFound('로그인 후 이용 가능합니다');
  // }
  if (!name) {
    throw ApiError.BadRequest('가게 이름을 입력해주세요.');
  }
  if (!storedescription) {
    throw ApiError.BadRequest('가게 설명을 입력해주세요.');
  }
  if (!foodtype) {
    throw ApiError.BadRequest('어떠한 종류의 음식을 판매할건지 선택해주세요.');
  }
  if (!storeaddresses) {
    throw ApiError.BadRequest('가게 위치를 입력해주세요.');
  }
  if (!businesslicense) {
    throw ApiError.BadRequest('사업자 등록증 정보를 입력해주세요.');
  }

  next();
};

// 등록 되어있는 업장 정보 수정 시 요구 조건들
export const validateUpdatestore = (req, res, next) => {
  const { name, storedescription, foodtype, storeaddresses } = req.body;

  if (!name) {
    throw ApiError.BadRequest('가게 이름을 입력해주세요.');
  }
  if (!storedescription) {
    throw ApiError.BadRequest('가게 설명을 입력해주세요.');
  }
  if (!foodtype) {
    throw ApiError.BadRequest('어떠한 종류의 음식을 판매할건지 선택해주세요.');
  }
  if (!storeaddresses) {
    throw ApiError.BadRequest('가게 위치를 입력해주세요.');
  }

  next();
};
