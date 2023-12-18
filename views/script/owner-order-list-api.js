document.addEventListener('DOMContentLoaded', function () {
  const $menu_list = document.getElementById('menu_list');
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  axios
    .get(`/api/orders/store/${id}`, { withCredentials: true })
    .then((response) => {
      response.data.data.forEach((e) => {
        const isDisabled = e.status === '주문취소' ? 'disabled' : '';
        let temp_html = `
          <div class="bg-white shadow-md rounded-lg overflow-hidden mb-6 flex">
            <img src="${
              e.menu.imageUrl
            }" alt="Menu Image" class="w-80 h-48 object-cover" />
            <div class="flex flex-col justify-between p-4 w-full">
              <div class="flex justify-between">
                <div class="w-full">
                  <div class="flex justify-between">
                    <h3 class="font-semibold text-gray-700 text-2xl font-bold">메뉴명 : ${
                      e.menu.name
                    }</h3>
                    <div class="flex">
                      <select id="status_${
                        e.id
                      }" class="form-select mr-2" onchange="changeOrderStatus(this, ${
                        e.id
                      })"${isDisabled}>
                        <option value="배달전" ${
                          e.status === '배달전' ? 'selected' : ''
                        }>배달전</option>
                        <option value="배달중" ${
                          e.status === '배달중' ? 'selected' : ''
                        }>배달중</option>
                        <option value="배달완료" ${
                          e.status === '배달완료' ? 'selected' : ''
                        }>배달완료</option>
                        <option value="주문취소" ${
                          e.status === '주문취소' ? 'selected' : ''
                        }>주문취소</option>
                      </select>
                    </div>
                  </div>
                  <p class="text-gray-600 text-lg">고객명 : ${
                    e.customer.name
                  }</p>
                  <p class="text-gray-600 text-lg">고객 주소 : ${
                    e.customer.address
                  }</p>
                  <p class="text-gray-600 text-lg">수량 : ${e.quantity.toLocaleString(
                    'ko-KR',
                  )}개</p>
                  <p class="text-gray-600 text-lg">총 금액 : ${e.totalPrice.toLocaleString(
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

function changeOrderStatus(selectElement, orderId) {
  const selectedStatus = selectElement.value;

  axios
    .patch(
      `/api/orders/${orderId}`,
      { status: selectedStatus },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      },
    )
    .then((response) => {
      if (selectedStatus === '주문취소') {
        selectElement.disabled = true;
      }
      alert(`주문 상태가'${selectedStatus}'(으)로 변경되었습니다.`);
      location.reload(); // 상태 변경 후 페이지 새로고침
    })
    .catch((error) => {
      alert('주문 상태 변경에 실패했습니다.');
      console.error(error);
    });
}
