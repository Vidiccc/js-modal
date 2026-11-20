const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

{
    /* <div class="modal-backdrop">
    <div class="modal-container">
        <button class="modal-close" type="button">
            &times;
        </button>
        <div class="modal-content">
            ...
        </div>
    </div>
</div>; */
}
// Hàm tạo: Modal
function Modal() {
    function getScrollbarWidth() {
        if (getScrollbarWidth.result === undefined) {
            const div = document.createElement("div");

            Object.assign(div.style, {
                overflow: "scroll",
                position: "absolute",
                top: "-9999px",
            });

            document.body.appendChild(div);
            const scrollbarWidth = div.offsetWidth - div.clientWidth;
            document.body.removeChild(div);

            getScrollbarWidth.result = scrollbarWidth;
            return scrollbarWidth;
        }

        return getScrollbarWidth.result;
    }

    // Method mở - Khởi tạo -> event ->
    this.openModal = (options = {}) => {
        // Destructuring
        const { templateId, closeOnBackdrop = true } = options;
        const template = $(`#${templateId}`);
        if (!template) {
            return console.error(`#${templateId} does not exist!`);
        }

        // clone Node và lưu nội dung vào biến
        const templateContent = template.content.cloneNode(true);

        // Tạo variables tương ứng với bên DOM
        const backdrop = document.createElement("div");
        backdrop.className = "modal-backdrop";

        const container = document.createElement("div");
        container.className = "modal-container";

        const closeBtn = document.createElement("button");
        closeBtn.className = "modal-close";
        closeBtn.innerHTML = "&times;";

        const content = document.createElement("div");
        content.className = "modal-content";

        // Thêm vào DOM
        content.append(templateContent);
        container.append(closeBtn, content);
        backdrop.append(container);
        document.body.append(backdrop);

        // Để không mất hiệu ứng mở modal
        setTimeout(() => {
            backdrop.classList.add("show");
        }, 0);

        // Tắt scrolling dưới Modal
        document.body.classList.add("no-scrolling");
        document.body.style.paddingRight = getScrollbarWidth() + "px";

        // Event
        closeBtn.onclick = () => this.closeModal(backdrop);

        if (closeOnBackdrop) {
            backdrop.onclick = (e) => {
                if (e.target === backdrop) {
                    this.closeModal(backdrop);
                }
            };
        }

        document.onkeydown = (e) => {
            if (e.key === "Escape") {
                this.closeModal(backdrop);
            }
        };

        return backdrop;
    };

    // Method đóng
    this.closeModal = (modalElement) => {
        modalElement.classList.remove("show");
        modalElement.ontransitionend = () => {
            modalElement.remove();
        };
        document.body.classList.remove("no-scrolling");
        document.body.style.paddingRight = "";
    };
}

// Khởi tạo 1 object Modal
const modal = new Modal();

// Từ object Modal tạo modal, truyền vào chuỗi html
$("#open-modal-1").onclick = () => {
    const modalElement = modal.openModal({
        templateId: "modal-1",
    });

    const img = modalElement.querySelector("img");
    console.log(img);
};

$("#open-modal-2").onclick = () => {
    const modalElement = modal.openModal({
        templateId: "modal-2",
        closeOnBackdrop: false,
    });

    const form = modalElement.querySelector("#login-form");
    if (form) {
        form.onsubmit = function (e) {
            e.preventDefault();
            const formData = {
                email: form.querySelector("#email").value.trim(),
                password: form.querySelector("#password").value.trim(),
            };

            console.log(formData);
        };
    }
};

$("#open-modal-3").onclick = () => {
    modal.openModal({
        templateId: "modal-3",
    });
};
