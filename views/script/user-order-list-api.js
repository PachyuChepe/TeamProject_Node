// 브라우저가 열렸을 때 실행
document.addEventListener('DOMContentLoaded', function () {
  // 쿼리 스트링 id 받아오기
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const $menu_list = document.getElementById('menu_list');

  axios
    .get(`/api/orders/user`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log('response: ', response);
      let count;
      // API 실행결과를 response로 받아와서 html 그려주기
      response.data.data.forEach((e, idx) => {
        count++;
        const review = e.review && e.review.length > 0 && e.review[idx] ? e.review[0].id : '';
        const btnHref = e.review && e.review.length > 0 && e.review[idx] ?
          `user-review-edit.html?storeId=${e.menu.store.id}&id=${review}` : `user-review-create.html?storeId=${e.menu.store.id}`;
        const comment = (e.review && e.review.length > 0 && e.review[idx]) ? e.review[idx].comment : "리뷰 작성 전";
        const editBtnText = comment === '리뷰 작성 전' ? '리뷰 작성하기' : '리뷰 수정하기';
        const editBtnHidden = e.status === '배달완료' ? '' : 'hidden';
        let temp_html = `
        <div class="bg-white shadow-md rounded-lg overflow-hidden mb-6 flex">
          <img src="${e.menu.imageUrl}" alt="Wine" class="w-80 h-48 object-cover" />
          <div class="flex flex-col justify-between p-4 w-full">
            <div class="flex justify-between">
              <div class="w-full">
                <div class="flex justify-between">
                  <h3 class="font-semibold text-gray-700 text-2xl font-bold">${e.menu.store.name}</h3>
                  <div class="flex items-center">
                    <button type="button" class="text-lg bg-white text-blue-500 ${editBtnHidden} mr-4" 
                    onclick="location.href='${btnHref}'">
                      ${editBtnText}
                    </button>
                    <div class="text-lg bg-white text-red-500">${e.status}</div> 
                  </div>
                </div>
                <p class="font-semibold text-gray-600 text-lg">메뉴명 : ${e.menu.name}</p>
                <p id="quantity_${e.id}" class="text-gray-600 text-lg">수량 : ${e.quantity.toLocaleString('ko-KR',)}개</p>
                <p id="total_price${e.id}" class="text-gray-600 text-lg">총 금액 : ${e.totalPrice.toLocaleString('ko-KR',)}원</p>
                <p id="total_price${e.id}" class="text-gray-600 text-lg">리뷰</p>
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
                <p id="total_price${e.id}" class="text-gray-600 text-lg">${comment}</p>
              </div>
            </div>
          </div>
        </div>
        `;
        $menu_list.insertAdjacentHTML('beforeend', temp_html);

        // 별점 표시
        const rating = (e.review && e.review.length > 0 && e.review[idx]) ? e.review[idx].rating : 0;
        const starScore = rating;
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
