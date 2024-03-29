const express = require("express");
const { getNotes, createNotes, getNotesById, updateNote, deleteNote } = require("../controllers/notesController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();


router.route("/").get(protect,getNotes);
router.route("/create").post(protect, createNotes);
  router.route("/:id")
 .get(getNotesById)
  .put(protect, updateNote)
  .delete(protect,deleteNote);



module.exports = router;