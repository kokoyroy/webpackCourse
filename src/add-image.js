// @ts-nocheck
import Kiwi from "./kiwi.jpg";
import "./giannis.css";
function addImage() {
  const img = document.createElement("img");
  img.alt = "kiwi";
  img.width = 300;
  img.src = Kiwi;
  const body = document.querySelector("body");
  body?.appendChild(img);
}

export function createParagraph() {
  const p = document.createElement("p");
  p.textContent = "I get called from add-image.js!";
  const body = document.querySelector("body");

  body?.appendChild(p);
}

export default addImage;
