// Đây là file theo cách cũ (20.21)

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const openModalList = $$(".open-modal");
const modalList = $$(".modal-backdrop");
const modalListArr = Array.from(modalList);

let currentModal = null;

// Nghe nhiều nút openModal
openModalList.forEach((openModal) => {
    openModal.onclick = function () {
        const modal = $(this.dataset.modal);
        if (modal) {
            modal.classList.add("show");
            currentModal = modal;
        } else {
            console.error(`${this.dataset.modal} does not exist!`);
        }
    };
});

// Nghe nhiều modal
modalList.forEach((modal) => {
    modal.addEventListener("click", function (e) {
        //  Nhấn nút tắt
        if (e.target.closest(".modal-close")) {
            modal.classList.remove("show");
            currentModal = null;
            return;
        }

        // Bấm ra ngoài backdrop
        if (e.target === modal) {
            modal.classList.remove("show");
            currentModal = null;
        }
    });
});

// Nghe esc
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        currentModal.classList.remove("show");
    }
});
