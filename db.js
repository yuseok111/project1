var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "1234",
  database: "seen",
  dateStrings: "date",
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected!");
});
//로그인연결//데이터
function logincheck(ids, pws, callback) {
  connection.query(
    `SELECT * FROM seen_join WHERE ids = '${ids}' AND pws = '${pws}'`,
    (err, results) => {
      if (err) throw err;
      callback(results);
    }
  );
}
// 회원가입 연결//데이터
function Joins(birth, names, mail, ids, pws, repws, callback) {
  connection.query(
    `INSERT INTO seen_join (birth, names, mail, ids, pws, repws) VALUES ('${birth}','${names}','${mail}','${ids}','${pws}','${repws}')`,
    (err) => {
      if (err) throw err;
      callback();
    }
  );
}

/// 테이블 추출
function getMemo(callback) {
  connection.query(
    "SELECT * FROM seen_notice ORDER BY id desc",
    (err, rows) => {
      if (err) throw err;
      callback(rows);
    }
  );
}

///테이블 데이터 입력
function insertMemo(cont, name, title, callback) {
  connection.query(
    `insert into seen_notice(create_time,name,title,content)values(NOW(),'${name}','${title}','${cont}')`,

    (err) => {
      if (err) throw err;
      callback();
    }
  );
}
//프라이머리키 일치하는 테이블만추출///
function getMemoByid(id, callback) {
  connection.query(`SELECT * FROM seen_notice WHERE id = ${id}`, (err, row) => {
    if (err) throw err;
    callback(row);
  });
}
//프라이머리키 일치하는 부분 수정set create_time= now()
function updateMemo(id, name, title, content, callback) {
  connection.query(
    `UPDATE seen_notice set create_time=now(),name='${name}',title='${title}',content='${content}' WHERE id =${id}`,
    (err) => {
      if (err) throw err;
      callback();
    }
  );
}
//프라이머리키 일치하는 부분 삭제
function deleteByid(id, callback) {
  connection.query(`DELETE FROM seen_notice WHERE id=${id}`, (err) => {
    if (err) throw err;
    callback();
  });
}
//프로덕트 테이블 추출
function getproduct(callback) {
  connection.query(`SELECT * FROM movie_for ORDER BY id`, (err, row) => {
    if (err) throw err;
    callback(row);
  });
}
//무비 라이트 데이터 추가
function insertproduct(thumpro_img, thumpro_name, thumpro_tag, callback) {
  connection.query(
    `INSERT INTO movie_for(create_time,img,name,tag) value 
  (NOW(),'${thumpro_img}','${thumpro_name}','${thumpro_tag}')`,
    (err) => {
      if (err) throw err;
      callback();
    }
  );
}
/// 테이블 무비 데이터 추출
function getproByid(id, callback) {
  connection.query(`SELECT * FROM movie_for WHERE id = ${id}`, (err, rows) => {
    if (err) throw err;
    callback(rows);
  });
}
//id일치하는 데이터 삭제
function deleteByidpro(id, callback) {
  connection.query(`DELETE FROM movie_for WHERE id=${id}`, (err) => {
    if (err) throw err;
    callback();
  });
}
function updateprowrite(
  thumpro_img_re,
  thumpro_name_re,
  thumpro_tag_re,
  callback
) {
  connection.query(
    `UPDATE movie_for SET create_time= now(),img='${thumpro_img_re}',title='${thumpro_name_re}',tag='${thumpro_tag_re}', WHERE id =${up_thumpro_id}`,
    (err) => {
      if (err) throw err;
      callback();
    }
  );
}

module.exports = {
  Joins,
  logincheck,
  getMemo,
  insertMemo,
  getMemoByid,
  updateMemo,
  deleteByid,
  getproduct,
  insertproduct,
  getproByid,
  deleteByidpro,
  updateprowrite,
};
