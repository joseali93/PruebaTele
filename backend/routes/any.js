const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const testCollectionSchema = new Schema({}, { strict: false })
const TestCollection = mongoose.model('test_collection', testCollectionSchema)
// Getting all subscribers
router.get('/', async (req, res) => {
  try {

    const subscribers = await TestCollection.find()
    res.json(subscribers)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Creating one subscriber
router.post('/', async (req, res) => {
  
    const multipleItem=[]
    if(req.body.length>1){
        var item = req.body;
        const testCollectionSchema = new Schema({}, { strict: false })
        const TestCollection = mongoose.model('test_collection', testCollectionSchema)
        item.forEach(element => {
          
        //    let body = req.body
           const items = new TestCollection(element)
           multipleItem.push(items)
        });
        for (let index = 0; index < multipleItem.length; index++) {
            const element = multipleItem[index];
            // console.log('element',element)
        }
        try {
            const newItem = await TestCollection.collection.insertMany(multipleItem)
            // const newItem = await multipleItem.insertMany()
            console.log('inserto');
            res.status(201).json(newItem)
          } catch (err) {
            res.status(400).json({ message: err.message })
          }
    }else{
        const testCollectionSchema = new Schema({}, { strict: false })
        const TestCollection = mongoose.model('test_collection', testCollectionSchema)
        let body = req.body
        const items = new TestCollection(body)
        // const items = new Any(req.body);
        
        // new mongoose.Schema({
      try {
        const newItem = await items.save()
        console.log('inserto');
        res.status(201).json(newItem)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
    }

})

// Middleware function for gettig subscriber object by ID
async function getSubscriber(req, res, next) {
  try {
    subscriber = await Subscriber.findById(req.params.id)
    if (subscriber == null) {
      return res.status(404).json({ message: 'Cant find subscriber'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }
  
  res.subscriber = subscriber
  next()
}

module.exports = router