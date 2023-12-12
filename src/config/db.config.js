// db.config.js

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 데이터베이스 연결 및 필수 테이블 존재 여부 확인
async function checkDatabaseConnection() {
  try {
    // 데이터베이스 연결 확인
    await prisma.$queryRaw`SELECT 1`;

    // 'User' 테이블 존재 여부 확인
    const userTable = await prisma.$queryRaw`SELECT COUNT(*) AS count FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'User'`;
    if (Number(userTable[0].count) === 0) {
      throw new Error("User 테이블이 존재하지 않습니다.");
    }

    // 연결 및 테이블 존재 확인 완료 메시지
    console.log("Prisma 데이터베이스 및 테이블 연결 성공");
  } catch (error) {
    throw error;
  }
}

export { checkDatabaseConnection };
