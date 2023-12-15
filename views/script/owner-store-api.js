// 조회 : 매장 정보 (매장 수정일 경우)
// 브라우저가 열렸을 때 실행
document.addEventListener('DOMContentLoaded', function () {
  // 쿼리 스트링 id 받아오기(iframe를 사용하지 않을 경우)
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  // 업종 콤보박스 조회
  axios
    .get(`/api/food-category`, {
      withCredentials: true,
    })
    .then((res) => {
      const foodCategory = res.data.foodCategory;
      updateComboBox(foodCategory);
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });

  // 조회 : 매장 정보 (매장 수정일 경우)
  if (id) {
    axios
      .get(`/api/store/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        const store = res.data.data;
        // 기존 input란에 API 반환값 참조
        document.getElementById('name').value = store.name;
        document.getElementById('description').value = store.description;
        document.getElementById('food_category').value = store.categoryId;
        document.getElementById('storeaddresses').value = store.storeaddresses;
        document.getElementById('businesslicense').value =
          store.businesslicense;
      })
      .catch((error) => {
        console.error('오류 발생:', error);
      });
  }
});

// 콤보박스 업데이트
function updateComboBox(foodCategory) {
  const comboBox = document.getElementById('food_category');
  // 데이터의 각 항목에 대해 반복
  foodCategory.forEach((item) => {
    // 새로운 <option> 요소 생성
    const option = document.createElement('option');
    option.value = item.id; // 콤보 박스에 표시할 값
    option.textContent = item.name; // 콤보 박스에 표시할 문구

    // 콤보박스에 옵션 추가
    comboBox.appendChild(option);
  });
}

// 저장 : 매장 정보
function submitCreateForm() {
  // API로 전달할 값 JSON으로 설정
  const data = {
    name: document.getElementById('name').value,
    storedescription: document.getElementById('description').value,
    categoryId: document.getElementById('food_category').value,
    foodtype: document.getElementById('food_category').value, // 추후 삭제 예정
    storeaddresses: document.getElementById('storeaddresses').value, // 추후 삭제 예정
    businesslicense: document.getElementById('businesslicense').value,
  };

  axios
    .post('/api/createstore', data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
    .then((res) => {
      alert('저장이 완료되었습니다.');
      window.parent.location.href = `/owner-store-edit.html?id=${res.data.data.id}`;
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });
}

// 수정 : 매장 정보
function submitUpdateForm() {
  // 쿼리 스트링 id 받아오기(iframe를 사용하지 않을 경우)
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  // API로 전달할 값 JSON으로 설정
  const data = {
    name: document.getElementById('name').value,
    storedescription: document.getElementById('description').value,
    categoryId: document.getElementById('food_category').value,
    foodtype: document.getElementById('food_category').value, // 추후 삭제 예정
    storeaddresses: document.getElementById('storeaddresses').value, // 추후 삭제 예정
    businesslicense: document.getElementById('businesslicense').value,
  };

  axios
    .put(`/api/updatestore/${id}`, data, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
    .then((res) => {
      alert('수정이 완료되었습니다.');
      location.reload(); // 페이지 새로고침
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });
}

// 삭제 : 매장 정보
// 매장가 존재할 경우에만 동작하도록 수정 필요
function submitDeleteForm() {
  // 쿼리 스트링 id 받아오기(iframe를 사용하지 않을 경우)
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  axios
    .delete(`/api/deletestore/${id}`, {
      withCredentials: true,
    })
    .then((res) => {
      // 삭제하기 전에 정말 삭제할거에요? 알림창으로 하자!
      alert('삭제가 완료되었습니다.');
      window.parent.location.href = 'owner-store-create.html'; // 사장 가게 등록 페이지 이동
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });
}
