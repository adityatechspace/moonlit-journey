function setProgress(value){

  document.getElementById("progressFill")
    .style.width = value + "%";

}

/* ========================= */
/* Floating Effects */
/* ========================= */

function createFloating(){

  const floating =
    document.createElement("div");

  floating.classList.add("floating");

  const items =
    ["✨","🌸","⭐","🦋","🌷","🌙"];

  floating.innerHTML =
    items[Math.floor(Math.random()*items.length)];

  floating.style.fontSize =
    (Math.random()*20 + 15) + "px";

  floating.style.left =
    Math.random()*100 + "vw";

  floating.style.animationDuration =
    (Math.random()*5 + 5) + "s";

  document.body.appendChild(floating);

  setTimeout(()=>{
    floating.remove();
  },10000);

}

setInterval(createFloating,400);

/* ========================= */
/* Screen Switching */
/* ========================= */

function showScreen(id){

  document.querySelectorAll(".screen")
    .forEach(screen=>{
      screen.classList.remove("active");
    });

  document.getElementById(id)
    .classList.add("active");

}

/* ========================= */
/* Typing Screen */
/* ========================= */

const message = `
Some people are remembered
because of moments.

Some because of the energy
they carry around them.
`;

let index = 0;

function openTyping(){

  setProgress(10);

  showScreen("typingScreen");

  const typing =
    document.getElementById("typingText");

  typing.innerHTML = "";

  index = 0;

  const interval = setInterval(()=>{

    typing.innerHTML += message[index];

    index++;

    if(index >= message.length){

      clearInterval(interval);

      document.getElementById("typingBtn")
        .style.display = "inline-block";

    }

  },40);

}

/* ========================= */
/* Cards */
/* ========================= */

const quotes = [

{
  emoji:"🌸",
  text:"Some people wait for happiness to bloom — flower lovers carry a garden within them",
  small:"Not everyone leaves that impact."
},

{
  emoji:"✨",
  text:"My love, You have the kind of smile that people remember for a long time.",
  small:"Some people naturally brighten spaces."
},

{
  emoji:"🌈",
  text:"You have a beautiful energy that’s hard not to admire.",
  small:"There’s something truly calming and lovely."
}
];

let current = 0;

function openCards(){

  setProgress(30);

  showScreen("cardScreen");

  renderCards();

}

function renderCards(){

  const area =
    document.getElementById("cardArea");

  area.innerHTML = "";

  quotes.forEach((item,index)=>{

    const card =
      document.createElement("div");

    card.className = "card";

    const offset = index - current;

    card.style.transform = `
      translateX(${offset * 90}px)
      scale(${1 - Math.abs(offset) * 0.1})
      rotate(${offset * 5}deg)
    `;

    card.style.zIndex =
      100 - Math.abs(offset);

    card.innerHTML = `

      <div class="emoji">
        ${item.emoji}
      </div>

      <div class="quote">
        ${item.text}
      </div>

      <div class="small">
        ${item.small}
      </div>

    `;

    card.addEventListener("click",nextCard);

    area.appendChild(card);

  });

}

function nextCard(){

  if(current < quotes.length - 1){

    current++;

    renderCards();

    /* Show Continue button
       immediately after 3rd card */

    if(current === quotes.length - 1){

      document.getElementById("cardBtn")
        .style.display = "inline-block";

    }

  }

}

/* ========================= */
/* Paths */
/* ========================= */

function openPaths(){

  setProgress(45);

  showScreen("pathScreen");

}

/* ========================= */
/* Arrow Game */
/* ========================= */

const correct =
["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"];

let step = 0;

function openArrowGame(){

  setProgress(60);

  showScreen("arrowScreen");

}

document.addEventListener("keydown",(e)=>{

  if(
    document.getElementById("arrowScreen")
      .classList.contains("active")
  ){

    if(e.key === correct[step]){

      step++;

      document.getElementById("arrowProgress")
        .innerText =
        `Progress: ${step} / 4`;

      if(step === 4){

        document.getElementById("arrowSuccess")
          .style.display = "block";

        document.getElementById("arrowBtn")
          .style.display = "inline-block";

      }

    }else{

      step = 0;

      document.getElementById("arrowProgress")
        .innerText = "Wrong sequence. Try again.";

      setTimeout(()=>{

        document.getElementById("arrowProgress")
          .innerText = "Progress: 0 / 4";

      },1000);

    }

  }

});

/* ========================= */
/* HEART GAME */
/* ========================= */

