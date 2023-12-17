// 브라우저가 열렸을 때 실행
document.addEventListener('DOMContentLoaded', function () {
  const $reviewContainer = document.getElementById('review_container');

  axios
    .get(`/api/reviews/user`, {
      withCredentials: true,
    })
    .then((response) => {
      const reviews = response.data.data;
      let count;
      // API 실행결과를 response로 받아와서 html 그려주기
      reviews.forEach((e, idx) => {
        count++;
        let temp_html = `
        <div class="p-4 border-b border-gray-200">
          <div class="flex justify-between items-center px-2 py-0 sm:px-6"> 
            <div>
              <div class="font-semibold" style="font-size: 30px;">${e.order.menu.store.name}</div>
              <div class="text-xs text-gray-500">${formatDateString(e.createdAt)}</div>
            </div>
            <div class="flex">
            <button id="review_edit_btn_${e.id}" onclick="location.href='/user-review-edit.html?id=${e.id}'" 
            class="text-blue-600 hover:text-blue-800 transition-colors duration-150 mr-4">
              수정하기
            </button>
            <button id="delete_btn_${e.id}" class="delete_btn" type="button" onclick="clickDeleteBtn(this)"
            class="text-red-600 hover:text-red-800 transition-colors duration-150">
              삭제하기
            </button>
            </div>
          </div>
        </div>
        <div id="review_wrapper_${e.id}" class="flex items-center px-4">
          <div id="rating"></div>
          <div class="star_grade">
            <div class="review_comment_star_grade_wrapper${count}">
              <input type="radio" name="review_star_grade${count}" id="star1${count}" class="hidden_radio" value="1" />
              <label for="star1" class="custom_star"></label>
              <input type="radio" name="review_star_grade${count}" id="star2${count}" class="hidden_radio" value="2" />
              <label for="star2" class="custom_star"></label>
              <input type="radio" name="review_star_grade${count}" id="star3${count}" class="hidden_radio" value="3" />
              <label for="star3" class="custom_star"></label>
              <input type="radio" name="review_star_grade${count}" id="star4${count}" class="hidden_radio" value="4" />
              <label for="star4" class="custom_star"></label>
              <input type="radio" name="review_star_grade${count}" id="star5${count}" class="hidden_radio" value="5" />
              <label for="star5" class="custom_star"></label>
            </div>  
          </div>
        </div>

        <div class="flex items-center px-4 text-sm mt-2">
          <p>${e.comment}</p>
        </div>
        <div class="mt-2 user-review-img mb-20">
          <img
            src="https://source.unsplash.com/featured/?food"
            alt="Food"
            class="rounded-lg"
            style="height: 400px;"
          />
        </div>
        `;
        $reviewContainer.insertAdjacentHTML('beforeend', temp_html);

        // 별점 표시
        const starScore = e.rating;
        const reviewId = `review_wrapper_${e.id}`;
        const $starLabels = document.querySelectorAll(
          `#${reviewId} .custom_star`,
        );

        // 별점 초기화 및 적용
        $starLabels.forEach((label, index) => {
          if (index < starScore) {
            label.style.backgroundImage = 'url("../img/star_y.png")';
          } else {
            label.style.backgroundImage = 'url("../img/star_n.png")';
          }
          label.style.pointerEvents = 'none';
        });
      });
    })
    .catch((error) => {
      console.error('오류 발생:', error);
    });
});

// 삭제 버튼을 눌렀을 때 실행하는 함수
// 삭제 : 메뉴
function clickDeleteBtn(clickedButton) {
  event.stopPropagation(); // tr에 설정된 onclick 이벤트 실행 중단
  const buttonId = clickedButton.id; // 클릭한 버튼의 ID 가져오기
  const buttonIdArr = buttonId.split('_'); // 버튼 ID 쪼개기
  const id = buttonIdArr[buttonIdArr.length - 1]; // 버튼 ID 쪼갠거에서 마지막 값인 id 값 가져오기

  axios
    .delete(`/api/reviews/${id}`, {
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

// 날짜 변환 함수
function formatDateString(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? '오후' : '오전';

  hours = hours % 12;
  hours = hours ? hours : 12; // 0시는 12시로 표시

  // 두 자리 숫자로 맞추기
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${year}년 ${month}월 ${day}일 ${ampm} ${hours}시 ${minutes}분`;
}