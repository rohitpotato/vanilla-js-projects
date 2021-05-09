const shareButton = document.querySelectorAll(".share-icon");
const shareContainer = document.querySelector(".share-container");
[...shareButton].forEach((share) => {
  share.addEventListener("click", (e) => {
    shareContainer.classList.toggle("visible");
  });
});

window.addEventListener("click", (e) => {
  if (
    e.target !== shareContainer &&
    !shareContainer.contains(e.target) &&
    e.target !== shareButton &&
    !e.target.classList.contains("share-icon") &&
    !e.target.parentNode.classList.contains("share-icon")
  ) {
    if (shareContainer.classList.contains("visible")) {
      shareContainer.classList.remove("visible");
    }
  }
});
