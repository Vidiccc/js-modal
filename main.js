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
    // Method mở - Khởi tạo -> event ->
    this.openModal = (options = {}) => {
        // Destructuring
        const { templateId } = options;
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

        // Event
        closeBtn.onclick = () => this.closeModal(backdrop);

        backdrop.onclick = (e) => {
            if (e.target === backdrop) {
                this.closeModal(backdrop);
            }
        };

        document.onkeydown = (e) => {
            if (e.key === "Escape") {
                this.closeModal(backdrop);
            }
        };
    };

    // Method đóng
    this.closeModal = (modalElement) => {
        modalElement.classList.remove("show");
        modalElement.ontransitionend = () => {
            modalElement.remove();
        };
    };
}

// Khởi tạo 1 object Modal
const modal = new Modal();

// Từ object Modal tạo modal, truyền vào chuỗi html
$("#open-modal-1").onclick = () => {
    modal.openModal({
        templateId: "modal-1",
    });
};

$("#open-modal-2").onclick = () => {
    modal.openModal({
        templateId: "modal-2",
    });
};

$("#open-modal-3").onclick = () => {
    modal.openModal({
        templateId: "modal-3",
    });
};
