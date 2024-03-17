function sleep(ms) {
   return new Promise((resolve) => setTimeout(resolve, ms));
}

/*----------------------------------------------------------
TYPE WRITER EFFECT
----------------------------------------------------------*/
const phrases = ["Joseph.", "a Developer.", "a Human."];
const el = document.querySelector("[data-typewrite]");
const caret = document.querySelector(".caret");

let sleepTime = 200;

let currentIndex = 2;
const typewrite = async () => {
   while (true) {
      let txt = phrases[currentIndex];

      // TYPE OUT
      caret.style.animation = "none";
      for (let i = 0; i < txt.length; i++) {
         el.innerText = txt.substring(0, i + 1);
         await sleep(sleepTime);
      }
      caret.style.animation = "var(--animation)";

      await sleep(sleepTime * 20);

      // DELETE / BACKSPACE
      caret.style.animation = "none";
      for (let i = txt.length; i > 0; i--) {
         el.innerText = txt.substring(0, i - 1);
         await sleep(sleepTime / 4);
      }
      caret.style.animation = "var(--animation)";

      await sleep(sleepTime * 5);

      if (currentIndex === phrases.length - 1) {
         currentIndex = 0;
      } else {
         currentIndex++;
      }
   }
};

typewrite();

/*----------------------------------------------------------
LIVE VALUES
----------------------------------------------------------*/
let startDate = new Date(2023, 10, 3);
function experienceUpdate() {
   const months = ((new Date() - startDate) / 1000 / 60 / 60 / 24 / (365 / 12)).toPrecision(10);
   document.querySelector("#experience").innerHTML = months;
}


let birthday = new Date(2008, 11, 5);
function ageUpdate() {
   const age = ((new Date() - birthday) / 1000 / 60 / 60 / 24 / 365).toPrecision(10);
   document.querySelector("#age").innerHTML = age;
}

setInterval(() => {
   ageUpdate();
   experienceUpdate();
}, 1000);
/*----------------------------------------------------------
GLOWY ORB
----------------------------------------------------------*/

// MOUSE TRACKER
const orb = document.querySelector(".blob");

const blobSection = document.querySelector("#home");

blobSection.onpointermove = (e) => {
   let x = e.clientX + window.scrollX;
   let y = e.clientY + window.scrollY;

   orb.animate(
      {
         left: `${x}px`,
         top: `${y}px`,
      },
      { duration: 3000, fill: "forwards" }
   );
};

/*----------------------------------------------------------
CUSTOM CURSOR
----------------------------------------------------------*/

function test() {
   console.log("updated");
}

const cursorEl = document.querySelector(".cursor");

window.onpointermove = (e) => {
   e.stopPropagation();
   let curX = e.clientX;
   let curY = e.clientY;

   cursorEl.animate(
      {
         left: `${curX}px`,
         top: `${curY}px`,
      },
      { duration: 50, fill: "forwards" }
   );
};

// CURSOR ELEMENT INTERACTIONS
let cursorActionElements = document.querySelectorAll("[data-cursor]");

cursorActionElements.forEach((el) => {
   el.addEventListener("mouseover", (e) => {
      e.stopPropagation();
      const elAttr = e.currentTarget.getAttribute("data-cursor");
      cursorEl.setAttribute("data-cursor", elAttr);
   });
   el.addEventListener("mouseleave", () => {
      cursorEl.removeAttribute("data-cursor");
   });
});

/*----------------------------------------------------------
ZOOM PREVIEW
----------------------------------------------------------*/
const panX = 50;
const panY = 80;

const thumbnail = document.querySelectorAll(".thumbnail").forEach((thumb) => {
   const image = thumb.querySelector("img");

   thumb.addEventListener("mousemove", (e) => {
      e.stopPropagation();
      let target = e.currentTarget;

      let x = e.offsetX - target.offsetWidth / 2;
      let y = e.offsetY - target.offsetHeight / 2;

      let translateX = ((x / target.offsetWidth) * 75).toFixed(1) * -1;
      let translateY = ((y / target.offsetHeight) * 100).toFixed(1) * -1;

      if (e.target == thumb) {
         image.animate(
            {
               transform: `translate(${translateX}%, ${translateY}%)`,
            },
            { duration: 500, fill: "forwards" }
         );
      }
   });

   thumb.addEventListener("mouseleave", (e) => {
      image.animate(
         {
            transform: `translate(0%)`,
         },
         { duration: 200, fill: "forwards" }
      );
   });
});

/*----------------------------------------------------------
PAGE FULL PREVIEW
----------------------------------------------------------*/

let fullSitePrev = document.querySelector(".prj-info-view");
let siteInfoContainer = document.querySelector(".prj-info-container");

const sitePreview = document.querySelectorAll(".more-info").forEach((btn) => {
   let infoHTML = btn.getAttribute("data-prj");

   btn.addEventListener("click", () => {
      fullSitePrev.classList.toggle("show");

      if (btn.hasAttribute("data-prj")) {
         fetch(`${infoHTML}`)
            .then((res) => {
               if (res.ok) {
                  return res.text();
               }
            })
            .then((htmlSnippet) => {
               siteInfoContainer.innerHTML = htmlSnippet;
            });
      }
   });
});

const observer = new MutationObserver(() => {
   let cursorActionElements = siteInfoContainer.querySelectorAll("[data-cursor]");
   cursorActionElements.forEach((el) => {
      el.addEventListener("mouseover", (e) => {
         e.stopPropagation();
         const elAttr = e.currentTarget.getAttribute("data-cursor");
         cursorEl.setAttribute("data-cursor", elAttr);
      });
      el.addEventListener("mouseleave", () => {
         cursorEl.removeAttribute("data-cursor");
      });
   });
});

observer.observe(siteInfoContainer, {
   subtree: true,
   childList: true,
});



/*----------------------------------------------------------
HIDDEN ELEMENTS RE
----------------------------------------------------------*/
var lastScrollTop = 0;
let direction;

function scrollDirection() {
   let st = window.scrollY || document.documentElement.scrollTop;

   if (st > lastScrollTop) {
      direction = 'down';
   } else if (st < lastScrollTop) {
      direction = 'up';
   }
   lastScrollTop = st <= 0 ? 0 : st;
}
document.addEventListener('scroll', () => {
   scrollDirection();
})

const hiddenElements = document.querySelectorAll(".hidden");

const hiddenElObserver = new IntersectionObserver((entries) => {
   entries.forEach((entry) => {
      if (entry.isIntersecting) {
         entry.target.classList.add("show");
      } else if (direction == "up") {
         entry.target.classList.remove("show");
      }
   });
});

hiddenElements.forEach((el) => hiddenElObserver.observe(el));

const navbar = document.querySelector(".nav-container");
let scrollY = "";

window.addEventListener("scroll", (e) => {
   scrollY = window.scrollY;

   if (scrollY > 0) {
      navbar.classList.remove("hidden");
   } else if (scrollY == 0) {
      navbar.classList.add("hidden");
   }
});

// HOVER TRIGGER
const trigger = document.querySelector(".nav");

trigger.addEventListener("mouseover", (e) => {
   if (scrollY == 0) {
      navbar.classList.remove("hidden");
   }

   e.target.addEventListener("mouseleave", (e) => {
      if (scrollY == 0) {
         navbar.classList.add("hidden");
      }
   });
});
