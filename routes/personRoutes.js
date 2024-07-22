const express = require("express");
const operations = require("../controllers/controllers");
const router = express.Router();

router.post('/', operations.createPerson);
router.get('/:id', operations.getPerson);


module.exports = router;