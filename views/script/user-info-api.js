
// 조회 : 고객 정보
// 브라우저가 열렸을 때 실행
document.addEventListener('DOMContentLoaded', function () {
  // 조회 : 고객 정보
  axios
    .get(`http://localhost:4000/api/user`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res.data.data);
      const user = res.data.data;

      // 기존 input란에 API 반환값 참조
      document.getElementById('name').value = user.name;
      document.getElementById('email').value = user.email;
      document.getElementById('points').textContent = user.points;
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });
});

// 수정 : 고객 정보
function submitUpdateForm() {
  // API로 전달할 값 JSON으로 설정
  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    currentPassword: document.getElementById('current_password').value,
    newPassword: document.getElementById('new_password').value,
  };

  axios
    .put(`http://localhost:4000/api/user`, data, {
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