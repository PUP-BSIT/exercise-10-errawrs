let nameInput = document.getElementById('comment_name');
let commentTextarea = document.getElementById('goal_comment');
let submitButton = document.getElementById('comment_button');
let form = document.querySelector('.goal-comment-form');
let commentContainer = document.querySelector('.existing-comments');
let sortAscButton = document.getElementById('sort_asc');
let sortDescButton = document.getElementById('sort_desc');

let commentTimestamps = new Map();

nameInput.addEventListener('input', validateForm);
commentTextarea.addEventListener('input', validateForm);
form.addEventListener('submit', handleSubmit);
sortAscButton.addEventListener('click', () => sortComments('asc'));
sortDescButton.addEventListener('click', () => sortComments('desc'));

document.addEventListener('DOMContentLoaded', () => {
    validateForm();
    
    document.querySelectorAll('.teammate-comment').forEach((comment, index) => {
        let timestamp = Date.now() - ((index + 1) * 24 * 60 * 60 * 1000);
        commentTimestamps.set(comment, timestamp);
        
        comment.dataset.timestamp = timestamp;
    });
});

function validateForm() {
    submitButton.disabled = !nameInput.value.trim() ||
          !commentTextarea.value.trim();
}

function handleSubmit(event) {
    event.preventDefault();
    
    let name = nameInput.value.trim();
    let comment = commentTextarea.value.trim();
    let timestamp = Date.now();
    
    let commentBox = createCommentElement(comment, name, timestamp);
    commentContainer.appendChild(commentBox);
    
    form.reset();
    validateForm();
}

function createCommentElement(commentText, author, timestamp) {
    let commentBox = document.createElement('div');
    commentBox.className = 'teammate-comment';
    commentBox.dataset.timestamp = timestamp;
    
    commentBox.innerHTML = `
        <p class="comment-text">${commentText}</p>
        <span>- ${author}</span>
    `;
    
    commentTimestamps.set(commentBox, timestamp);
    
    return commentBox;
}

function sortComments(order) {
    let comments = Array.from(document.querySelectorAll('.teammate-comment'));
    
    comments.sort((a, b) => {
        let timestampA = commentTimestamps.get(a) || 
              parseInt(a.dataset.timestamp);
        let timestampB = commentTimestamps.get(b) || 
              parseInt(b.dataset.timestamp);
              
        return order === 'asc' ? timestampA - timestampB : 
              timestampB - timestampA;
    });
    
    comments.forEach(comment => commentContainer.appendChild(comment));
}

validateForm();
