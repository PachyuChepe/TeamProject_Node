import ShopService from '../service/shop.service.js';
import redisClient from '../redis/redisClient.js';

// 사용자 관련 HTTP 요청을 처리하는 컨트롤러
class ShopController {
  constructor() {
    this.shopService = new ShopService();
  }

  // 업장 등록 (user 정보가 등록 되어 있는 상태에서 업장 등록)
  // router.post('/uploadshop', isLoggedIn, shopController.uploadShop);
  uploadShop = async (req, res, next) => {
    try {
      const shopData = await this.shopService.uploadShop(req.body);
      const { shopname, shopdescription, shopstatus, ...data } = shopData;

      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };
  // 업장 정보 수정 (user 정보가 등록 되어 있는 상태에서 업장 수정)
  // router.put('/updateshop', isLoggedIn, shopController.updateShop);

  updateShop = async (req, res, next) => {
    try {
      const { shopname, shopdescription, shopstatus } = req.body;

      await this.shopService.updateShop(
        res.locals.user.id,
        shopname,
        shopdescription,
        shopstatus,
      );
      res
        .status(201)
        .json({ success: true, message: '성공적으로 수정 되었습니다' });
    } catch (error) {
      next(error);
    }

    // 업장 삭제 (user 정보가 등록 되어 있는 상태에서 업장 삭제)
    // router.delete('/deleteshop', isLoggedIn, shopController.deleteShop);
  };
}

export default ShopController;
