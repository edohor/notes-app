import React, { useState } from 'react';
import "./Note.css"
import ReactMarkdown from 'react-markdown';

let noteList = [];
const saveIcon = (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.59 3.59C17.21 3.21 16.7 3 16.17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V7.83C21 7.3 20.79 6.79 20.41 6.42L17.59 3.59ZM12 19C10.34 19 9 17.66 9 16C9 14.34 10.34 13 12 13C13.66 13 15 14.34 15 16C15 17.66 13.66 19 12 19ZM7 9H13C14.1 9 15 8.1 15 7C15 5.9 14.1 5 13 5H7C5.9 5 5 5.9 5 7C5 8.1 5.9 9 7 9Z" fill="black" fill-opacity="0.54"/>
    </svg>);
const editIcon = (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.7088 5.63124C21.0988 6.02124 21.0988 6.65124 20.7088 7.04124L18.8788 8.87124L15.1288 5.12124L16.9588 3.29124C17.1456 3.10399 17.3993 2.99876 17.6638 2.99876C17.9283 2.99876 18.1819 3.10399 18.3688 3.29124L20.7088 5.63124ZM2.99878 20.5012V17.4612C2.99878 17.3212 3.04878 17.2012 3.14878 17.1012L14.0588 6.19124L17.8088 9.94124L6.88878 20.8512C6.79878 20.9512 6.66878 21.0012 6.53878 21.0012H3.49878C3.21878 21.0012 2.99878 20.7812 2.99878 20.5012Z" fill="black" fill-opacity="0.54"/>
    </svg>);
const trashIcon = (<svg width="20" height="20" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="trashIcon">
    <path  className="trashIcon" d="M13.9844 0.984375V3H0.015625V0.984375H3.48438L4.51562 0H9.48438L10.5156 0.984375H13.9844ZM1 15.9844V3.98438H13V15.9844C13 16.5156 12.7969 16.9844 12.3906 17.3906C11.9844 17.7969 11.5156 18 10.9844 18H3.01562C2.48438 18 2.01562 17.7969 1.60938 17.3906C1.20312 16.9844 1 16.5156 1 15.9844Z" fill="#666666"/>
    </svg>);

function NoteProvider (props) {

    // check if there are notes saved in local storage
    const [notes, setNotes] = useState(
        (localStorage.getItem("notes")!==null && JSON.parse(localStorage.getItem("notes")).length>0) ? 
        JSON.parse(localStorage.getItem("notes")) : []
        );
    const [noteId, setNoteId] = useState(-1);
    const [modal, setModal] = useState(false);
    const [content, setContent] = useState("");
    const [newNoteClicked, setNewNoteClicked] = useState(true);
    const [editMode, setEditMode] = useState(false);

    noteList = notes;

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
        setNewNoteClicked(false);
        setEditMode(false);
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

        setNotes(JSON.parse(localStorage.getItem("notes")));
        setEditMode(false);
        setNoteId(-1);
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
        let text = `This is a note
==============

Subtitle
--------


Shopping list:
* apples
* oranges
* toilet paper
`;
        setContent(text)
        setEditMode(true);
        setNewNoteClicked(true);
        setModal(true);
    }

    function closeModalWindow() {
        setContent("")
        setModal(false);
    }

    function enableEditNote() {
        setEditMode(true);
    }

    function openNote(openedNoteId, index) {
        console.log("[openNote] openedNoteId = ", openedNoteId);
        console.log("[openNote] index = ", index);
        setContent(notes[index].content);
        setNoteId(openedNoteId)
        console.log("[openNote] noteId = ", noteId);

        setEditMode(false);
        setNewNoteClicked(false);
        setModal(true);
    }

    console.log("notes = ", notes);

    let displayNotes = [];
    if (notes.length>0){
        displayNotes = notes.map((note, index) => {
            // console.log("note = ", note);
        let markedUpContentTiles = <ReactMarkdown source={note.content}/>
            return <div className="note"
                        onClick={() => openNote(note.id, index)}>{markedUpContentTiles}</div>
        })
    }

    let markedUpContent = <ReactMarkdown source={content} className="markedUpContent"/>

    console.log("editMode = ", editMode);
    let windowContent = <textarea className="textInput"
        onChange={e => setContent(e.target.value)}
        value={content}
        disabled={editMode ? false : true}>{content}</textarea>

    if (!editMode){
        windowContent = markedUpContent;
    }
    let modalWindow = (
        <div id="myModal" class="modal" style={{display: modal ? 'block' : 'none' }}>
            <div class="modalWindow">
                <div className="tools">
                    <span class="close" onClick={closeModalWindow}>&larr;</span>
                    <span class="delete" onClick={() => deleteNote(noteId)}>{trashIcon}</span>
                    <span class="edit" onClick={newNoteClicked ? 
                        () => addNote(content) : 
                            editMode ? () => editNote(content) : () => enableEditNote()}>{editMode ? saveIcon : editIcon}</span>
                </div>

                {windowContent}
            </div>
        </div>
    )

    console.log("content = ", content);

    return (
        <div className="noteContainer">
            <div className={["note", "addNote"].join(" ")} onClick={openModalWindow}><span className="bigWhitePlus">+</span></div>
            {displayNotes}
            {modalWindow}
        </div>
    )

}

export default NoteProvider;