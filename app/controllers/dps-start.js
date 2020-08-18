const BaseController = require('./urgent')

class DpsStartController extends BaseController {

    saveValues (req, res, next) {
        req.sessionModel.set('dps', true)
        super.saveValues (req, res, next)
    }
}


module.exports = DpsStartController
