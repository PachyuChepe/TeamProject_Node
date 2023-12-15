import UserAllGetRepository from '../repository/userAllGet.repository.js';
import ApiError from '../middleware/apiError.middleware.js';

class UserAllGetService {
  constructor() {
    this.userAllGetRepository = new UserAllGetRepository();
  }
}

export default UserAllGetService;
