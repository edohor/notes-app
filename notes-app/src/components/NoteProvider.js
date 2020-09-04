import React, { useState } from 'react';

function NoteProvider (props) {

    let noteList = [];
    let obj = {};
    obj[0] = "Hello";
    let obj1 = {};
    obj1[1] = "There";
    // obj[1] = "There";
    noteList.push(obj, obj1);
    console.log("noteList = ", noteList);

    noteList.map(note => {
        console.log("note = ", note);
        localStorage.setItem("notes", note);
    })
    localStorage.setItem("notes", JSON.stringify(noteList));
    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")));
    const [notesId, setNotesId] = useState(localStorage.getItem("notesId"));

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
        let obj = {};
        obj[noteList.length] = "General Kenobi";
        noteList.push(obj);
        console.log("new noteList = ", noteList);

        localStorage.setItem("notes", JSON.stringify(noteList));

        setNotes(JSON.parse(localStorage.getItem("notes")))
    }

    console.log("notes = ", notes);

    let displayNotes = notes.map((note, index) => {
        console.log("note label = ", note[index]);
        return <div>{note[index]}</div>
    })

    return (
        <div>
        <div onClick={addNote}>AddNote</div>
        {displayNotes}
        </div>
    )

}

export default NoteProvider;