import React, { useState } from 'react';
import "./Note.css"

let noteList = [];

function NoteProvider (props) {

    // check if there are notes saved in local storage
    const [notes, setNotes] = useState(
        (localStorage.getItem("notes")!==null && JSON.parse(localStorage.getItem("notes")).length>0) ? 
        JSON.parse(localStorage.getItem("notes")) : []
        );

    noteList = notes;

    const [modal, setModal] = useState(false);

    // const notes = useNotes();

    // const ids = notes.getAllIds();
    // const note = notes.get(id);
    // notes.save(id, source);
    // notes.add(initialSource);
    // notes.remove(id);
    
    // notes.open(id);
    // notes.close();
    // const selectedId = notes.getSelectedId();
    // const selectedNote = notes.getSelected();

    function addNote() {
        let obj = {value: noteList.length, label: "General Kenobi"};
        // obj[noteList.length] = "General Kenobi";
        noteList.push(obj);
        console.log("new noteList = ", noteList);

        localStorage.setItem("notes", JSON.stringify(noteList));

        setNotes(JSON.parse(localStorage.getItem("notes")))
    }

    function deleteNote(index) {
        console.log("index = ", index);

        noteList.splice(index, 1);
        console.log("noteList after delete = ", noteList);

        localStorage.setItem("notes", JSON.stringify(noteList));

        setNotes(JSON.parse(localStorage.getItem("notes")))
    }

    function openModalWindow() {
        setModal(true);
    }

    function closeModalWindow() {
        setModal(false);
    }

    function enableEditNote() {
        setModal(false);
    }

    console.log("notes = ", notes);

    let displayNotes = [];
    if (notes.length>0){
        displayNotes = notes.map((note, index) => {
            console.log("note = ", note);
            return <div className="note"
                        onClick={() => deleteNote(index)}>{note.label}</div>
        })
    }

    let modalWindow = (
        <div id="myModal" class="modal" style={{display: modal ? 'block' : 'none' }}>
            <div class="modalWindow">
                <div className="tools">
                    <span class="close" onClick={closeModalWindow}>&larr;</span>
                    <span class="delete" onClick={deleteNote}>Delete</span>
                    <span class="edit" onClick={enableEditNote}>Save</span>
                </div>
                <textarea className="textInput">Some text in the Modal..</textarea>
            </div>
        </div>
    )

    return (
        <div className="noteContainer">
            <div className="note" onClick={openModalWindow}>AddNote</div>
            {displayNotes}
            {modalWindow}
        </div>
    )

}

export default NoteProvider;