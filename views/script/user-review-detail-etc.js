const $id_select_star_grade = document.getElementById(
  'review_select_star_grade',
);
const $starLabels = document.querySelectorAll(
  '.review_star_grade_wrapper label',
);

// 별점 계산
$starLabels.forEach((label, index) => {
  label.addEventListener('mouseover', () => {
    // console.log("이벤트 발생!");
    // 선택 별점 초기화
    for (let i = 4; i > index; i--) {
      $starLabels[i].style.backgroundImage = 'url("../img/star_n.png")';
      $id_select_star_grade.innerText = index + 1;
    }
    // 선택 별점 표시
    for (let i = 0; i <= index; i++) {
      $starLabels[i].style.backgroundImage = 'url("../img/star_y.png")';
      $id_select_star_grade.innerText = index + 1;
    }
  });
});

// 이미지 미리보기 함수;
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

// 페이지 로드 시 히스토리 항목 추가
window.onload = function () {
  history.pushState(null, null, location.href);
};

window.onpopstate = function (event) {
  window.location.href = '/user-order-list.html';
};