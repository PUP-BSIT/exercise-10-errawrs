const inputName = document.getElementById("comment_name");
const inputComment = document.getElementById("comment_box");
const commentBtn = document.getElementById("comment_btn");
const commentSection = document.querySelector(".comment-section");

disableCommentButton();

inputName.addEventListener("input", checkRequirements);
inputComment.addEventListener("input", checkRequirements);

function checkRequirements() {
    const isNameValid = inputName.value.trim();
    const isCommentValid = inputComment.value.trim(); 

    commentBtn.disabled = !(isNameValid && isCommentValid);
    commentBtn.classList.toggle("enabled", isNameValid && isCommentValid);
    commentBtn.classList.toggle("disabled", !(isNameValid && isCommentValid));
}

function addComment() {
    const commenter = inputName.value.trim();
    const comment = inputComment.value.trim();

    const commentContainer = createCommentElement(commenter, comment);

    commentSection.appendChild(commentContainer);

    clearInputFields();
    disableCommentButton();
}

function createCommentElement(commenter, comment) {
    const commentContainer = document.createElement("div");
    commentContainer.classList.add("comment-box");

    const commentNameSpan = document.createElement("span");
    commentNameSpan.classList.add("commenter");
    commentNameSpan.textContent = commenter;

    const commentInput = document.createElement("p");
    commentInput.classList.add("comments");
    commentInput.textContent = comment;

    commentContainer.appendChild(commentNameSpan);
    commentContainer.appendChild(commentInput);

    return commentContainer;
}

function clearInputFields() {
    inputName.value = "";
    inputComment.value = "";
}

function disableCommentButton() {
    commentBtn.disabled = true;
    commentBtn.classList.remove("enabled");
    commentBtn.classList.add("disabled");
}
