btnPaintCLICKED = false;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;
canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;
ctx.fillStyle = "black";
let isDrawing = false;
let lastX = 0;
const colorPicker = document.getElementById("colorPicker")
const brushSize = document.getElementById("rangeBrush")
let lastY = 0;
let eraserCheck = false;
const btnSave = document.getElementById("btnSave");

let pos = 50;
let pos2 = 21

const initWidth = window.innerWidth;

function sidebarSize()
{
    document.getElementById("sidebar").style.width = 5 - ((window.innerWidth - initWidth) / 100) + "%";

    document.getElementById("headerBox").style.marginLeft = 7.5 + (5 - ((window.innerWidth - initWidth) / 100)) + ((window.innerWidth - initWidth) / 100) + "%";
}

function checkWidth()
{
    const warning = document.getElementById("warningScreen")

    if(window.innerWidth <= window.innerHeight)
    {
        warning.style.opacity = "1";
        warning.style.display = "block";
    }
    else
    {
        warning.style.opacity = "0";
        warning.style.display = "none";
    }
}












const introBox = document.getElementById("introBox")
const loraxIntro = document.getElementById("loraxIntro")
let frameIntro = 1
let frameIdle = 1
let currIntroFrame = 0
let currRowIntro = 0
let currColunaIntro = 0
let introXadd = 544
let introYadd = 460
let introCheck = false
let initMarginIntro = 35

let introTimer = setTimeout(() => 
    {
        loopIntro();
        animIntro();
    }, 85);

introTimer;

function loopIntro()
{
    introTimer = setTimeout(() => 
    {
        loopIntro();
        animIntro();
    }, 85);
    introTimer;
}


function animIntro()
{
    console.log("Y: " + currRowIntro + " X: " + currColunaIntro + " " + currIntroFrame)
    if(initMarginIntro != 5)
    {
        introBox.style.marginLeft = initMarginIntro + "%"
        initMarginIntro -= 5
    }
    loraxIntro.style.transform = "translateX(-" + currColunaIntro * introXadd + "px) translateY(-" + currRowIntro * introYadd + "px)"
    
    if(introCheck === true)
    {
        if(currIntroFrame === 19)
        {
            currIntroFrame = 13
        }
        else
        {
            currIntroFrame++
        }
    }
    else
    {
        if(currIntroFrame === 12)
        {
            introCheck = true
        }
        currIntroFrame++
    }

    if(currIntroFrame % 5 === 0 || currIntroFrame === 13)
    {
        if(currIntroFrame === 5)
        {
            currRowIntro = 1
            currColunaIntro = 0
        }
        else if(currIntroFrame === 10)
        {
            currRowIntro = 2
            currColunaIntro = 0
        }
        else if(currIntroFrame === 15)
        {
            currRowIntro = 3
            currColunaIntro = 0
        }
        else if(currIntroFrame === 0 || currIntroFrame === 13)
        {
            if(introCheck === true)
            {
                currRowIntro = 2
                currColunaIntro = 3
            }
            else
            {
                currRowIntro = 0
                currColunaIntro = 0
            }
        }
    }
    else
    {
        currColunaIntro++
    }

}














window.addEventListener('resize', sidebarSize)
window.addEventListener('resize', checkWidth)

colorPicker.addEventListener("input", (event) => 
{
    document.getElementById("brushpaintImg").style.filter = "drop-shadow(0px 105px 0" + event.target.value + ")";
});

const supportColorPicker = () => ('EyeDropper' in window);

const draw = (e) => 
{
    if (!isDrawing) 
    {
        return;
    }

    if(eraserCheck === true)
    {
        ctx.globalCompositeOperation="destination-out";
    }
    else
    {
        ctx.globalCompositeOperation="source-over";
        ctx.strokeStyle = colorPicker.value;
    }
    if(brushSize.value / 10 >= 5)
    {
        ctx.lineWidth = brushSize.value / 10 * ((brushSize.value / 10) / 5)
    }
    else
    {
        ctx.lineWidth = brushSize.value / 10
    }
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
    ctx.stroke();
}

canvas.addEventListener("mousedown", (e) => 
{
    if(btnPaintCLICKED == true)
    {
        isDrawing = true;
        lastX = e.clientX;
        lastY = e.clientY;
    }
});

canvas.addEventListener("mouseup", e => 
{
    isDrawing = false
    ctx.beginPath()
});

canvas.addEventListener("mousemove", draw);



const imgEraser = document.getElementById("eraserImg")

let timeE = 0;

function timerAnimE() 
{
    imgEraser.style.transform = "translateX(-" + (pos2 * timeE) + "px) translateY(-42px)"
    timeE++
}

function timerAnimBackE() 
{
    imgEraser.style.transform = "translateX(-" + (pos2 * timeE) + "px) translateY(-42px)"
    timeE--
}

function eraser()
{
    if(eraserCheck === false)
    {
        imgEraser.style.pointerEvents = "none";
        timeE = 0
        let timer = setInterval(timerAnimE, 100);
        setTimeout(() => {clearInterval(timer); imgEraser.style.pointerEvents = "auto";}, 400);
        eraserCheck = true;
    }
    else
    {
        imgEraser.style.pointerEvents = "none";
        timeE = 2
        let timer = setInterval(timerAnimBackE, 100);
        setTimeout(() => {clearInterval(timer); imgEraser.style.pointerEvents = "auto";}, 400);
        eraserCheck = false;
    }
}

const imgPicker = document.getElementById("pickerImg")

let timePI = 0;

function timerAnimPI() 
{
    imgPicker.style.transform = "translateX(-" + (pos2 * timePI) + "px) translateY(-21px)"
    timePI++
}

