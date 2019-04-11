"use strict";

(function () {
  var app = {
    init: function init() {
      app.timer();
      app.mode();

      if (localStorage.getItem("thunder-mode") == "true") {
        document.body.classList.add("dark");
        document.querySelector("#mode span").innerText = "Light mode";
      }
    },
    timer: function timer() {
      var timeCont = document.querySelector("#time"),
          clockCont = timeCont.querySelector(".clock"),
          dayCont = timeCont.querySelector(".day"),
          days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var date = new Date(),
          h = date.getHours(),
          m = date.getMinutes(),
          d = date.getDay(),
          s = date.getSeconds(),
          mo = date.getMonth(),
          da = date.getDate();
      dayCont.innerText = "".concat(days[d], " ").concat(da == 1 ? "1th" : da == 2 ? "2nd" : da == 3 ? "3rd" : da + "th", " ").concat(months[mo]);
      clockCont.innerText = "".concat(h < 10 ? "0" + h : h, ":").concat(m < 10 ? "0" + m : m, ".").concat(s < 10 ? "0" + s : s);
      h <= 6 || h >= 19 ? document.body.classList.add("night") : document.body.classList.remove("night");
      setTimeout(app.timer, 1000);
    },
    mode: function mode() {
      var changeCont = document.querySelector("#mode"),
          changeButt = changeCont.querySelector("button");
      changeButt.addEventListener("click", function () {
        document.body.classList.toggle("dark");
        document.body.classList.contains("dark") ? changeButt.querySelector("span").textContent = "Light mode" : changeButt.querySelector("span").textContent = "Dark mode";
        localStorage.setItem("thunder-mode", document.body.classList.contains("dark"));
      });
    }
  };
  app.init();
})();