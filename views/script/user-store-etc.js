// 담기 버튼을 눌렀을 때 실행하는 함수
// 저장 : 주문
function clickCreateBtn(clickedButton) {
  event.stopPropagation(); // tr에 설정된 onclick 이벤트 실행 중단
  const buttonId = clickedButton.id; // 클릭한 버튼의 ID 가져오기
  const buttonIdArr = buttonId.split('_'); // 버튼 ID 쪼개기
  const id = buttonIdArr[buttonIdArr.length - 1]; // 버튼 ID 쪼갠거에서 마지막 값인 id 값 가져오기
  const $price = document.getElementById(`price_${id}`).textContent;
  const $quantity = document.getElementById(`quantity_input_${id}`).value;
  // API로 전달할 값 JSON으로 설정
  const data = {
    menuId: id,
    status: "배달전",
    quantity: $quantity,
    totalPrice: $price * $quantity,
  };

  axios
    .post('http://localhost:4000/api/orders', data, {
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      withCredentials: true,
    })
    .then((res) => {
      alert('주문이 완료되었습니다.');
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });
}

function clickIncleaseBtn(clickedButton) {
  const buttonId = clickedButton.id; // 클릭한 버튼의 ID 가져오기
  const buttonIdArr = buttonId.split('_'); // 버튼 ID 쪼개기
  const id = buttonIdArr[buttonIdArr.length - 1]; // 버튼 ID 쪼갠거에서 마지막 값인 id 값 가져오기

  const quantityInput = document.getElementById(`quantity_input_${id}`);
  const currentValue = parseInt(quantityInput.value, 10);
  quantityInput.value = currentValue + 1;
};

function clickDecreaseBtn(clickedButton) {
  const buttonId = clickedButton.id; // 클릭한 버튼의 ID 가져오기
  const buttonIdArr = buttonId.split('_'); // 버튼 ID 쪼개기
  const id = buttonIdArr[buttonIdArr.length - 1]; // 버튼 ID 쪼갠거에서 마지막 값인 id 값 가져오기

  const quantityInput = document.getElementById(`quantity_input_${id}`);
  const currentValue = parseInt(quantityInput.value, 10);
  if (currentValue > 0) { // 수량이 0보다 클 때만 감소
    quantityInput.value = currentValue - 1;
  }
};