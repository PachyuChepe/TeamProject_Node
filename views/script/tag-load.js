// 헤더와 푸터 로드 함수
function loadHTML(url, id) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;
    })
    .catch((error) => console.error(error));
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function () {
  loadHTML('header.html', 'header');
  loadHTML('footer.html', 'footer');
  if (window.location.href.includes('user-') && window.location.href !== 'http://localhost:4000/user-main.html') {
    loadHTML('user-top-menu.html', 'user_top_menu');
  }
  if (window.location.href.includes('owner-')) {
    loadHTML('owner-top-menu.html', 'owner_top_menu');
  }

});
