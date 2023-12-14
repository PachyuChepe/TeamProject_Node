// 조회 : 매장 정보 (매장 수정일 경우)
// 브라우저가 열렸을 때 실행
document.addEventListener('DOMContentLoaded', function () {
  // 쿼리 스트링 id 받아오기
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  // 조회 : 매장 정보 (매장 수정일 경우)
  axios
    .get(`http://localhost:4000/api/store/${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);
      // 기존 input란에 API 반환값 참조
      document.getElementById('store_name').textContent = res.data.data.name;
      document.getElementById('store_description').textContent =
        res.data.data.description;
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });
});