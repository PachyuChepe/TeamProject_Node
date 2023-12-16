// 브라우저가 열렸을 때 실행
document.addEventListener('DOMContentLoaded', function () {
  // 쿼리 스트링 id 받아오기(iframe를 사용하지 않을 경우)
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const $reviewContainer = document.getElementById('review_container');

  axios
    .get(`/api/reviews/store/${id}`, {
      withCredentials: true,
    })
    .then((response) => {
      const reviews = response.data.data;
      // console.log('reviews: ', reviews);
      let count;
      // API 실행결과를 response로 받아와서 html 그려주기
      reviews.forEach((e, idx) => {
        count++;
        let temp_html = `
        <div id="review_wrapper_${e.id}" class="review-wrapper">
          <div class="hidden">${e.id}</div>
          <div id="store_name">매장명</div>
          <div class="form-control">${e.store.name}</div>
          <div id="rating">별점</div>
          <div class="star_grade">
            <div class="review_comment_star_grade_wrapper${count}">
              <input type="radio" name="review_star_grade${count}" id="star1${count}" class="hidden_radio" value="1" />
              <label for="star1" class="custom_star"></label>
              <input type="radio" name="review_star_grade${count}" id="star2${count}" class="hidden_radio" value="2" />
              <label for="star2" class="custom_star"></label>
              <input type="radio" name="review_star_grade${count}" id="star3${count}" class="hidden_radio" value="3" />
              <label for="star3" class="custom_star"></label>
              <input type="radio" name="review_star_grade${count}" id="star4${count}" class="hidden_radio" value="4" />
              <label for="star4" class="custom_star"></label>
              <input type="radio" name="review_star_grade${count}" id="star5${count}" class="hidden_radio" value="5" />
              <label for="star5" class="custom_star"></label>
            </div>  
          </div>
          <div id="menu_id">리뷰</div>
          <div class="form-control">${e.comment}</div>
          <div id="review_img">이미지</div>
          <div class="form-control">이미지이이이이이</div>
        </div>
        `;
        $reviewContainer.insertAdjacentHTML('beforeend', temp_html);

        // 별점 표시
        const starScore = e.rating;
        const reviewId = `review_wrapper_${e.id}`;
        const $starLabels = document.querySelectorAll(
          `#${reviewId} .custom_star`,
        );

        // 별점 초기화 및 적용
        $starLabels.forEach((label, index) => {
          if (index < starScore) {
            label.style.backgroundImage = 'url("../img/star_y.png")';
          } else {
            label.style.backgroundImage = 'url("../img/star_n.png")';
          }
          label.style.pointerEvents = 'none';
        });
      });
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });
});

// 삭제 버튼을 눌렀을 때 실행하는 함수
// 삭제 : 메뉴
function clickDeleteBtn(clickedButton) {
  event.stopPropagation(); // tr에 설정된 onclick 이벤트 실행 중단
  const buttonId = clickedButton.id; // 클릭한 버튼의 ID 가져오기
  const buttonIdArr = buttonId.split('_'); // 버튼 ID 쪼개기
  const id = buttonIdArr[buttonIdArr.length - 1]; // 버튼 ID 쪼갠거에서 마지막 값인 id 값 가져오기

  axios
    .delete(`/api/reviews/${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      // 삭제하기 전에 정말 삭제할거에요? 알림창으로 할까.. 근데 번거로운거같으니까 일단 클릭 시 바로 삭제되게 고!!!!
      alert('삭제가 완료되었습니다.');
      location.reload(); // 페이지 새로고침
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });
}
