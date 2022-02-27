import { Flight } from '../models/flight.js'

function newFlight(req,res){
  res.render('flights/new')
}

function create(req,res){
  for (let key in req.body) {
	  if (req.body[key] === '') delete req.body[key]
	}

  const flight = new Flight(req.body)
  // const dt = flight.departs
  // const departsDate= dt.toISOString().slice(0,16)
  // res.render('flight/new', {departsDate})
  flight.save(function(err) {
    if (err) return res.redirect ('/flights/new')
    res.redirect('/flights')
  })
}

function index(req,res){
  Flight.find({}, function (error,flights){
    res.render('flights/index',{
      flights:flights,
    })
  })
}

export{
  newFlight as new,
  create,
  index
}