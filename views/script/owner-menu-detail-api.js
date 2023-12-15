
// 조회 : 메뉴 정보 (메뉴 수정일 경우)
// 브라우저가 열렸을 때 실행
document.addEventListener('DOMContentLoaded', function () {
  // 쿼리 스트링 id 받아오기
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  // 조회 : 메뉴 정보 (메뉴 수정일 경우)
  if (id) {
    axios
      .get(`http://localhost:4000/api/menu/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        // 기존 input란에 API 반환값 참조
        document.getElementById('name').value = res.data.data[0].name;
        document.getElementById('description').value =
          res.data.data[0].description;
        document.getElementById('price').value = res.data.data[0].price;
      })
      .catch((error) => {
        console.error('오류 발생:', error);
      });
  }
});

// 저장 : 메뉴 정보
function submitCreateForm() {
  // 쿼리 스트링 post_id 받아오기
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  // API로 전달할 값 JSON으로 설정
  const data = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    price: document.getElementById('price').value,
    ownerId: 3,
  };

  axios
    .post('http://localhost:4000/api/menu', data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
    .then((res) => {
      // 게시글 조회 화면으로 이동시키기!
      alert('저장이 완료되었습니다.');
      window.location.href = `/owner-menu-detail.html?id=${res.data.data.id}`;
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });
}

// 수정 : 메뉴 정보
function submitUpdateForm() {
  // 쿼리 스트링 post_id 받아오기
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  // API로 전달할 값 JSON으로 설정
  const data = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    price: document.getElementById('price').value,
    ownerId: 3,
  };

  axios
    .put(`http://localhost:4000/api/menu/${id}`, data, {
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

// 삭제 : 메뉴 정보
// 메뉴가 존재할 경우에만 동작하도록 수정 필요
function submitDeleteForm() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  // API로 전달할 값 JSON으로 설정
  const ownerId = 3;

  axios
    .delete(`http://localhost:4000/api/menu/${id}/${ownerId}`, {
      withCredentials: true,
    })
    .then((res) => {
      // 삭제하기 전에 정말 삭제할거에요? 알림창으로 할까.. 너무 번거롭낭
      alert('삭제가 완료되었습니다.');
      window.location.href = '/owner-menu.html?';
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });
}
