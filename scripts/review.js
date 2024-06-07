const userReviews = localStorage.getItem("user_reviews") || 0;

const htmlReviews = userReviews
  ? `<p>Your review has been submitted successfully.</p>
    <h2>Total Reviews Submitted</h2>
    <p>${userReviews}</p>`
  : `<p>You have not completed reviews</p>`;

const anchorToForm =
  '<br><a class="btn-review" href="form.html">Make another review</a>';

const totalReviews = document.getElementById("totalReviews");
if (totalReviews) totalReviews.innerHTML = htmlReviews + anchorToForm;
