// 브라우저가 열렸을 때 실행
document.addEventListener('DOMContentLoaded', function () {
  const $menu_list = document.getElementById('menu_list');
  // 쿼리 스트링 id 받아오기(iframe를 사용하지 않을 경우)
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  axios
    .get(`/api/menu?storeId=${id}&category=name&order=desc`, {
      withCredentials: true,
    })
    .then((response) => {
      // API 실행결과를 response로 받아와서 html 그려주기
      response.data.data.forEach((e, idx) => {
        let temp_html = `
        <div class="bg-white shadow-md rounded-lg overflow-hidden mb-6 flex">
          <img src="${e.imageUrl}" alt="Wine" class="w-80 h-48 object-cover" />
          <div class="flex flex-col justify-between p-4 w-full">
            <div class="flex justify-between">
              <div class="w-full">
                <div class="flex justify-between">
                  <h3 class="font-semibold text-gray-700 text-2xl font-bold">${e.name}</h3>
                  <div class="flex">
                    <button id="edit_btn_${e.id}" type="button" onclick="clickEditBtn(this)" 
                    class="text-lg bg-white text-blue-500 mr-2 pt-0">
                      수정하기
                    </button>
                    <button id="delete_btn_${e.id}" type="button" onclick="clickDeleteBtn(this)" 
                    class="text-lg bg-white text-red-500 pt-0">
                      삭제하기
                    </button>
                  </div>
                </div>
                <p id="description_${e.id}" class="text-gray-600 text-lg">${e.description}</p>
                <p id="price_${e.id}" class="text-gray-600 text-lg">${e.price.toLocaleString('ko-KR',)}원</p>
              </div>
            </div>
          </div>
        </div>
        `;
        $menu_list.insertAdjacentHTML('beforeend', temp_html);
      });
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });
});

// 수정 버튼을 눌렀을 때 실행하는 함수
function clickEditBtn(clickedButton) {
  const buttonId = clickedButton.id; // 클릭한 버튼의 ID 가져오기
  const buttonIdArr = buttonId.split('_'); // 버튼 ID 쪼개기
  const id = buttonIdArr[buttonIdArr.length - 1]; // 버튼 ID 쪼갠거에서 마지막 값인 id 값 가져오기

  // 메뉴 상세 페이지로 이동 (쿼리 스트링으로 메뉴 ID 전달)
  window.location.href = `/owner-menu-detail.html?id=${id}`;
}

// 삭제 버튼을 눌렀을 때 실행하는 함수
// 삭제 : 메뉴
function clickDeleteBtn(clickedButton) {
  event.stopPropagation(); // tr에 설정된 onclick 이벤트 실행 중단
  const buttonId = clickedButton.id; // 클릭한 버튼의 ID 가져오기
  const buttonIdArr = buttonId.split('_'); // 버튼 ID 쪼개기
  const id = buttonIdArr[buttonIdArr.length - 1]; // 버튼 ID 쪼갠거에서 마지막 값인 id 값 가져오기

  axios
    .delete(`/api/menu/${id}`, {
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
