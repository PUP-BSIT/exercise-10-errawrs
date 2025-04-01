let nameInput = document.getElementById('comment_name');
let commentTextarea = document.getElementById('goal_comment');
let submitButton = document.getElementById('comment_button');
let form = document.querySelector('.goal-comment-form');
let commentContainer = document.querySelector('.existing-comments');

nameInput.addEventListener('input', validateForm);
commentTextarea.addEventListener('input', validateForm);
form.addEventListener('submit', handleSubmit);

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
    let commentBox = document.createElement('div');
    commentBox.className = 'teammate-comment';

    let commentParagraph = document.createElement('p');
    commentParagraph.textContent = comment;
    let authorSpan = document.createElement('span');
    authorSpan.textContent = `- ${name}`;

    commentBox.appendChild(commentParagraph);
    commentBox.appendChild(authorSpan);
    commentContainer.appendChild(commentBox);
    form.reset();
    validateForm();
}

validateForm();
