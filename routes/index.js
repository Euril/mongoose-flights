import { Router } from 'express'
const router = Router()

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/flights')
  // res.render('index', { title: 'Flights' })
})


export { 
  router
}
