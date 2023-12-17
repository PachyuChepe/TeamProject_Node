// 주문하기 버튼을 눌렀을 때 실행하는 함수
// 저장 : 주문
function clickCreateBtn(clickedButton) {
  // 버튼 ID에서 메뉴 ID 추출
  const buttonId = clickedButton.id;
  const id = buttonId.split('_')[2];

  // 선택한 메뉴의 수량과 가격 가져오기
  const quantityInput = document.getElementById(`quantity_input_${id}`);
  const quantity = parseInt(quantityInput.value, 10);
  const originalPrice = Number(
    document.getElementById(`price_${id}`).getAttribute('data-original-price'),
  );

  // 총 가격 계산
  const totalPrice = originalPrice * quantity;

  // 주문 데이터 설정
  const data = {
    menuId: id,
    status: '배달전',
    quantity: quantity,
    totalPrice: totalPrice,
  };

  // 주문 데이터를 서버로 전송
  axios
    .post('/api/orders', data, {
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      withCredentials: true,
    })
    .then(() => alert('주문이 완료되었습니다.'))
    .catch((error) => console.error('오류 발생:', error));
}

// 수량 증가 버튼 함수
function clickIncleaseBtn(clickedButton) {
  // 버튼 ID에서 메뉴 ID 추출
  const buttonId = clickedButton.id;
  const id = buttonId.split('_')[2];

  // 수량 증가 및 총 가격 업데이트
  const quantityInput = document.getElementById(`quantity_input_${id}`);
  quantityInput.value = parseInt(quantityInput.value, 10) + 1;
  updateTotalPrice(id);
}

// 수량 감소 버튼 함수
function clickDecreaseBtn(clickedButton) {
  // 버튼 ID에서 메뉴 ID 추출
  const buttonId = clickedButton.id;
  const id = buttonId.split('_')[2];

  // 수량 감소 및 총 가격 업데이트
  const quantityInput = document.getElementById(`quantity_input_${id}`);
  const currentValue = parseInt(quantityInput.value, 10);
  if (currentValue > 1) {
    quantityInput.value = currentValue - 1;
    updateTotalPrice(id);
  }
}

// 총 가격 업데이트 함수
function updateTotalPrice(menuId) {
  // 가격 엘리먼트 및 수량 입력값 가져오기
  const priceElement = document.getElementById(`price_${menuId}`);
  const quantityInput = document.getElementById(`quantity_input_${menuId}`);

  // 총 가격 계산 및 표시
  const originalPrice = Number(
    priceElement.getAttribute('data-original-price'),
  );
  const quantity = parseInt(quantityInput.value, 10);
  const totalPrice = (originalPrice * quantity).toLocaleString();
  priceElement.textContent = `${totalPrice}원`;
}
