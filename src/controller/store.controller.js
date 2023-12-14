import StoreService from '../service/store.service.js';
// import UserService from '../service/user.service.js';
// import redisClient from '../redis/redisClient.js';

class StoreController {
  constructor() {
    this.storeService = new StoreService();
    // this.userService = new UserService();
  }

  // 업장 등록 (user 정보가 등록 되어 있는 상태에서 업장 등록)
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

  // 업장 정보 수정 (user 정보가 등록 되어 있는 상태에서 업장 수정)
  updateStore = async (req, res, next) => {
    try {
      const { id } = req.params; // params 값 조회
      const { categoryId, name, storedescription, foodtype, storeaddresses } = req.body; // body 값 조회
      const ownerId = res.locals.user.id;

      const store = await this.storeService.updateStore(
        id,
        ownerId,
        categoryId,
        name,
        storedescription,
        foodtype,
        storeaddresses,
      );

      res.status(200).json({
        success: true,
        message: '성공적으로 수정 되었습니다',
        data: store,
      });
    } catch (error) {
      next(error);
    }
  };
  // 업장 삭제 (user 정보가 등록 되어 있는 상태에서 업장만 삭제)
  deleteStore = async (req, res, next) => {
    try {
      const { id } = req.params; // params 값 조회
      const ownerId = res.locals.user.id;

      await this.storeService.deleteStore(ownerId, id);

      res.status(200).json({
        success: true,
        message: '업장 삭제가 완료되었습니다.',
      });
    } catch (error) {
      next(error);
    }
  };

  // 업장 정보 조회
  getStores = async (req, res, next) => {
    try {
      const stores = await this.storeService.getStores();

      res.status(200).json({
        success: true,
        message: '업장 목록 조회에 성공하였습니다.',
        data: stores,
      });
    } catch (error) {
      next(error);
    }
  };

  // 업장 상세 조회
  getStore = async (req, res, next) => {
    try {
      const { id } = req.params;

      const store = await this.storeService.getStore(id, res);

      return res.status(200).json({
        success: true,
        message: '업장 조회에 성공했습니다.',
        data: store,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default StoreController;
