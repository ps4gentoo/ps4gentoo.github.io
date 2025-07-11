const aboutBtn = document.getElementById("aboutBtn");
const popup = document.getElementById("popup");
const closeBtn = document.querySelector(".close");
const scrollContainer = document.getElementById("scroll-container");

let scrollInterval = null;
let scrollStartTimeout = null;

function autoScrollLoop() {
    let scrollSpeed = 1;  // pixels per tick
    let interval = 50;    // ms between ticks

    scrollInterval = setInterval(() => {
        scrollContainer.scrollTop += scrollSpeed;

        if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight) {
            clearInterval(scrollInterval);

            setTimeout(() => {
                scrollContainer.scrollTop = 0;
                autoScrollLoop(); // restart loop
            }, 1000); // pause 1 second before looping
        }
    }, interval);
}

function showPopup() {
    // Reset scroll position
    scrollContainer.scrollTop = 0;

    // Stop any existing scrolls or timeouts
    clearInterval(scrollInterval);
    clearTimeout(scrollStartTimeout);

    popup.style.display = "flex";
    requestAnimationFrame(() => {
        popup.classList.add("show");
    });

    // Delay and then start scrolling fresh
    scrollStartTimeout = setTimeout(autoScrollLoop, 2000);
}

function hidePopup() {
    popup.classList.remove("show");

    // Stop scrolling and delay
    clearInterval(scrollInterval);
    clearTimeout(scrollStartTimeout);

    popup.addEventListener("transitionend", function handler() {
        popup.style.display = "none";
        popup.removeEventListener("transitionend", handler);
    });
}

aboutBtn.addEventListener("click", showPopup);
closeBtn.addEventListener("click", hidePopup);

window.addEventListener("click", (e) => {
    if (e.target === popup) {
        hidePopup();
    }
});