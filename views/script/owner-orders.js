// Example data array (This should be dynamically generated or fetched from a server in a real application)
const orders = [
  {
    orderNumber: '0001',
    customerName: '홍길동',
    menuName: '김치볶음밥',
    amount: '8000원',
    orderStatus: '',
    cancelOrder: '주문취소',
  },
  {
    orderNumber: '0002',
    customerName: '최순애',
    menuName: '팥빙수',
    amount: '8000원',
    cancelOrder: '주문취소',
  },
  {
    orderNumber: '0003',
    customerName: '심청이',
    menuName: '돼지불백',
    amount: '7500원',
    cancelOrder: '주문취소',
  },
  {
    orderNumber: '0004',
    customerName: '김첨지',
    menuName: '순대국',
    amount: '7500원',
    cancelOrder: '주문취소',
  },
  {
    orderNumber: '0005',
    customerName: '죄인',
    menuName: '사약',
    amount: '0원',
    cancelOrder: '주문취소',
  },
  // ... more order data ...
];

// Function to create an order box
function createOrderBox(order) {
  const box = document.createElement('div');
  box.className = 'order-box';
  box.innerHTML = `
                    <div class="order-item orderNumber">${
                      order.orderNumber
                    }</div>
                    <div class="order-item customerName">${
                      order.customerName
                    }</div>
                    <div class="order-item menuName">${order.menuName}</div>
                    <div class="order-item amount">${order.amount}</div>
                    <div class="order-item orderStatus"><button type="button" class="
                      ${order.orderStatus === '배달완료' ? 'completed' : ''}">
                      ${
                        order.orderStatus !== '배달완료'
                          ? '배달중'
                          : order.orderStatus
                      }</button></div>
                    <div class="spacer"></div>
                    <div class="order-item cancelOrder"><button type="button">${
                      order.cancelOrder
                    }</button></div>`;

  const statusButton = box.querySelector('.orderStatus button');
  if (order.orderStatus !== '배달완료') {
    statusButton.addEventListener('click', function () {
      this.innerText = '배달완료';
      this.classList.add('completed');
      this.disabled = true; // 버튼을 비활성화하여 추가 클릭 방지
    });
    return box;
  }
}

// Insert order boxes into the container
const orderContainer = document.getElementById('orderContainer');
orders.forEach((order) => {
  orderContainer.appendChild(createOrderBox(order));
});
