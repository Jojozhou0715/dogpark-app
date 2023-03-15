const express = require('express')
const router = express.Router()
const Dogpark = require('../models/dogpark.js')

router.get('/', (req, res)=>{
    res.render('login.ejs')
})

router.get('/home', (req, res)=>{
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
           name:  'Torsney/Lou Lodati Playground',
           address: '4000-4048 Skillman Ave, Sunnyside, NY 11104',
           phoneNumber: '212-639-9675',
           hours: '9:00 am - 9:00 pm',
           image: ['https://i.imgur.com/FyuFxyS.jpeg', 'https://www.cesarsway.com/wp-content/uploads/2015/06/Cesars-dog-park-tips.jpg.webp', 'https://www.palmspringsca.gov/home/showpublishedimage/29939/637340404770470000'],
           rating: 4.5,
           comments: 'Generally a good crowd of dogs and owners, and is kept clean.'
        },
        {
            name:  'Triborough Bridge Playground',
            address: 'Hoyt Avenue S &, 24th St, 11102',
            phoneNumber: '917-699-8976',
            hours: '9:00 am - 9:00 pm',
            image: [ 'https://cdn.vox-cdn.com/thumbor/M38dq67HOobJ2Ah_d_APWYENLPI=/0x0:5184x3456/1200x900/filters:focal(2178x1314:3006x2142)/cdn.vox-cdn.com/uploads/chorus_image/image/60980507/shutterstock_413091934.14.jpg', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F47%2F2021%2F04%2F20%2Fdogs-playing-at-dog-park-1210828938-2000.jpg', 'https://www.grandrapidsmi.gov/files/assets/public/departments/parks-and-recreation/images/park-pictures/dog-park.jpg?w=1080'],
            rating: 4.5,
            comments: 'Best dog park in the area because of the owners and the community. Has had some great upgrades since Ive last been there!'
         },
         {
            name:  'Forest Park Barking Lot',
            address: '80-30 Park Ln, Queens, NY 11415',
            phoneNumber: '917-576-8687',
            hours: '9:00 am - 9:00 pm',
            image: ['https://patch.com/img/cdn20/getty/22969720/20180724/030000/styles/raw/public/processed_images/gettyimages-692181782-1532458785-2673.jpg?width=1200', 'https://images.squarespace-cdn.com/content/v1/578ce34be6f2e1b4d3ce5045/1469025470195-HOJNSABBNFIUSWVFKM8I/image-asset.jpeg?format=2500w', 'https://cityoflakewood.us/wp-content/uploads/2018/10/DOG_PARK-3.jpg'],
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

router.get('/:id/edit', (req, res)=>{
    Dogpark.findById(req.params.id, (err, foundDogpark)=>{
        if(err){
            console.log(err.message)
        }else{
            console.log(foundDogpark)
            res.render('edit.ejs', {
                dogpark: foundDogpark
            })
        }
    })
})

router.post('/home', (req, res)=>{
    req.body.image=req.body.image.split(',')
    Dogpark.create(req.body, (err, createdDogpark)=>{
        if(err){
            console.log(err.message)
        }else{
            console.log(createdDogpark)
            res.redirect('/dogpark/home')
        }
    })
})

router.put('/:id', (req, res)=>{
    req.body.image=req.body.image.split(',')
    Dogpark.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updateDogpark)=>{
        if(err){
            console.log(err.message)
        }else{
            res.redirect('/dogpark/home')
        }
    })
})

router.delete('/:id', (req, res)=>{
    Dogpark.findByIdAndDelete(req.params.id, (err, deleteDogpark)=>{
        if(err){
            console.log(err.message)
        }else{
            res.redirect('/dogpark/home')
        }
    })
})

module.exports = router