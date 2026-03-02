document.querySelectorAll(".wishlist-btn").forEach(button => {

  button.addEventListener("click", function () {

    this.classList.toggle("active");

    const icon = this.querySelector("i");

    if (this.classList.contains("active")) {
      icon.classList.replace("fa-regular", "fa-solid");
    } else {
      icon.classList.replace("fa-solid", "fa-regular");
    }

  });

});