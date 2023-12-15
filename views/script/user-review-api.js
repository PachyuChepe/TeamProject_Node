// 브라우저가 열렸을 때 실행
document.addEventListener('DOMContentLoaded', function () {
  const $reviewContainer = document.getElementById('review_container');

  axios
    .get(`http://localhost:4000/api/reviews/client`, {
      withCredentials: true,
    })
    .then((response) => {
      const reviews = response.data.data;
      console.log('reviews: ', reviews);
      // API 실행결과를 response로 받아와서 html 그려주기
      reviews.forEach((e, idx) => {
        let temp_html = `
        <div id="review_wrapper_${e.id}" class="review-wrapper">
          <div class="hidden">${e.id}</div>
          <div id="store_name">매장명</div>
          <div class="form-control">${e.store.id}</div>
          <div id="menu_id">리뷰</div>
          <div class="form-control">${e.comment}</div>
          <div id="review_img">이미지</div>
          <div class="form-control">이미지이이이이이</div>
        </div>
        <button id="review_edit_btn_${e.id}" onclick="location.href='/user-review-edit.html?id=${e.id}'">수정하기</button>
        `;
        $reviewContainer.insertAdjacentHTML('beforeend', temp_html);
      });
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });
});