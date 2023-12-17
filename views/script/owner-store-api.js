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
      .get(`/api/store/${id}`, { withCredentials: true })
      .then((res) => {
        const store = res.data.data;
        // 기존 input란에 API 반환값 참조
        document.getElementById('name').value = store.name;
        document.getElementById('description').value = store.description;
        document.getElementById('food_category').value = store.categoryId;
        document.getElementById('storeaddresses').value = store.storeaddresses;
        document.getElementById('businesslicense').value =
          store.businesslicense;

        // 이미지 미리보기 설정
        if (store.imageUrl) {
          const imagePreview = document.getElementById('imagePreview');
          imagePreview.style.backgroundImage = `url(${store.imageUrl})`;
          imagePreview.style.backgroundSize = 'cover';
          imagePreview.style.backgroundPosition = 'center';
        }
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
  const formData = new FormData();
  const imageFile = document.getElementById('imageUpload').files[0];

  // 이미지 파일 추가
  formData.append('imageUrl', imageFile);

  // 다른 필드도 formData 객체에 추가
  formData.append('name', document.getElementById('name').value);
  formData.append(
    'storedescription',
    document.getElementById('description').value,
  );
  formData.append('categoryId', document.getElementById('food_category').value);
  formData.append('foodtype', document.getElementById('food_category').value);
  formData.append(
    'storeaddresses',
    document.getElementById('storeaddresses').value,
  );
  formData.append(
    'businesslicense',
    document.getElementById('businesslicense').value,
  );

  axios
    .post('/api/createstore', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })
    .then((response) => {
      alert(response.data.message);
      window.parent.location.href = `/owner-store-edit.html?id=${response.data.data.id}`;
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
}

// 이미지 미리보기 함수
function previewImage(event) {
  const reader = new FileReader();
  reader.onload = function () {
    const output = document.getElementById('imagePreview');
    output.style.backgroundImage = `url(${reader.result})`;
    output.style.backgroundSize = 'cover';
    output.style.backgroundPosition = 'center';
  };
  reader.readAsDataURL(event.target.files[0]);
}

// 수정 : 매장 정보
function submitUpdateForm() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const imageFile = document.getElementById('imageUpload').files[0];

  const formData = new FormData();
  if (imageFile) {
    formData.append('imageUrl', imageFile); // 이미지 파일 추가
  }

  // 다른 필드 추가
  formData.append('name', document.getElementById('name').value);
  formData.append(
    'storedescription',
    document.getElementById('description').value,
  );
  formData.append('categoryId', document.getElementById('food_category').value);
  formData.append('foodtype', document.getElementById('food_category').value); // 추후 삭제 예정
  formData.append(
    'storeaddresses',
    document.getElementById('storeaddresses').value,
  ); // 추후 삭제 예정
  formData.append(
    'businesslicense',
    document.getElementById('businesslicense').value,
  );

  axios
    .put(`/api/updatestore/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })
    .then((response) => {
      alert(response.data.message);
      location.reload(); // 페이지 새로고침
    })
    .catch((error) => {
      alert(error.response.data.message);
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
    .then((response) => {
      // 삭제하기 전에 정말 삭제할거에요? 알림창으로 하자!
      alert(response.data.message);
      window.parent.location.href = 'owner-store-create.html'; // 사장 가게 등록 페이지 이동
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
}
