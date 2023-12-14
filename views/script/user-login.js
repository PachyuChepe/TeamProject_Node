document
  .getElementById('login-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await axios.post('api/login', {
        email: email,
        password: password,
      });

      alert('로그인 성공: ' + response.data.message);
      window.location.href = '../index.html'; // 로그인 성공 시 페이지 이동
      // 여기에 성공 처리 로직 추가
    } catch (error) {
      alert('로그인 실패: ' + error.response.data.message);
      // 여기에 실패 처리 로직 추가
    }
  });
