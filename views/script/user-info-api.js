// 페이지 로드 시 사용자 데이터 로드
document.addEventListener('DOMContentLoaded', function () {
  axios
    .get('/api/user', { withCredentials: true })
    .then((res) => {
      const user = res.data.data;
      document.getElementById('name').value = user.name;
      document.getElementById('email').value = user.email;
      document.getElementById('points').value = user.points;
      document.getElementById('address').value = user.address; // 주소 필드 추가
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });
});

// 폼 제출 함수
function submitUpdateForm() {
  const name = document.getElementById('name').value;
  const newPassword = document.getElementById('new-password').value;
  const address = document.getElementById('address').value; // 주소 값 가져오기

  // 이름, 새로운 비밀번호, 주소 중 하나라도 입력되어 있어야 함
  if (!name && !newPassword && !address) {
    alert('이름, 새로운 비밀번호 또는 주소 중 하나는 반드시 입력해야 합니다.');
    return;
  }

  const data = {
    name,
    email: document.getElementById('email').value,
    currentPassword: document.getElementById('current-password').value,
    newPassword,
    address, // 주소 정보 추가
  };

  axios
    .put('/api/user', data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
    .then((res) => {
      alert(res.data.message);
      location.reload();
    })
    .catch((error) => {
      alert(error.response.data.message);
      console.error('오류 발생:', error);
    });
}
