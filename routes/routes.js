const express = require("express");
const operations = require("../controllers/controllers");
const router = express.Router();

router.get('/', operations.getFood);
router.get('/:id', operations.getFoods);
router.post('/', operations.createFood);
router.put('/:id', operations.updateFood);
router.delete('/', operations.deleteFood);

router.post('/:id/person', operations.createPerson);
router.get('/:id/person', operations.getPerson);


module.exports = router;