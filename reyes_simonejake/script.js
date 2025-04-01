let nameInput = document.getElementById("name");
let commentTextarea = document.getElementById("comment");
let submitButton = document.getElementById("submit_button");
let form = document.getElementById("commentForm");
let commentContainer = document.getElementById("commentContainer");

nameInput.addEventListener("input", validateForm);
commentTextarea.addEventListener("input", validateForm);
form.addEventListener("submit", handleSubmit);

function validateForm() {
    if (!nameInput.value.trim() || !commentTextarea.value.trim()) {
        submitButton.disabled = true;
        return;
    }
    submitButton.disabled = false;
}

function handleSubmit(event) {
    event.preventDefault();
    let name = nameInput.value.trim();
    let comment = commentTextarea.value.trim();
    let commentBox = document.createElement("div");
    commentBox.className = "comment-box";
    
    let commentParagraph = document.createElement("p");
    commentParagraph.textContent = comment;
    let authorParagraph = document.createElement("p");
    authorParagraph.className = "author";
    authorParagraph.textContent = name;
  
    commentBox.appendChild(commentParagraph);
    commentBox.appendChild(authorParagraph);
    commentContainer.appendChild(commentBox);
    form.reset();
    validateForm();
}

validateForm();
