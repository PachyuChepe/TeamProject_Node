// 현재 URL에서 파라미터 추출
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log('id: ', id);

// 내 정보 수정을 눌렀을 때
function moveMyInfoEdit() {
  const pageUrl = `http://localhost:4000/user-info-edit.html`;
  window.location.href = pageUrl;
}

// 주문 목록 조회를 눌렀을 때
function moveOrderList() {
  const pageUrl = `http://localhost:4000/user-order-list.html`;
  window.location.href = pageUrl;
}

// 리뷰 목록 조회를 눌렀을 때
function moveReviewList() {
  const pageUrl = `http://localhost:4000/user-review-list.html`;
  window.location.href = pageUrl;
}
