const express = require("express");
const operations = require("../controllers/controllers");
const router = express.Router();

router.get('/', operations.getFoods);
router.get('/:id', operations.getFood);
router.post('/', operations.createFood);
router.delete('/:id', operations.deleteFood);

router.post('/', operations.createPerson);
router.get('/', operations.getPerson);


module.exports = router;