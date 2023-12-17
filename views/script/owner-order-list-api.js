// 브라우저가 열렸을 때 실행
document.addEventListener('DOMContentLoaded', function () {
  const $menu_list = document.getElementById('menu_list');
  // 쿼리 스트링 id 받아오기(iframe를 사용하지 않을 경우)
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  axios
    .get(`/api/orders/store/${id}`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log('response: ', response);
      // API 실행결과를 response로 받아와서 html 그려주기
      response.data.data.forEach((e, idx) => {
        const imgHref = e.menu.imageUrl === null ? '../img/temp-img.png' : e.menu.imageUrl;
        let temp_html = `
        <div class="bg-white shadow-md rounded-lg overflow-hidden mb-6 flex">
          <img src="${imgHref
          }" alt="Wine" class="w-80 h-48 object-cover" />
          <div class="flex flex-col justify-between p-4 w-full">
            <div class="flex justify-between">
              <div class="w-full">
                <div class="flex justify-between">
                  <h3 class="font-semibold text-gray-700 text-2xl font-bold mr-2">메뉴명 : ${e.menu.name}</h3>
                  <div class="flex">
                    <button id="edit_btn_${e.id}" type="button" onclick="changeBtnName(this)"" 
                    class="text-lg bg-white text-red-500">
                      ${e.status}
                    </button>
                  </div>
                </div>
                <p id="user_name_${e.id
          }" class="text-gray-600 text-lg">고객명 : ${e.customer.name}</p>
                <p id="address_${e.id
          }" class="text-gray-600 text-lg">고객 주소 : ${e.customer.address
          }</p>
                <p id="quantity_${e.id
          }" class="text-gray-600 text-lg">수량 : ${e.quantity.toLocaleString(
            'ko-KR',
          )}개</p>
                <p id="total_price${e.id
          }" class="text-gray-600 text-lg">총 금액 : ${e.totalPrice.toLocaleString(
            'ko-KR',
          )}원</p>
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

// status 변경 (버튼 클릭 시 색깔 + 멘트 변경 : 배달중 -> 배달완료)
function changeBtnName(btnElement) {
  const socket = new WebSocket('ws://localhost:8080');

  socket.onopen = function () {
    // 연결이 성공적으로 이루어지면 메시지 전송
    const buttonId = btnElement.id;
    const buttonIdArr = buttonId.split('_');
    const id = buttonIdArr[buttonIdArr.length - 1];

    if (btnElement.innerText === '배달중') {
      const data = { status: '배달완료' };
      axios.patch(`/api/orders/${id}`, data, { /* ... */ })
        .then((response) => {
          alert(response.data.message);
          socket.send("배달완료");
          // location.reload();

        })
        .catch((error) => alert(error.response.data.message));
    }

    if (btnElement.innerText === '배달전') {
      const data = { status: '배달중' };
      axios.patch(`/api/orders/${id}`, data, { /* ... */ })
        .then((response) => {
          alert(response.data.message);
          socket.send("배달중");
          // location.reload();
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  socket.onerror = function (error) {
    console.log("WebSocket Error: ", error);
  };
}