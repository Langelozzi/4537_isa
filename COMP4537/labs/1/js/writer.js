document.addEventListener("DOMContentLoaded", () => {
    const noteList = new NoteList();

    const noteListContainer = document.getElementById("noteListContainer");
    noteListContainer.appendChild(noteList.element);
});