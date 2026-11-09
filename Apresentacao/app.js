const slides = [...document.querySelectorAll(".slide")];
const previous = document.querySelector("#prev");
const next = document.querySelector("#next");
const counter = document.querySelector("#counter");
const speaker = document.querySelector("#speaker");
const progressBar = document.querySelector("#progressBar");
let current = 0;

function showSlide(index) {
  current = Math.max(0, Math.min(index, slides.length - 1));
  slides.forEach((slide, slideIndex) => slide.classList.toggle("active", slideIndex === current));
  const slide = slides[current];
  counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
  speaker.textContent = slide.dataset.title;
  progressBar.style.width = `${((current + 1) / slides.length) * 100}%`;
  previous.disabled = current === 0;
  next.disabled = current === slides.length - 1;
}

previous.addEventListener("click", () => showSlide(current - 1));
next.addEventListener("click", () => showSlide(current + 1));
document.addEventListener("keydown", (event) => {
  if (["ArrowRight", " ", "PageDown"].includes(event.key)) showSlide(current + 1);
  if (["ArrowLeft", "PageUp"].includes(event.key)) showSlide(current - 1);
  if (event.key.toLowerCase() === "n") document.body.classList.toggle("show-notes");
  if (event.key === "Home") showSlide(0);
  if (event.key === "End") showSlide(slides.length - 1);
});
showSlide(0);