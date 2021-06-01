import Modal from "./modal.js";

const fakePromise = (data, time = 0) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, time);
  });

const createPledgeCard = ({ id, title, description, basePrice, quantity }) => {
  const pledgeCard = document.createElement("div");
  pledgeCard.setAttribute("data-id", id);
  pledgeCard.setAttribute("id", "pledge-card");

  const pledgeAbs = document.createElement("div");
  pledgeAbs.className = "pledge-abs";

  const radioInput = document.createElement("input");
  radioInput.setAttribute("type", "radio");
  radioInput.setAttribute("id", id);
  radioInput.setAttribute("name", "pledge-card");
  radioInput.setAttribute("class", "pledge-radio-input");
  if (quantity < 1) {
    radioInput.setAttribute("disabled", true);
  }
  const label = document.createElement("label");
  label.setAttribute("for", id);

  pledgeCard.className = `spacer pledge-card ${
    quantity < 1 ? "pledge-card-disabled" : ""
  }`;

  const pledgeHeader = document.createElement("div");
  pledgeHeader.className = "pledge-header spacer";
  const pledgeTitle = document.createElement("div");
  pledgeTitle.setAttribute("class", "pledge-title");
  pledgeTitle.innerHTML = title;
  const pledgePrice = document.createElement("div");
  pledgePrice.setAttribute("class", "pledge-price");
  pledgePrice.innerHTML = `Pledge ${basePrice} or more`;

  pledgeHeader.appendChild(pledgeTitle);
  pledgeHeader.appendChild(pledgePrice);

  const pledgeDscription = document.createElement("div");
  pledgeDscription.className = "pledge-description spacer2";
  pledgeDscription.innerHTML = description;

  const pledgeCta = document.createElement("div");
  pledgeCta.className = "pledge-cta";
  const div = document.createElement("div");
  pledgeCta.appendChild(div);

  const pledgeQuantity = document.createElement("span");
  pledgeQuantity.innerHTML = quantity;
  const pledgeLeft = document.createElement("span");
  pledgeLeft.innerHTML = "left";

  div.appendChild(pledgeQuantity);
  div.appendChild(pledgeLeft);

  const selectButton = document.createElement("button");
  selectButton.className = `btn btn-green reward-btn ${
    quantity < 1 ? "btn-disabled" : ""
  }`;
  selectButton.innerHTML = "Select Reward";
  if (quantity < 1) {
    selectButton.setAttribute("disabled", true);
  }

  pledgeCta.appendChild(selectButton);

  label.appendChild(radioInput);
  label.appendChild(pledgeAbs);
  label.appendChild(pledgeHeader);
  label.appendChild(pledgeDscription);
  label.appendChild(pledgeCta);
  pledgeCard.appendChild(label);
  return pledgeCard;
};

const renderPledgeCards = (data = [], element) => {
  removeChildNodes(element);
  data
    .filter((pd) => pd.type !== "free")
    .forEach((pledgeData) => {
      return element.appendChild(createPledgeCard(pledgeData));
    });
};

const getThankYouModalTemplate = () => {
  return `<div class="thanks-modal">
  <img class="spacer2" src="./images/icon-check.svg" alt="" />
  <div class="thanks-modal-title spacer">Thanks for your support</div>
  <div class="thanks-modal-description spacer">
    Thanks for your support! Your pledge brings us one step closer to
    sharing Mastercraft Bamboo Monitor Riser worldwide. You will get an
    email once our campaign is completed.
  </div>
  <button id="thanks-modal-ok" class="btn btn-green">
    <span>Got it</span>
  </button>
</div>`;
};

const handleModalOk = (event, appState) => {
  if (
    event.target.id === "thanks-modal-ok" ||
    event.target.closest("#thanks-modal-ok")
  ) {
    appState.thankYouModalRef.closeModal();
    return;
  }
};

const handlePledgeModal = (e, appState, pledgeAboutContainer) => {
  const { pledgeModalRef } = appState;
  const parent = e.target.closest(".modal-pledge-card");
  if (e.target.id === "modal-add-pledge" && parent) {
    const { id, type } = parent.dataset || {};
    if (id) {
      const input = parent.querySelector("#pledge-amount")?.value;
      if (input || type == "free") {
        const { pledges, stats } = appState.pledgeData;
        const pledgeIndex = pledges.findIndex((pledge) => pledge.id == id);
        if (pledgeIndex > -1) {
          const updatedPledge = pledges[pledgeIndex];
          updatedPledge.quantity -= 1;
          pledges[pledgeIndex] = updatedPledge;
          pledgeModalRef.update(pledges);
          stats.backers += 1;
          stats.reached += Number(input) || 0;
        }
        setStats(stats);
        renderPledgeCards(pledges, pledgeAboutContainer);
        openThankYouModal(appState);
      }
    }
  }
};

