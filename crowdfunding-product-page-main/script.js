import {
  fakePromise,
  handleModalOk,
  handlePledgeModal,
  openPledgeModal,
  renderPledgeCards,
  handleSelectReward,
  setStats,
} from "./utils.js";
import { data } from "./pledgeData.js";

(() => {
  const appState = {
    loading: true,
    pledgeData: {},
    thankYouModalRef: null,
    pledgeModalRef: null,
  };

  const pledgeAboutContainer = document.querySelector(".project-about");
  const bookmarkButton = document.querySelector(".btn-bookmark");
  const backProjectButton = document.querySelector("#back-project");
  const modalContainer = document.querySelector(".modal-container");

  const getPledgeData = async (data) => {
    const pledgeData = await fakePromise(data);
    return pledgeData;
  };

  document.addEventListener("click", (e) => {
    handleModalOk(e, appState);
    handlePledgeModal(e, appState, pledgeAboutContainer);
  });

  document.addEventListener("DOMContentLoaded", async () => {
    const pledgeData = await getPledgeData(data);
    if (pledgeData) {
      appState.loading = false;
      appState.pledgeData = pledgeData;
      setStats(appState.pledgeData.stats);
      renderPledgeCards(pledgeData?.pledges, pledgeAboutContainer);

      pledgeAboutContainer.addEventListener("click", (event) => {
        handleSelectReward(event, appState, pledgeAboutContainer);
      });

      bookmarkButton.addEventListener("click", (e) => {
        bookmarkButton.classList.toggle("active");
      });

      backProjectButton.addEventListener("click", (e) => {
        openPledgeModal(appState);
      });
    }
  });
})();
