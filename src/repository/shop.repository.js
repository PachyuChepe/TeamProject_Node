import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class ShopRepository {
  /**
   * 새로운 업소 정보를 데이터베이스에 추가
   * @param {object} shopData - 사용자 데이터
   * @returns {Promise<object>} 생성된 정보
   */
  uploadShop = async (shopdata) => {
    return await prisma.shop.creat({ data: shopdata });
  };

  /**
   * shop 정보 업데이트
   * @param {number} shopid - // shop ID
   * @param {object} updateShopData // 업데이트할 데이터
   * @returns {Promise<object>} // 업데이트된 정보
   */
  updateShop = async (shopid, updateShopData) => {
    return await prisma.shop.update({
      where: { shopid },
      data: updateShopData,
    });
  };

  /**
   * 사용자 삭제
   * @param {number} shopid - 사용자 ID
   * @returns {Promise<object>} 삭제 결과
   */
  deleteShop = async (shopid) => {
    return await prisma.shop.delete({ where: { shopid } });
  };
}

export default ShopRepository;