const createPledgeCardForModal = (data = []) => {
  return `
    <div id="pledges-list-modal">
    ${data
      .map(
        ({ id, title, description, basePrice, quantity, type }) =>
          `
    <div class="pledge-card spacer2 modal-pledge-card ${
      quantity < 1 && type !== "free" ? "pledge-card-disabled" : ""
    }" data-id=${id} data-type=${type}>
    <input
      type="radio"
      ${quantity < 1 && type !== "free" ? "disabled" : ""}  
      id="pledge-modal-${id}"
      name="modal-pledge"
      class="modal-radio-input"
    />
    <!-- <div class="pledge-abs"></div> -->
    <label for="pledge-modal-${id}">
      <div class="modal-pledge-header spacer">
        <span class="custom-radio">
          <span class="custom-radio-bg"></span>
        </span>
        <div class="pledge-title">${title}</div>
        <div class="pledge-price">Pledge ${basePrice} or more</div>
        ${
          type !== "free"
            ? `<div class="pledges-left">
              <span>${quantity}</span>
              <span>left</span>
            </div>`
            : ""
        }
      </div>
      <div class="pledge-description spacer2">
      ${description}
      </div>

      ${
        quantity > 0 || type === "free"
          ? `
        <div class="pledge-form-container">
        <hr />
        <div class="pledge-form">
          <span>Enter your pledge</span>
          <div>
            ${
              type !== "free"
                ? `
            <div class="pledge-amount-input">
              <input type="number" id="pledge-amount" />
            </div>`
                : ""
            } 
            <div>
              <button class="btn btn-green" id="modal-add-pledge">Continue</button>
            </div>
          </div>
        </div>
      </div>
        `
          : ""
      }
    </label>
  </div>
    `
      )
      .join("")
      .toString()}
    </div>
  `;
};

const openThankYouModal = (appState, modalProps = {}) => {
  if (appState.thankYouModalRef) {
    appState.thankYouModalRef.openModal();
    return;
  }
  const thankYouModal = new Modal({
    ...modalProps,
    elem: document.body,
    template: () => getThankYouModalTemplate(),
  });
  appState.thankYouModalRef = thankYouModal;
  thankYouModal.openModal();
};

const openPledgeModal = (appState, modalProps = {}) => {
  if (appState.pledgeModalRef) {
    appState.pledgeModalRef.openModal();
    return;
  }
  const pledgesModal = new Modal({
    elem: document.body,
    template: createPledgeCardForModal,
    data: appState.pledgeData.pledges,
    id: "pledges-list-modal",
  });
  appState.pledgeModalRef = pledgesModal;
  appState.pledgeModalRef.openModal();
};

const removeChildNodes = (node) => {
  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
};

const handleSelectReward = (event, appState, pledgeAboutContainer) => {
  const parent = event.target.closest(".pledge-card");
  const isSelectRewardButton = event.target.classList.contains("reward-btn");
  if (parent && isSelectRewardButton) {
    const { id } = parent.dataset || {};
    if (id) {
      const { pledges, stats } = appState.pledgeData;
      const pledgeIndex = pledges.findIndex((pledge) => pledge.id == id);
      if (pledgeIndex > -1) {
        const updatedPledge = pledges[pledgeIndex];
        updatedPledge.quantity -= 1;
        pledges[pledgeIndex] = updatedPledge;
        stats.backers += 1;
        stats.reached += Number(updatedPledge.basePrice.split("$")[0]) || 0;
      }
      setStats(stats);
      renderPledgeCards(pledges, pledgeAboutContainer);
      openThankYouModal(appState);
    }
  }
};

const setStats = (stats) => {
  const { total, reached, backers, daysLeft } = stats;
  const statsContainer = document.querySelectorAll(".stat");
  const statProgress = document.querySelector(".stat-progress");
  const [amountStat, backersStat, daysStat] = [...statsContainer];
  amountStat.innerHTML = `
  <span class="stat-num">$${reached}</span>
  <span class="stat-text">of $${total}</span>
  `;
  backersStat.innerHTML = `
  <span class="stat-num">${backers}</span>
  <span class="stat-text">total backers</span>
  `;

  daysStat.innerHTML = `
  <span class="stat-num">${daysLeft}</span>
  <span class="stat-text">days left</span>
  `;

  const progress = Math.round((reached / total) * 100);
  document.body.style.setProperty("--progress-width", `${progress}%`);
};

export {
  fakePromise,
  createPledgeCard,
  createPledgeCardForModal,
  getThankYouModalTemplate,
  handleModalOk,
  openThankYouModal,
  openPledgeModal,
  removeChildNodes,
  handlePledgeModal,
  renderPledgeCards,
  handleSelectReward,
  setStats,
};
