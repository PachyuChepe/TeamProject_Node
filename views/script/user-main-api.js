// 브라우저가 열렸을 때 실행
document.addEventListener('DOMContentLoaded', function () {
  const $storeContainer = document.getElementById('store_container');

  // 전체 매장 조회
  axios
    .get(`http://localhost:4000/api/store?category=name&order=desc`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log('response: ', response);
      // API 실행결과를 response로 받아와서 html 그려주기
      response.data.data.forEach((e, idx) => {
        let temp_html = `
        <div class="card hover-effect" style="width: 18rem" onclick="location.href='http://localhost:5500/views/user-store-detail.html?id=${e.id}'">
          <img
            src="./assets/test-img.jpg"
            class="card-img-top"
            alt="..."
          />
          <td class="hidden">${e.id}</td>
          <div class="card-body">
            <h5 class="card-title">${e.name}</h5>
            <p class="card-text">${e.description}</p>
          </div>
        </div>
        `;
        $storeContainer.insertAdjacentHTML('beforeend', temp_html);
      });
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });
});