function timerAnimBackPI() 
{
    imgPicker.style.transform = "translateX(-" + (pos2 * timePI) + "px) translateY(-21px)"
    timePI--
}

function pickerColor()
{
    if(supportColorPicker) 
    {
        imgPicker.style.pointerEvents = "none";
        timePI = 0
        let timer = setInterval(timerAnimPI, 100);
        setTimeout(() => {clearInterval(timer); imgPicker.style.pointerEvents = "auto";}, 400);

        if(eraserCheck === true)
        {
            imgEraser.style.pointerEvents = "none";
            timeE = 2
            let timer = setInterval(timerAnimBackE, 100);
            setTimeout(() => {clearInterval(timer); imgEraser.style.pointerEvents = "auto";}, 400);
            eraserCheck = false;
        }

        const eyeDropper = new window.EyeDropper();
        eyeDropper.open()
        .then((result) => {
            imgPicker.style.pointerEvents = "none";
            timePI = 2
            let timer = setInterval(timerAnimBackPI, 100);
            setTimeout(() => {clearInterval(timer); imgPicker.style.pointerEvents = "auto";}, 400);

            colorPicker.value = result.sRGBHex;
            document.getElementById("brushpaintImg").style.filter = "drop-shadow(0px 105px 0" + result.sRGBHex + ")";
        })
    }
}

const imgClear = document.getElementById("clearImg")

let timeC = 0;

function timerAnimC() 
{
    if(timeC < 2 && timeC >= 0)
    {
        imgClear.style.transform = "translateX(-" + (21 + (pos2 * timeC)) + "px) translateY(-84px)"
    }
    else
    {
        imgClear.style.transform = "translateX(-" + (pos2 * (timeC - 3)) + "px) translateY(-105px)"
    }

    if(timeC < 5)
    {
        timeC++
    }
    else
    {
        timeC = 0
    }
}

function clearCanvas()
{
    imgClear.style.pointerEvents = "none";
    timeC = 0
    let timer = setInterval(timerAnimC, 100);
    canvas.style.opacity = "0";
    setTimeout(() => 
    {
        clearInterval(timer);
        imgClear.style.pointerEvents = "auto";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.opacity = "1";
    }, 700);
}

const imgSave = document.getElementById("saveImg")

let timeS = 0;

function timerAnimS() 
{
    imgSave.style.transform = "translateX(-" + (pos2 * timeS) + "px) translateY(-63px)"
    if(timeS < 2)
    {
        timeS++
    }
    else
    {
        timeS = 0
    }
}

function saveCanvas()
{
    btnSave.style.pointerEvents = "none"
    timeS = 0
    let timer = setInterval(timerAnimS, 100);
    setTimeout(() => {clearInterval(timer); imgSave.style.pointerEvents = "auto";}, 400);

    btnSave.href = canvas.toDataURL("image/png");
}

function backDraw()
{
    
}

function forwardDraw()
{
    
}


const imgPaintL = document.getElementById("brushlineImg")
const imgPaintP = document.getElementById("brushpaintImg")
const imgPaintF = document.getElementById("brushfillImg")

const btnPaint = document.getElementById("paintTool")

let timePA = 0;

function timerAnimPA() 
{
    imgPaintL.style.transform = "translateX(-" + (pos * timePA) + "px) translateY(-240%)"
    if(timePA == 0)
    {
        imgPaintP.style.transform = "translateX(50px) translateY(-240%)"
    }
    else
    {
        imgPaintP.style.transform = "translateX(-" + (pos * (timePA - 1)) + "px) translateY(-240%)"
    }
    imgPaintF.style.transform = "translateX(-" + (pos * timePA) + "px)"
    timePA++
}

function timerAnimBackPA() 
{
    imgPaintL.style.transform = "translateX(-" + (pos * timePA) + "px) translateY(-240%)"
    if(timePA == 0)
    {
        imgPaintP.style.transform = "translateX(50px) translateY(-240%)"
    }
    else
    {
        imgPaintP.style.transform = "translateX(-" + (pos * (timePA - 1)) + "px) translateY(-240%)"
    }
    imgPaintF.style.transform = "translateX(-" + (pos * timePA) + "px)"
    timePA--
}




function showTools()
{
    btnPaint.style.pointerEvents = "none"
    const toolBox = document.getElementById("tools");

    if(btnPaintCLICKED == false)
    {
        timePA = 0
        let timer = setInterval(timerAnimPA, 100);
        setTimeout(() => {clearInterval(timer); btnPaint.style.pointerEvents = "auto";}, 700);

        toolBox.style.marginTop = "20%";
        btnPaintCLICKED = true;
        canvas.style.pointerEvents = "auto";
    }
    else
    {
        timePA = 5
        let timer = setInterval(timerAnimBackPA, 100);
        setTimeout(() => {clearInterval(timer); btnPaint.style.pointerEvents = "auto";}, 700);

        toolBox.style.marginTop = "calc(100vh + 300px)";
        btnPaintCLICKED = false;
        canvas.style.pointerEvents = "none";
    }
}







//Darkmode


let darkmodeCheck = false;

const btnDark = document.getElementById("btnDarkmode")

const imgDark = document.getElementById("darkImg")

let timeD = 0;

function timerAnimD() 
{
    if(timeD < 3 && timeD >= 0)
    {
        imgDark.style.transform = "translateX(-" + (pos * timeD) + "px) translateY(0px)"
    }
    else if(timeD < 7 && timeD >= 0)
    {
        imgDark.style.transform = "translateX(-" + (pos * (timeD - 3)) + "px) translateY(-50px)"
    }
    else
    {
        imgDark.style.transform = "translateX(-" + (pos * (timeD - 8)) + "px) translateY(-100px)"
    }
    if(timeD < 9)
    {
        timeD++
    }
}

