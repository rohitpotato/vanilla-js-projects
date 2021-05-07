const cssGapValue = getComputedStyle(document.body).getPropertyValue(
  "--card-gap"
);
const generateRatings = () => {
  const ratings = [
    {
      stars: 5,
      text: "Rated 5 Stars in Reviews",
    },
    {
      stars: 5,
      text: "Rated 5 Stars in Report Guru",
    },
    {
      stars: 5,
      text: "Rated 5 Stars in BestTech",
    },
  ];
  const ratingCardContainer = document.querySelector(".rating-cards");
  ratings.forEach((rating, index) => {
    const ratingCard = document.createElement("div");
    ratingCard.setAttribute("class", "rating-card");
    const starIconContainer = document.createElement("div");
    starIconContainer.setAttribute("class", "star-icons");

    for (let i = 0; i < rating.stars; i++) {
      const starIcon = document.createElement("span");
      starIcon.innerHTML = `
      <img src='./images/icon-star.svg' alt="star_icon" />
      `;
      starIconContainer.appendChild(starIcon);
    }

    const reviewTextContainer = document.createElement("div");
    const reviewText = document.createElement("span");
    reviewText.setAttribute("class", "rating-text");
    reviewText.textContent = rating.text;
    reviewTextContainer.appendChild(reviewText);

    ratingCard.appendChild(starIconContainer);
    ratingCard.appendChild(reviewTextContainer);
    ratingCard.style.marginLeft = `${(index + 1) * cssGapValue.charAt(1)}rem`;

    ratingCardContainer.appendChild(ratingCard);
  });
};

const generateReviewCards = () => {
  const reviews = [
    {
      image: "./images/image-anne.jpg",
      author: "Colton Smith",
      reviewText: `"We needed the same printed design as the one we had ordered a week prior.
            Not only did they find the original order, but we also received it in time.
            Excellent!"`,
    },
    {
      image: "./images/image-colton.jpg",
      author: "Irene Roberts",
      reviewText: ` "Customer service is always excellent and very quick turn around. Completely
            delighted with the simplicity of the purchase and the speed of delivery."`,
    },
    {
      image: "./images/image-irene.jpg",
      author: "Anne Wallace",
      reviewText: ` "Put an order with this company and can only praise them for the very high
      standard. Will definitely use them again and recommend them to everyone!"`,
    },
  ];

  const bottomContainer = document.querySelector(".bottom");
  reviews.forEach((review, index) => {
    const reviewCardContainer = document.createElement("div");
    reviewCardContainer.setAttribute("class", "review-card");

    const reviewAuthorContainer = document.createElement("div");
    reviewAuthorContainer.setAttribute("class", "review-author-container");

    const reviewAuthorImage = document.createElement("img");
    reviewAuthorImage.setAttribute("class", "review-author-image");
    reviewAuthorImage.src = review.image;

    const reviewAuthorNameContainer = document.createElement("div");
    reviewAuthorNameContainer.setAttribute(
      "class",
      "review-author-name-container"
    );
    const reviewAuthorName = document.createElement("span");
    reviewAuthorName.setAttribute("class", "review-author");
    reviewAuthorName.textContent = review.author;
    const verifiedBuyer = document.createElement("span");
    verifiedBuyer.textContent = "Verified Buyer";

    reviewAuthorNameContainer.appendChild(reviewAuthorName);
    reviewAuthorNameContainer.appendChild(verifiedBuyer);

    const reviewText = document.createElement("div");
    reviewText.innerHTML = `
        <div class="review-text">${review.reviewText}</div>
    `;

    reviewAuthorContainer.appendChild(reviewAuthorImage);
    reviewAuthorContainer.appendChild(reviewAuthorNameContainer);

    reviewCardContainer.appendChild(reviewAuthorContainer);
    reviewCardContainer.appendChild(reviewText);
    reviewCardContainer.style.marginTop = `${
      (index + 1) * cssGapValue.charAt(1)
    }rem`;
    bottomContainer.appendChild(reviewCardContainer);
  });
};

generateRatings();
generateReviewCards();
