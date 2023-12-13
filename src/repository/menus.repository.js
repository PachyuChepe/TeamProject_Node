import { prisma } from '../utils/prisma/index.js';

class MenusRepository {
  // 매장 번호 조회
  getStoreId = async (ownerId) => {
    const storeId = await prisma.Store.findMany({
      select: { id: true },
      where: { ownerId }
    });
    return storeId[0].id;
  };

  // 상품 저장
  createMenu = async (storeId, name, price, imageUrl) => {
    const createdMenu = await prisma.Menu.create({
      data: {
        name,
        storeId,
        price: +price,
        imageUrl,
        categoryId: 1
      }
    });
    return createdMenu;
  };

  // 상품 전체 조회
  getMenus = async (orderBy) => {
    const menus = await prisma.Menu.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        store: {
          select: {
            owner: {
              select: {
                email: true
              }
            },
          },
        },
      },
      orderBy
    });
    return menus;
  };

  // 상품 상세 조회
  getMenu = async (id) => {
    const menu = await prisma.Menu.findMany({
      select: {
        id: true,
        storeId: true,
        name: true,
        price: true,
        store: {
          select: {
            owner: {
              select: {
                email: true
              }
            },
          },
        },
      },
      where: { id: +id }
    });
    return menu;
  };

  // 상품 수정
  updateMenu = async (id, name, price, imageUrl) => {
    const menu = await prisma.Menu.update({
      data: {
        name,
        price: +price,
        imageUrl,
        updatedAt: new Date()
      }, where: {
        id: +id
      }
    });
    return menu;
  };

  // 상품 삭제
  deleteMenu = async (id) => {
    await prisma.Menu.delete({
      where: { id: +id }
    });
  };
}

export default MenusRepository;