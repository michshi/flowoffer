const express = require('express')
const router = express.Router()
const knex = require('../knex')

// GET all offers
router.get('/', function (req, res, next) {
  // res.send('GET all offers')
  // SELECT name FROM offer;
  knex('offer')
    .select('id', 'name')
    .then(rows => res.json(rows))
})

// GET a single offer
router.get('/:id', function (req, res, next) {
  // res.send('GET a single offer')
  const { id } = req.params

  knex('offer')
    .select('id', 'name')
    .where('id', id)
    .then(rows => {
      if(rows.length > 0) {
      res.json(rows)
    }
    else {
      res.sendStatus(404)
    }
  })
  })

// POST a new offer
router.post('/', function (req, res, next) {
  // res.send('POST a new offer')
  const { name } = req.body

  knex('offer')
    .insert([
      { name: name }
    ])
    .returning('id')
    .then(result => res.send(result))
})

// DELETE an offer
router.delete('/:id', function (req, res, next) {
  // res.send('DELETE an offer')
  const { id } = req.params

  knex('offer')
    .del()
    .where('id', id)
    .then(result => res.json(result))
})

// UPDATE an offer
router.patch('/:id', function (req, res, next) {
  // res.send('UPDATE an offer')
  const { id } = req.params
  const { name } = req.body

  knex('offer')
    .update({ name: name })
    .where('id', id)
    .returning('id')
    .then(result => res.json(result))
})



module.exports = router
