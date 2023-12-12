
// import { validationResult } from 'express-validator'; // express 유효성 검사 패키지
// import { MenusValidError } from '../error-handlers/custom.errors.js'; // custom 에러
import MenusService from '../service/menus.service.js'; // 서비스

class MenusController {
  menusService = new MenusService();

  // // 메뉴 정보 저장
  createMenu = async (req, res, next) => {
    // validationResult : express-validator 유효성 검사 실행
    // const errors = validationResult(req);
    try {
      const { name, price, imageUrl } = req.body; // body 값 조회
      const email = "ay0530@test.com";
      // const { email } = res.locals.user; // localstroage 값 조회 

      // ERR 400 : 필수 값들이 입력되지 않은 경우
      // if (!errors.isEmpty()) {
      //   throw new MenusValidError();
      // }

      // 조회 : 메뉴 정보
      const menu = await this.menusService.createMenu(email, name, price, imageUrl);

      // response 반환
      res.status(201).json({ message: "메뉴 등록이 완료되었습니다.", data: menu });
    } catch (error) {
      next(error);
    }
  };

  // //  메뉴 정보 전체 조회
  getMenus = async (req, res, next) => {
    try {
      const { category, order } = req.query; // req 조회
      const orderBy = {}; // 정렬 필드 객체 생성
      orderBy[category] = order === 'desc' ? 'desc' : 'asc';

      // 조회 : 모든 메뉴 정보 
      const menus = await this.menusService.getMenus(orderBy);

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
    // validationResult : express-validator 유효성 검사 실행
    // const errors = validationResult(req);
    try {
      const { id } = req.params; // params 값 조회
      const { name, price, imageUrl } = req.body; // body 값 조회
      const email = "ay0530@test.com";
      // const { email } = res.locals.user; // localstroage 값 조회 

      // ERR 400 : 필수 값들이 입력되지 않은 경우
      // if (!errors.isEmpty()) {
      //   throw new MenusValidError();
      // }

      // 조회 : 메뉴 정보
      const menu = await this.menusService.updateMenu(email, id, name, price, imageUrl);

      // response 반환
      res.status(200).json({ message: "메뉴 수정이 완료되었습니다.", data: menu });
    } catch (error) {
      next(error);
    }
  };

  // //  메뉴 정보 삭제
  deleteMenu = async (req, res, next) => {
    try {
      const { id } = req.params; // params 값 조회
      const email = "ay0530@test.com";
      // const { email } = res.locals.user; // localstroage 값 조회 

      // 삭제 : 메뉴 정보
      await this.menusService.deleteMenu(email, id);

      // response 반환
      res.status(200).json({ message: "메뉴를 삭제하였습니다." });
    } catch (error) {
      next(error);
    }
  };
}

export default MenusController;  // router 내보내기