import ApiError from "../middleware/apiError.middleware.js"; // Api 에러
import MenusRepository from '../repository/menus.repository.js';

class MenusService {
  menusRepository = new MenusRepository();

  // 메뉴 저장
  createMenu = async (ownerId, name, price, imageUrl) => {
    // 조회 : 매장 번호  
    const storeId = await this.menusRepository.getStoreId(ownerId);

    // 저장 : 메뉴 정보
    const menu = await this.menusRepository.createMenu(storeId, name, price, imageUrl);
    return menu;
  };

  // 메뉴 전체 조회
  getMenus = async (storeId, orderBy) => {
    const menus = await this.menusRepository.getMenus(storeId, orderBy);
    return menus;
  };

  // 메뉴 상세 조회
  getMenu = async (id) => {
    // 조회 : 메뉴 정보 
    const existsMenu = await this.menusRepository.getMenu(id);

    // ERR 404 : 메뉴 id가 존재하지 않은 경우
    if (existsMenu.length === 0) {
      throw ApiError.NotFound("메뉴가 존재하지 않습니다.");
    }

    const menu = await this.menusRepository.getMenu(id);
    return menu;
  };

  // 메뉴 수정
  updateMenu = async (ownerId, id, name, price, imageUrl) => {
    // 조회 : 회원 번호 
    const storeId = await this.menusRepository.getStoreId(ownerId);
    // 조회 : 메뉴 정보
    const existsMenu = await this.menusRepository.getMenu(id);

    // ERR 404 : 메뉴 id가 존재하지 않은 경우
    if (existsMenu.length === 0) {
      throw ApiError.NotFound("메뉴가 존재하지 않습니다.");
    }

    // ERR 403 : 메뉴을 등록한 계정이 아닌 경우
    if (storeId !== existsMenu[0].storeId) {
      throw ApiError.Forbidden("권한이 존재하지 않습니다.");
    }

    // 수정 : 메뉴 정보
    const menu = await this.menusRepository.updateMenu(id, name, price, imageUrl);
    return menu;
  };

  // 메뉴 삭제
  deleteMenu = async (ownerId, id) => {
    // 조회 : 매장 번호 
    const storeId = await this.menusRepository.getStoreId(ownerId);

    // ERR 404 : 메뉴 id가 존재하지 않은 경우
    const existsMenu = await this.menusRepository.getMenu(id);
    if (existsMenu.length === 0) {
      throw ApiError.NotFound("메뉴가 존재하지 않습니다.");
    }

    // ERR 403 : 메뉴을 등록한 계정이 아닌 경우
    if (storeId !== existsMenu[0].storeId) {
      throw ApiError.Forbidden("권한이 존재하지 않습니다.");
    }

    // 삭제 : 메뉴 정보
    await this.menusRepository.deleteMenu(id);
  };

  // //  업종 전체 조회
  getFoodCategory = async (req, res, next) => {
    const foodCategory = await this.menusRepository.getFoodCategory();
    return foodCategory;
  };
}

export default MenusService;