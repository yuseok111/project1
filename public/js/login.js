// function valid_check() {
//   /* 필수입력 이름,이메일로 합니다. */
//   const frm = document.forms[0];
//   const name_ = frm.name; /* name 속성 확인!! */
//   const email_ = frm.email;
//   const password_ = frm.password;
//   let isValid = true;
//   const temp = email_.value; //자주 사용될 것은 변수로 저장.
//   if (name_.value == "") {
//     alert("이름 입력은 필수입니다.");
//     name_.focus();
//     isValid = false; /* 적절하지 못한값에 대한 표시 */
//   } else if (password_.value.length < 6) {
//   /* 패스워드 길이 검사 : 패스워드 길이는 6글자 이상 */
//     alert("패스워드는 6글자 이상입니다.");
//     password_.focus(); //포커스(커서) 이동하기
//     isValid = false;
//   } else if (email_.value == "") {
//     alert("이메일 입력은 필수 입니다.");
//     email_.focus();
//     isValid = false;
//   } else if (
//     !(temp.endsWith(".net") || temp.endsWith(".com")) ||
//     temp.indexOf("@") <= 0
//   ) {
//     //아래 1)과 2)를 동시에 만족하는 경우가 통과이므로 그 반대로 조건식 작성하세요.
//     alert("이메일 형식이 잘못되었습니다.");
//     email_.focus();
//     isValid = false;
//   }
}
