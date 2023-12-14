// controller/user.controller.js

import UserService from '../service/user.service.js';
import redisClient from '../config/redisClient.config.js';

// 사용자 관련 HTTP 요청을 처리하는 컨트롤러
class UserController {
  constructor() {
    this.userService = new UserService();
  }

  // 새 사용자를 등록하고 생성된 사용자 정보를 반환
  signUp = async (req, res, next) => {
    try {
      const userData = await this.userService.signUp(req.body);
      const { password, ...data } = userData;

      res.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  };

  // 사용자 로그인을 처리하고 토큰을 반환
  login = async (req, res, next) => {
    try {
      const { accessToken } = await this.userService.login(req.body);
      res.cookie('Authorization', `Bearer ${accessToken}`, {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict',
      });

      res
        .status(200)
        .json({ success: true, message: '로그인 성공', accessToken });
    } catch (error) {
      next(error);
    }
  };

  // 현재 로그인된 사용자의 정보를 조회하고 반환
  getUser = async (req, res, next) => {
    try {
      const user = await this.userService.getUser(res.locals.user.id);
      // const { password, ...data } = user;
      const userData = {
        email: user.email,
        name: user.name,
        role: user.role,
        points: user.points,
      };

      res.status(200).json({ success: true, data: userData });
    } catch (error) {
      next(error);
    }
  };

  // 사용자 정보를 업데이트하고 결과를 반환
  updateUser = async (req, res, next) => {
    try {
      await this.userService.updateUser(res.locals.user.id, req.body);

      res.status(200).json({
        success: true,
        message: '사용자 정보가 성공적으로 업데이트되었습니다.',
      });
    } catch (error) {
      next(error);
    }
  };

  // 사용자를 삭제하고 결과를 반환
  deleteUser = async (req, res, next) => {
    try {
      await this.userService.deleteUser(res.locals.user.id);
      res.clearCookie('Authorization');
      await redisClient.del(res.locals.user.id.toString());

      res.status(200).json({
        success: true,
        message: '회원 탈퇴가 성공적으로 처리되었습니다.',
      });
    } catch (error) {
      next(error);
    }
  };

  // 사용자 로그아웃을 처리하고 결과를 반환
  logout = async (req, res, next) => {
    try {
      await redisClient.del(res.locals.user.id.toString());
      res.clearCookie('Authorization');

      res.status(200).json({ success: true, message: '로그아웃 성공' });
    } catch (error) {
      next(error);
    }
  };

  updateBusinessLicense = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;
      const { licenseNumber } = req.body;
      await this.userService.updateBusinessLicenseNumber(userId, licenseNumber);

      res.status(200).json({
        success: true,
        message: '사업자 등록번호가 업데이트되었습니다.',
      });
    } catch (error) {
      next(error);
    }
  };

  requestVerification = async (req, res, next) => {
    try {
      const { email } = req.body;
      await this.userService.sendVerificationCode(email);
      res
        .status(200)
        .json({ success: true, message: '인증번호를 전송했습니다.' });
    } catch (error) {
      next(error);
    }
  };

  validateVerification = async (req, res, next) => {
    try {
      const { email, verifyCode } = req.body;
      await this.userService.verifyCode(email, verifyCode);
      res
        .status(200)
        .json({ success: true, message: '인증이 완료되었습니다.' });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
