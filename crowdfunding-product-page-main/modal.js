class Modal {
  constructor({ elem, data, template, id }) {
    this.elem = elem;
    this.data = data;
    this.template = template;
    this.id = id;
    this.modalContainerData = this.createModalTemplate();
    this.render();
    this.parser = new DOMParser();
  }

  createModalTemplate() {
    const modalContainer = document.createElement("div");
    modalContainer.className = "modal-container hidden";
    const modal = document.createElement("div");
    modal.className = "modal card-shadow";
    const closeButton = document.createElement("button");
    closeButton.className = "modal-close";
    const closeSpan = document.createElement("span");
    const img = document.createElement("img");
    img.src = "./images/icon-close-modal.svg";
    closeSpan.append(img);
    closeButton.appendChild(closeSpan);

    closeButton.addEventListener("click", () => {
      modalContainer.classList.add("hidden");
    });

    modal.appendChild(closeButton);
    modalContainer.appendChild(modal);
    return { modalContainer, closeButton };
  }

  render() {
    const { modalContainer, closeButton } = this.modalContainerData;
    const modal = modalContainer.querySelector(".modal");
    const template = modal.querySelector(`#${this.id}`);
    if (template) {
      template.remove();
    }
    modal.insertAdjacentHTML("afterbegin", this.template(this.data));
    this.elem.appendChild(modalContainer);
  }

  closeModal() {
    const { modalContainer } = this.modalContainerData;
    modalContainer.className = "modal-container hidden";
  }

  openModal() {
    const { modalContainer } = this.modalContainerData;
    modalContainer.className = "modal-container";
  }

  update(data) {
    this.data = data;
    this.render();
  }
}

export default Modal;
