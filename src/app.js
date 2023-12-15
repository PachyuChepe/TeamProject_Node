import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import https from 'https';
import fs from 'fs';
// import YAML from "yamljs";
// import swaggerUi from "swagger-ui-express";
import morganConfig from './config/morgan.config.js';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 환경 설정 및 데이터베이스 설정
import env from './config/env.config.js';
import { checkDatabaseConnection } from './config/db.config.js';

// 익스프레스 앱 생성 및 설정
const app = express();
app.use(express.json());
app.use(cookieParser());
morganConfig(app);

// CORS 설정
app.use(
  // 아영님 cors 설정(localhost 원활한 동작을 위함)
  // cors({
  //   credentials: true,
  //   origin: ['http://localhost:5500'],
  // }),
  // 윤호님 cors 설정
  cors({
    origin: [
      `https://localhost:${env.SERVER_PORT}`,
      `http://localhost:${env.SERVER_PORT}`,
      'https://www.vitahub.xyz',
    ],
    credentials: true,
  }),
);

// 라우터 설정
import userRouter from './routes/user.router.js';
import storeRouter from './routes/store.router.js';
import menusRouter from './routes/menus.router.js';
import orderRouter from './routes/order.router.js';
import reviewRouter from './routes/reviews.router.js';
import errorHandler from './middleware/errorHandler.middleware.js';
app.use('/api', [userRouter, storeRouter, orderRouter, reviewRouter]);
app.use('/api', [menusRouter]);
app.use(errorHandler);

// 프론트엔드 파일 서빙
app.use(express.static('views'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// 데이터베이스 연결 확인 및 HTTPS/HTTP 서버 시작
checkDatabaseConnection()
  .then(() => {
    let server;
    // HTTPS 서버 설정 및 시작 (키 파일이 존재하는 경우)
    if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
      const privateKey = fs.readFileSync(__dirname + '/../key.pem', 'utf8');
      const certificate = fs.readFileSync(__dirname + '/../cert.pem', 'utf8');
      const credentials = { key: privateKey, cert: certificate };
      server = https.createServer(credentials, app);
      server.listen(env.SERVER_PORT, () => {
        console.log(`HTTPS server is running on port ${env.SERVER_PORT}`);
      });
    }
    // HTTP 서버 설정 및 시작 (그렇지 않은 경우)
    else {
      server = app.listen(env.SERVER_PORT, () => {
        console.log(`HTTP server is running on port ${env.SERVER_PORT}`);
      });
    }
  })
  .catch((error) => {
    console.error('서버 시작 실패', error);
    process.exit(1);
  });
