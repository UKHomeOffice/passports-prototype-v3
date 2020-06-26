const BaseController = require('.')
const moment = require('moment')

class DefaultController extends BaseController {
    successHandler (req, res, next) {
        this.setAgeGroup(req)
        this.setApplicationType(req)
        this.setCsigDPS(req)
        this.setParentsRequired(req)
        this.setEUSSEligible(req)
        this.setGrandparentsRequired(req)
        this.setParentOfChild(req)
        this.setDPSUpsellEligible(req)
        this.setCosts(req)
        this.setCsigRequired(req)
        this.setDocsRequired(req)
        super.successHandler(req, res, next)
    }

    setAgeGroup (req) {
        let age
        let adultOrChild
        let ageGroup
        let photoAgeGroup
        const dateOfBirth = req.sessionModel.get('dateOfBirth')

        if (dateOfBirth) {
            age = moment().diff(dateOfBirth, 'years')

            const dob1to5 = moment().subtract(1, 'years').format('YYYY-MM-DD')
            const dob6to11 = moment().subtract(6, 'years').format('YYYY-MM-DD')
            const dob12to15 = moment().subtract(12, 'years').format('YYYY-MM-DD')
            const dobRising16 = moment().subtract(16, 'years').add(3, 'weeks').format('YYYY-MM-DD')
            const dobAdult = moment().subtract(16, 'years').format('YYYY-MM-DD')
            const dobVeteran = '1929-09-03'

            if (dateOfBirth <= dobVeteran) {
                adultOrChild = 'adult'
                ageGroup = 'veteran'
                photoAgeGroup = 'adult'
            } else if (dateOfBirth <= dobAdult) {
                adultOrChild = 'adult'
                ageGroup = 'adult'
                photoAgeGroup = 'adult'
            } else if (dateOfBirth <= dobRising16) {
                adultOrChild = 'adult'
                ageGroup = 'rising16'
                photoAgeGroup = 'adult'
            } else if (dateOfBirth <= dob12to15) {
                adultOrChild = 'child'
                ageGroup = '12to15'
                photoAgeGroup = '12to15'
            } else if (dateOfBirth <= dob6to11) {
                adultOrChild = 'child'
                ageGroup = 'under12'
                photoAgeGroup = '6to11'
            } else if (dateOfBirth <= dob1to5) {
                adultOrChild = 'child'
                ageGroup = 'under12'
                photoAgeGroup = '1to5'
            } else {
                adultOrChild = 'child'
                ageGroup = 'under12'
                photoAgeGroup = 'under1'
            }
        }
        req.sessionModel.set('age', age)
        req.sessionModel.set('adultOrChild', adultOrChild)
        req.sessionModel.set('ageGroup', ageGroup)
        req.sessionModel.set('photoAgeGroup', photoAgeGroup)
    }

    setApplicationType (req) {
        let oldBlue = false
        let applicationType
        if (req.sessionModel.get('previousPassport') === true) {
            if (req.sessionModel.get('passportIssue') < '2004-01-01') {
                oldBlue = true
                applicationType = 'first'
            } else {
                applicationType = 'renew'
            }
        } else if (req.sessionModel.get('previousPassport') === false) {
            applicationType = 'first'
        }
        req.sessionModel.set('applicationType', applicationType)
        req.sessionModel.set('oldBlue', oldBlue)
    }

    setCsigDPS (req) {
        let reqCsigDps = false
        if (req.sessionModel.get('passportIssue') < '2002-01-01') {
            reqCsigDps = true
        }
        req.sessionModel.set('reqCsigDps', reqCsigDps)
    }

    setParentsRequired (req) {
        req.sessionModel.set('parentsRequired', false)

        if (req.sessionModel.get('applicationType') === 'first' ||
            req.sessionModel.get('adultOrChild') === 'child') {
            req.sessionModel.set('parentsRequired', true)
        }
    }

    // FIXME: If `bornInUK` === true || `countryOfBirth` === '', set `countryOfBirth` = 'GB', as otherwise EUSS logic won't trigger
    setEUSSEligible (req) {
        let eussEligible = false
        const dateOfBirth = req.sessionModel.get('dateOfBirth')
        const isSameOrAfterEUSSDate = moment(dateOfBirth).isSameOrAfter('2018-08-28')

        if (isSameOrAfterEUSSDate &&
            req.sessionModel.get('applicationType') === 'first' &&
            !req.sessionModel.get('naturalised') &&
            req.sessionModel.get('countryOfBirth') === 'GB') {
            eussEligible = true
        } else {
            req.sessionModel.unset('parentsHaveEUSettledStatus')
        }
        req.sessionModel.set('eussEligible', eussEligible)
    }

