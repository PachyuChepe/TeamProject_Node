// 탭 변경 기능
function changeTab(tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName('tab-content');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
    tabcontent[i].classList.remove('active'); // active 클래스 제거
  }

  tablinks = document.getElementsByClassName('tab');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(
      ' bg-white text-indigo-600',
      ' bg-gray-100 text-gray-600',
    );
  }

  // 선택된 탭 활성화 및 active 클래스 추가
  var activeTabContent = document.getElementById(tabName + 'Tab');
  activeTabContent.style.display = 'block';
  activeTabContent.classList.add('active'); // active 클래스 추가

  // 탭 버튼 스타일 변경
  if (tabName === 'normal') {
    document.getElementById('normalTabBtn').className =
      'tab w-1/2 bg-white text-indigo-600 py-2';
    document.getElementById('businessTabBtn').className =
      'tab w-1/2 bg-gray-100 text-gray-600 py-2';
  } else {
    document.getElementById('businessTabBtn').className =
      'tab w-1/2 bg-white text-indigo-600 py-2';
    document.getElementById('normalTabBtn').className =
      'tab w-1/2 bg-gray-100 text-gray-600 py-2';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // 초기 상태 설정: 모든 입력 필드와 버튼을 비활성화
  setVerificationAndSignupFieldsEnabled(false);

  // 인증번호 전송 버튼 이벤트
  document.querySelectorAll('.send-verification-button').forEach((button) => {
    button.addEventListener('click', function (event) {
      showLoading(true); // 로딩 화면 표시
      const emailInput = event.target
        .closest('.tab-content')
        .querySelector('.email-input');
      const email = emailInput.value;
      axios
        .post('/api/request-verify', { email })
        .then((response) => {
          alert(response.data.message);
          onVerificationSent();
        })
        .catch((error) => {
          alert(error.response.data.message);
        })
        .finally(() => {
          showLoading(false); // 로딩 화면 숨김
        });
    });
  });

  // 인증번호 확인 버튼 이벤트
  document.querySelectorAll('.verify-verification-button').forEach((button) => {
    button.addEventListener('click', function (event) {
      const verificationInput = event.target
        .closest('.tab-content')
        .querySelector('.verification-input');
      const emailInput = event.target
        .closest('.tab-content')
        .querySelector('.email-input');
      const email = emailInput.value;
      const verificationCode = verificationInput.value;
      axios
        .post('/api/validate-verify', {
          email,
          verifyCode: verificationCode,
        })
        .then((response) => {
          alert(response.data.message);
          onVerificationConfirmed();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    });
  });

  // 회원가입 버튼 이벤트
  document.querySelectorAll('.signup-button').forEach((button) => {
    button.addEventListener('click', function (event) {
      const currentTab = event.target.closest('.tab-content');
      const email = currentTab.querySelector('.email-input').value;
      const password = currentTab.querySelector('.password-input').value;
      const confirmPassword = currentTab.querySelector(
        '.password-confirm-input',
      ).value;
      const name = currentTab.querySelector('.name-input').value;
      const role = getCurrentRole();
      axios
        .post('/api/signup', {
          email,
          password,
          confirmPassword,
          name,
          role,
        })
        .then((response) => {
          alert(response.data.message);
          window.location.href = '../index.html'; // 로그인 성공 시 페이지 이동
        })
        .catch((error) => {
          alert(error.response.data.message);
          resetOnSignupFailure(); // 오류 발생 시 초기화
        });
    });
  });
});

function getCurrentRole() {
  if (document.getElementById('normalTab').classList.contains('active')) {
    return '고객';
  } else {
    return '사장';
  }
}

function setVerificationAndSignupFieldsEnabled(
  isEnabled,
  isVerificationOnly = false,
) {
  document
    .querySelectorAll('.verification-input, .verify-verification-button')
    .forEach((el) => {
      el.disabled = !isEnabled;
    });
  if (!isVerificationOnly) {
    document
      .querySelectorAll(
        '.password-input, .password-confirm-input, .name-input, .signup-button',
      )
      .forEach((el) => {
        el.disabled = !isEnabled;
      });
  }
}

function onVerificationSent() {
  setVerificationAndSignupFieldsEnabled(true, true);
}

function onVerificationConfirmed() {
  // 인증번호 입력 및 확인 버튼 비활성화
  document
    .querySelectorAll('.verification-input, .verify-verification-button')
    .forEach((el) => {
      el.disabled = true;
    });

  // 나머지 필드 활성화
  setVerificationAndSignupFieldsEnabled(true);

  // 이메일 입력 필드와 인증번호 전송 버튼 비활성화
  document
    .querySelectorAll(
      '.email-input, .send-verification-button, .verification-input, .verify-verification-button',
    )
    .forEach((el) => {
      el.disabled = true;
    });
}

// 회원가입 실패 시 초기화 함수
function resetOnSignupFailure() {
  // 모든 필드 초기화 및 비활성화
  document
    .querySelectorAll(
      '.email-input, .verification-input, .password-input, .password-confirm-input, .name-input',
    )
    .forEach((el) => {
      el.value = '';
      el.disabled = true;
    });

  // 인증번호 확인 및 회원가입 버튼 비활성화
  document
    .querySelectorAll('.verify-verification-button, .signup-button')
    .forEach((el) => {
      el.disabled = true;
    });

  // 이메일 입력 필드와 인증번호 전송 버튼 활성화
  document
    .querySelectorAll('.email-input, .send-verification-button')
    .forEach((el) => {
      el.disabled = false;
    });
}

function showLoading(isLoading) {
  const loadingElement = document.getElementById('loading');
  if (isLoading) {
    loadingElement.classList.remove('hidden');
  } else {
    loadingElement.classList.add('hidden');
  }
}
