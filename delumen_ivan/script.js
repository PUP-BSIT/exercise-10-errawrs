let input = document.querySelector(".name");
let textarea = document.querySelector("textarea");
let button = document.querySelector(".submit-button");
let commentSection = document.querySelector(".teammate-comment");
let sortOption = document.querySelector(".sort-option");

button.classList.add("disabled");

button.addEventListener("click", addComment);
input.addEventListener("input", checkValue);
textarea.addEventListener("input", checkValue);
sortOption.addEventListener("change", sortComments);

function checkValue() {
    const hasValidInput = input.value.trim() && textarea.value.trim();

    button.disabled = !hasValidInput;
    button.classList.toggle("disabled", !hasValidInput);
    button.classList.toggle("enable", hasValidInput);
}

function addComment() {
    let currentDate = new Date();
    let formattedDate = currentDate.toISOString();

    let commentContainer = document.createElement("div");
    commentContainer.classList.add("comment-item");
    commentContainer.dataset.time = formattedDate;

    let commentText = document.createElement("p");
    commentText.innerHTML = textarea.value;

    let commentName = document.createElement("strong");
    commentName.innerHTML = input.value;

    commentSection.append(commentContainer);
    commentContainer.append(commentText);
    commentContainer.append(commentName);

    input.value = "";
    textarea.value = "";

    checkValue();
}

function sortComments() {
    //convert .commen-item to array queryselectorAll
    let comments = Array.from(document.querySelectorAll(".comment-item"));
    let selectedSortOrder = sortOption.value;

    comments.sort((a, b) => {
        let dateA = new Date(a.dataset.time);
        let dateB = new Date(b.dataset.time);

        if (selectedSortOrder === "descending") {
            return dateB - dateA;
        } else {
            return dateA - dateB;
        }
    });

    comments.forEach((comment) => commentSection.append(comment));
}