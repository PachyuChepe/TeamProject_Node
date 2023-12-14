
import MenusService from '../service/menus.service.js'; // 서비스

class MenusController {
  menusService = new MenusService();

  // // 메뉴 정보 저장
  createMenu = async (req, res, next) => {
    try {
      const { ownerId, name, price, imageUrl } = req.body; // body 값 조회
      // const ownerId = res.locals.user.id;

      // 조회 : 메뉴 정보
      const menu = await this.menusService.createMenu(ownerId, name, price, imageUrl);

      // response 반환
      res.status(201).json({ message: "메뉴 등록이 완료되었습니다.", data: menu });
    } catch (error) {
      next(error);
    }
  };

  // //  메뉴 정보 전체 조회
  getMenus = async (req, res, next) => {
    try {
      const { storeId, category, order } = req.query; // req 조회
      const orderBy = {}; // 정렬 필드 객체 생성
      orderBy[category] = order === 'desc' ? 'desc' : 'asc';

      // 조회 : 모든 메뉴 정보 
      const menus = await this.menusService.getMenus(storeId, orderBy);

      // response 반환
      return res.status(200).json({ message: "전체 메뉴를 조회하였습니다.", data: menus });
    } catch (error) {
      next(error);
    }
  };

  // //  메뉴 상세 조회
  getMenu = async (req, res, next) => {
    try {
      const { id } = req.params; // params 값 조회

      // 조회 : 모든 메뉴 정보 
      const menu = await this.menusService.getMenu(id);

      // response 반환
      res.status(200).json({ message: "메뉴 상세 정보를 조회하였습니다.", data: menu });
    } catch (error) {
      next(error);
    }
  };

  // //  메뉴 정보 수정
  updateMenu = async (req, res, next) => {
    try {
      const { id } = req.params; // params 값 조회
      const { ownerId, name, price, imageUrl } = req.body; // body 값 조회
      // const ownerId = res.locals.user.id;

      // 조회 : 메뉴 정보
      const menu = await this.menusService.updateMenu(ownerId, id, name, price, imageUrl);

      // response 반환
      res.status(200).json({ message: "메뉴 수정이 완료되었습니다.", data: menu });
    } catch (error) {
      next(error);
    }
  };

  // //  메뉴 정보 삭제
  deleteMenu = async (req, res, next) => {
    try {
      const { id, ownerId } = req.params; // params 값 조회
      // const ownerId = res.locals.user.id;

      // 삭제 : 메뉴 정보
      await this.menusService.deleteMenu(ownerId, id);

      // response 반환
      res.status(200).json({ message: "메뉴를 삭제하였습니다." });
    } catch (error) {
      next(error);
    }
  };

  // //  업종 전체 조회
  getFoodCategory = async (req, res, next) => {
    try {
      console.log("컨트롤러 통과");
      // 조회 : 모든 메뉴 정보 
      const foodCategory = await this.menusService.getFoodCategory();

      // response 반환
      return res.status(200).json({ message: "전체 메뉴를 조회하였습니다.", foodCategory });
    } catch (error) {
      next(error);
    }
  };
}

export default MenusController;  // router 내보내기