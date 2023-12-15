// 헤더와 푸터 로드 함수 (Promise를 반환하도록 수정)
function loadHTML(url, id) {
  return fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
    })
    .catch((error) => console.error(error));
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function () {
  // 헤더와 푸터 로드
  Promise.all([
    loadHTML('header.html', 'header'),
    loadHTML('footer.html', 'footer'),
  ]).then(() => {
    // 요소 로드 후 실행되는 코드
    const profileImage = document.querySelector('.profile-img');
    const profileMenu = document.querySelector('.profile-menu');

    console.log(profileImage); // 디버깅: 프로필 이미지 요소 확인
    console.log(profileMenu); // 디버깅: 프로필 메뉴 요소 확인

    // 프로필 이미지에 대한 이벤트 리스너 설정
    if (profileImage) {
      // profileImage.addEventListener('mouseover', toggleMenu);
      profileImage.addEventListener('click', toggleMenu);
    } else {
      console.error('프로필 이미지가 페이지에 존재하지 않습니다.');
    }

    // 엑세스 토큰에 따른 메뉴 설정
    function toggleMenu() {
      const accessToken = getCookie('Authorization');
      let menuContent = '';

      if (accessToken) {
        menuContent = `
          <button onclick="location.href='profile-edit.html'">회원정보수정</button>
          <button onclick="location.href='my-page.html'">마이페이지</button>
          <button onclick="location.href='logout.html'">로그아웃</button>
        `;
      } else {
        menuContent = `
          <button onclick="location.href='user-signup.html'">회원가입</button>
          <button onclick="location.href='user-login.html'">로그인</button>
        `;
      }

      profileMenu.innerHTML = menuContent;
      console.log('toggleMenu 함수가 호출되었습니다.'); // 디버깅: 함수 호출 확인
      profileMenu.classList.toggle('hidden');
    }

    // 쿠키 값 가져오기
    function getCookie(name) {
      let cookie = {};
      document.cookie.split(';').forEach(function (el) {
        let [k, v] = el.split('=');
        cookie[k.trim()] = v;
      });
      return cookie[name];
    }
  });
  // if (window.location.href.includes('user-') && window.location.href !== 'http://localhost:4000/user-main.html') {
  //   loadHTML('user-top-menu.html', 'user_top_menu');
  // }
  // if (window.location.href.includes('owner-')) {
  //   loadHTML('owner-top-menu.html', 'owner_top_menu');
  // }
});