const heartPieces =
["❤️","✨","🌸","🦋","⭐"];

let collected = 0;

function openHeartRestore(){

  setProgress(100);

  showScreen("heartRestoreScreen");

  const area =
    document.querySelector(".heart-game-area");

  /* Remove old floating pieces */

  area.querySelectorAll(".heart-piece")
    .forEach(el=>el.remove());

  collected = 0;

  document.getElementById("heartProgress")
    .innerText = "Filled: 0%";

  /* Reset SVG Fill */

  const heartFill =
    document.getElementById("heartFill");

  heartFill.setAttribute("y","200");

  heartFill.setAttribute("height","0");

  /* Create floating pieces */

  heartPieces.forEach(piece=>{

    const item =
      document.createElement("div");

    item.className = "heart-piece";

    item.innerHTML = piece;

    item.style.left =
      Math.random()*80 + "%";

    item.style.top =
      Math.random()*80 + "%";

    item.style.animationDuration =
      (Math.random()*8 + 10) + "s";

    item.onclick = ()=>{

      item.remove();

      collected++;

      const percent =
        collected * 20;

      document.getElementById("heartProgress")
        .innerText =
        `Filled: ${percent}%`;

      updateHeart(percent);

      if(percent >= 100){

        setTimeout(()=>{

          showScreen("moonScreen");

        },700);

      }

    };

    area.appendChild(item);

  });

}

/* ========================= */
/* Heart Fill Animation */
/* ========================= */

function updateHeart(percent){

  const heartFill =
    document.getElementById("heartFill");

  const fillHeight =
    (percent / 100) * 200;

  heartFill.setAttribute(
    "y",
    200 - fillHeight
  );

  heartFill.setAttribute(
    "height",
    fillHeight
  );

}

/* ========================= */
/* Send Choice */
/* ========================= */

async function sendChoice(answer){

  try{

    const response = await fetch(
      "https://formspree.io/f/xzdwywlo",
      {

        method:"POST",

        headers:{
          "Content-Type":"application/json",
          "Accept":"application/json"
        },

        body:JSON.stringify({

          message: answer,

          selected_response: answer,

          page: "Moon Choice",

          person: "Himanshi"

        })

      }
    );

   if(response.ok){

  /* Hide all option buttons */

  document.querySelector(".moon-buttons")
    .style.display = "none";

  /* Success Message */

  document.getElementById("responseMessage")
    .innerHTML = `

      Response submitted successfully ✨

    `;

  /* Show Continue Button */

  document.getElementById("heartRestoreBtn")
    .style.display = "inline-block";

}

  }catch(error){

    document.getElementById("responseMessage")
      .innerHTML = `

        Failed to send response ❌

      `;

    console.error(error);

  }

}

/* ========================= */
/* Memory Game */
/* ========================= */

const sequence = [1,3,0];

let userStep = 0;

function openMemoryGame(){

  setProgress(75);

  showScreen("memoryScreen");

  userStep = 0;

  document.getElementById("memorySuccess")
    .style.display = "none";

  document.getElementById("memoryBtn")
    .style.display = "none";

  playSequence();

}

function playSequence(){

  const boxes =
    document.querySelectorAll(".memory-box");

  sequence.forEach((num,index)=>{

    setTimeout(()=>{

      boxes[num].classList.add("active");

      setTimeout(()=>{

        boxes[num].classList.remove("active");

      },500);

    },index * 800);

  });

}

document.querySelectorAll(".memory-box")
  .forEach(box=>{

    box.addEventListener("click",()=>{

      const id =
        Number(box.dataset.id);

      if(id === sequence[userStep]){

        userStep++;

        if(userStep === sequence.length){

          document.getElementById("memorySuccess")
            .style.display = "block";

          document.getElementById("memoryBtn")
            .style.display = "inline-block";

        }

      }else{

        userStep = 0;

        playSequence();

      }

    });

});

/* ========================= */
/* Hidden Star */
/* ========================= */

function openStarGame(){

  setProgress(90);

  showScreen("starScreen");

  const star =
    document.getElementById("hiddenStar");

  star.style.top =
    Math.random()*70 + "%";

  star.style.left =
    Math.random()*80 + "%";

}

document.getElementById("hiddenStar")
  .addEventListener("click",()=>{

    document.getElementById("starSuccess")
      .style.display = "block";

    document.getElementById("starBtn")
      .style.display = "inline-block";

});

/* ========================= */
/* Final */
/* ========================= */

function openFinal(){

  showScreen("finalScreen");

}
