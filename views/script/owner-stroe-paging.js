// 매장 관리 페이지로 이동
document.getElementById("store").addEventListener("click", function () {
  document.getElementById("main_iframe").src = "owner-store-edit.html";
  localStorage.setItem('lastIframeSrc', "owner-store-edit.html"); // 새로 고침 시 페이지 이동 방지
});

// 메뉴 목록 조회 페이지로 이동
document.getElementById("menu").addEventListener("click", function () {
  document.getElementById("main_iframe").src = "owner-menu.html";
  localStorage.setItem('lastIframeSrc', "owner-menu.html"); // 새로 고침 시 페이지 이동 방지
});

// 주문 목록 조회 페이지로 이동
document.getElementById("order").addEventListener("click", function () {
  document.getElementById("main_iframe").src = "owner-store-edit.html"; // 새로 고침 시 페이지 이동 방지
  localStorage.setItem('lastIframeSrc', src);
});

// 페이지 새로고침 시 마지막으로 보고 있는 iframe 조회
window.onload = function () {
  var lastSrc = localStorage.getItem('lastIframeSrc');
  if (lastSrc) {
    document.getElementById('main_iframe').src = lastSrc;
  }
};