// 조회 : 리뷰 (리뷰 수정일 경우)
// 브라우저가 열렸을 때 실행
document.addEventListener('DOMContentLoaded', function () {
  // 쿼리 스트링 id 받아오기(iframe를 사용하지 않을 경우)
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const storeId = urlParams.get('storeId');

  // 별점
  const $starLabels = document.querySelectorAll('.custom_star');
  const $starRadios = document.getElementsByName('review_star_grade');

  // 매장명 조회
  axios
    .get(`/api/storeName/${storeId}`, { withCredentials: true })
    .then((res) => {
      const storeName = res.data.data;
      // 기존 input란에 API 반환값 참조
      document.getElementById('store_name').innerText = storeName.name;
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });
  // 조회 : 리뷰 (리뷰 수정일 경우)
  if (id) {
    axios
      .get(`/api/reviews/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        const reviews = res.data.data;
        // 기존 input란에 API 반환값 참조
        document.getElementById('comment').value = reviews.comment;
        document.getElementById('review_select_star_grade').innerText =
          reviews.rating;
        // 이미지 미리보기
        if (reviews.imageUrl) {
          const imagePreview = document.getElementById('imagePreview');
          imagePreview.style.backgroundImage = `url(${reviews.imageUrl})`;
          imagePreview.style.backgroundSize = 'cover';
          imagePreview.style.backgroundPosition = 'center';
        }
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
  // 쿼리 스트링 id 받아오기(iframe를 사용하지 않을 경우)
  const urlParams = new URLSearchParams(window.location.search);
  const storeId = urlParams.get('storeId');

  const formData = new FormData();
  const imageFile = document.getElementById('imageUpload').files[0];

  // 이미지 파일 추가
  if (imageFile) {
    formData.append('imageUrl', imageFile);
  }

  // 다른 필드도 formData 객체에 추가
  formData.append('storeId', storeId);
  formData.append('comment', document.getElementById('comment').value);
  formData.append(
    'rating',
    document.querySelector('input[name="review_star_grade"]:checked').value,
  );

  axios
    .post('/api/reviews', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })
    .then((response) => {
      alert(response.data.message);
      window.location.href = `/user-review-edit.html?storeId=${storeId}&id=${res.data.data.id}`;
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
}

// 수정 : 리뷰
function submitUpdateForm() {
  // 쿼리 스트링 id 받아오기(iframe를 사용하지 않을 경우)
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const formData = new FormData();
  const imageFile = document.getElementById('imageUpload').files[0];

  // 이미지 파일 추가
  if (imageFile) {
    formData.append('imageUrl', imageFile);
  }

  // 다른 필드도 formData 객체에 추가
  formData.append('comment', document.getElementById('comment').value);
  formData.append(
    'rating',
    document.querySelector('input[name="review_star_grade"]:checked').value,
  );

  axios
    .put(`/api/reviews/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })
    .then((response) => {
      alert(response.data.message);
      location.reload(); // 페이지 새로고침
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
}

// 삭제 : 리뷰
// 리뷰가 존재할 경우에만 동작하도록 수정 필요
function submitDeleteForm() {
  // 쿼리 스트링 id 받아오기(iframe를 사용하지 않을 경우)
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  axios
    .delete(`/api/reviews/${id}`, {
      withCredentials: true,
    })
    .then((response) => {
      alert(response.data.message);
      window.parent.location.href = 'user-order-list.html'; // 사장 가게 등록 페이지 이동
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
}
