"use strict";

(function () {
  var app = {
    init: function init() {
      app.timer();
      app.mode();

      if (localStorage.getItem("thunder-mode") == "true") {
        document.body.classList.add("dark");
        document.querySelector("#mode span").innerText = "Light mode";
      } // window.addEventListener("resize",()=>{
      //     app.sundial()
      // })

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
    },
    sundial: function sundial(prcnt) {
      var path = document.querySelector(".solar-box .line path"),
          celestial = document.querySelector(".solar-box .icon");
      var pointPer = prcnt * Math.floor(path.getTotalLength()),
          point = path.getPointAtLength(pointPer);
      celestial.setAttribute("style", "transform: translate(".concat(Math.floor(point.x - 14), "px,").concat(Math.floor(point.y - 14), "px);"));
    }
  };
  app.init();
})();