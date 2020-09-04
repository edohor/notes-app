import React, { useState } from 'react';
import "./Note.css"

let noteList = [];
let newNoteClicked = true;

function NoteProvider (props) {

    // check if there are notes saved in local storage
    const [notes, setNotes] = useState(
        (localStorage.getItem("notes")!==null && JSON.parse(localStorage.getItem("notes")).length>0) ? 
        JSON.parse(localStorage.getItem("notes")) : []
        );
    const [noteId, setNoteId] = useState(-1);

    console.log("localStorage = ", JSON.parse(localStorage.getItem("notes")));

    noteList = notes;

    const [modal, setModal] = useState(false);
    const [content, setContent] = useState("");

    function addNote(content) {
        console.log("[addNote] content = ", content);

        // TEST
        let largestId = 0;
        console.log("[addNote] noteList = ", noteList);
        if(noteList.length>0){
            let checkIds = noteList.reduce((a, c) => (a[c.id] = c, a), {});
    
            //Object looks like:
            console.log("test", checkIds);
    
            // find the largest key // maybe a good way to decide the next key
            largestId = Math.max(...Object.keys(checkIds))+1;
            console.log("largest ID", largestId);
        }



        let obj = {id: largestId, content: content};
        // obj[noteList.length] = "General Kenobi";
        noteList.push(obj);
        console.log("new noteList = ", noteList);

        localStorage.setItem("notes", JSON.stringify(noteList));

        setNotes(JSON.parse(localStorage.getItem("notes")));
        
        newNoteClicked = false;
    
        setNoteId(largestId)
    }

    function editNote(content) {
        console.log("[editNote] content = ", content);
        console.log("[editNote] noteId = ", noteId);
        
        let obj = {id: noteId, content: content};

        for(let i=0; i<noteList.length; i++){
            if(noteList[i].id === noteId){
                console.log("noteList [i] = ", noteList[i]);
                noteList.splice(i, 1, obj);
            }
        }

        localStorage.setItem("notes", JSON.stringify(noteList));

        setNoteId(-1);
        setNotes(JSON.parse(localStorage.getItem("notes")));
    }

    function deleteNote(deleteNodeId) {
        console.log("[deleteNote] deleteNodeId = ", deleteNodeId);

        for(let i=0; i<noteList.length; i++){
            if(noteList[i].id === deleteNodeId){
                console.log("noteList [i] = ", noteList[i]);
                noteList.splice(i, 1);
            }
        }
        console.log("noteList after delete = ", noteList);

        localStorage.setItem("notes", JSON.stringify(noteList));

        setNoteId(-1);
        setNotes(JSON.parse(localStorage.getItem("notes")));
        closeModalWindow();
    }

    function openModalWindow() {
        newNoteClicked = true;
        setModal(true);
    }

    function closeModalWindow() {
        setContent("")
        setModal(false);
    }

    function enableEditNote() {
        setModal(false);
    }

    function openNote(openedNoteId, index) {
        console.log("[openNote] openedNoteId = ", openedNoteId);
        console.log("[openNote] index = ", index);
        setContent(notes[index].content);
        setNoteId(openedNoteId)
        console.log("[openNote] noteId = ", noteId);

        newNoteClicked = false;
        setModal(true);
    }

    console.log("notes = ", notes);

    let displayNotes = [];
    if (notes.length>0){
        displayNotes = notes.map((note, index) => {
            // console.log("note = ", note);
            return <div className="note"
                        onClick={() => openNote(note.id, index)}>{note.content}</div>
        })
    }

    let modalWindow = (
        <div id="myModal" class="modal" style={{display: modal ? 'block' : 'none' }}>
            <div class="modalWindow">
                <div className="tools">
                    <span class="close" onClick={closeModalWindow}>&larr;</span>
                    <span class="delete" onClick={() => deleteNote(noteId)}>Delete</span>
                    <span class="edit" onClick={newNoteClicked ? 
                        () => addNote(content) : () => editNote(content)}>Save</span>
                </div>

                <textarea className="textInput"
                onChange={e => setContent(e.target.value)}
                value={content}>{content}</textarea>
            </div>
        </div>
    )

    console.log("content = ", content);

    return (
        <div className="noteContainer">
            <div className="note" onClick={openModalWindow}>AddNote</div>
            {displayNotes}
            {modalWindow}
        </div>
    )

}

export default NoteProvider;