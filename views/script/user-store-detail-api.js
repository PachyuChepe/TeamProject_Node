// 조회 : 매장 정보 (매장 수정일 경우) / 메뉴
// 브라우저가 열렸을 때 실행
document.addEventListener('DOMContentLoaded', function () {
  // 쿼리 스트링 id 받아오기
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const $menu_list = document.getElementById('menu_list');

  // 조회 : 매장 정보 (매장 수정일 경우)
  axios
    .get(`/api/store/${id}`, {
      withCredentials: true,
    })
    .then((res) => {
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
    .get(`/api/menu?storeId=${id}&category=name&order=desc`, {
      withCredentials: true,
    })
    .then((response) => {
      // API 실행결과를 response로 받아와서 html 그려주기
      // <tr class="hover-effect" onclick="location.href='/owner-menu-detail.html?id=${e.id}'"> // 메뉴 상세정보 조회 기능을 구현할 경우 생성!!!
      response.data.data.forEach((e, idx) => {
        let temp_html = `
        <div class="bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <img
            src="https://source.unsplash.com/random/?wine"
            alt="Wine"
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <h3 class="text-lg font-semibold">${e.name}</h3>
            <p id="price_${e.id}" class="text-gray-700">${e.price}</p>

            <div class="px-6 py-4">
            <div class="flex items-center justify-center">
                <button id="decrease_button_${e.id}" onclick="clickDecreaseBtn(this)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l">
                    -
                </button>
                <input id="quantity_input_${e.id}" type="text" class="text-center border-t border-b border-blue-500 font-bold py-2" value="1" readonly>
                <button id="increase_button_${e.id}" onclick="clickIncleaseBtn(this)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
                    +
                </button>
            </div>
        </div>

            <button id="delete_btn_${e.id}" type="button" onclick="clickCreateBtn(this)"
              class="delete_btn w-full bg-blue-500 text-white mt-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
            >
              주문하기
            </button>
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
