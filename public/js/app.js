// console.log("working");

const showBookingModal = () => {
  let formContainer = window.document.getElementById("formContainer"),
    bookNowButton = document.getElementById("bookNowButton"),
    headingText = document.getElementById("headingText");
  formContainer.style.display = "flex";
  bookNowButton.style.display = "none";
  headingText.style.display = "none";
};
