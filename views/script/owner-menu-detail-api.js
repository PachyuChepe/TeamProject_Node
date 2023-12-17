// 메뉴 정보 조회 (수정 시)
let storeId;
document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  if (id) {
    axios
      .get(`/api/menu/${id}`, { withCredentials: true })
      .then((res) => {
        const menu = res.data.data[0];
        storeId = menu.storeId;
        document.getElementById('name').value = menu.name;
        document.getElementById('description').value = menu.description;
        document.getElementById('price').value = menu.price;

        // 이미지 미리보기
        if (menu.imageUrl) {
          const imagePreview = document.getElementById('imagePreview');
          imagePreview.style.backgroundImage = `url(${menu.imageUrl})`;
          imagePreview.style.backgroundSize = 'cover';
          imagePreview.style.backgroundPosition = 'center';
        }
      })
      .catch((error) => console.error('오류 발생:', error));
  }
});

// 메뉴 정보 조회 (수정 시)
document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  if (id) {
    axios
      .get(`/api/menu/${id}`, { withCredentials: true })
      .then((res) => {
        const menu = res.data.data[0];
        document.getElementById('name').value = menu.name;
        document.getElementById('description').value = menu.description;
        document.getElementById('price').value = menu.price;
        // 이미지 미리보기 (이미지 URL이 제공된 경우)
        if (menu.imageUrl) {
          const imagePreview = document.getElementById('imagePreview');
          imagePreview.style.backgroundImage = `url(${menu.imageUrl})`;
          imagePreview.style.backgroundSize = 'cover';
          imagePreview.style.backgroundPosition = 'center';
        }
      })
      .catch((error) => console.error('오류 발생:', error));
  }
});

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

// 메뉴 저장 함수
function submitCreateForm() {
  const formData = new FormData();
  const imageFile = document.getElementById('imageUpload').files[0];

  // 이미지 파일 추가
  if (imageFile) {
    formData.append('imageUrl', imageFile);
  }

  // 다른 필드도 formData 객체에 추가
  formData.append('name', document.getElementById('name').value);
  formData.append('description', document.getElementById('description').value);
  formData.append('price', document.getElementById('price').value);

  axios
    .post('/api/menu', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })
    .then((response) => {
      alert(response.data.message);
      window.location.href = `/owner-menu-detail.html?id=${res.data.data.id}`;
    })
    .catch((error) => alert(error.response.data.message));
}

// 메뉴 수정 함수
function submitUpdateForm() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const formData = new FormData();
  const imageFile = document.getElementById('imageUpload').files[0];

  // 이미지 파일이 있으면 추가
  if (imageFile) {
    formData.append('imageUrl', imageFile);
  }

  // 다른 필드 추가
  formData.append('name', document.getElementById('name').value);
  formData.append('description', document.getElementById('description').value);
  formData.append('price', document.getElementById('price').value);

  axios
    .put(`/api/menu/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    })
    .then((response) => {
      alert(response.data.message);
      location.reload(); // 페이지 새로고침
    })
    .catch((error) => alert(error.response.data.message));
}

// 메뉴 삭제
function submitDeleteForm() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  axios
    .delete(`/api/menu/${id}`, { withCredentials: true })
    .then((response) => {
      alert(response.data.message);
      window.location.href = `/owner-menu-list.html?id=${storeId}`;
    })
    .catch((error) => alert(error.response.data.message));
}