function timerAnimBackD() 
{
    if(timeD < 3 && timeD >= 0)
    {
        imgDark.style.transform = "translateX(-" + (pos * timeD) + "px) translateY(0px)"
    }
    else if(timeD < 7 && timeD >= 0)
    {
        imgDark.style.transform = "translateX(-" + (pos * (timeD - 3)) + "px) translateY(-50px)"
    }
    else
    {
        imgDark.style.transform = "translateX(-" + (pos * (timeD - 7)) + "px) translateY(-100px)"
    }
    timeD--
}

function darkmode()
{
    btnDark.style.pointerEvents = "none"
    document.body.classList.toggle("darkmode");

    if(darkmodeCheck === false)
    {
        timeD = 0
        let timer = setInterval(timerAnimD, 100);
        setTimeout(() => {clearInterval(timer); btnDark.style.pointerEvents = "auto";}, 900);

        document.getElementById("inicioImg").style.filter = "invert(100%)";
        document.getElementById("habImg").style.filter = "invert(100%)";
        document.getElementById("projImg").style.filter = "invert(100%)";
        document.getElementById("linkImg").style.filter = "invert(100%)";
        document.getElementById("optionsImg").style.filter = "invert(100%)";
        document.getElementById("darkImg").style.filter = "invert(100%)";
        document.getElementById("langImg").style.filter = "invert(100%)";
        document.getElementById("brushlineImg").style.filter = "invert(100%)";
        document.getElementById("brushfillImg").style.filter = "invert(100%)";
        document.getElementById("eraserImg").style.filter = "invert(100%)";
        document.getElementById("pickerImg").style.filter = "invert(100%)";
        document.getElementById("clearImg").style.filter = "invert(100%)";
        document.getElementById("saveImg").style.filter = "invert(100%)";
        document.getElementById("backImg").style.filter = "invert(100%)";
        document.getElementById("forwImg").style.filter = "invert(100%)";
        darkmodeCheck = true;
    }
    else
    {
        timeD = 7
        let timer = setInterval(timerAnimBackD, 100);
        setTimeout(() => {clearInterval(timer); btnDark.style.pointerEvents = "auto";}, 900);

        document.getElementById("inicioImg").style.filter = "none";
        document.getElementById("habImg").style.filter = "none";
        document.getElementById("projImg").style.filter = "none";
        document.getElementById("linkImg").style.filter = "none";
        document.getElementById("optionsImg").style.filter = "none";
        document.getElementById("darkImg").style.filter = "none";
        document.getElementById("langImg").style.filter = "none";
        document.getElementById("brushlineImg").style.filter = "none";
        document.getElementById("brushfillImg").style.filter = "none";
        document.getElementById("eraserImg").style.filter = "none";
        document.getElementById("pickerImg").style.filter = "none";
        document.getElementById("clearImg").style.filter = "none";
        document.getElementById("saveImg").style.filter = "none";
        document.getElementById("backImg").style.filter = "none";
        document.getElementById("forwImg").style.filter = "none";
        darkmodeCheck = false;
    }
}





//Animação Inicio

const imgInicio = document.getElementById("inicioImg")

let timeI = 0;

function timerAnim() 
{
    imgInicio.style.transform = "translateX(-" + (pos * timeI) + "px)"
    timeI++
}

function timerAnimBack() 
{
    imgInicio.style.transform = "translateX(-" + (pos * timeI) + "px)"
    timeI--
}

imgInicio.addEventListener("mouseover", (event) => 
{
    timeI = 0

    let timer = setInterval(timerAnim, 100);

    setTimeout(() => {clearInterval(timer);
        if(timeI != 6)
        {
            imgInicio.style.transform = "translateX(-" + (pos * 5) + "px)"
        }
    }, 600);
})

imgInicio.addEventListener("mouseout", (event) => 
{ 
    timeI = 4

    let timer = setInterval(timerAnimBack, 100);

    setTimeout(() => {clearInterval(timer);
        if(timeI != 0)
        {
            imgInicio.style.transform = "translateX(-" + (pos * 0) + "px)"
        }
    }, 600);
})


//Animação Habilidades


const imgHabilidades = document.getElementById("habImg")

let timeH = 0;

function timerAnimH() 
{
    if(timeH < 3 && timeH >= 0)
    {
        imgHabilidades.style.transform = "translateX(-" + (150 + (pos * timeH)) + "px) translateY(-150px)"
    }
    else
    {
        imgHabilidades.style.transform = "translateX(-" + (pos * (timeH - 3)) + "px) translateY(-200px)"
    }
    if(timeH < 6)
    {
        timeH++
    }
}

function timerAnimBackH() 
{
    if(timeH < 3 && timeH >= 0)
    {
        imgHabilidades.style.transform = "translateX(-" + (150 + (pos * timeH)) + "px) translateY(-150px)"
    }
    else
    {
        imgHabilidades.style.transform = "translateX(-" + (pos * (timeH - 3)) + "px) translateY(-200px)"
    }
    timeH--
}

imgHabilidades.addEventListener("mouseover", (event) => 
{
    timeH = 0

    let timer = setInterval(timerAnimH, 100);

    setTimeout(() => {clearInterval(timer);
        if(timeH != 6)
        {
            imgHabilidades.style.transform = "translateX(-" + (pos * (5 - 3)) + "px) translateY(-200px)"
        }
    }, 600);
})

