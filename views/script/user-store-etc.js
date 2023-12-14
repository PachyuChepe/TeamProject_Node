// 담기 버튼을 눌렀을 때 실행하는 함수
// 저장 : 장바구니
function clickDeleteBtn(clickedButton) {
  event.stopPropagation(); // tr에 설정된 onclick 이벤트 실행 중단
  const buttonId = clickedButton.id; // 클릭한 버튼의 ID 가져오기
  const buttonIdArr = buttonId.split('_'); // 버튼 ID 쪼개기
  const id = buttonIdArr[buttonIdArr.length - 1]; // 버튼 ID 쪼갠거에서 마지막 값인 id 값 가져오기
  const ownerId = 3;

  axios
    .delete(`http://localhost:4000/api/menu/${id}/${ownerId}`, {
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