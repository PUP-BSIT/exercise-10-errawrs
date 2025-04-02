let input = document.querySelector(".name");
let textarea = document.querySelector("textarea");
let button = document.querySelector(".submit-button");
let commentSection = document.querySelector(".teammate-comment");
let sortOption = document.querySelector(".sort-option");

button.classList.add("disabled");

input.addEventListener("input", checkValue);
textarea.addEventListener("input", checkValue);
sortOption.addEventListener("change", sortComments);

// Function to check if both fields are filled to enable the button
function checkValue() {
    const hasValidInput = input.value.trim() && textarea.value.trim();

    button.disabled = !hasValidInput;
    button.classList.toggle("disabled", !hasValidInput);
    button.classList.toggle("enable", hasValidInput);
}

// Function to add a new comment
function addComment() {
    const dateNow = new Date();
    const formattedDate = dateNow.toISOString();

    const commentContainer = document.createElement("div");
    commentContainer.classList.add("comment-item");
    commentContainer.dataset.timestamp = formattedDate; // Store timestamp in data attribute

    const commentText = document.createElement("p");
    commentText.textContent = textarea.value;

    const commentName = document.createElement("strong");
    commentName.textContent = input.value;

    const timeStamp = document.createElement("span");
    timeStamp.classList.add("comment-timestamp");
    timeStamp.textContent = dateNow.toLocaleString();

    commentSection.append(commentContainer);
    commentContainer.append(commentText);
    commentContainer.append(commentName);
    commentContainer.append(timeStamp);

    input.value = "";
    textarea.value = "";

    checkValue();

    // After adding a new comment, sort all comments
    sortComments();
}

// Add a timestamp to existing comments when the page loads
function addTimestampsToExistingComments() {
    const comments = commentSection.querySelectorAll(".comment-item");

    comments.forEach((comment, index) => {
        // Generate a unique timestamp for each comment
        const dateNow = new Date();
        dateNow.setMinutes(dateNow.getMinutes() - index * 5); // Make each timestamp different

        const formattedDate = dateNow.toLocaleString(); // Convert date to a human-readable format

        const timeStamp = document.createElement("span");
        timeStamp.classList.add("comment-timestamp");
        timeStamp.textContent = formattedDate; // Set the timestamp

        comment.append(timeStamp);
    });
}

// Function to sort comments based on timestamp (ascending/descending)
function sortComments() {
    const comments = Array.from(
        commentSection.querySelectorAll(".comment-item")
    );
    const sortOrder = sortOption.value;

    comments.sort((a, b) => {
        const timestampA = new Date(a.dataset.timestamp);
        const timestampB = new Date(b.dataset.timestamp);

        if (sortOrder === "ascending") {
            return timestampA - timestampB;
        } else if (sortOrder === "descending") {
            return timestampB - timestampA;
        }
        return 0;
    });

    // Re-render the sorted comments
    commentSection.innerHTML = "";
    comments.forEach((comment) => commentSection.append(comment));
}
