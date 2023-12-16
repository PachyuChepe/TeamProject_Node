// status 변경 (버튼 클릭 시 색깔 + 멘트 변경 : 배달중 -> 배달완료)
function changeBtnName(btnElement) {
  const html =
    '<div style="color:white; background-color: brown;"> 배달완료 </div>';

  btnElement.innerHTML = html;
}
