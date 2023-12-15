
// 조회 : 리뷰 (리뷰 수정일 경우)
// 브라우저가 열렸을 때 실행
document.addEventListener('DOMContentLoaded', function () {
  // 쿼리 스트링 id 받아오기(iframe를 사용하지 않을 경우)
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  // 별점
  const $starLabels = document.querySelectorAll('.custom_star');
  const $starRadios = document.getElementsByName('review_star_grade');
  // 조회 : 리뷰 (리뷰 수정일 경우)
  if (id) {
    axios
      .get(`http://localhost:4000/api/reviews/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        const reviews = res.data.data;
        // 기존 input란에 API 반환값 참조
        document.getElementById('comment').value = reviews.comment;
        document.getElementById('review_select_star_grade').innerText = reviews.rating;
        const starScore = reviews.rating; // 현재 별점
        // 별점 이미지 초기화 및 적용
        $starLabels.forEach((label, index) => {
          if (index < starScore) {
            label.style.backgroundImage = 'url("../img/star_y.png")';
          } else {
            label.style.backgroundImage = 'url("../img/star_n.png")';
          }
        });

        // 별점 라디오 버튼 선택
        for (const element of $starRadios) {
          if (element.value == starScore) {
            element.checked = true;
            break;
          }
        }
      })
      .catch((error) => {
        console.error('오류 발생:', error);
      });
  }
});

// 저장 : 리뷰
function submitCreateForm() {
  // API로 전달할 값 JSON으로 설정
  const data = {
    comment: document.getElementById('comment').value,
    rating: document.querySelector('input[name="review_star_grade"]:checked').value,
  };

  axios
    .post('http://localhost:4000/api/reviews', data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
    .then((res) => {
      alert('저장이 완료되었습니다.');
      window.location.href = `/user-review-edit.html?id=${res.data.data.id}`;
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });
}

// 수정 : 리뷰
function submitUpdateForm() {
  // 쿼리 스트링 id 받아오기(iframe를 사용하지 않을 경우)
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  // API로 전달할 값 JSON으로 설정
  const data = {
    comment: document.getElementById('comment').value,
    rating: document.querySelector('input[name="review_star_grade"]:checked').value,
  };

  axios
    .put(`http://localhost:4000/api/reviews/${id}`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
    .then((res) => {
      alert('수정이 완료되었습니다.');
      location.reload(); // 페이지 새로고침
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });
}

// 삭제 : 리뷰
// 리뷰가 존재할 경우에만 동작하도록 수정 필요
function submitDeleteForm() {
  // 쿼리 스트링 id 받아오기(iframe를 사용하지 않을 경우)
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  axios
    .delete(`http://localhost:4000/api/reviews/${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      alert('삭제가 완료되었습니다.');
      window.parent.location.href = 'user-review-list.html'; // 사장 가게 등록 페이지 이동
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });
}
