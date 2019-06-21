(()=>{
    let solarRatio = 0
    const app = {
        init:()=>{
            const solarBox = document.querySelector(".solar-box")
            app.timer()
            app.mode()
            if(localStorage.getItem("thunder-mode") == "true"){
                document.body.classList.add("dark")
                document.querySelector("#mode span").innerText = "Light mode"
            }
            window.addEventListener("resize",e=>{
                solarRatio = solarBox.clientWidth > window.innerWidth && (window.innerWidth/solarBox.clientWidth)
            })
            window.onload = ()=>{
                solarRatio = solarBox.clientWidth > window.innerWidth && (window.innerWidth/solarBox.clientWidth)
            }
        },
        timer:()=>{
            const
                timeCont = document.querySelector("#time"),
                clockCont = timeCont.querySelector(".clock"),
                dayCont = timeCont.querySelector(".day"),
                days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
                months = ["January","February","March","April","May","June","July","August","September","October","November","December"],
                date = new Date(),
                h = date.getHours(),
                m = date.getMinutes(),
                d = date.getDay(),
                s = date.getSeconds(),
                mo= date.getMonth(),
                da= date.getDate()

            dayCont.innerText = `${days[d]} ${da == 1 ? "1th" : da == 2 ? "2nd" : da == 3 ? "3rd" : da +"th" } ${months[mo]}`
            clockCont.innerText = `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}.${s < 10 ? "0" + s : s}`

            h <= 6 || h >= 18 ? document.body.classList.add("night") : document.body.classList.remove("night")

            app.sundial((h/23))

            setTimeout(
                app.timer
            ,100)
        },
        mode:()=>{
            const
                changeCont = document.querySelector("#mode"),
                changeButt = changeCont.querySelector("button")

            changeButt.addEventListener("click",()=>{
                document.body.classList.toggle("dark")
                changeButt.querySelector("span").textContent = document.body.classList.contains("dark") ? "Light mode" :  "Dark mode"
                localStorage.setItem("thunder-mode",document.body.classList.contains("dark"))
            })
        },
        sundial:(prcnt)=>{
            const 
                path = document.querySelector(".solar-box .line path"),
                celestial = document.querySelector(".solar-box .icon")
            
            let
                pathTotal = Math.floor(path.getTotalLength()),
                pathLeft = pathTotal * (solarRatio != false ? solarRatio*.6 : .8),
                pathOffset = (pathTotal-pathLeft)/2,
                point = path.getPointAtLength(pathOffset+(prcnt*pathLeft))
            
            celestial.style.transform = `translate(${Math.floor(point.x-24)}px,${Math.floor(point.y-24)}px)`
            celestial.style.opacity = 1
        }
    }
    app.init()
})()