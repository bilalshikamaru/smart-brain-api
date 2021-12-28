const Clarifai = require('clarifai');
const apiKey = process.env.APIKEY


const app = new Clarifai.App({
    apiKey: 'b26d99d8f72342cb8a221016538648b0'
}); 


const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })  
    .catch(err => err.status(400).json('unable to work with API') )           
}


const handleImage = (req, res, db) => {
    const {id} = req.body
    db('users')
    .where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0])
    })
    .catch(err => res.status(400).json('error to get entries'))  
}


module.exports = {
    handleImage : handleImage,
    handleApiCall : handleApiCall
}