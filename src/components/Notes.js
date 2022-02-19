import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import { Addnote } from './Addnote';
import { Noteitem } from './Noteitem';
import { useHistory } from "react-router";
export const Notes = (props) => {
    const {showAlert}=props;
    const context = useContext(noteContext);
    let history=useHistory();
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
       else{
           history.push("/login")
       }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" })

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
       // props.showAlert("Logged in Successfully ","success");
    }
    const handleclick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        // addNote(note.title,note.description,note.tag);
        props.showAlert("Updated in Successfully ","success");
    }
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='container my-3'>
                <div >
                    <Addnote showAlert={showAlert}/>
                    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Launch demo modal
                    </button>
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">

                                    <form className='my-3'>
                                        <div className="mb-3">
                                            <label htmlFor="etitle" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onchange} />

                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="edescription" className="form-label">Description</label>
                                            <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onchange} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="tag" className="form-label">Tag</label>
                                            <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onchange} />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleclick}>Update Note</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row my-3">
                    <h2>Your Notes</h2>
                    <div className="container">
                        {notes.length === 0 && 'No notes to display'}
                    </div>
                    {notes.map((note) => {
     
                        return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={showAlert} />;
                    })}
                </div>
            </div>
        </>
    )
}