imgHabilidades.addEventListener("mouseout", (event) => 
{ 
    timeH = 4

    let timer = setInterval(timerAnimBackH, 100);

    setTimeout(() => {clearInterval(timer);
        if(timeH != 0)
        {
            imgHabilidades.style.transform = "translateX(-" + (150 + (pos * 0)) + "px) translateY(-150px)"
        }
    }, 600);
})

//Animação Projetos


const imgProjetos = document.getElementById("projImg")

let timeP = 0;

function timerAnimP() 
{
    if(timeP < 4 && timeP >= 0)
    {
        imgProjetos.style.transform = "translateX(-" + (100 + (pos * timeP)) + "px) translateY(-100px)"
    }
    else
    {
        imgProjetos.style.transform = "translateX(-" + (pos * (timeP - 4)) + "px) translateY(-150px)"
    }
    if(timeP < 7)
    {
        timeP++
    }
}

function timerAnimBackP() 
{
    if(timeP < 4 && timeP >= 0)
    {
        imgProjetos.style.transform = "translateX(-" + (100 + (pos * timeP)) + "px) translateY(-100px)"
    }
    else
    {
        imgProjetos.style.transform = "translateX(-" + (pos * (timeP - 4)) + "px) translateY(-150px)"
    }
    timeP--
}

imgProjetos.addEventListener("mouseover", (event) => 
{
    timeP = 0

    let timer = setInterval(timerAnimP, 100);

    setTimeout(() => {clearInterval(timer);
        if(timeP != 7)
        {
            imgProjetos.style.transform = "translateX(-" + (pos * (6 - 4)) + "px) translateY(-150px)"
        }
    }, 700);
})

imgProjetos.addEventListener("mouseout", (event) => 
{ 
    timeP = 5

    let timer = setInterval(timerAnimBackP, 100);

    setTimeout(() => {clearInterval(timer);
        if(timeP != 0)
        {
            imgProjetos.style.transform = "translateX(-" + (100 + (pos * 0)) + "px) translateY(-100px)"
        }
    }, 700);
})


//Animação Links e Contato


const imgLink = document.getElementById("linkImg")

let timeL = 0;

function timerAnimL() 
{
    if(timeL < 6 && timeL >= 0)
    {
        imgLink.style.transform = "translateX(-" + (pos * timeL) + "px) translateY(-50px)"
    }
    else
    {
        imgLink.style.transform = "translateX(-" + (pos * (timeL - 6)) + "px) translateY(-100px)"
    }
    timeL++
}

function timerAnimBackL() 
{
    if(timeL < 6 && timeL >= 0)
    {
        imgLink.style.transform = "translateX(-" + (pos * timeL) + "px) translateY(-50px)"
    }
    else
    {
        imgLink.style.transform = "translateX(-" + (pos * (timeL - 6)) + "px) translateY(-100px)"
    }
    timeL--
}

imgLink.addEventListener("mouseover", (event) => 
{
    timeL = 0

    let timer = setInterval(timerAnimL, 100);

    setTimeout(() => {clearInterval(timer);
        if(timeP != 8)
        {
            imgLink.style.transform = "translateX(-" + (pos * (7 - 6)) + "px) translateY(-100px)"
        }
    }, 800);
})

imgLink.addEventListener("mouseout", (event) => 
{ 
    timeL = 6

    let timer = setInterval(timerAnimBackL, 100);

    setTimeout(() => {clearInterval(timer);
        if(timeP != 0)
        {
            imgLink.style.transform = "translateX(-" + (pos * 0) + "px) translateY(-50px)"
        }
    }, 800);
})

const modal = document.getElementById("modal")
const modalBox = document.getElementById("modalBox")
const modalText = document.getElementById("modalText")
const modalTitle = document.getElementById("modalTitle")
let modalCheck = false;

function timerModal() 
{
    if(modalCheck === false)
    {
        modalBox.style.marginBottom = "5%";
        modal.style.opacity = "0";
    }
    else
    {
        modalBox.style.marginBottom = "0";
        modal.style.opacity = "1";
    }
}

function abrirModal()
{
    modal.style.display = "block";
    modalCheck = true

    let timer = setInterval(timerModal, 100);

    setTimeout(() => {clearInterval(timer);}, 500);
}

const codeImg = document.getElementById("codeImg")

function info1()
{ 
    if(languageCheck === true)
    {
        modalTitle.innerText = "ART"
        modalText.innerText = "Art is basically what I've always done and what I do best. " +    
        "It's something I've been imporving on for over 10 years, and I only say that I have 99% experience. " +
        "because there's always something more to learn."
    }
    else
    {
        modalTitle.innerText = "ARTE"
        modalText.innerText = "Arte basicamente é o que eu faço desde sempre e que faço de melhor. " +
        "É algo que venho evoluindo ao longo de mais de 10 anos e só digo que tenho 99% de experiência " +
        "porque sempre tem algo a mais que se pode aprender."
    }

    codeImg.style.opacity = "0"
    abrirModal()
}

function info2()
{ 
    if(languageCheck === true)
    {
        modalTitle.innerText = "ANIMATION"
        modalText.innerText = "Animation has always been something I've appreciated and loved doing, " +
        "even though I don't animate very often, as it's very time-consuming. I don't have as " +
        "much experience in this area as I do in art itself, but it's definitely something I intend to improve more and more."
    }
    else
    {
        modalTitle.innerText = "ANIMAÇÃO"
        modalText.innerText = "Animação sempre foi algo que apreciei e amo fazer, por mais que eu não " +
        "faça com tanta frequência, pois é algo que demanda muito tempo. Eu não tenho tanta experiência nessa " +
        "área quanto a arte em si, mas com certeza é algo que pretendo melhorar cada vez mais."
    }
    
    codeImg.style.opacity = "0"
    abrirModal()
}

