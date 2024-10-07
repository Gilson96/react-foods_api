const express = require("express");
const operations = require("../controllers/controllers");
const router = express.Router();

router.get('/', operations.getFoods);
router.get('/:id', operations.getFood);
router.put('/:id', operations.updateFood);
router.post('/', operations.createFood);
router.delete('/:id', operations.deleteFood);


module.exports = router;