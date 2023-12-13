import ShopService from '../service/shop.service.js';
import UserService from '../service/user.service.js';
// import redisClient from '../redis/redisClient.js';

// 사용자 관련 HTTP 요청을 처리하는 컨트롤러
class ShopController {
  constructor() {
    this.shopService = new ShopService();
    this.userService = new UserService();
  }

  // 업장 등록 (user 정보가 등록 되어 있는 상태에서 업장 등록)
  uploadShop = async (req, res, next) => {
    try {
      const { id: userId } = res.locals.user;
      const shopData = await this.shopService.uploadShop(req.body, userId);
      const {
        shopId,
        shopname,
        shopdescription,
        foodtype,
        shopstatus,
        businesslicense,
        ...data
      } = shopData;

      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };
  // 업장 정보 수정 (user 정보가 등록 되어 있는 상태에서 업장 수정)
  updateShop = async (req, res, next) => {
    try {
      const { id: userId } = res.locals.user;
      const { shopId } = req.params;
      const {
        shopname,
        shopdescription,
        foodtype,
        shopstatus,
        businesslicense,
      } = req.body;

      await this.shopService.updateShop(
        res.locals.shop.id,
        userId,
        shopId,
        shopname,
        shopdescription,
        foodtype,
        shopstatus,
        businesslicense,
      );
      res
        .status(200)
        .json({ success: true, message: '성공적으로 수정 되었습니다' });
    } catch (error) {
      next(error);
    }
  };
  // 업장 삭제 (user 정보가 등록 되어 있는 상태에서 업장만 삭제)
  deleteShop = async (req, res, next) => {
    try {
      const { id: userId } = res.locals.user;
      const { shopId } = req.params;

      const deleteShop = await this.shopService.deleteShop(shopId, userId, res);

      res.status(200).json({
        success: true,
        message: '업장 삭제가 완료되었습니다.',
        data: deleteShop,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ShopController;
