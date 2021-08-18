const fetchData = () => {
  return fetch("./data.json").then((res) => res.json());
};

const getCards = async () => {
  const res = await fetchData();
  return res;
};

const state = {
  allCards: [],
  filteredCards: [],
  selectedTags: [],
  loading: false,
  searchTerm: "",
};

const debounce = (fn, tick = 400) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, tick);
  };
};

const cardHelpers = (function () {
  const selectedTagContainer = document.querySelector(".selected-tags");

  const createJobCard = (card) => {
    return `
        <div data-id=${card.id} class="flex card-container">
        ${card.featured ? `<div class="featured-border show"></div>` : ""}
        <div class="card-image">
          <img src=${card.logo} />
        </div>
        <div class="flex card-info">
          <div class="flex card-info-top">
            <div class="name">${card.role}</div>
            ${card.new ? `<div class="new">NEW!</div>` : ""}
           ${card.featured ? `<div class="featured">FEATURED</div>` : ""}
          </div>
          <div class="card-info-name">${card.position}</div>
          <div class="flex card-info-stats">
            <span> ${card.postedAt} </span>
            <span> ${card.contract} </span>
            <span> ${card.location} </span>
          </div>
        </div>
        <div class="flex card-tags">
        ${card.languages
          .map(
            (c) => `<button data-filter=${c} class="tag-container" id="add-tag">
          <span>${c}</span>
        </button
        >`
          )
          .join("")}
        </div>
      </div>
        `;
  };

  const createJobCards = async (cards = []) => {
    const cardContainer = document.querySelector(".cards-container");
    const htmlCards = cards.map((card) => createJobCard(card)).join("");
    cardContainer.innerHTML = htmlCards;
  };

  const handleAddTagListner = (evt) => {
    const parentButton = evt.target.closest("#add-tag");
    if (parentButton) {
      const tagId = parentButton.dataset.filter;
      if (state.selectedTags.indexOf(tagId) === -1) {
        addSelectedTags(createSelectedTags(tagId));
        state.selectedTags.push(tagId);
        filterCards(tagId, "tag");
      }
    }
  };

  const createSelectedTags = (tag) => {
    const button = document.createElement("button");
    button.className = "flex tag-container";
    button.id = "remove-tag";
    button.dataset.filter = `${tag}`;
    const span = document.createElement("span");
    span.innerHTML = tag;
    button.appendChild(span);
    const closeDiv = document.createElement("div");
    closeDiv.role = "button";
    closeDiv.className = "remove-tag";
    closeDiv.innerHTML = "&times;";
    button.appendChild(closeDiv);
    return button;
  };

  const addSelectedTags = (tag) => {
    selectedTagContainer.insertAdjacentElement("beforeend", tag);
  };

  const removeSelectedTag = (tags = []) => {
    const newTags = tags.map((tag) => createSelectedTags(tag).outerHTML);
    selectedTagContainer.innerHTML = newTags;
  };

  const handleRemoveTag = (evt) => {
    const parentButton = evt.target.closest("#remove-tag");
    if (parentButton) {
      const tagId = parentButton.dataset.filter;
      const newTags = state.selectedTags.filter((tag) => tag !== tagId);
      removeSelectedTag(newTags);
      state.selectedTags = newTags;
      filterCards(tagId, "tag");
    }
  };

  document.addEventListener("click", (evt) => {
    handleAddTagListner(evt);
    handleRemoveTag(evt);
  });

  return {
    createJobCards,
  };
})();

const generateCardByTags = (cards = []) => {
  if (!state.selectedTags.length) {
    return cardHelpers.createJobCards(toUse);
  }
  const filteredCards = cards.reduce((acc, curr) => {
    const { languages = [] } = curr;
    const selectedCard = state.selectedTags.every(
      (selected) => languages.indexOf(selected) > -1
    );
    if (selectedCard) {
      acc.push(curr);
    }
    return acc;
  }, []);
  return filteredCards;
};

const filterCards = () => {
  let filteredCards = [...state.allCards];
  console.log("HERE 1?", state.selectedTags, state.searchTerm);
  if (!state.selectedTags.length && !state.searchTerm.length) {
    console.log("HERE?");
    state.filteredCards = [];
    return cardHelpers.createJobCards(state.allCards);
  }
  if (state.searchTerm) {
    let results = [];
    const regex = new RegExp(state.searchTerm, "gi");
    results = filteredCards.reduce((acc, item) => {
      if (item.company.match(regex)) {
        acc.push(item);
      }
      return acc;
    }, []);
    if (results.length) {
      state.filteredCards = results;
      filteredCards = results;
    }
  }
  if (state.selectedTags.length) {
    filteredCards = generateCardByTags(filteredCards);
  }
  cardHelpers.createJobCards(filteredCards);
};

const inputHelpers = (() => {
  const debouncedFilterCards = debounce(filterCards);
  const handleInput = () => {
    const input = document.querySelector("input");
    input.addEventListener("input", (e) => {
      const { value } = e.target;
      // const toUse =
      // state.filteredCards.length > 0 ? state.filteredCards : state.allCards;
      state.searchTerm = value.trim();
      debouncedFilterCards();
    });
  };
  return {
    handleInput,
  };
})();

getCards().then((cards) => {
  cardHelpers.createJobCards(cards);
  state.allCards = [...cards];
});
inputHelpers.handleInput();
