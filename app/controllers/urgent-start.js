const BaseController = require('./urgent')

class UrgentStartController extends BaseController {

    saveValues (req, res, next) {
        req.sessionModel.set('urgent', true)
        super.saveValues (req, res, next)
    }
}


module.exports = UrgentStartController
