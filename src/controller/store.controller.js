import StoreService from '../service/store.service.js';
// import UserService from '../service/user.service.js';
// import redisClient from '../redis/redisClient.js';

class StoreController {
  constructor() {
    this.storeService = new StoreService();
    // this.userService = new UserService();
  }

  // 업장 등록 (user 정보가 등록 되어 있는 상태에서 업장 등록)
  uploadStore = async (req, res, next) => {
    try {
      // const { id: userId } = res.locals.user;
      const { name, storedescription, foodtype, storestatus, businesslicense } =
        req.body;
      const ownerId = res.locals.user.id;

      const store = await this.storeService.uploadStore(
        ownerId,
        name,
        storedescription,
        foodtype,
        storestatus,
        businesslicense,
      );

      res.status(201).json({ success: true, data: store });
    } catch (error) {
      next(error);
    }
  };

  // 업장 정보 수정 (user 정보가 등록 되어 있는 상태에서 업장 수정)
  updateStore = async (req, res, next) => {
    try {
      // const { id: userId } = res.locals.user;
      const { id } = req.params; // params 값 조회
      const { name, storedescription, foodtype, storestatus, businesslicense } =
        req.body; // body 값 조회
      const ownerId = res.locals.user.id;

      const store = await this.storeService.updateStore(
        ownerId,
        id,
        name,
        storedescription,
        foodtype,
        storestatus,
        businesslicense,
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
      // const { id: userId } = res.locals.user;
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
}

export default StoreController;
