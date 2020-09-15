import React, { useState } from 'react';
import "./Note.css"
import ReactMarkdown from 'react-markdown';
import ModalWindow from './modalWindow/ModalWindow';

let newNoteClicked = false;

function NoteProvider () {

    // check if there are notes saved in local storage
    const [notes, setNotes] = useState(
        (localStorage.getItem("notes")!==null && JSON.parse(localStorage.getItem("notes")).length>0) ? 
        JSON.parse(localStorage.getItem("notes")) : []
        );
    const [noteId, setNoteId] = useState(-1);
    const [modal, setModal] = useState(false);
    const [content, setContent] = useState("");
    const [editMode, setEditMode] = useState(false);

    function addNote(content) {

        // find largest id number and set it as id for new note
        let largestId = 0;
        if(notes.length>0){
            let checkIds = notes.reduce((a, c) => (a[c.id] = c, a), {});
            largestId = Math.max(...Object.keys(checkIds))+1;
        }

        let obj = {id: largestId, content: content};
        notes.push(obj);

        localStorage.setItem("notes", JSON.stringify(notes));

        setNotes(JSON.parse(localStorage.getItem("notes")));
        // newNoteClicked = false;
        setEditMode(false);
        setNoteId(largestId)
    }

    function editNote(content) {
        
        let obj = {id: noteId, content: content};

        for(let i=0; i<notes.length; i++){
            if(notes[i].id === noteId){
                notes.splice(i, 1, obj);
            }
        }

        localStorage.setItem("notes", JSON.stringify(notes));

        if (!newNoteClicked){
            setNoteId(-1);
        }
        setNotes(JSON.parse(localStorage.getItem("notes")));
        setEditMode(false);
    }

    function deleteNote(deleteNodeId) {

        for(let i=0; i<notes.length; i++){
            if(notes[i].id === deleteNodeId){
                notes.splice(i, 1);
            }
        }

        localStorage.setItem("notes", JSON.stringify(notes));

        setNoteId(-1);
        setNotes(JSON.parse(localStorage.getItem("notes")));
        closeModalWindow();
    }

    function openModalWindow() {

        let text = `This is a note
==============

Subtitle
--------


Shopping list:
* apples
* oranges
* toilet paper
`;

        setContent(text);
        newNoteClicked = true;
        setModal(true);
        addNote(text);
        setEditMode(true);
    }

    function closeModalWindow() {

        setContent("")
        setModal(false);
    }

    function enableEditNote() {

        setEditMode(true);
    }

    function openNote(openedNoteId, index) {

        setContent(notes[index].content);
        setNoteId(openedNoteId)
        setEditMode(false);
        newNoteClicked = false;
        setModal(true);
    }

    // get all notes to display on screen
    let displayNotes = [];
    if (notes.length>0){
        displayNotes = notes.map((note, index) => {
        let markedUpContentTiles = <ReactMarkdown source={note.content}/>
            return <div className="note"
                        onClick={() => openNote(note.id, index)}>{markedUpContentTiles}</div>
        })
    }

    // set up marked up content
    let markedUpContent = <ReactMarkdown source={content} className="markedUpContent"/>

    // set up editable text area with note text
    let windowContent = <textarea className="textInput"
        onChange={e => setContent(e.target.value)}
        value={content}
        disabled={editMode ? false : true}>{content}</textarea>

    if (!editMode){
        windowContent = markedUpContent;
    }

    let modalWindow = (
        <ModalWindow content={windowContent}
            opened={modal}
            editMode={editMode}
            closeModalWindow={closeModalWindow}
            deleteNote={() => deleteNote(noteId)}
            editNote={() => editNote(content)}
            enableEditNote={() => setEditMode(true)}/>
    )

    return (
        <div className="noteContainer">
            <div className={["note", "addNote"].join(" ")} onClick={openModalWindow}><span className="bigWhitePlus">+</span></div>
            {displayNotes}
            {modalWindow}
        </div>
    )

}

export default NoteProvider;