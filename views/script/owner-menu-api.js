// 브라우저가 열렸을 때 실행
document.addEventListener('DOMContentLoaded', function () {
  const $menu_detail = document.getElementById('menu_detail');
  // 부모 url에서 id 값 추출하기(iframe를 사용할 경우)
  const url = window.parent.location.href; // 부모 페이지의 url 조회
  const urlArr = url.split("="); // =로 나눠버리기!!(param이 더 있으면 이거 못 씁니다~)
  const id = urlArr[1];
  // 메뉴 전체 조회
  // 내 매장의 메뉴들만 조회해야함 -> 매장 CRUD를 만든 후에 적용하는게 나을듯
  // 일단 전체 메뉴 조회 ㄱ
  axios
    .get(`http://localhost:4000/api/menu?storeId=${id}&category=name&order=desc`, {
      withCredentials: true,
    })
    .then((response) => {
      // API 실행결과를 response로 받아와서 html 그려주기
      response.data.data.forEach((e, idx) => {
        let temp_html = `
        <tr class="hover-effect" onclick="location.href='/owner-menu-detail.html?id=${e.id}'">
          <td class="hidden">${e.id}</td>
          <td>이미지</td>
          <td>${e.name}</td>
          <td>${e.price}</td>
          <td>
            <button id="delete_btn_${e.id}" class="delete_btn" type="button" onclick="clickDeleteBtn(this)">삭제하기</button>
          </td>
        </tr>
        `;
        $menu_detail.insertAdjacentHTML('beforeend', temp_html);
      });
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });
});

// 삭제 버튼을 눌렀을 때 실행하는 함수
// 삭제 : 메뉴
function clickDeleteBtn(clickedButton) {
  event.stopPropagation(); // tr에 설정된 onclick 이벤트 실행 중단
  const buttonId = clickedButton.id; // 클릭한 버튼의 ID 가져오기
  const buttonIdArr = buttonId.split('_'); // 버튼 ID 쪼개기
  const id = buttonIdArr[buttonIdArr.length - 1]; // 버튼 ID 쪼갠거에서 마지막 값인 id 값 가져오기

  axios
    .delete(`http://localhost:4000/api/menu/${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      // 삭제하기 전에 정말 삭제할거에요? 알림창으로 할까.. 근데 번거로운거같으니까 일단 클릭 시 바로 삭제되게 고!!!!
      alert('삭제가 완료되었습니다.');
      location.reload(); // 페이지 새로고침
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });
}