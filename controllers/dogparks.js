const express = require('express')
const { findOneAndUpdate } = require('../models/dogpark.js')
const router = express.Router()
const Dogpark = require('../models/dogpark.js')

router.get('/', (req, res)=>{
    Dogpark.find({}, (err, foundDogparks)=>{
        if(err){
            console.log(err.message)
        }else{
            console.log(foundDogparks[0])
            res.render('index.ejs', {
                dogparks: foundDogparks
            })
        }
    })
    
})

router.get('/new', (req, res)=>{
    res.render('new.ejs')
})

router.get('/seed', (req, res)=>{
    Dogpark.create([
        {
           name:  'Torsney/Lou Lodati Playground Dog Run',
           address: '4000-4048 Skillman Ave, Sunnyside, NY 11104',
           phoneNumber: 212-639-9675,
           hours: '9:00 am - 9:00 pm',
           image: 'https://i.imgur.com/FyuFxyS.jpeg',
           rating: 4.5,
           comments: 'Generally a good crowd of dogs and owners, and is kept clean.'
        },
        {
            name:  'Triborough Bridge Playground C Dog Run',
            address: 'Hoyt Avenue S &, 24th St, 11102',
            phoneNumber: 917-699-8976,
            hours: '9:00 am - 9:00 pm',
            image: 'https://www.nycgovparks.org/facilities/images/dog-runs-header.jpg',
            rating: 4.5,
            comments: 'Best dog park in the area because of the owners and the community. Has had some great upgrades since Ive last been there!'
         },
         {
            name:  'Forest Park Barking Lot',
            address: '80-30 Park Ln, Queens, NY 11415',
            phoneNumber: 917-576-8687,
            hours: '9:00 am - 9:00 pm',
            image: 'https://patch.com/img/cdn20/getty/22969720/20180724/030000/styles/raw/public/processed_images/gettyimages-692181782-1532458785-2673.jpg?width=1200',
            rating: 4.5,
            comments: "Great dog park with lots of room for the pups. Easy parking close by. The water wasnt working so I would bring a water bottle for your pup."
         }

    ])
} )

router.get('/:id', (req, res)=>{
    Dogpark.findById(req.params.id, (err, foundDogpark)=>{
        if(err){
            console.log(err.message)
        }else{
            console.log(foundDogpark)
            res.render('show.ejs', {
                dogpark: foundDogpark
            })
        }
    })
})

router.post('/', (req, res)=>{
    Dogpark.create(req.body, (err, createdDogpark)=>{
        if(err){
            console.log(err.message)
        }else{
            console.log(createdDogpark)
            res.redirect('/dogpark')
        }
    })
})

module.exports = router