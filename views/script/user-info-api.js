// 페이지 로드 시 사용자 데이터 로드
document.addEventListener('DOMContentLoaded', function () {
  axios
    .get('/api/user', { withCredentials: true })
    .then((res) => {
      const user = res.data.data;
      document.getElementById('name').value = user.name;
      document.getElementById('email').value = user.email;
      // document.getElementById('current-password').value = user.currentPassword;
      // document.getElementById('new-password').value = user.newPassword;
      document.getElementById('points').value = user.points; // 포인트 표시 변경 (textContent 대신 value 사용)
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });
});

// 폼 제출 함수
function submitUpdateForm() {
  const name = document.getElementById('name').value;
  const newPassword = document.getElementById('new-password').value;

  // 이름과 새로운 비밀번호 중 하나라도 입력되어 있어야 함
  if (!name && !newPassword) {
    alert('이름 또는 새로운 비밀번호 중 하나는 반드시 입력해야 합니다.');
    return;
  }

  const data = {
    name: name,
    email: document.getElementById('email').value, // 이메일은 readonly로 설정되어 있음
    currentPassword: document.getElementById('current-password').value,
    newPassword: newPassword,
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
