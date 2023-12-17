// routes/menu.router.js

import { Router } from 'express'; // express 패키지
const menusRouter = Router();
import { isLoggedIn } from '../middleware/verifyToken.middleware.js';
import { validateEditMenu } from '../middleware/menuValidation.middleware.js';
import MenusController from '../controller/menus.controller.js';
import uploadImage from '../middleware/multer.middleware.js';

const menusController = new MenusController();

// 메뉴 저장
menusRouter.post(
  '/menu',
  isLoggedIn,
  uploadImage.single('imageUrl'),
  validateEditMenu,
  menusController.createMenu,
);
// menusRouter.post("/menu", validateEditMenu, menusController.createMenu);

// 메뉴 전체 조회
menusRouter.get('/menu', menusController.getMenus);

// 메뉴 상세 조회
menusRouter.get('/menu/:id', menusController.getMenu);

// 메뉴 수정
menusRouter.put(
  '/menu/:id',
  isLoggedIn,
  uploadImage.single('imageUrl'),
  validateEditMenu,
  menusController.updateMenu,
);
// menusRouter.put("/menu/:id", validateEditMenu, menusController.updateMenu);

// 메뉴 삭제
menusRouter.delete('/menu/:id', isLoggedIn, menusController.deleteMenu);
// menusRouter.delete("/menu/:id/:ownerId", menusController.deleteMenu);

// 업종 전체 조회
menusRouter.get('/food-category', menusController.getFoodCategory);

export default menusRouter;
