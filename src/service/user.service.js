// service/user.service.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../config/env.config.js';
import UserRepository from '../repository/user.repository.js';
import ApiError from '../middleware/apiError.middleware.js';
import redisClient from '../config/redisClient.config.js';
import { sendVerificationEmail } from '../config/nodeMailer.config.js';

// 사용자 관련 비즈니스 로직을 수행하는 서비스 클래스
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * 새 사용자를 등록하고 생성된 사용자 정보를 반환
   * @param {object} signUpData - 등록할 사용자 데이터
   * @returns {Promise<object>} 생성된 사용자 정보
   */
  signUp = async ({ email, password, confirmPassword, name, role, points }) => {
    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      throw ApiError.Conflict('이미 사용 중인 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newPoint = role === '고객' ? 1000000 : 0;
    return await this.userRepository.createUser({
      email,
      password: hashedPassword,
      name,
      role,
      points: newPoint,
    });
  };

  /**
   * 사용자 로그인을 처리하고 토큰 및 사용자 정보를 반환
   * @param {object} loginData - 로그인 정보
   * @returns {Promise<object>} 토큰 및 사용자 정보
   */
  login = async ({ email, password }) => {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw ApiError.NotFound('사용자 정보를 찾을 수 없습니다.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw ApiError.Unauthorized('패스워드가 일치하지 않습니다.');
    }

    const accessToken = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign({ userId: user.id }, env.JWT_REFRESH_SECRET, {
      expiresIn: '7d',
    });
    // await redisClient.set(
    //   user.id.toString(),
    //   refreshToken,
    //   'EX',
    //   60 * 60 * 24 * 7,
    // );
    await redisClient.set(user.id.toString(), refreshToken);
    await redisClient.expire(user.id.toString(), 60 * 60 * 24 * 7);
    return { accessToken, user };
  };

  /**
   * 특정 ID의 사용자 정보를 조회하고 반환
   * @param {number} id - 사용자 ID
   * @returns {Promise<object>} 조회된 사용자 정보
   */
  getUser = async (id) => {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw ApiError.NotFound('사용자 정보를 찾을 수 없습니다');
    }
    return user;
  };

  /**
   * 사용자 정보를 업데이트하고 결과를 반환
   * @param {number} id - 사용자 ID
   * @param {object} updateData - 업데이트할 사용자 데이터
   * @returns {Promise<object>} 업데이트된 사용자 정보
   */
  updateUser = async (id, { currentPassword, newPassword, name }) => {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw ApiError.NotFound('사용자 정보를 찾을 수 없습니다.');
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      throw ApiError.Unauthorized('현재 비밀번호가 일치하지 않습니다.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await this.userRepository.updateUser(id, {
      password: hashedPassword,
      name,
    });
  };

  /**
   * 사용자를 삭제하고 결과를 반환
   * @param {number} id - 사용자 ID
   * @returns {Promise<object>} 삭제 결과
   */
  deleteUser = async (id) => {
    return await this.userRepository.deleteUser(id);
  };

  updateBusinessLicenseNumber = async (userId, licenseNumber) => {
    const user = await this.userRepository.findUserById(userId);
    if (!user) {
      throw ApiError.NotFound('사용자 정보를 찾을 수 없습니다.');
    }

    if (user.role !== '사장') {
      throw ApiError.Unauthorized('사업자 등록은 사장만 가능합니다.');
    }

    const business = await this.userRepository.findBusinessByOwnerId(userId);
    if (business && business.businessLicenseNumber) {
      throw ApiError.Conflict('사업자 등록번호는 이미 등록되어 있습니다.');
    }

    return await this.userRepository.createOrUpdateBusiness({
      ownerId: userId,
      businessLicenseNumber: licenseNumber,
    });
  };

  async sendVerificationCode(email) {
    const verifyCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    await this.userRepository.saveVerificationCode(email, verifyCode);
    await sendVerificationEmail(email, verifyCode);
    return verifyCode;
  }

  async verifyCode(email, code) {
    const storedCode = await this.userRepository.getVerificationCode(email);
    return code === storedCode;
  }
}

export default UserService;
