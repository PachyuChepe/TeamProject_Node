import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ReviewRepository {
  // 리뷰 생성
  createReview = async (customerId, storeId, rating, comment) => {
    const review = await prisma.review.create({
      data: {
        customerId: +customerId,
        storeId: +storeId,
        rating: +rating,
        comment,
      },
    });
    return review;
  };

  // 특정 가게의 리뷰 조회
  getStoreReviews = async (storeId) => {
    const reviews = await prisma.review.findMany({
      where: {
        storeId,
      },
      include: {
        customer: {
          select: {
            name: true,
            email: true,
          },
        },
        store: {
          select: {
            name: true,
          },
        },
      },
    });
    return reviews;
  };

  // 특정 고객의 리뷰 조회
  getUserReviews = async (customerId) => {
    const reviews = await prisma.review.findMany({
      where: {
        customerId,
      },
      include: {
        customer: {
          select: {
            name: true,
            email: true,
          },
        },
        store: {
          select: {
            name: true,
          },
        },
      },
    });
    return reviews;
  };

  // 특정 리뷰 조회
  getReviewById = async (reviewId) => {
    const review = await prisma.review.findUnique({
      where: {
        id: +reviewId,
      },
      include: {
        customer: {
          select: {
            name: true,
            email: true,
          },
        },
        store: {
          select: {
            name: true,
          },
        },
      },
    });

    return review;
  };

  // 리뷰 수정
  updateReview = async (reviewId, rating, comment) => {
    const updatedReview = await prisma.review.update({
      where: { id: +reviewId },
      data: { rating, comment },
    });

    return updatedReview;
  };

  // 리뷰 삭제
  deleteReview = async (reviewId) => {
    const deletedReview = await prisma.review.delete({
      where: {
        id: +reviewId,
      },
    });
    return deletedReview;
  };
}

export default ReviewRepository;
