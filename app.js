document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".add-Notes").addEventListener("click", addNotes);
    loadNotes(); // Load saved notes on page load
});

// Function to Add Notes & Save to Local Storage
function addNotes(e) {
    if (e.target.classList.contains("add-Notes")) {
        console.log("Adding a new note...");
        let notesTitle = prompt("Enter your note title:");
        let noteId = new Date().getTime(); // Unique ID for each note

        let noteObj = {
            id: noteId,
            title: notesTitle,
            content: "", // Textarea content
        };

        saveNoteToLocalStorage(noteObj);
        displayNote(noteObj);
    }
}

// Function to Display a Note in UI
function displayNote(note) {
    let tempDiv = document.createElement("div");
    tempDiv.className = "card text-bg-secondary col-sm-6 col-md-3 mb-3 mb-sm-0";
    tempDiv.setAttribute("data-id", note.id); // Store ID for updating/deleting

    tempDiv.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${note.title}</h5>
            <textarea class="text-bg-info form-control note-content" rows="3">${note.content}</textarea>
            <div class="text-center">
                <span class="mt-2 btn btn-danger btn-sm delete">
                    <i class="fa-solid fa-square-minus"></i>
                </span>
            </div>                    
        </div>
    `;

    document.querySelector(".sticky-Notes").appendChild(tempDiv);
}

// Function to Save Note to Local Storage
function saveNoteToLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to Load Notes from Local Storage
function loadNotes() {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.forEach(displayNote);
}

// Event Listener for Auto-Saving Textarea Changes
document.querySelector(".sticky-Notes").addEventListener("input", function (e) {
    if (e.target.classList.contains("note-content")) {
        let noteElement = e.target.closest(".card");
        let noteId = noteElement.getAttribute("data-id");
        let updatedContent = e.target.value;
        updateNoteInLocalStorage(noteId, updatedContent);
    }
});

// Function to Update Note Content in Local Storage
function updateNoteInLocalStorage(noteId, newContent) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.map(note => {
        if (note.id === parseInt(noteId)) {
            return { ...note, content: newContent };
        }
        return note;
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Event Delegation for Deleting Notes
document.querySelector(".sticky-Notes").addEventListener("click", function (e) {
    if (e.target.classList.contains("delete") || e.target.closest(".delete")) {
        let noteElement = e.target.closest(".card");
        let noteId = noteElement.getAttribute("data-id");
        deleteNoteFromLocalStorage(noteId);
        noteElement.remove();
    }
});

// Function to Delete Note from Local Storage
function deleteNoteFromLocalStorage(noteId) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    let updatedNotes = notes.filter(note => note.id !== parseInt(noteId));
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
}