function info3()
{ 
    if(languageCheck === true)
    {
        modalTitle.innerText = "CODING"
        modalText.innerText = "Currently I have a basic programming experience, I always try " +
        "to research what I don't know and I feel that I can adapt with time to different languages. " +
        "The languages ​​I have the most experience with so far are mainly C#, HTML, CSS and Javascript."
    }
    else
    {
        modalTitle.innerText = "PROGRAMAÇÃO"
        modalText.innerText = "Atualmente eu tenho uma experiência básica de programação, sempre procuro " +
        "pesquisar aquilo que eu não sei e sinto que eu consigo me adaptar com o tempo com diferentes linguagens. " +
        "As linguagens que tenho mais experiência até o momento são, principalmente, C#, HTML, CSS e Javascript.";
    }

    codeImg.style.opacity = "0.05"
    abrirModal()
}

function info4()
{ 
    if(languageCheck === true)
    {
        modalTitle.innerText = "MUSIC"
        modalText.innerText = "This area is still a work in progress, I know a thing or " +
        "two about how to produce music, but I don't think I have enough experience to say " +
        "that it's something I know how to do, but I always try to practice composing something from time to time."
    }
    else
    {
        modalTitle.innerText = "MÚSICA"
        modalText.innerText = "Esta área ainda é um treinamento em processo, eu sei uma coisa ou " +
        "outra sobre como produzir uma música, mas não acho que eu tenha experiência suficiente para dizer que seja " +
        "algo que sei fazer, mas sempre tento praticar compondo alguma coisa de vez em quando."
    }

    codeImg.style.opacity = "0"
    abrirModal()
}

window.onclick = function(event) {
    if (event.target == modal)
    {
        modalCheck = false;

        let timer = setInterval(timerModal, 100);

        setTimeout(() => {clearInterval(timer); modal.style.display = "none";}, 500);
    }
}

let projCheck = false
let currProj = 0;
const boxProjFull = document.getElementById("boxprojFull")
let code = [1, 1, 2, 1, 2, 2, 1]
let codeCurr = 0;
let codeNum = 0
let codeCheck = true;

let timerLoop = setTimeout(() => {codeCheck = false; projForw();}, 30000);
timerLoop;

function loopForw()
{
    clearTimeout(timerLoop)
    timerLoop = setTimeout(() => {codeCheck = false; projForw();}, 30000);
    timerLoop;
}

function projCode()
{
    if(codeCurr !== code[codeNum])
    {
        codeNum = 0
    }
    else
    {
        codeNum++
    }

    if(codeNum === 7)
    {
        currProj = 2
    }
}

function timerProj()
{
    setTimeout(() =>
    {
        clearInterval();
        changeProj();
        if(projCheck === true)
        {
            boxProjFull.style.marginRight = "0"
            boxProjFull.style.marginLeft = "5%"
            document.getElementById("btnProj").style.marginLeft = "40vw"
        }
        else
        {
            boxProjFull.style.marginLeft = "0"
            boxProjFull.style.marginRight = "5%"
            document.getElementById("btnProj").style.marginLeft = "30vw"
        }
        document.getElementById("arrowProjLEFT").style.pointerEvents = "auto"
        document.getElementById("arrowProjRIGHT").style.pointerEvents = "auto"
        aftertimerProj()
    }, 250);
}

function aftertimerProj()
{
    setTimeout(() =>
    {
        boxProjFull.style.opacity = "1"
        boxProjFull.style.marginRight = "0"
        boxProjFull.style.marginLeft = "0"
        document.getElementById("btnProj").style.marginLeft = "35vw"
    }, 250);
}

function changesBeforeProj()
{
    if(codeCheck === true)
    {
        projCode()
    }
    else
    {
        codeCheck = true
    }
    opacitiesProj()
    document.getElementById("arrowProjLEFT").style.pointerEvents = "none"
    document.getElementById("arrowProjRIGHT").style.pointerEvents = "none"
    boxProjFull.style.opacity = "0"
}

function checkCurrProj()
{
    if(projCheck === true)
    {
        if(currProj === 0)
        {
            currProj = 1
        }
        else
        {
            currProj--
        }
    }
    else
    {
        if(currProj > 0)
        {
            currProj = 0
        }
        else
        {
            currProj++
        }
    }
}

function projBack()
{
    loopForw()
    if(codeCheck === true)
    {
        codeCurr = 1
    }
    projCheck = true;
    checkCurrProj()
    changesBeforeProj()
    boxProjFull.style.marginRight = "5%"
    document.getElementById("btnProj").style.marginLeft = "30vw"

    timerProj()
}

function projForw()
{
    loopForw()
    if(codeCheck === true)
    {
        codeCurr = 2
    }
    projCheck = false;
    checkCurrProj()
    changesBeforeProj()
    boxProjFull.style.marginLeft = "5%"

    timerProj()
}

