import UserAllGetService from '../service/userAllGet.service.js';

class UserAllGetController {
  constructor() {
    this.userAllGetService = new UserAllGetService();
  }

  // 사장
  getUserInfo = async (req, res, next) => {
    try {
      const userId = await this.userAllGetService.getUserInfo(
        res.locals.user.id,
      );
      const user = {
        name: userId.name,
        email: userId.email,
        point: userId.points,
        role: userId.role,
        stores: {
          id: userId.id,
          ownerId: userId.ownerId,
          categoryId: userId.categoryId,
          name: userId.name,
          description: userId.description,
          foodtype: userId.foodtype,
          storeaddresses: userId.storeaddresses,
          businesslicense: userId.businesslicense,
          menus: userId.menus,
          reviews: userId.reviews,
        },
        orders: {
          id: userId.id,
          customerId: userId.customerId,
          menuId: userId.menuId,
          quantity: userId.quantity,
          totalPrice: userId.totalPrice,
          status: userId.status,
          menu: true,
        },
        reviews: userId.reviews,
        addresses: userId.addresses,
      };

      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  };

  getCustomerDetails = async (req, res, next) => {
    const userId = await this.userAllGetService.getCustomerDetails(
      res.locals.user.id,
    );
    try {
      const user = {
        id: userId.id,
        role: userId.role,
        reviews: userId.reviews,
        orders: userId.menu,
      };

      res.status(200).json({ success: true, data: user });
    } catch (error) {
      next(error);
    }
  };
}

export default UserAllGetController;
