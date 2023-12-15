// StoreController.js
import StoreService from '../service/store.service.js';

class StoreController {
  constructor() {
    this.storeService = new StoreService();
  }

  // 업장 등록 
  createStore = async (req, res, next) => {
    try {
      const {
        categoryId,
        name,
        storedescription,
        foodtype,
        storeaddresses,
        businesslicense,
      } = req.body;
      const ownerId = res.locals.user.id;

      const store = await this.storeService.createStore(
        categoryId,
        ownerId,
        name,
        storedescription,
        foodtype,
        storeaddresses,
        businesslicense,
      );
      res
        .status(201)
        .json({ success: true, message: '업장 등록 완료', data: store });
    } catch (error) {
      next(error);
    }
  };

  // 업장 정보 수정
  updateStore = async (req, res, next) => {
    try {
      const { id } = req.params; // params 값 조회
      const { categoryId, name, storedescription, foodtype, storeaddresses } = req.body; // body 값 조회
      const store = await this.storeService.updateStore(
        id,
        categoryId,
        name,
        storedescription,
        foodtype,
        storeaddresses,
      );
      res
        .status(200)
        .json({
          success: true,
          message: '업장 정보 업데이트 완료',
          data: store,
        });
    } catch (error) {
      next(error);
    }
  };

  // 업장 삭제
  deleteStore = async (req, res, next) => {
    try {
      const { id } = req.params; // params 값 조회
      const ownerId = res.locals.user.id;

      await this.storeService.deleteStore(ownerId, id);

      res.status(200).json({ success: true, message: '업장 삭제 완료' });
    } catch (error) {
      next(error);
    }
  };

  // 업장 정보 조회
  getStores = async (req, res, next) => {
    try {
      const stores = await this.storeService.getStores();

      res
        .status(200)
        .json({ success: true, message: '업장 목록 조회 완료', data: stores });
    } catch (error) {
      next(error);
    }
  };

  // 업장 상세 조회
  getStore = async (req, res, next) => {
    try {
      const { id } = req.params;

      const store = await this.storeService.getStore(id, res);

      res
        .status(200)
        .json({ success: true, message: '업장 정보 조회 완료', data: store });
    } catch (error) {
      next(error);
    }
  };
}

export default StoreController;
