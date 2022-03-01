import { Flight } from '../models/flight.js'

function newFlight(req,res){
  res.render('flights/new',{
    title: "Add Flight"
  })
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
      error:error,
      flights:flights,
      title:'All Flights'
    })
  })
}

function show(req,res){
  
  Flight.findById(req.params.id, function(error, flight){
    res.render('flights/show', {
      title:'Flight Detail',
      flight:flight,
      
    })
  })
}

function createTicket(req,res){
  Flight.findById(req.params.id, function(err,flight){
    flight.tickets.push(req.body)
    flight.save(function(err){
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function deleteFlight(req,res){
  Flight.findByIdAndDelete(req.params.id, function(err,flight){
    res.redirect('/flights')
  })
}


export{
  newFlight as new,
  create,
  index,
  show,
  createTicket,
  deleteFlight as delete,
}