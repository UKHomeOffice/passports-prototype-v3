const express = require('express')
const router = express.Router()
const Wizard = require('hmpo-form-wizard')

const steps = require('./steps')
const fields = require('./fields')

require('./formatters')
require('./validators')

router.use(Wizard(
    steps.apply,
    fields,
    {
        name: 'apply',
        journeyName: 'apply',
        editable: true,
        editBackStep: '/apply/confirm',
        controller: require('./controllers/apply')
    }
))

router.use(Wizard(
    steps.tracking,
    fields,
    {
        name: 'apply',
        journeyName: 'tracking',
        controller: require('./controllers/track')
    }
))

router.use(Wizard(
    steps.csig,
    fields,
    {
        name: 'apply',
        journeyName: 'csig',
        controller: require('./controllers/csig')
    }
))

router.use(Wizard(
    steps.dps,
    fields,
    {
        name: 'apply',
        journeyName: 'apply',
        controller: require('./controllers/dps')
    }
))

router.use((err, req, res, next) => {
    if (err.code === 'SESSION_EXPIRED') err.redirect = '/'
    if (err.code === 'MISSING_PREREQ' && !err.redirect) err.redirect = '/'
    if (err.redirect) return res.redirect(err.redirect)
    next()
})

module.exports = router
