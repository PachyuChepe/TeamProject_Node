document
  .getElementById('login-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await axios.post('http://localhost:4000/api/login', {
        email: email,
        password: password,
      });

      alert('로그인 성공: ' + response.data.message);
      const user = response.data.user;
      // 고객인 경우
      if (user.role === "고객") {
        window.location.href = 'user-main.html'; // 고객 메인 페이지 이동
      } else if (user.role === "사장" && user.stores.length > 0) {
        window.location.href = `/owner-main.html?id=${user.stores[0].id}`; // 사장 메인 페이지 이동
      } else if (user.role === "사장" && user.stores.length === 0) {
        window.location.href = 'owner-store-create.html'; // 사장 가게 등록 페이지 이동
      } else {
        // role이 고객이나 사장이 아닐 경우!!(내부 테스트 할 때 참고하시라고 만들어놨습니당~/이아영)
        alert("예기치 못한 오류가 발생하였습니다. 관리자에게 문의 바랍니다.");
      }
    } catch (error) {
      alert('로그인 실패: ' + error.response.data.message);
      // 여기에 실패 처리 로직 추가
    }
  });
