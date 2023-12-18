// 브라우저가 열렸을 때 실행
document.addEventListener('DOMContentLoaded', function () {
  // 쿼리 스트링 id 받아오기(iframe를 사용하지 않을 경우)
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const $reviewContainer = document.getElementById('review_container');

  axios
    .get(`/api/reviews/store/${id}`, {
      withCredentials: true,
    })
    .then((response) => {
      const reviews = response.data.data;
      console.log('reviews: ', reviews);
      let count;
      // API 실행결과를 response로 받아와서 html 그려주기
      reviews.forEach((e, idx) => {
        count++;
        const imgHref = e.imageUrl === null ? '../img/temp-img.png' : e.imageUrl;

        let temp_html = `

        <div class="p-4 border-b border-gray-200">
          <div class="flex justify-between items-center px-2 py-0 sm:px-6"> 
            <div>
              <div class="font-semibold" style="font-size: 30px;">${e.order.customer.name}님</div>
              <div class="font-semibold text-lg text-gray-600">${e.order.menu.name}</div>
              <div class="text-xs text-gray-500">${formatDateString(e.createdAt)}</div>
            </div>

          </div>
        </div>
        <div id="review_wrapper_${e.id}" class="flex items-center pl-7">
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

        <div class="flex items-center px-9 text-sm mt-2">
          <p>${e.comment}</p>
        </div>
        <div class="mt-2 user-review-img mb-20">
        <img
        src="${imgHref}"
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