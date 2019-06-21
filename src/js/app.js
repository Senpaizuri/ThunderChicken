"use strict";

(function () {
  var solarRatio = 0;
  var app = {
    init: function init() {
      var solarBox = document.querySelector(".solar-box");
      app.timer();
      app.mode();

      if (localStorage.getItem("thunder-mode") == "true") {
        document.body.classList.add("dark");
        document.querySelector("#mode span").innerText = "Light mode";
      }

      window.addEventListener("resize", function (e) {
        solarRatio = solarBox.clientWidth > window.innerWidth && window.innerWidth / solarBox.clientWidth;
      });

      window.onload = function () {
        solarRatio = solarBox.clientWidth > window.innerWidth && window.innerWidth / solarBox.clientWidth;
      };
    },
    timer: function timer() {
      var timeCont = document.querySelector("#time"),
          clockCont = timeCont.querySelector(".clock"),
          dayCont = timeCont.querySelector(".day"),
          days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          date = new Date(),
          h = date.getHours(),
          m = date.getMinutes(),
          d = date.getDay(),
          s = date.getSeconds(),
          mo = date.getMonth(),
          da = date.getDate();
      dayCont.innerText = "".concat(days[d], " ").concat(da == 1 ? "1th" : da == 2 ? "2nd" : da == 3 ? "3rd" : da + "th", " ").concat(months[mo]);
      clockCont.innerText = "".concat(h < 10 ? "0" + h : h, ":").concat(m < 10 ? "0" + m : m, ".").concat(s < 10 ? "0" + s : s);
      h <= 6 || h >= 18 ? document.body.classList.add("night") : document.body.classList.remove("night");
      app.sundial(h / 23);
      setTimeout(app.timer, 100);
    },
    mode: function mode() {
      var changeCont = document.querySelector("#mode"),
          changeButt = changeCont.querySelector("button");
      changeButt.addEventListener("click", function () {
        document.body.classList.toggle("dark");
        changeButt.querySelector("span").textContent = document.body.classList.contains("dark") ? "Light mode" : "Dark mode";
        localStorage.setItem("thunder-mode", document.body.classList.contains("dark"));
      });
    },
    sundial: function sundial(prcnt) {
      var path = document.querySelector(".solar-box .line path"),
          celestial = document.querySelector(".solar-box .icon");
      var pathTotal = Math.floor(path.getTotalLength()),
          pathLeft = pathTotal * (solarRatio != false ? solarRatio * .6 : .8),
          pathOffset = (pathTotal - pathLeft) / 2,
          point = path.getPointAtLength(pathOffset + prcnt * pathLeft);
      celestial.style.transform = "translate(".concat(Math.floor(point.x - 24), "px,").concat(Math.floor(point.y - 24), "px)");
      celestial.style.opacity = 1;
    }
  };
  app.init();
})();