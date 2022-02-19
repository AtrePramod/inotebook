import React, { useContext,useState } from 'react'
import noteContext from '../context/notes/noteContext';

export const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setnote] = useState( {title:"",description:"",tag:""})
   
    const handleclick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setnote( {title:"",description:"",tag:""});
        props.showAlert("Added Successfully","success");

    }
    const onchange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }

    return (
        <div className="container my-3">
            <h2>Add a Notes</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onchange} minLength={5} required/>
                     
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onchange} minLength={5} value={note.description} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onchange}/>
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
            </form>
        </div>
    )
}
