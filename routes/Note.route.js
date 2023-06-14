const express = require("express");
const { NoteModel } = require("../models/Note.model");

const noteRouter = express.Router();

noteRouter.post("/create", async (req, res) => {
    try {
        const note = new NoteModel(req.body);
        await note.save();

        res.status(200).send({ "msg": "Note Created" });
    }
    catch (err) {
        res.status(400).send({ "err": err.message });
    }
});


noteRouter.get("/", async (req, res) => {
    try {
        const notes = await NoteModel.find({ authorId: req.body.authorId });

        res.status(200).send(notes);
    }
    catch (err) {
        res.status(400).send({ "err": err.message });
    }
});


noteRouter.patch("/update/:noteId", async (req, res) => {
    const { noteId } = req.params;
    const note = await NoteModel.findOne({ _id: noteId });

    try {
        if (req.body.authorId !== note.authorId) {
            res.status(200).send({ "msg": "You are not authorized to update this note" });
        }
        else {
            await NoteModel.findByIdAndUpdate({ _id: noteId }, req.body);
            res.status(200).send({ "msg": "Note Updated" });
        }

    }
    catch (err) {
        res.status(400).send({ "err": err.message });
    }
});


noteRouter.delete("/delete/:noteId", async (req, res) => {
    const { noteId } = req.params;
    const note = await NoteModel.findOne({ _id: noteId });

    try {
        if (req.body.authorId !== note.authorId) {
            res.status(200).send({ "msg": "You are not authorized to delete this notes" });
        }
        else {
            await NoteModel.findByIdAndDelete({ _id: noteId });
            res.status(200).send({ "msg": "Note Deleted" });
        }
    }
    catch (err) {
        res.status(400).send({ "err": err.message });
    }
});


module.exports = {
    noteRouter
}