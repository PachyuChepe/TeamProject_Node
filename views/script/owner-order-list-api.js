// 브라우저가 열렸을 때 실행
document.addEventListener('DOMContentLoaded', function () {
  const $menu_list = document.getElementById('menu_list');
  // 쿼리 스트링 id 받아오기(iframe를 사용하지 않을 경우)
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  console.log(id);
  axios
    .get(`/api/orders/store/${id}`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log('response: ', response);
      // API 실행결과를 response로 받아와서 html 그려주기
      response.data.data.forEach((e, idx) => {
        let temp_html = `
        <div class="bg-white shadow-md rounded-lg overflow-hidden mb-6 flex">
          <img src="${e.menu.imageUrl}" alt="Wine" class="w-80 h-48 object-cover" />
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
                <p id="user_name_${e.id}" class="text-gray-600 text-lg">고객명 : ${e.customer.name}</p>
                <p id="address_${e.id}" class="text-gray-600 text-lg">고객 주소 : ${e.customer.address}</p>
                <p id="quantity_${e.id}" class="text-gray-600 text-lg">수량 : ${e.quantity.toLocaleString('ko-KR',)}개</p>
                <p id="total_price${e.id}" class="text-gray-600 text-lg">총 금액 : ${e.totalPrice.toLocaleString('ko-KR',)}원</p>
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
  const buttonId = btnElement.id; // 클릭한 버튼의 ID 가져오기
  const buttonIdArr = buttonId.split('_'); // 버튼 ID 쪼개기
  const id = buttonIdArr[buttonIdArr.length - 1]; // 버튼 ID 쪼갠거에서 마지막 값인 id 값 가져오기

  // 배달 중, 배달 완료로 변경되도록 수정
  if (btnElement.innerText === "배달중") {
    const data = {
      status: "배달완료"
    };
    axios
      .patch(`/api/orders/${id}`, data, {
        headers: {
          headers: { 'Content-Type': 'application/json' },
        },
        withCredentials: true,
      })
      .then((res) => {
        alert('배달이 완료되었습니다.');
        location.reload();
      })
      .catch((error) => console.error('오류 발생:', error));
  }
  if (btnElement.innerText === "배달전") {
    const data = {
      status: "배달중"
    };
    axios
      .patch(`/api/orders/${id}`, data, {
        headers: {
          headers: { 'Content-Type': 'application/json' },
        },
        withCredentials: true,
      })
      .then((res) => {
        alert('배달이 시작되었습니다.');
        location.reload();
      })
      .catch((error) => console.error('오류 발생:', error));
  }



}
