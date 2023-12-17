// 페이지 로드 시 실행되는 함수
document.addEventListener('DOMContentLoaded', function () {
  // 리뷰 버튼에 클릭 이벤트 추가
  const reviewButton = document.getElementById('reviewButton');
  reviewButton.addEventListener('click', function () {
    // 현재 URL에서 id 쿼리 파라미터 추출
    const urlParams = new URLSearchParams(window.location.search);
    const storeId = urlParams.get('id');

    // user-review-edit.html 페이지로 리디렉션하면서 id 값을 전달
    window.location.href = `user-review-edit.html?id=${storeId}`;
  });

  // URL에서 매장 ID 추출
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const $menu_list = document.getElementById('menu_list');

  // 매장 정보 요청 및 처리
  axios
    .get(`/api/store/${id}`, { withCredentials: true })
    .then((res) => {
      // 매장 정보 표시
      document.getElementById('store_img').src = res.data.data.imageUrl;
      document.getElementById('food_type').textContent =
        res.data.data.category.name;
      document.getElementById('store_name').textContent = res.data.data.name;
      document.getElementById('store_address').textContent =
        res.data.data.storeaddresses;
      document.getElementById('store_description').textContent =
        res.data.data.description;
    })
    .catch((error) => console.error('오류 발생:', error));

  // 메뉴 목록 요청 및 처리
  axios
    .get(`/api/menu?storeId=${id}&category=name&order=desc`, {
      withCredentials: true,
    })
    .then((response) => {
      // 메뉴 목록 표시
      response.data.data.forEach((e) => {
        console.log(e, '뭐임');
        const formattedPrice = Number(e.price).toLocaleString();
        let temp_html = `
          <div class="bg-white shadow-md rounded-lg overflow-hidden mb-6">
            <img src=${e.imageUrl} alt="Wine" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h3 class="text-lg font-semibold">${e.name}</h3>
              <h3 class="text-lg font-semibold">${e.description}</h3>
              <p id="price_${e.id}" class="text-gray-700" data-original-price="${e.price}">${formattedPrice}원</p>
              <div class="px-6 py-4">
                <div class="flex items-center justify-center">
                  <button id="decrease_button_${e.id}" onclick="clickDecreaseBtn(this)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l">-</button>
                  <input id="quantity_input_${e.id}" type="text" class="text-center border-t border-b border-blue-500 font-bold py-2" value="1" readonly>
                  <button id="increase_button_${e.id}" onclick="clickIncleaseBtn(this)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">+</button>
                </div>
              </div>
              <button id="order_btn_${e.id}" type="button" onclick="clickCreateBtn(this)" class="order_btn w-full bg-blue-500 text-white mt-4 py-2 rounded hover:bg-blue-600 focus:outline-none">주문하기</button>
            </div>
          </div>`;
        $menu_list.insertAdjacentHTML('beforeend', temp_html);
      });
    })
    .catch((error) => console.error('오류 발생:', error));
});
