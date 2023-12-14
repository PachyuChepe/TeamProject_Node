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

  createStore = async (
    ownerId,
    categoryId,
    name,
    storedescription,
    foodtype,
    storeaddresses,
    businesslicense,
  ) => {
    // const user = await this.userRepository.findUserById(id);

    const store = await this.storeRepository.createStore(
      ownerId,
      categoryId,
      name,
      storedescription,
      foodtype,
      storeaddresses,
      businesslicense,
    );

    return store;
  };

  updateStore = async (
    id,
    ownerId,
    categoryId,
    name,
    storedescription,
    foodtype,
    storeaddresses,
  ) => {
    const store = await this.storeRepository.updateStore(
      id,
      ownerId,
      categoryId,
      name,
      storedescription,
      foodtype,
      storeaddresses,
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
    const storeId = await this.storeRepository.getStoreById(ownerId);

    // if (storeId !== existsStore.storeId) {
    //   throw ApiError.Forbidden('삭제할 권한이 없습니다.');
    // }

    await this.storeRepository.deleteStore(id);
  };

  getStores = async () => {
    const stores = await this.storeRepository.getStores();

    stores.sort((a, b) => b.createdAt - a.createdAt);

    return stores.map((store) => {
      return {
        id: store.id,
        name: store.name,
        description: store.description,
        foodtype: store.foodtype,
        storeaddresses: store.storeaddresses,
        createdAt: store.createdAt,
        updatedAt: store.updatedAt,
      };
    });
  };

  getStore = async (id, name, description, foodtype, storeaddresses, res) => {
    const store = await this.storeRepository.getStore(id);

    if (!store) {
      throw ApiError.NotFound('업장이 존재하지 않습니다.');
    }

    return {
      id: store.id,
      name: store.name,
      description: store.description,
      foodtype: store.foodtype,
      storeaddresses: store.storeaddresses,
      createdAt: store.createdAt,
      updatedAt: store.updatedAt,
    };
  };
}
export default StoreService;