function changeProj()
{
    let logo = document.getElementById("logoProj")
    let text = document.getElementById("textProj")
    let video = document.getElementById("videoProj")
    let anchor = document.getElementById("anchorProj")
    let btnProj = document.getElementById("btnProj")
    let extraText = document.getElementById("extraTextPROJ")
    let textbtnProj = document.getElementById("textbtnProj")

    if(currProj === 0)
    {
        logo.src = "images/smol_logo.png"
        document.getElementById("boxProj").style.width = "40%";

        if(languageCheck === true)
        {
            text.innerText = "SMOL is an animated series based on Battle For Dream Island." +
                "In this called \"object show\", 5 characters are teleported to a small room " +
                "by Atom and Microscope, the hosts of the show, with the proposal that they " +
                "participate in challenges to win a grand prize! In each episode, a challenge " +
                "occurs and one participant is eliminated, until only one remains!"
        }
        else
        {
            text.innerText = "SMOL é uma série de animação baseada na série Battle For Dream Island." +
                "Neste chamado \"object show\", 5 personagens são teleportados a um pequeno quarto " +
                "por Atom e Microscope, os apresentadores do show, com a proposta de que " +
                "eles participem de desafios para ganhar um grande prêmio! A cada episódio " +
                "ocorre um desafio e um participante é eliminado, até que sobre apenas um!";
        }

        video.src = "images/smol_video.mp4";
        video.style.width = "40%"
        anchor.href = "https://youtube.com/playlist?list=PLRUBjDrI1Ac5jN_I8ESneT5Mu0mUO5Bhd&si=RO4_973m7tf3S3wf"
        textbtnProj.innerHTML = "ASSISTA"
        btnProj.style.opacity = "1"
        extraText.style.opacity = "1"
    }
    else if(currProj === 1)
    {
        logo.src = "images/liml_logo.png"
        document.getElementById("boxProj").style.width = "40%";

        if(languageCheck === true)
        {
            text.innerText = "Initially just a gaming channel that started in 2020, " +
            "it is now a channel more focused on publishing my animations and series, " +
            "currently having over 1k subscribers and animations with over 10k views."
        }
        else
        {
            text.innerText =  "Inicialmente apenas como um canal de jogos que começou em 2020, é hoje um canal " +
            "mais focado em publicar minhas animações e séries, tendo atualmente mais de mil " + 
            "inscritos e animações com mais de 10 mil visualizações.";
        }

        video.src = "images/liml_video.mp4";
        video.style.width = "40%"
        anchor.href = "https://www.youtube.com/@LoraxinmyLife"
        textbtnProj.innerHTML = "ACESSAR"
        btnProj.style.opacity = "1"
    }
    else if(currProj === 2)
    {
        logo.src = "images/secret_logo.png"
        document.getElementById("boxProj").style.width = "87.5%";

        if(languageCheck === true)
        {
            text.innerText = "Soon";
        }
        else
        {
            text.innerText = "Em breve";
        }

        video.src = ""
        video.style.width = "0"
        anchor.href = ""
    }
}

function opacitiesProj()
{
    let btnProj = document.getElementById("btnProj")
    let extraText = document.getElementById("extraTextPROJ")

    if(currProj === 1)
    {
        extraText.style.opacity = "0"
    }
    else if(currProj === 2)
    {
        btnProj.style.opacity = "0"
        extraText.style.opacity = "0"
    }
}

let xiconCheck = false

function xiconClick()
{
    document.getElementById("twitIcon").style.width = "95px"
    document.getElementById("twitIcon").style.height = "95px"
    setTimeout(() =>
    {
        document.getElementById("twitIcon").style.width = "100px"
        document.getElementById("twitIcon").style.height = "100px"
    }, 100);
}

function xiconChange()
{
    if(xiconCheck === false)
    {
        document.getElementById("twitIcon").src = "images/twitter_icon.png"
        xiconCheck = true;
    }
    else
    {
        document.getElementById("twitIcon").src = "images/x_icon.png"
        xiconCheck = false;
    }
}



const artImg = document.getElementById("artImg")
const animImg = document.getElementById("animImg")
const progImg = document.getElementById("progImg")
const musicImg = document.getElementById("musicImg")

let frameArt = 0;
let frameAnim = 0;
let frameCode = 0;
let frameMusic = 0;

let loopAnim = setTimeout(() => 
    {
        loopAnimation();
        animArt();
        animAnim();
        animCode();
        animMusic();
    }, 100);

loopAnim;

function loopAnimation()
{
    loopAnim = setTimeout(() => 
    {
        loopAnimation();
        animArt();
        animAnim();
        animCode();
        animMusic();
    }, 100);
    loopAnim;
}

function animArt()
{
    if(frameArt === 0)
    {
        artImg.style.transform = "translateX(0px) translateY(0px)"
    }
    else if(frameArt === 1)
    {
        artImg.style.transform = "translateX(-233px) translateY(0px)"
    }
    else if(frameArt === 2)
    {
        artImg.style.transform = "translateX(-466px) translateY(0px)"
    }
    else if(frameArt === 3)
    {
        artImg.style.transform = "translateX(-233px) translateY(-335px)"
    }
    else if(frameArt === 4)
    {
        artImg.style.transform = "translateX(-233px) translateY(-335px)"
    }
    
    if(frameArt === 4)
    {
        frameArt = 0
    }
    else
    {
        frameArt++
    }
}

function animAnim()
{
    if(frameAnim === 0)
    {
        animImg.style.transform = "translateX(0px) translateY(0px)"
    }
    else if(frameAnim === 1)
    {
        animImg.style.transform = "translateX(-289px) translateY(0px)"
    }
    else if(frameAnim === 2)
    {
        animImg.style.transform = "translateX(-578px) translateY(0px)"
    }
    else if(frameAnim === 3)
    {
        animImg.style.transform = "translateX(-867px) translateY(0px)"
    }
    else if(frameAnim === 4)
    {
        animImg.style.transform = "translateX(-0px) translateY(-288px)"
    }
    else if(frameAnim === 5)
    {
        animImg.style.transform = "translateX(-289px) translateY(-288px)"
    }
    else if(frameAnim === 6)
    {
        animImg.style.transform = "translateX(-578px) translateY(-288px)"
    }
    
    if(frameAnim === 6)
    {
        frameAnim = 0
    }
    else
    {
        frameAnim++
    }
}

