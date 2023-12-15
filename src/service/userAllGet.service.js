import UserAllGetRepository from '../repository/userAllGet.repository.js';
import ApiError from '../middleware/apiError.middleware.js';

class UserAllGetService {
  constructor() {
    this.userAllGetRepository = new UserAllGetRepository();
  }
  // 사장
  getUserInfo = async (id) => {
    const user = await this.userAllGetRepository.getUserInfo(id);
    if (!user) {
      throw ApiError.NotFound('User not found');
    } else if (user.role !== '사장') {
      throw ApiError.Forbidden('Access denied');
    }

    return await this.userAllGetRepository.getUserInfo(id);
  };

  getCustomerDetails = async () => {
    const user = await this.userAllGetRepository.getCustomerDetails(id);
    if (!user) {
      throw ApiError.NotFound('User not found or not a customer');
    }
    return user;
  };
}

export default UserAllGetService;
