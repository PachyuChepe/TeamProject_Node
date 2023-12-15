// StoreService.js
import StoreRepository from '../repository/store.repository.js';
import ApiError from '../middleware/apiError.middleware.js';

class StoreService {
  constructor() {
    this.storeRepository = new StoreRepository();
  }

  async createStore(
    ownerId,
    name,
    storedescription,
    foodtype,
    storeaddresses,
    businesslicense,
  ) {
    const store = await this.storeRepository.createStore(
      ownerId,
      name,
      storedescription,
      foodtype,
      storeaddresses,
      businesslicense,
    );
    return store;
  }

  async updateStore(
    id,
    ownerId,
    name,
    storedescription,
    foodtype,
    storeaddresses,
  ) {
    const store = await this.storeRepository.getStoreById(id);
    if (!store || store.ownerId !== ownerId) {
      throw new ApiError(404, '업장을 찾을 수 없거나 권한이 없습니다.');
    }
    return await this.storeRepository.updateStore(
      id,
      name,
      storedescription,
      foodtype,
      storeaddresses,
    );
  }

  async deleteStore(ownerId, id) {
    const store = await this.storeRepository.getStoreById(id);
    if (!store || store.ownerId !== ownerId) {
      throw new ApiError(404, '업장을 찾을 수 없거나 권한이 없습니다.');
    }
    await this.storeRepository.deleteStore(id);
  }

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
