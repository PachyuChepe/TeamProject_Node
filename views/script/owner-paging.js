// 현재 URL에서 파라미터 추출
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log('id: ', id);

// 매장 정보 수정을 눌렀을 때
function moveStoreInfoEdit() {
  const pageUrl = `http://localhost:4000/owner-store-edit.html?id=${id}`;
  window.location.href = pageUrl;
}

// 메뉴 관리를 눌렀을 때
function moveMenuList() {
  const pageUrl = `http://localhost:4000/owner-menu-list.html?id=${id}`;
  window.location.href = pageUrl;
}

// 주문 관리를 눌렀을 때
function moveOrderList() {
  const pageUrl = `http://localhost:4000/owner-order-list.html?id=${id}`;
  window.location.href = pageUrl;
}

// 리뷰 관리를 눌렀을 때
function moveReviewList() {
  const pageUrl = `http://localhost:4000/owner-review-list.html?id=${id}`;
  window.location.href = pageUrl;
}
