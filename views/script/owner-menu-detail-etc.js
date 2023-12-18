// 옵션 추가 버튼
// document
//   .getElementById('createInputBtn')
//   .addEventListener('click', function () {
//     const $inputContainer = document.getElementById('inputContainer');

//     let temp_html = `
//     <div>
//       <div>옵션 종류</div>
//       <div class="option-wrapper">
//         <input type="radio" id="radio" name="group_option" value="라디오" checked>
//         <label for="option1">1개 선택</label><br>

//         <input type="radio" id="check" name="group_option" value="체크">
//         <label for="option2">다중 선택</label><br>

//         <input type="radio" id="quantity" name="group_option" value="수량">
//         <label for="option3">수량</label><br>
//       </div>
//       <div>옵션명 :</div>
//       <input type="text" class="form-control">
//       <div id="menu-options-wrapper" class="menu-options-wrapper">
//         <div id="menu_option_wrapper_1">
//           <div>옵션 정보 1</div>
//           <div id="menu_option_1" class="menu-option-wrapper">
//             <input type="text" class="form-control">
//             <button id="option_create_btn_1" type="button" onclick="clickCreateOptionBtn(this)">+</button>
//             <button id="option_delete_btn_1" type="button" onclick="clickDeleteOptionBtn(this)">-</button>
//           </div>
//         </div>
//       </div>
//     </div>
//     <hr>
//     `;
//     $inputContainer.insertAdjacentHTML('beforeend', temp_html);
//   });

// 옵션 항목 추가 버튼
// 코드가 이렇게까지 더러워야 될 일인가????????????
// 추후에 변수명 등 코드 수정 필요하겠다 씨앙..
// function clickCreateOptionBtn(clickedButton) {
//   // 선택한 옵션의 index 가져오기
//   // 버튼에 @@_1 같은 id 설정한 후 1을 가져오는 과정
//   const buttonIndexArr = clickedButton.id.split('_');
//   const buttonIndex = Number(buttonIndexArr[buttonIndexArr.length - 1]);
//   const $selectMenuOption = document.getElementById(`menu_option_wrapper_${buttonIndex}`); // 옵션이 추가될 div

//   // 옵션을 중간에 추가했을 때 추가하는 위치에 넣어주기 위한 작업
//   // 옵션의 최대 index를 ids 배열에 넣어주기
//   const elements = document.getElementsByClassName('menu-option-wrapper');
//   let ids = [];

//   for (const element of elements) {
//     const idArr = element.id.split('_'); // 옵션의 index 추출
//     const id = Number(idArr[idArr.length - 1]); // split으로 분리된 배열의 마지막 값을 id에 할당하기
//     ids.push(id);
//   }

//   // ids 배열 정렬하기
//   ids.sort(function (a, b) {
//     return a - b;
//   });
//   const id = ids[ids.length - 1]; // ids 배열의 마지막 값(큰 값)을 id에 할당하기

//   let temp_html = `
//     <div id="menu_option_wrapper_${id + 1}">
//       <div>옵션 정보 ${id + 1}</div>
//       <div id="menu_option_${id + 1}" class="menu-option-wrapper">
//         <input type="text" class="form-control">
//         <button id="option_create_btn_${id + 1}" type="button" onclick="clickCreateOptionBtn(this)">+</button>
//         <button id="option_delete_btn_${id + 1}" type="button" onclick="clickDeleteOptionBtn(this)">-</button>
//       </div>
//     </div>
//   `;
//   $selectMenuOption.insertAdjacentHTML('afterend', temp_html);
// }

// 삭제 버튼을 눌렀을 때 실행하는 함수
function clickDeleteOptionBtn(clickedButton) {
  event.stopPropagation(); // tr에 설정된 onclick 이벤트 실행 중단
  const buttonIndex = clickedButton.id; // 클릭한 버튼의 ID 가져오기
  const buttonIndexArr = buttonIndex.split('_'); // 버튼 ID 쪼개기
  const id = buttonIndexArr[buttonIndexArr.length - 1]; // 버튼 ID 쪼갠거에서 마지막 값인 id 값 가져오기
  document.getElementById(`menu_option_wrapper_${id}`).remove();
}

// 페이지 로드 시 히스토리 항목 추가
window.onload = function () {
  history.pushState(null, null, location.href);
};

window.onpopstate = function (event) {
  const storeId = sessionStorage.getItem('storeId'); // 세션 스토리지 매장 번호 값 조회
  window.location.href = `/owner-menu-list.html?id=${storeId}`;
};