function animCode()
{
    if(frameCode === 0)
    {
        progImg.style.transform = "translateX(0px) translateY(0px)"
    }
    else if(frameCode === 1)
    {
        progImg.style.transform = "translateX(-366px) translateY(0px)"
    }
    else if(frameCode === 2)
    {
        progImg.style.transform = "translateX(0px) translateY(-324px)"
    }
    else if(frameCode === 3)
    {
        progImg.style.transform = "translateX(-366px) translateY(-324px)"
    }
    
    if(frameCode === 3)
    {
        frameCode = 0
    }
    else
    {
        frameCode++
    }
}

function animMusic()
{
    if(frameMusic === 0)
    {
        musicImg.style.transform = "translateX(0px) translateY(0px)"
    }
    else if(frameMusic === 1)
    {
        musicImg.style.transform = "translateX(-395px) translateY(0px)"
    }
    else if(frameMusic === 2)
    {
        musicImg.style.transform = "translateX(-790px) translateY(0px)"
    }
    else if(frameMusic === 3)
    {
        musicImg.style.transform = "translateX(-0px) translateY(-342px)"
    }
    else if(frameMusic === 4)
    {
        musicImg.style.transform = "translateX(-395px) translateY(-342px)"
    }
    else if(frameMusic === 5)
    {
        musicImg.style.transform = "translateX(-790px) translateY(-342px)"
    }
    
    if(frameMusic === 5)
    {
        frameMusic = 0
    }
    else
    {
        frameMusic++
    }
}





//Language

let languageCheck = false;

const btnLang = document.getElementById("btnLanguage")

const imgLanguage = document.getElementById("langImg")

let timeLA = 0;

function timerAnimLA() 
{
    if(timeLA < 2 && timeLA >= 0)
    {
        imgLanguage.style.transform = "translateX(-" + (50 + (pos * timeLA)) + "px) translateY(-100px)"
    }
    else
    {
        imgLanguage.style.transform = "translateX(-" + (pos * (timeLA - 3)) + "px) translateY(-150px)"
    }
    if(timeLA < 7)
    {
        timeLA++
    }
}

function timerAnimBackLA() 
{
    if(timeLA < 2 && timeLA >= 0)
    {
        imgLanguage.style.transform = "translateX(-" + (50 + (pos * timeLA)) + "px) translateY(-100px)"
    }
    else
    {
        imgLanguage.style.transform = "translateX(-" + (pos * (timeLA - 2)) + "px) translateY(-150px)"
    }
    timeLA--
}

function language()
{
    btnLang.style.pointerEvents = "none"

    if(languageCheck === false)
    {
        timeLA = 0
        let timer = setInterval(timerAnimLA, 100);
        setTimeout(() => {clearInterval(timer); btnLang.style.pointerEvents = "auto";}, 700);

        languageCheck = true;
    }
    else
    {
        timeLA = 5
        let timer = setInterval(timerAnimBackLA, 100);
        setTimeout(() => {clearInterval(timer); btnLang.style.pointerEvents = "auto";}, 700);

        languageCheck = false;
    }

    const allText = document.body.querySelectorAll(".TEXT")

    allText.forEach(txt => 
    {
        txt.style.opacity = "0.5"
    });

    if(currProj != 0)
    {
        document.getElementById("extraTextPROJ").style.opacity = "0"
    }

    setTimeout(() => 
    {
        changeLang()
    }, 100);

    setTimeout(() => 
    {
        const allText = document.body.querySelectorAll(".TEXT")

        allText.forEach(txt => 
        {
            txt.style.opacity = "1"
        });

        if(currProj != 0)
        {
            document.getElementById("extraTextPROJ").style.opacity = "0"
        }
    }, 200);
}




