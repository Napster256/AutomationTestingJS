import http from "k6/http";
export default function () {
  http.get("http://ya.ru");
  console.log("Welcome Yandex");
  http.get("http://test.k6.io");
  console.log("Welcome k6 test page");
}
