// repository/user.repository.js

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 데이터베이스에서 사용자 관련 작업을 수행하는 리포지토리 클래스
class UserRepository {
  /**
   * 이메일로 사용자를 찾음
   * @param {string} email - 사용자 이메일
   * @returns {Promise<object>} 조회된 사용자 정보
   */
  findUserByEmail = async (email) => {
    return await prisma.user.findUnique({ where: { email } });
  };

  /**
   * 새 사용자를 데이터베이스에 추가
   * @param {object} userData - 사용자 데이터
   * @returns {Promise<object>} 생성된 사용자 정보
   */
  createUser = async (userData) => {
    return await prisma.user.create({ data: userData });
  };

  /**
   * 사용자 정보 업데이트
   * @param {number} id - 사용자 ID
   * @param {object} updateData - 업데이트할 사용자 데이터
   * @returns {Promise<object>} 업데이트된 사용자 정보
   */
  updateUser = async (id, updateData) => {
    return await prisma.user.update({ where: { id }, data: updateData });
  };

  /**
   * 사용자 삭제
   * @param {number} id - 사용자 ID
   * @returns {Promise<object>} 삭제 결과
   */
  deleteUser = async (id) => {
    return await prisma.user.delete({ where: { id } });
  };

  /**
   * ID로 사용자를 찾음
   * @param {number} id - 사용자 ID
   * @returns {Promise<object>} 조회된 사용자 정보
   */
  findUserById = async (id) => {
    return await prisma.user.findUnique({ where: { id } });
  };
}

export default UserRepository;
