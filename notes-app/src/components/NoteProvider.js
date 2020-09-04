import React, { useState } from 'react';
import "./Note.css"

let noteList = [];

function NoteProvider (props) {

    // let obj = {};
    // obj[0] = "Hello";
    // let obj1 = {};
    // obj1[1] = "There";
    // noteList.push(obj, obj1);
    // console.log("noteList = ", noteList);

    // noteList.map(note => {
    //     console.log("note = ", note);
    //     localStorage.setItem("notes", note);
    // })
    
    // if(JSON.parse(localStorage.getItem("notes")).length>0){
    //     localStorage.setItem("notes", JSON.stringify(noteList));
    // }

    // check if there are notes saved in local storage
    const [notes, setNotes] = useState(
        (localStorage.getItem("notes")!==null && JSON.parse(localStorage.getItem("notes")).length>0) ? 
        JSON.parse(localStorage.getItem("notes")) : []
        );
    noteList = notes;

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

    console.log("notes = ", notes);

    let displayNotes = [];
    if (notes.length>0){
        displayNotes = notes.map((note, index) => {
            console.log("note = ", note);
            return <div className="note"
                        onClick={() => deleteNote(index)}>{note.label}</div>
        })
    }

    return (
        <div className="noteContainer">
            <div onClick={addNote}>AddNote</div>
            {displayNotes}
        </div>
    )

}

export default NoteProvider;