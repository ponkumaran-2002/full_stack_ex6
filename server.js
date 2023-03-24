const router = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/bus_ticket_reservation',{}).then(con=>{
    console.log('DB Connection Successful')
});
const Feedback = mongoose.model('reviews',
                new mongoose.Schema({
                    name: String,
                    email: String,
                    phno: String,
                    hospitality_r: String,
                    hygine_r:String,
                    suggestion:String
                }))
router.use(bodyParser.urlencoded({extended: true}));
router.listen(9000,()=>console.log('Server Fired Up at 3000'))
router.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})
router.post('/sendFeedback', async(req, res) => {
    let { name, email, phno,hospitality_r,hygine_r,suggestion} = req.body
    console.log(name)
    console.log(req.body)
   await new Feedback({name,email,phno,hospitality_r,hygine_r,suggestion}).save()
      console.log(f)   

})
router.post('/getResult',async(req,res)=>{

    let f = await Feedback.find({hospitality_r:'Best'},{name:1,_id:0})
    console.log(f)   
})