    setGrandparentsRequired (req) {
        let grandparentsRequired = true

        if (req.sessionModel.get('eussEligible')) {
            grandparentsRequired = false
        }

        // if (req.sessionModel.get('grandparentsCompleted')) {
        //     debug('Grandparents required: forms completed')
        //     grandparentsRequired = true
        // }

        const rightOfAbodeDate = moment('1983-01-01')
        const parentsNotMarriedBirthDate = moment('2006-07-01')

        // Renew or Replace
        if (req.sessionModel.get('applicationType') === 'renew' || req.sessionModel.get('applicationType') === 'replace') {
            grandparentsRequired = false
        }

        // Applicant born in UK before right of abode legislation
        if (req.sessionModel.get('bornInUK') &&
            moment(req.sessionModel.get('dateOfBirth')).isBefore(rightOfAbodeDate)) {
            // debug('Grandparents not required: born in UK before right of abode legislation')
            grandparentsRequired = false
        }

        if (req.sessionModel.get('naturalised')) {
            // debug('Grandparents not required: Naturalised')
            grandparentsRequired = false
        }

        // Applicant is hidden FTA born before right of abode
        if (req.sessionModel.get('bornInUK') &&
            moment(req.sessionModel.get('dateOfBirth')).isBefore(rightOfAbodeDate) &&
            req.sessionModel.get('previousPassport')) {
            // debug('Grandparents not required: Applicant born in UK before right of abode and passport date of issue before 01/01/1994')
            grandparentsRequired = false
        }

        // Mothers passport number supplied
        if (req.sessionModel.get('parent1PassportNumber')) {
            // debug('Grandparents not required: Mothers passport number supplied')
            grandparentsRequired = false
        }

        // Fathers passport number and married
        if (req.sessionModel.get('parent2PassportNumber') &&
            req.sessionModel.get('parentsMarried') === true) {
            // debug('Grandparents not required: Fathers passport number and married')
            grandparentsRequired = false
        }

        // Mother born in UK before right of abode
        if (req.sessionModel.get('parent1CountryOfBirth') === 'GB' &&
            moment(req.sessionModel.get('parent1DateOfBirth')).isBefore(rightOfAbodeDate)) {
            // debug('Grandparents not required: Mother born in UK before right of abode')
            grandparentsRequired = false
        }

        // Father born in UK before right of abode and married
        if (req.sessionModel.get('parent2CountryOfBirth') === 'GB' &&
            moment(req.sessionModel.get('parent2DateOfBirth')).isBefore(rightOfAbodeDate) &&
            req.sessionModel.get('parentsMarried') === true) {
            // debug('Grandparents not required: Father born in UK before right of abode and married')
            grandparentsRequired = false
        }

        // Parents not married, father passport number supplied, born on or after 2006-07-01
        if (moment(req.sessionModel.get('dateOfBirth')).isSameOrAfter(parentsNotMarriedBirthDate) &&
            req.sessionModel.get('parent2PassportNumber')) {
            // debug('Grandparents not required: Fathers passport number, not married, born after Jul 2006')
            grandparentsRequired = false
        }

        // debug('Grandparents required')
        req.sessionModel.set('grandparentsRequired', grandparentsRequired)
    }

    setParentOfChild (req) {
        const thirdPartyRelationship = req.sessionModel.get('relationship')
        const isParent = thirdPartyRelationship === 'mother' || thirdPartyRelationship === 'father'
        const isParentOfChild = isParent && req.sessionModel.get('adultOrChild') === 'child'

        req.sessionModel.set('isParentOfChild', isParentOfChild)
    }

    setDPSUpsellEligible (req) {
        let dpsUpsellEligible = false
        if (req.sessionModel.get('adultOrChild') === 'adult' &&
            req.sessionModel.get('bornInUK') === true &&
            req.sessionModel.get('thirdParty') === false &&
            req.sessionModel.get('isUKApplication') === true &&
            req.sessionModel.get('changeOfName') === false &&
            req.sessionModel.get('damaged') === false &&
            req.sessionModel.get('lost') === false &&
            req.sessionModel.get('otherPassports') === false) {
            dpsUpsellEligible = true
        }
        req.sessionModel.set('dpsUpsellEligible', dpsUpsellEligible)
    }

    setCosts (req) {
        let passportCost
        if (req.sessionModel.get('adultOrChild') === 'child') {
            if (req.sessionModel.get('largePassport')) {
                passportCost = 59.00
            } else {
                passportCost = 49.00
            }
        } else { // adult
            if (req.sessionModel.get('largePassport')) {
                passportCost = 85.50
            } else {
                passportCost = 75.50
            }
        }

        if (req.sessionModel.get('urgentPassport') === true) {
            if (req.sessionModel.get('largePassport')) {
                passportCost = 187
        } else {
            passportCost = 177
        }}

        if (req.sessionModel.get('dps') === true) {
            if (req.sessionModel.get('largePassport')) {
                passportCost = 187
        } else {
            passportCost = 177
        }}

        let deliveryCost
        if (req.sessionModel.get('secureDelivery')) {
            deliveryCost = 5.00
        } else {
            deliveryCost = 0.00
        }

        req.sessionModel.set('passportCost', passportCost)
        req.sessionModel.set('deliveryCost', deliveryCost)
        req.sessionModel.set('totalCost', passportCost + deliveryCost)
    }

    setCsigRequired (req) {
        if (req.sessionModel.get('applicationType') === 'first') {
            return req.sessionModel.set('csigRequired', true)
        }
        if (req.sessionModel.get('lost') === true) {
            return req.sessionModel.set('csigRequired', true)
        }
        if (req.sessionModel.get('ageGroup') === 'under12') {
            return req.sessionModel.set('csigRequired', true)
        }
        req.sessionModel.set('csigRequired', false)
    }

    setDocsRequired (req) {
        let documentsRequired = 'passport'
        if (req.sessionModel.get('lost')) documentsRequired = 'none'
        if (req.sessionModel.get('adultOrChild') === 'child') documentsRequired = 'documents'
        if (req.sessionModel.get('applicationType') === 'first') documentsRequired = 'documents'
        if (req.sessionModel.get('changeOfName')) documentsRequired = 'documents'
        if (req.sessionModel.get('documentsToSend') === false) documentsRequired = 'none'
        req.sessionModel.set({ documentsRequired })
    }
}

module.exports = DefaultController
