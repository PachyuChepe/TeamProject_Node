// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import env from '../config/env.config.js';
import ShopRepository from '../repository/shop.repository.js';
import UserRepository from '../repository/user.repository.js';
import ApiError from '../middleware/apiError.middleware.js';
// import redisClient from '../redis/redisClient.js';

// 사용자 관련 비즈니스 로직을 수행하는 서비스 클래스
class ShopService {
  constructor() {
    this.userRepository = new UserRepository();
    this.shopRepository = new ShopRepository();
  }

  uploadShop = async (
    id,
    shopname,
    shopdescription,
    foodtype,
    shopstatus,
    businesslicense,
  ) => {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw ApiError.NotFound('로그인 후 이용 가능합니다');
    }
    if (!shopname) {
      throw ApiError.BadRequest('가게 이름을 입력해주세요.');
    }
    if (!shopdescription) {
      throw ApiError.BadRequest('가게 설명을 입력해주세요.');
    }
    if (!foodtype) {
      throw ApiError.BadRequest(
        '어떠한 종류의 음식을 판매할건지 선택해주세요.',
      );
    }
    if (!shopstatus) {
      throw ApiError.BadRequest('가게 위치를 입력해주세요.');
    }
    if (!businesslicense) {
      throw ApiError.BadRequest('사업자 등록증 정보를 입력해주세요.');
    }

    return await this.shopRepository.uploadShop(
      shopname,
      shopdescription,
      foodtype,
      shopstatus,
      businesslicense,
    );
  };

  updateShop = async (id, shopname, shopdescription, foodtype, shopstatus) => {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      if (!user) {
        throw ApiError.NotFound('로그인 후 이용 가능합니다');
      }
      if (!shopname) {
        throw ApiError.BadRequest('가게 이름을 입력해주세요.');
      }
      if (!shopdescription) {
        throw ApiError.BadRequest('가게 설명을 입력해주세요.');
      }
      if (!foodtype) {
        throw ApiError.BadRequest(
          '어떠한 종류의 음식을 판매할건지 선택해주세요.',
        );
      }
      if (!shopstatus) {
        throw ApiError.BadRequest('가게 위치를 입력해주세요.');
      }
    }
    return await this.shopRepository.uploadShop(
      shopname,
      shopdescription,
      foodtype,
      shopstatus,
    );
  };

  deleteShop = async (shopId) => {
    return await this.shopRepository.deleteShop(shopId);
  };
}

export default ShopService;
