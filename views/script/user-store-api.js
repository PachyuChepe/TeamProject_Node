// 조회 : 매장 정보 (매장 수정일 경우) / 메뉴
// 브라우저가 열렸을 때 실행
document.addEventListener('DOMContentLoaded', function () {
  // 쿼리 스트링 id 받아오기
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const $menu_list = document.getElementById('menu_list');

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

  // 조회 : 메뉴
  axios
    .get(`http://localhost:4000/api/menu?storeId=${id}&category=name&order=desc`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log('response: ', response);
      // API 실행결과를 response로 받아와서 html 그려주기
      response.data.data.forEach((e, idx) => {
        let temp_html = `
        <tr class="hover-effect" onclick="location.href='http://localhost:5500/views/owner-menu-detail.html?id=${e.id}'">
          <td class="hidden">${e.id}</td>
          <td>이미지</td>
          <td>${e.name}</td>
          <td>${e.price}</td>
          <td>
            <button id="delete_btn_${e.id}" class="delete_btn" type="button" onclick="clickDeleteBtn(this)">삭제하기</button>
          </td>
        </tr>
        `;
        $menu_list.insertAdjacentHTML('beforeend', temp_html);
      });
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });
});

