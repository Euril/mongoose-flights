import { Flight } from '../models/flight.js'

import { Meal } from '../models/meal.js'

function newFlight(req,res){
  const newFlight = new Flight()
  let dt = newFlight.departs
  let departs= dt.toISOString().slice(0,16)
  res.render('flights/new',{
    title: "Add Flight",
    departs,
  })
}

function create(req,res){
  
  for (let key in req.body) {
	  if (req.body[key] === '') delete req.body[key]
	}
  const flight = new Flight(req.body)
  
    
  flight.save(function(err) {
    if (err) return res.redirect ('/flights/new')
    res.redirect(`/flights/${flight._id}`)
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

  Flight.findById(req.params.id)
  .populate('meal')
  .exec(function(error, flight){
    Meal.find({_id: {$nin: flight.meal}}, function(err, meals) 
    {
      // if (err){
         //redirect
      // }else {

      res.render('flights/show', {
        title:'Flight Detail',
        flight:flight,
        meals:meals,
      })
    //}
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

// function deleteTicket(req,res){
//   Flight.findByIdAndDelete(ticket.params.id), function(err,flight){
//     res.redirect('/flights/${flight._id')
//   }
// }

function addToMeal(req,res){
  Flight.findById(req.params.id, function(err, flight){
    console.log(req.body.mealId)
    flight.meal.push(req.body.mealId)
    flight.save(function(err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}


export{
  newFlight as new,
  create,
  index,
  show,
  createTicket,
  deleteFlight as delete,
  addToMeal,
}