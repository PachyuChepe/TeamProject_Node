// StoreService.js
import StoreRepository from '../repository/store.repository.js';
import ApiError from '../middleware/apiError.middleware.js';

class StoreService {
  constructor() {
    this.storeRepository = new StoreRepository();
  }

  createStore = async (
    categoryId,
    ownerId,
    name,
    storedescription,
    foodtype,
    storeaddresses,
    businesslicense,
  ) => {
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
    categoryId,
    name,
    storedescription,
    foodtype,
    storeaddresses,
  ) => {
    const store = await this.storeRepository.updateStore(
      id,
      categoryId,
      name,
      storedescription,
      foodtype,
      storeaddresses,
    );
    return store;
  };

  deleteStore = async (ownerId, id) => {
    await this.storeRepository.deleteStore(id);
  };

  async getStores() {
    const stores = await this.storeRepository.getStores();
    return stores;
  }

  async getStore(id) {
    const store = await this.storeRepository.getStore(id);
    if (!store) {
      throw new ApiError(404, '업장이 존재하지 않습니다.');
    }
    return store;
  }
}

export default StoreService;
