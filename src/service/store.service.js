// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import env from '../config/env.config.js';
import StoreRepository from '../repository/store.repository.js';
// import UserRepository from '../repository/user.repository.js';
import ApiError from '../middleware/apiError.middleware.js';
// import redisClient from '../redis/redisClient.js';

// 사용자 관련 비즈니스 로직을 수행하는 서비스 클래스
class StoreService {
  storeRepository = new StoreRepository();
  // this.userRepository = new UserRepository();

  uploadStore = async (
    ownerId,
    name,
    storedescription,
    foodtype,
    storestatus,
    businesslicense,
  ) => {
    // const user = await this.userRepository.findUserById(id);

    const store = await this.storeRepository.uploadStore(
      ownerId,
      name,
      storedescription,
      foodtype,
      storestatus,
      businesslicense,
    );

    return store;
  };

  updateStore = async (
    storeId,
    name,
    storedescription,
    foodtype,
    storestatus,
  ) => {
    const store = await this.storeRepository.updateStore(
      storeId,
      name,
      storedescription,
      foodtype,
      storestatus,
    );

    return store;
    // const user = await this.userRepository.findUserById(id);
    // if (!user) {
    //   if (!user) {
    //     throw ApiError.NotFound('로그인 후 이용 가능합니다');
    //   }
    // if (!storeId) {
    //   throw ApiError.NotFound('수정할 가게가 없습니다');
    // }
  };

  deleteStore = async (ownerId, id) => {
    const storeId = await this.storeRepository.uploadStore(ownerId);

    if (storeId !== existsStore[0].storeId) {
      throw ApiError.Forbidden('삭제할 권한이 없습니다.');
    }

    await this.storeRepository.deleteStore(id);
  };
}
export default StoreService;
