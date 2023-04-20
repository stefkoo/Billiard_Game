const dialogElement = document.getElementById("dialog");
const dialogContent = document.getElementById("dialogContent");
const closeBtn = document.getElementById("closeBtn");

export function openDialog(txt) {
    dialogContent.innerHTML = txt;
    dialogElement.showModal();
}

export function closeDialog() {
    dialogElement.close();
    dialogContent.innerHTML = "";
}

dialogElement.addEventListener("touchmove", function(e) {
    e.preventDefault();
}, {passive: false});

closeBtn.addEventListener("touchstart", function(e) {
    closeDialog();
    e.preventDefault();
}, {passive: false});
