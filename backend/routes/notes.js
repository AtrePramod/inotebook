const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");


//routes: 1 Get All the notes : GET "/api/notes/fetchallnotes". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal  Server Error");
    }
});


//routes: 2  Add the notes : POST "/api/notes/addnotes". login required
router.post("/addnotes", fetchuser, [
    body("title", "Enter a vaild Title").isLength({ min: 3 }),
    body("description", "Enter a vaild description").isLength({ min: 5 }),
],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            //If there are error, return bad request and the error
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id,
            });
            const savednote = await note.save();
            res.json(savednote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal  Server Error");
        }
    }
);

//routes: 3 Update the exist the notes : GET "/api/notes/updatenotes". login required
router.put("/updatenotes/:id", fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //create a new notes object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        //find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found"); }
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed"); }
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
          res.json({ note })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal  Server Error");
    }
});
//routes: 4 Delete the notes : Delete "/api/notes/deletenote/:id". login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        //find the note to be deleted and deleted it
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found"); }
        //allow deletion only if user own this note
        if (note.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed"); }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been Deleted" })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal  Server Error");
    }
});
module.exports = router;
