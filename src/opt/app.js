"use strict";!function(){var s={init:function(){s.timer(),s.mode(),"true"==localStorage.getItem("thunder-mode")&&(document.body.classList.add("dark"),document.querySelector("#mode span").innerText="Light mode")},timer:function(){var e=document.querySelector("#time"),t=e.querySelector(".clock"),o=e.querySelector(".day"),n=new Date,c=n.getHours(),r=n.getMinutes(),a=n.getDay(),d=n.getSeconds(),u=n.getMonth(),i=n.getDate();o.innerText="".concat(["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"][a]," ").concat(1==i?"1th":2==i?"2nd":3==i?"3rd":i+"th"," ").concat(["January","February","March","April","May","June","July","August","September","October","November","December"][u]),t.innerText="".concat(c<10?"0"+c:c,":").concat(r<10?"0"+r:r,".").concat(d<10?"0"+d:d),c<=6||19<=c?document.body.classList.add("night"):document.body.classList.remove("night"),setTimeout(s.timer,1e3)},mode:function(){var e=document.querySelector("#mode").querySelector("button");e.addEventListener("click",function(){document.body.classList.toggle("dark"),document.body.classList.contains("dark")?e.querySelector("span").textContent="Light mode":e.querySelector("span").textContent="Dark mode",localStorage.setItem("thunder-mode",document.body.classList.contains("dark"))})}};s.init()}();