function changeLang()
{
    if(languageCheck === true)
    {
        document.getElementById("txtWarning").innerHTML = "This website only supports landscape mode, please rotate or resize your screen."
        document.getElementById("txtSBInicio").innerHTML = "HOME"
        document.getElementById("txtSBHab").innerHTML = "SKILLS"
        document.getElementById("txtSBProj").innerHTML = "PROJECTS"
        document.getElementById("txtSBLink").innerHTML = "LINKS AND CONTACT"
        document.getElementById("txtHeader").innerHTML = "WELCOME<br>TO"
        document.getElementById("iniciotxt").innerHTML = 
            "Hi you who entered this site, my name is Lorenzo, but I'm most known as Lorax. " +
            "I imagine you want to know a little about me, so let's start with the basics: I am mainly an artist, " +
            "more focused on digital art, I think the style of the site may have made that a little obvious. " +
            "Aside from that, I also do animation, coding, and I'm in the process of composing music. " +
            "If you want to know a little more about these skills of mine, my current projects, or find me " +
            "on other social medias, it's all down below, just scroll down a little! But if you're a bit more " +
            "interested in me aside from this basic description, just click this button down here:"
        document.getElementById("habTitle").innerHTML = "SKILLS"
        document.getElementById("descHab1").innerHTML = "Click on the"
        document.getElementById("descHab2").innerHTML = "to know more"
        document.getElementById("titleBox1").innerHTML = "ART"
        document.getElementById("titleBox2").innerHTML = "ANIMATION"
        document.getElementById("titleBox3").innerHTML = "CODING"
        document.getElementById("titleBox4").innerHTML = "MUSIC"
        document.getElementById("projTitle").innerHTML = "PROJECTS"

        if(currProj === 0)
        {
            document.getElementById("textProj").innerHTML = 
                "SMOL is an animated series based on Battle For Dream Island.<br>" +
                "In this called \"object show\", 5 characters are teleported to a small room " +
                "by Atom and Microscope, the hosts of the show, with the proposal that they " +
                "participate in challenges to win a grand prize! In each episode, a challenge " +
                "occurs and one participant is eliminated, until only one remains!"
        }
        else if(currProj === 1)
            document.getElementById("textProj").innerHTML = 
                "Initially just a gaming channel that started in 2020, " +
                "it is now a channel more focused on publishing my animations and series, " +
                "currently having over 1k subscribers and animations with over 10k views."
        else if(currProj === 2)
        {
            document.getElementById("textProj").innerHTML = "Soon"
        }

        document.getElementById("extraTextPROJ").innerHTML = 
            "SMOL currently has 4 episodes (and 1 extra) that can be watched on YouTube through the "+
            "button above; the 5th and final episode is set to be released in 2026"

        document.getElementById("linkTitle").innerHTML = "LINKS AND CONTACT"
        document.getElementById("descTwit").innerHTML = 
            "Here you will be able to find my most recent artworks, some sketches, and " +
            "sometimes news about my projects, as well as being where I mainly accept commission requests"
        document.getElementById("descYoutube").innerHTML = 
            "You can find a more complete description in the projects section, but this is basically where I publish my animations"
        document.getElementById("descGithub").innerHTML = 
            "For now, you won't find anything aside from this website itself, but it's where you'll be able to find my future projects."
        document.getElementById("footertxt").innerHTML =
            "This website is still under development!<br>" +
            "It does not yet support all screen sizes and some buttons don't have a functionality yet.<br>" +
            "New features, artwork, and content will be added in the future."
    }
    else
    {
        document.getElementById("txtWarning").innerHTML = "Este site tem suporte apenas para modo paisagem, vire ou redimensione a sua tela"
        document.getElementById("txtSBInicio").innerHTML = "INÍCIO"
        document.getElementById("txtSBHab").innerHTML = "HABILIDADES"
        document.getElementById("txtSBProj").innerHTML = "PROJETOS"
        document.getElementById("txtSBLink").innerHTML = "LINKS E CONTATO"
        document.getElementById("txtHeader").innerHTML = "BEM-VINDO<br>AO"
        document.getElementById("iniciotxt").innerHTML = 
            "Oi você que entrou nesse site, meu nome é Lorenzo, mas sou mais conhecido como Lorax. " +
            "Eu imagino que você queira saber um pouco sobre mim, então vamos pro básico: eu sou principalmente " +
            "um artista, mais focado em arte digital, acho que o estilo do site pode ter deixado um pouco óbvio né? " +
            "Além disso, eu também faço animações, programação e estou no processo de compor músicas. " +
            "Se você quer saber um pouco mais sobre essas minhas habilidades, meus atuais projetos ou me encontrar em outras redes socias, " +
            "tudo isso está logo aqui embaixo, só rolar a tela um pouquinho! " +
            "Mas caso você esteja um pouco mais interessado em mim além dessa descrição básica, só clicar neste botão aqui embaixo:"
        document.getElementById("habTitle").innerHTML = "HABILIDADES"
        document.getElementById("descHab1").innerHTML = "Clique no"
        document.getElementById("descHab2").innerHTML = "para saber mais"
        document.getElementById("titleBox1").innerHTML = "ARTE"
        document.getElementById("titleBox2").innerHTML = "ANIMAÇÃO"
        document.getElementById("titleBox3").innerHTML = "PROGRAMAÇÃO"
        document.getElementById("titleBox4").innerHTML = "MÚSICA"
        document.getElementById("projTitle").innerHTML = "PROJETOS"
        
        if(currProj === 0)
        {
            document.getElementById("textProj").innerHTML = 
                "SMOL é uma série de animação baseada na série Battle For Dream Island.<br>" +
                "Neste chamado \"object show\", 5 personagens são teleportados a um pequeno quarto " +
                "por Atom e Microscope, os apresentadores do show, com a proposta de que " +
                "eles participem de desafios para ganhar um grande prêmio! A cada episódio " +
                "ocorre um desafio e um participante é eliminado, até que sobre apenas um!";
        }
        else if(currProj === 1)
            document.getElementById("textProj").innerHTML = 
                "Inicialmente apenas como um canal de jogos que começou em 2020, é hoje um canal " +
                "mais focado em publicar minhas animações e séries, tendo atualmente mais de mil " + 
                "inscritos e animações com mais de 10 mil visualizações.";
        else if(currProj === 2)
        {
            document.getElementById("textProj").innerHTML = "Em breve"
        }

        document.getElementById("extraTextPROJ").innerHTML = 
            "SMOL atualmente tem 4 episódios (e 1 extra) que podem ser assistidos no Youtube através do " +
            "botão acima, o quinto e último episódio está previsto para ser lançado em 2026 "

        document.getElementById("linkTitle").innerHTML = "LINKS E CONTATO"
        document.getElementById("descTwit").innerHTML = 
            "Aqui você vai poder encontrar minhas artes mais recentes, alguns rascunhos e de vez " +
            "em quando notícias sobre meus projetos, além de ser onde eu principalmente aceito pedidos de comissão"
        document.getElementById("descYoutube").innerHTML = 
            "Você pode ver uma descrição mais completa na parte de projetos, mas é basicamente onde eu publico minhas animações"
        document.getElementById("descGithub").innerHTML = 
            "Por enquanto você não vai encontrar nada além deste próprio site aqui, mas será onde você poderá encontrar meus projetos futuros"
        document.getElementById("footertxt").innerHTML =
            "Este site ainda está em desenvolvimento!<br>" +
            "Ainda não há suporte para todos os tamanhos de tela e alguns botões ainda não possuem funcionalidade<br>" +
            "Novas funcionalidades, arte e conteúdo serão adicionados futuramente"
    }
}

