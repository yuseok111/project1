const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const db = require("./../db.js");
const { json } = require("express");

//////////////
router.get("/", (req, res) => {
  res.render("my_project");
});

router.get("/movieFom", (req, res) => {
  res.render("movieFom");
});
router.get("/movieForm_write", (req, res) => {
  res.render("movieForm_write");
});

//// 공지사항 뷰어페이지 연결
router.get("/Notice_sub", (req, res) => {
  let id = req.query.id;
  db.getMemoByid(id, (row) => {
    res.render("Notice_sub", { row: row[0] });
  });
});

//// 공지사항 리스트페이지
router.get("/Notice", (req, res) => {
  db.getMemo((rows) => {
    res.render("Notice", { rows: rows });
  });
});
//영화서브페이지
router.get("/sub", (req, res) => {
  res.render("sub");
});
////////////////////로그인
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/writeLogin", (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let ids = param["named"];
  let pws = param["passwordd"];
  db.logincheck(ids, pws, (results) => {
    if (results.length > 0) {
      res.send(
        `<script>alert("${ids}님 환영합니다!"); document.location.href="/"</script>`
      );
    } else {
      res.send(
        `<script>alert("로그인 정보를 확인하세요"); document.location.href="/login"</script>`
      );
    }
  });
});
/////////////////////////////////작성페이지
router.get("/Notice_write", (req, res) => {
  res.render("Notice_write");
});

router.post("/writeMemo", (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let name = param["name"];
  let title = param["title"];
  let cont = param["content"];
  let time = param["time"];
  let pw = param["pw"];
  console.log(cont);
  console.log(title);
  console.log(name);
  console.log(pw);
  db.insertMemo(cont, name, title, () => {
    res.redirect("/Notice");
  });
});

///상세페이지에 수정버튼 추가후 연결 수정버튼 ////

router.get("/updateM", (req, res) => {
  let id = req.query.id;
  db.getMemoByid(id, (row) => {
    res.render("Notice_writeRe", { row: row[0] });
  });
});
///상세페이지에 삭제버튼 추가후 연결 삭제버튼 ////
router.get("/deleteM", (req, res) => {
  let id = req.query.id;
  db.deleteByid(id, () => {
    res.redirect("/Notice");
  });
});

///수정페이지 연결
router.post("/updatess", (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let id = param["id"];
  let name = param["name"];
  let title = param["title"];
  let content = param["content"];
  db.updateMemo(id, name, title, content, () => {
    res.redirect("/Notice");
  });
});

///회원가입 연결///
router.get("/join", (req, res) => {
  res.render("join");
});

router.post("/writeJoin", (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let names = param["names"];
  let mail = param["mail"];
  let data = param["birth"];
  let ids = param["ids"];
  let pws = param["pws"];
  let pw_test = param["repws"];
  console.log(names);
  console.log(mail);
  console.log(data);
  console.log(ids);
  console.log(pws);
  console.log(pw_test);
  db.Joins(names, mail, data, ids, pws, pw_test, () => {
    res.redirect("/");
  });
});
///////게시판 끝////

//썸네일페이지제작
//파일생성
// try {
//   fs.readFileSync("../public/uploads/"); //폴더가 이쓰연 사용
// } catch (err) {
//   console.log("폴더가 존재하지 않습니다.");
//   fs.mkdirSync("../public/uploads/"); //폴더를 생성
// }
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      // done(null,'../public/uploads/');
      //업로드 위치 바꿈 기존의 node bin/www 폴더로 연결되게
      done(null, "../public/uploads/");
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 1024 * 1024 * 2 },
});

router.get("/movieFom", (req, res) => {
  //페이지 명 입력
  db.getproduct((rows) => {
    res.render("movieFom", { rows: rows });
  });
});
router.get("/movieForm_write", (req, res) => {
  res.render("movieForm_write");
});
//productw -> thumwrite 파일의 폼 액션명
router.post("/movie_write", upload.single("thumpro_img"), (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let thumpro_img = "uploads/" + req.file.filename;
  //input name에 작성한 이름으로 연결
  let thumpro_name = param["thumpro_name"];
  let thumpro_tag = param["thumpro_tag"];
  db.insertproduct(thumpro_img, thumpro_name, thumpro_tag, () => {
    res.redirect("/movieFom");
  });
});
//삭제될 deletePro thumbnail 파일의 버튼에 있음
router.get("/deletePro", (req, res) => {
  let id = req.query.id;
  console.log(id);
  db.deleteByidpro(id, () => {
    res.redirect("/movieFom");
  });
});
//수정될 updatePro thumbnail 파일의 버튼에 있음
router.get("/updatePro", (req, res) => {
  let id = req.query.id;
  console.log(id);
  db.getproByid(id, (row) => {
    //memoTable의 row의 0번째 즉 id를 지칭
    //row 한줄만 불러올때
    res.render("updata_product_write", { row: row[0] });
  });
});
// upproductw 썸네일 updata_product_write -> 폼 액션명 연결 수정페이지
router.post("/upproductw", upload.single("thumpro_img_re"), (req, res) => {
  let param = JSON.parse(JSON.stringify(req.body));
  let up_thumpro_img = "uploads/" + req.file.filename;
  let up_thumpro_id = param["up_thumpro_id"];
  let up_thumpro_name = param["thumpro_img_re"];
  let up_thumpro_tag = param["thumpro_tag_re"];
  db.updateprowrite(
    up_thumpro_img,
    up_thumpro_id,
    up_thumpro_name,
    up_thumpro_tag,
    () => {
      res.redirect("/movieFom");
    }
  );
});

module.exports = router;
