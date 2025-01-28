const $ = document;
const modal = $.getElementById("modal");
const displayInput = $.getElementById("display__input");
const numpadBtns = $.querySelectorAll(".numpad-wrapper__btns");
const clearBtn = $.getElementById("c");
const resetBtn = $.getElementById("ca");
const submitBtn = $.getElementById("submit-btn");
const changeBtn = $.getElementById("change-btn");
const contextMenu = $.getElementById("context-menu");
const copyBtnContextMenu = $.getElementById("copy-btn-context-menu");
const cutBtnContextMenu = $.getElementById("cut-btn-context-menu");
const changeBtnContextMenu = $.getElementById("change-btn-context-menu");
const resetBtnContextMenu = $.getElementById("reset-btn-context-menu");

var randomNumber = Math.round(Math.random() * 10);

const removeLastDigitHandler = () => {
  const arrayInputValue = displayInput.value.split("");
  const filterdArrayInputValue = arrayInputValue.slice(
    0,
    arrayInputValue.length - 1
  );
  displayInput.value = filterdArrayInputValue.join("");
};

const resetHandler = () => {
  displayInput.value = "";
};

const submitHandler = () => {
  if (+displayInput.value === randomNumber) {
    modal.innerHTML = "You are on fire 😎";
    modal.classList.add("header-wrapper__text--result--green");
  } else if (
    isNaN(displayInput.value) ||
    displayInput.value > 10 ||
    displayInput.value === ""
  ) {
    modal.innerHTML = "Please Enter The Right Value 🙂";
    modal.classList.add("header-wrapper__text--result--red");
  } else {
    modal.innerHTML = "You are wrong 😒";
    modal.classList.add("header-wrapper__text--result--red");
  }
  resetHandler();
  setTimeout(() => {
    modal.className = "header-wrapper__text--result";
  }, 1000);
};

const changeNumberHandler = () => {
  modal.innerHTML = "Number changed ✌️";
  modal.classList.add("header-wrapper__text--result--green");
  randomNumber = Math.round(Math.random() * 10);
  setTimeout(() => {
    modal.className = "header-wrapper__text--result";
  }, 1000);
};

numpadBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    if (btn.value === "C") {
      removeLastDigitHandler();
    } else if (btn.value === "CA") {
      resetHandler();
    } else {
      displayInput.value += event.target.value;
    }
  });
});

submitBtn.addEventListener("click", submitHandler);

changeBtn.addEventListener("click", changeNumberHandler);

copyBtnContextMenu.addEventListener("click", () => {
  navigator.clipboard.writeText("Guess Game");
});

cutBtnContextMenu.addEventListener("click", () => {
  navigator.clipboard.writeText("Guess Game");
});

changeBtnContextMenu.addEventListener("click", changeNumberHandler);

resetBtnContextMenu.addEventListener("click", resetHandler);

window.addEventListener("keydown", (e) => {
  if (!isNaN(e.key)) {
    displayInput.value += e.key;
  } else if (e.key === "Escape") {
    resetHandler();
  } else if (e.key === "Backspace") {
    removeLastDigitHandler();
  } else if (e.key === "Enter") {
    submitHandler();
  }
});

$.body.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  contextMenu.style.opacity = 1;
  contextMenu.style.pointerEvents = "all";
  const pageX = event.pageX;
  const pageY = event.pageY;

  contextMenu.style.top = `${pageY}px`;
  contextMenu.style.left = `${pageX}px`;
});

$.body.addEventListener("click", () => {
  contextMenu.style.opacity = 0;
  contextMenu.style.pointerEvents = "none";
});
