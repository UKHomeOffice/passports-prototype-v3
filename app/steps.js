const apply = {

    // ========================
    // Comment '/' out if index.html does not need to use the form-wizard (normally doesn't).
    // TODO: Improve this: Viewing the first page (index.html) will reset the journey, so shouldn't be used normally.
    // Uncomment to use for purposes such as lab testing variations, and you need radio options in index.html.
    // ========================
    // '/': {
    //     template: 'index.html',
    //     entryPoint: true,
    //     resetJourney: true,
    //     fields: [
    //         'labTestOptions'
    //     ],
    //     next: '/filter/begin'
    // },
    // ========================

    '/help/cookies-setting': {
        checkJourney: false,
    },
    '/help/cookies-policy': {
        checkJourney: false,
    },
    '/help/feedback-or-help': {
        checkJourney: false,
        fields: [
            'feedbackOrHelp'
        ],
        next: [
            { field: 'feedbackOrHelp', value: 'help', next: '/help' },
            '/help/feedback'
        ]
    },
    '/help/feedback': {
        backLink: '/help/feedback-or-help',
        checkJourney: false,
        next: '/help/feedback-thank-you'
    },
    '/help/feedback-thank-you': {
        checkJourney: false,
    },

    '/filter': {
        entryPoint: true,
        resetJourney: true,
        skip: true,
        next: '/filter/overseas'
    },
    // '/filter/begin': {
    //     backLink: '/start.html',
    //     next: '/filter/overseas'
    // },
    '/filter/overseas': {
        fields: [
            'isUKApplication',
            'countryOfApplication'
        ],
        next:[
            { field: 'dps', value: true, next: [
                { field: 'isUKApplication', value: true, next: '/filter/age' },
                '/dps/dps-not-eligible'
            ]},
            '/filter/intro'
        ]
    },
    '/filter/intro': {
        next: '/filter/age'
    },
    '/filter/age': {
        fields: [
            'dateOfBirth'
        ],
        next:[
            { field: 'dps', value: true, next: [
                { field: 'adultOrChild', value: 'adult', next: '/filter/previous-passport' },
                '/dps/dps-not-eligible'
            ]},
            '/photo/digital-photo'
        ]
    },

    '/photo/digital-photo': {
        next: '/photo/choose-photo-method'
    },
    '/photo/choose-photo-method': {
        fields: [
            'photoMethod'
        ],
        next: [
            { field: 'photoMethod', value: 'photo-code', next: '/photo/retrieve' },
            '/photo/how-to-take-a-photo'
        ]
    },
    '/photo/how-to-take-a-photo': {
        next: '/photo/upload'
    },

    /* Upload */
    '/photo/upload': {
        controller: require('./controllers/upload'),
        fields: [
            'photo'
        ],
        next: [
            { field: 'photoQuality', value: 'good', next: '/photo/photo-check-result-good' },
            { field: 'photoQuality', value: 'fair', next: '/photo/photo-check-result-fair' },
            { field: 'photoQuality', value: 'poor', next: '/photo/photo-check-result-poor' },
            { field: 'photoQuality', value: 'error-fail', next: '/photo/not-accepted' },
            { field: 'photoQuality', value: 'error-file-invalid', next: '/photo/file-invalid' },
            { field: 'photoQuality', value: 'error-server-too-busy', next: '/photo/server-too-busy' },
            '/photo/not-accepted'
        ]
    },
    '/photo/photo-check-result-good': {
        template: 'photo/photo-check-result',
        next: '/photo/choose-submit-good-photo'
    },
    '/photo/photo-check-result-fair': {
        template: 'photo/photo-check-result',
        next: '/photo/choose-submit-photo'
    },
    '/photo/photo-check-result-poor': {
        template: 'photo/photo-check-result',
        next: '/photo/choose-submit-photo'
    },
    '/photo/choose-submit-good-photo': {
        fields: [
            'submitPhoto'
        ],
        next: [
            { field: 'dps', value: true, next: [
                { field: 'submitPhoto', value: true, next: '/apply/passport-details' },
                '/photo/choose-photo-method'
            ]},
            { field: 'submitPhoto', value: true, next: '/filter/previous-passport' },
            '/photo/choose-photo-method'
        ]
    },
    '/photo/choose-submit-photo': {
        fields: [
            'photoOverride',
            'photoOverrideReason'
        ],
        next: [
            { field: 'dps', value: true, next: '/apply/passport-details' },
            { field: 'photoOverride', value: false, next: '/photo/choose-photo-method' },
            '/filter/previous-passport'
        ]
    },

    /* OIX */
    '/photo/retrieve': {
        controller: require('./controllers/photo-code'),
        template: 'photo/photo-code',
        fields: [
            'photoCodeSld',
            'photoCodeTld',
            'photoCodePath',
            'photoCode'
        ],
        next: '/photo/retrieving-image'
    },
    '/photo/retrieving-image': {
        controller: require('./controllers/retrieving-image'),
        next: [
            { field: 'photoQuality', value: 'pass', next: '/photo/check-and-submit-passed-photo' },
            { field: 'photoQuality', value: 'error-overridable', next: '/photo/check-and-submit-photo' },
            { field: 'photoQuality', value: 'error-fail', next: '/photo/not-accepted' },
            { field: 'photoQuality', value: 'error-fetch', next: '/photo/code-error' },
            { field: 'photoQuality', value: 'error-file-invalid', next: '/photo/file-invalid' },
            { field: 'photoQuality', value: 'error-server-too-busy', next: '/photo/server-too-busy' },
            { field: 'photoQuality', value: 'error-too-many-requests', next: '/photo/server-too-busy' },
            '/photo/not-accepted'
        ]
    },
    '/photo/check-and-submit-passed-photo': {
        // controller: require('../../controllers/check-photo'),
        fields: [
            'submitPhoto'
        ],
        next: [
            { field: 'dps', value: true, next: [
                { field: 'submitPhoto', value: true, next: '/apply/passport-details' },
                '/photo/choose-photo-method'
            ]},
            '/filter/previous-passport'
        ]
    },
    '/photo/check-and-submit-photo': {
        // controller: require('../../controllers/check-photo'),
        fields: [
            'photoOverride',
            'photoOverrideReason'
        ],
        next: [
            { field: 'photoOverride', value: false, next: '/photo/choose-photo-method' },
            { field: 'dps', value: true, next: '/apply/passport-details' },
            '/filter/previous-passport'
        ]
    },

    /* Both Upload and OIX */
    '/photo/not-accepted': {
        next: '/photo/choose-photo-method'
    },
    '/photo/code-error': {
        next: '/photo/choose-photo-method'
    },
    '/photo/file-invalid': {
        next: '/photo/choose-photo-method'
    },
    '/photo/server-too-busy': {
        next: '/photo/choose-photo-method'
    },

    '/filter/previous-passport': {
        fields: [
            'previousPassport'
        ],
        next: [
            { field: 'dps', value: true, next: [
                { field: 'previousPassport', value: true, next: '/filter/lost-or-stolen' },
                '/dps/dps-not-eligible'
            ]},
            { field: 'previousPassport', value: true, next: '/filter/lost-or-stolen' },
            '/filter/naturalisation-certificate'
        ]
    },
    '/filter/lost-or-stolen': {
        fields: [
            'lost'
        ],
        next: [
            { field: 'dps', value: true, next: [
                { field: 'lost', value: false, next: '/dps/dps-name-changed' },
                '/filter/cancelled-passport'
            ]},
            { field: 'lost', value: true, next: '/filter/cancelled-passport' },
            '/filter/issue-date'
        ]
    },
    '/filter/cancelled-passport': {
        fields: [
            'cancelled'
        ],
        next: [
            { field: 'dps', value: true, next: [
                { field: 'cancelled', value: false, next: '/dps/dps-lost-or-stolen-cannot-use-online-premium'  },
                '/dps/dps-lost-or-stolen-choose-different-service'
            ]},
            { field: 'cancelled', value: true, next: '/filter/other-passports' },
            'https://www.gov.uk/report-a-lost-or-stolen-passport'
        ]
    },
    '/filter/issue-date': {
        fields: [
            'passportIssue',
            'passportIssuingAuthority'
        ],
        next: [
        { field: 'dps', value: true, next: [
            { field: 'reqCsigDps', value: false, next: '/dps/dps-damaged'  },
            '/dps/dps-not-eligible'
        ]},
        '/filter/damaged'
        ]
    },
    '/filter/damaged': {
        fields: [
            'damaged',
            'damagedReason'
        ],
        next: [
            { field: 'dps', value: true, next: [
                { field: 'damaged', value: false, next: '/filter/other-passports' },
                '/dps/dps-not-eligible'
            ]},
            '/filter/other-passports'
        ]
    },
    '/filter/naturalisation-certificate': {
        fields: [
            'naturalised'
        ],
        next: '/filter/other-passports'
    },
    '/filter/other-passports': {
        fields: [
            'otherPassports'
        ],
        next: [
            { field: 'dps', value: true, next: [
                { field: 'otherPassports', value: false, next: '/apply/application-summary' },
                '/dps/dps-not-eligible'
            ]},
            { field: 'isUKApplication', value: true, next: '/apply/application-summary' },
            { field: 'applicationType', value: 'first', next: '/filter/country-of-birth' },
            '/filter/british-citizen'
        ]
    },
    '/filter/country-of-birth': {
        fields: [
            'countryOfBirth'
        ],
        next: '/apply/application-summary'
    },
    '/filter/british-citizen': {
        fields: [
            'nationality'
        ],
        next: '/apply/application-summary'
    },

    '/apply/application-summary': {
        fields: [
            'applyReason'
        ],
        next: [
            { field: 'dps', value: true , next: '/dps/dps-how-to-apply' },
            { field: 'applyReason', value: 'compassionate', next: '/apply/urgent-compassionate-guidance' },
            { field: 'applyReason', value: 'government', next: '/apply/urgent-compassionate-guidance' },
            { field: 'applyReason', value: 'identification', next: '/apply/urgent-compassionate-guidance' },
            '/apply/apply-later'
        ]
    },

    '/apply/urgent-compassionate-guidance': {
    },
    '/apply/apply-later': {
        fields: [
            'applyNow'
        ],
        next: [
            { field: 'applyNow', value: 'false', next: '/start' },
            { field: 'dps', value: true , next: '/dps/dps-how-to-apply' },
            { field: 'applicationType', value: 'first', next: '/apply/what-you-need' },
            { field: 'adultOrChild', value: 'child', next: '/apply/what-you-need' },
            { field: 'previousPassport', value: true, next: [
                { field: 'lost', value: true, next: '/apply/optional-passport-details' },
                '/apply/passport-details'
            ] },
            '/apply/what-you-need'
        ]
    },

    '/apply/what-you-need': {
        fields: [
            'whatYouNeed'
        ],
        next: [
            { field: 'previousPassport', value: true, next: [
                { field: 'applicationType', value: 'first', next: '/apply/old-passport-details' }, // Old blue
                { field: 'lost', value: true, next: '/apply/optional-passport-details' },
                '/apply/passport-details'
            ] },
            '/apply/name'
        ]
    },
    '/apply/passport-details': {
        fields: [
            'passportNumber',
            'passportExpiry'
        ],
        next: [
            { field: 'dps', value: true, next: '/dps/dps-name' },
            '/apply/name'
        ]
    },
    '/apply/old-passport-details': {
        fields: [
            'oldPassportNumber',
            'oldPassportExpiry'
        ],
        next: '/apply/name'
    },
    '/apply/optional-passport-details': {
        fields: [
            'optionalPassportNumber',
            'optionalPassportExpiry'
        ],
        next: '/apply/name'
    },
    '/apply/name': {
        fields: [
            'title',
            'otherTitle',
            'firstName',
            'lastName',
            'changeOfName'
        ],
        revalidateIf: ['adultOrChild'],
        next: [
            { field: 'changeOfName', value: true, next: [
                { field: 'adultOrChild', value: 'child', next: '/apply/previous-names' },
                '/apply/change-of-name'
            ] },
            '/apply/previous-names'
        ]
    },
    '/apply/change-of-name': {
        fields: [
            'nameChangeReason'
        ],
        revalidateIf: ['changeOfName'],
        next: '/apply/previous-names'
    },
    '/apply/previous-names': {
        fields: [
            'previousNames',
            'previousName1',
            'previousFirstName1',
            'previousLastName1',
            'previousName2',
            'previousFirstName2',
            'previousLastName2',
            'previousName3',
            'previousFirstName3',
            'previousLastName3'
        ],
        revalidateIf: ['changeOfName'],
        next: '/apply/gender'
    },
    '/apply/gender': {
        fields: [
            'gender'
        ],
        next: '/apply/birth'
    },
    '/apply/birth': {
        fields: [
            'bornInUK',
            'countryOfBirth',
            'townOfBirth'
        ],
        next: [
            { field: 'dps', value: true , next: '/apply/address-manual' },
            { field: 'applicationType', value: 'first', next: [
                { field: 'naturalised', value: true, next: '/apply/naturalisation-details' },
                '/apply/family-details'
            ] },
            { field: 'adultOrChild', value: 'child', next: '/apply/parents-details' },
            { field: 'isUKApplication', value: false, next: '/apply/address-manual' },
            '/apply/address-manual'
        ]
    },
    '/apply/naturalisation-details': {
        fields: [
            'naturalisationCertificateNumber',
            'naturalisationIssueDate'
        ],
        next: '/apply/family-details'
    },
    '/apply/family-details': {
        next: '/apply/parents-details'
    },
    '/apply/parents-details': {
        controller: require('./controllers/parents-and-grandparents'),
        fields: [
            'parent1FirstName',
            'parent1LastName',
            'parent1DateOfBirth',
            'parent1NoDetailsReason',
            'parent2FirstName',
            'parent2LastName',
            'parent2DateOfBirth',
            'parent2NoDetailsReason',
            'parentsMarried',
            'parentsMarriageDate'
        ],
        next: [
            { field: 'applicationType', value: 'first', next: [
                { field: 'eussEligible', value: true, next: '/apply/parents-eu-settled-status' },
                '/apply/parent1-details'
            ] },
            '/apply/parent1-details'
        ]
    },
    '/apply/parents-eu-settled-status': {
        fields: [
            'parentsHaveEUSettledStatus'
        ],
        continueOnEdit: true,
        revalidateIf: ['dateOfBirth', 'naturalised', 'applicationType', 'countryOfBirth'],
        next: '/apply/parent1-details'
    },
    '/apply/parent1-details': {
        fields: [
            'parent1TownOfBirth',
            'parent1CountryOfBirth',
            'parent1Nationality',
            'parent1HasPassport',
            'parent1PassportNumber',
            'parent1PassportIssueDate'
        ],
        next: '/apply/parent2-details'
    },
    '/apply/parent2-details': {
        fields: [
            'parent2TownOfBirth',
            'parent2CountryOfBirth',
            'parent2Nationality',
            'parent2HasPassport',
            'parent2PassportNumber',
            'parent2PassportIssueDate'
        ],
        next: [
            { field: 'grandparentsRequired', value: true, next: '/apply/grandparents-explanatory' },
            { field: 'isUKApplication', value: false, next: '/apply/address-manual' },
            '/apply/address-manual'
        ]
    },
    '/apply/grandparents-explanatory': {
        continueOnEdit: true,
        next: '/apply/parent1-grandparents'
    },
    '/apply/parent1-grandparents': {
        controller: require('./controllers/parents-and-grandparents'),
        fields: [
            'parent1Parent1FirstName',
            'parent1Parent1LastName',
            'parent1Parent1TownOfBirth',
            'parent1Parent1CountryOfBirth',
            'parent1Parent1DateOfBirth',
            'parent1Parent1NoDetailsReason',

            'parent1Parent2FirstName',
            'parent1Parent2LastName',
            'parent1Parent2TownOfBirth',
            'parent1Parent2CountryOfBirth',
            'parent1Parent2DateOfBirth',
            'parent1Parent2NoDetailsReason',

            'parent1ParentsMarried',
            'parent1ParentsMarriageDate'
        ],
        next: '/apply/parent2-grandparents'
    },
    '/apply/parent2-grandparents': {
        controller: require('./controllers/parents-and-grandparents'),
        fields: [
            'parent2Parent1FirstName',
            'parent2Parent1LastName',
            'parent2Parent1TownOfBirth',
            'parent2Parent1CountryOfBirth',
            'parent2Parent1DateOfBirth',
            'parent2Parent1NoDetailsReason',

            'parent2Parent2FirstName',
            'parent2Parent2LastName',
            'parent2Parent2TownOfBirth',
            'parent2Parent2CountryOfBirth',
            'parent2Parent2DateOfBirth',
            'parent2Parent2NoDetailsReason',

            'parent2ParentsMarried',
            'parent2ParentsMarriageDate'
        ],
        next: '/apply/address-manual'
    },
    '/apply/address-manual': {
        fields: [
            'addressLine1',
            'addressLine2',
            'addressTown',
            'addressPostcode'
        ],
        next: '/apply/contact-details'
    },
    '/apply/contact-details': {
        fields: [
            'contactEmail',
            'contactEmailConfirm',
            'diallingCodeContact',
            'contactPhone',
            'contactPhoneGroup'
        ],
        next: '/apply/contact-preferences'
    },
    '/apply/contact-preferences': {
        fields: [
            'contactPrefsEmail',
            'contactPrefsSMS',
            'diallingCodeSMS',
            'mobilePhone',
            'mobilePhoneGroup'
        ],
        next: [
            { field: 'dps', value: true, next: '/dps/dps-new-passport' },
            '/apply/new-passport'
        ]
    },
    '/apply/new-passport': {
        fields: [
            'largePassport',
            'braille'
        ],
        editBackStep: '/apply/cost',
        next: [
            { field: 'ageGroup', value: 'under12', next: '/apply/relationship-to-applicant' },
            '/apply/sign'
        ]
    },
    '/apply/sign': {
        fields: [
            'canSign',
            'noSignReason'
        ],
        next: [
            { field: 'dps', value: true, next: '/apply/confirm' },
            { field: 'isUKApplication', value: true, next: [
                { field: 'adultOrChild', value: 'child', next: '/apply/relationship-to-applicant' },
                '/apply/who-for'
            ] },
            { field: 'adultOrChild', value: 'child', next: '/apply/relationship-to-applicant' },
            '/apply/who-for'
        ]
    },
    '/apply/who-for': {
        fields: [
            'thirdParty'
        ],
        next: [
            { field: 'thirdParty', value: true, next: '/apply/relationship-to-applicant' },
            '/apply/confirm'
        ]
    },
    '/apply/relationship-to-applicant': {
        fields: [
            'relationship',
            'otherRelationship'
        ],
        revalidateIf: ['thirdParty'],
        continueOnEdit: true,
        next: '/apply/third-party-name'
    },
    '/apply/third-party-name': {
        controller: require('./controllers/third-party-name'),
        fields: [
            'thirdPartyFirstName',
            'thirdPartyLastName',
            'thirdPartyExplanation'
        ],
        next: '/apply/confirm'
    },
    '/apply/confirm': {
        editable: false,
        next: [
            { field: 'dps', value: true, next: '/apply/cost' },
            { field: 'documentsRequired', value: 'none', next: '/apply/cost' },
            { field: 'csigRequired', value: true, next: '/apply/confirm-identity' },
            // ====================================================================
            // DPS upsell journey disabled due to COVID-19. Uncomment to re-enable.
            // ====================================================================
            // { field: 'applicationType', value: 'renew', next: [
            //     { field: 'dpsUpsellEligible', value: true, next: '/apply/urgent-passport' },
            //     '/apply/documents-to-send'
            // ] },
            '/apply/documents-to-send'
        ]
    },
    '/apply/urgent-passport': {
        fields: [
            'urgentPassport'
        ],
        next: [
            { field: 'urgentPassport', value: true, next: '/apply/urgent-passport-how-to' },
            '/apply/documents-to-send'
        ]
    },
    '/apply/urgent-passport-how-to': {
        next: '/apply/urgent-passport-book-date-and-place'
    },
    '/apply/urgent-passport-book-date-and-place': {
        noPost: true,
        next: '/apply/urgent-passport-book-time'
    },
    '/apply/urgent-passport-book-time': {
        noPost: true,
        next: '/apply/urgent-passport-check-appointment'
    },
    '/apply/urgent-passport-check-appointment': {
        next: '/apply/declaration'
    },
    '/apply/confirm-identity': {
        next: [
            { field: 'documentsRequired', value: 'none', next: '/apply/cost' },
            '/apply/documents-to-send'
        ]
    },
    '/apply/documents-to-send': {
        fields: [
            'documentsToSend'
        ],
        next: [
            { field: 'documentsToSend', value: false, next: '/apply/cost' },
            { field: 'isUKApplication', value: true, next: '/apply/passport-delivery' },
            '/apply/cost'
        ]
    },
    '/apply/passport-delivery': {
        fields: [
            'secureDelivery'
        ],
        editBackStep: '/apply/cost',
        next: '/apply/cost'
    },
    '/apply/cost': {
        editable: false,
        revalidateIf: ['*'],
        next: '/apply/declaration'
    },
    '/apply/declaration': {
        editable: false,
        fields: [
            'declaration'
        ],
        revalidateIf: ['*'],
        next: '/apply/payment'
    },

    '/apply/payment': {
        editable: false,
        revalidate: true,
        next: '/apply/payment-card'
    },
    '/apply/payment-card': {
        editable: false,
        revalidate: true,
        next: '/apply/payment-submission'
    },
    '/apply/payment-submission': {
        template: 'apply/payment',
        editable: false,
        revalidate: true,
        next: '/apply/next-steps'
    },

    '/apply/next-steps': {
        backLink: false,
        editable: false,
        noPost: true
    }
}

const tracking = {
    '/track': {
        entryPoint: true,
        skip: true,
        next: '/track/reference'
    },
    '/track/reference': {
        fields: [
            'appReference'
        ],
        next: '/track/email'
    },
    '/track/email': {
        fields: [
            'trackDateOfBirth',
            'trackEmail'
        ],
        next: '/track/view'
    },
    '/track/view': {
        noPost: true,
        next: '/track'
    },
    '/track/ask-someone-to-confirm': {
        prereqs: ['/track/view'],
        next: '/track/what-you-need-to-do'
    },
    '/track/what-you-need-to-do': {
        next: '/track/person-contact-details'
    },
    '/track/person-contact-details': {
        prereqs: ['/track/view'],
        fields: [
            'refereeFirstName',
            'refereeSurname',
            'refereeEmail',
            'refereeEmailConfirm',
            'refereeContactDeclaration'
        ],
        next: '/track/email-sent'
    },
    '/track/email-sent': {
        backLink: false,
        next: '/track/view'
    },
    '/track/use-a-form': {
        prereqs: ['/track/view'],
        fields: ['paperForm'],
        next: [
            { field: 'paperForm', value: true, next: '/track/view?status=PAPER_REFEREE_RECEIVED' },
            '/track/view'
        ]
    },
    '/track/confirm-identity-form': {
        prereqs: ['/track/view'],
        noPost: true
    },
}

const csig = {
    '/csig/start': {
        entryPoint: true,
        resetJourney: true,
        backLink: false,
        next: '/csig/sign-in'
    },
    '/csig/sign-in': {
        controller: require('./controllers/csig-pex-reference-sign-in'),
        fields: [
            'csigAppReference',
            'csigDateOfBirth'
        ],
        next:[
        { field: 'csigExpired', value: true, next: '/csig/csig-expired' },
        { field: 'csigInvalid', value: true, next: '/csig/csig-invalid' },
        '/csig/declaration'
        ]
    },
    '/csig/csig-expired':{
        next: 'https://www.gov.uk/'
    },
    '/csig/csig-invalid':{
        next:'/csig/sign-in'
    },
    '/csig/declaration': {
        fields: [
            'csigDeclaration'
        ],
        next: '/csig/referee-passport'
    },
    '/csig/referee-passport': {
        controller: require('./controllers/csig-get-age'),
        fields: [
            'refereePassportNumber',
            'refereePassportExpiry',
            'refereeDateOfBirth'
        ],
        next: '/csig/referee-name'
    },
    '/csig/referee-name': {
        fields: [
            'csigFirstName',
            'csigMiddleName',
            'csigLastName'
        ],
        next: '/csig/referee-address'
    },
    '/csig/referee-address': {
        fields: [
            'refereePostcode'
        ],
        next: '/csig/referee-address-select'
    },
    '/csig/referee-address-select': {
        fields: [
            'refereeAddressSelect'
        ],
        next:'/csig/identity-auth'
    },
    '/csig/referee-address-manual':{
        controller: require('./controllers/manual-address'),
        prereqs: ['csig/referee-address'],
        fields: [
            'homeFlatName',
            'homeBuildingName',
            'homeBuildingNumber',
            'homeStreet',
            'homeDistrict',
            'addressTown',
            'homeCounty',
            'addressPostcode'
        ],
        next:'/csig/identity-auth'
    },
    '/csig/csig-identity-failed':{
        backLink: false,
        entryPoint: true,
        next:'/csig/referee-passport'
    },
    '/csig/csig-identity-failed-three-times':{
        backLink: false,
        entryPoint: true,
        next:'/index'
    },
    '/csig/identity-auth': {
        next:[
            { field: 'csigAdultOrChild', value: 'child', next: '/csig/exceptions' },
            { field: 'csigIdentityFailed', value: true, next: '/csig/csig-identity-failed' },
            '/csig/what-happens-next'
        ]
    },
    '/csig/what-happens-next':{
        next:[
            { field: 'csigChild', value: false, next: '/csig/confirm-applicant' },
            '/csig/confirm-applicant-relationship'
        ]
    },
    '/csig/confirm-applicant':{
        controller: require('./controllers/csig-eligiblity'),
        fields: [
            'confirmPhotoAdult',
            'knowPersonallyAdult',
            'areRelatedInRelationshipOrLivingSameAddressAdult',
            'howKnowAdult',
            'howManyYearsKnownAdult'
        ],
        next: [
            { field: 'confirmPhotoAdult', value: true, next: [
                { field: 'knowPersonallyAdult', value: false, next: '/csig/applicant-summary-adult' },
                { field: 'areRelatedInRelationshipOrLivingSameAddressAdult', value: true, next: '/csig/applicant-summary-adult' },
                { field: 'csigAdultEligible', value: false, next: '/csig/applicant-summary-adult' },
                '/csig/confirm-applicant-address'
            ] },
            { field: 'confirmPhotoAdult', value: false, next: [
                { field: 'knowPersonallyAdult', value: false, next: '/csig/applicant-summary-adult' },
                { field: 'areRelatedInRelationshipOrLivingSameAddressAdult', value: true, next: '/csig/applicant-summary-adult' },
                { field: 'csigAdultEligible', value: false, next: '/csig/applicant-summary-adult' },
                '/csig/applicant-photo-fail-adult'
            ] }
        ]
    },
    '/csig/confirm-applicant-relationship':{
        fields: [
            'isDetailsCorrect',
        ],
        next: '/csig/confirm-applicant-child-eligibility'
    },
    '/csig/confirm-applicant-child-eligibility':{
        controller: require('./controllers/csig-eligiblity'),
        fields: [
            'knowPersonallyChild',
            'areRelatedInRelationshipOrLivingSameAddressChild',
            'howKnowChild',
            'howManyYearsKnownChild'
        ],
        next: [
            { field: 'knowPersonallyChild', value: false, next: '/csig/applicant-summary-child' },
            { field: 'areRelatedInRelationshipOrLivingSameAddressChild', value: true, next: '/csig/applicant-summary-child' },
            { field: 'csigChildEligible', value: false, next: '/csig/applicant-summary-child' },
            '/csig/confirm-applicant-child'
        ]
    },
    '/csig/applicant-summary-adult':{
        backLink: false,
        next: '/csig/exceptions'
    },
    '/csig/applicant-summary-child':{
        backLink: false,
        next: '/csig/exceptions'
    },
    '/csig/exceptions':{
        backLink: false,
        next: 'https://www.gov.uk/'
    },
    '/csig/confirm-applicant-child':{
        fields: [
            'confirmPhoto',
            'confirmTown'
        ],
        next:[
        { field: 'confirmPhoto', value: false, next:'/csig/applicant-photo-fail-child'},
        '/csig/confirm-applicant-parents'
        ]
    },
    '/csig/applicant-photo-fail-adult':{
        fields: [
            'describeProblemAdult'
        ],
        next:'/csig/confirm-applicant-address'
    },
    '/csig/applicant-photo-fail-child':{
        fields: [
            'describeProblemChild'
        ],
        next:'/csig/confirm-applicant-parents'
    },
    '/csig/confirm-applicant-parents': {
        fields: [
            'parent1Details',
            'parent2Details'
        ],
        next:'/csig/confirm-applicant-address'
    },
    '/csig/confirm-applicant-address':{
        fields: [
            'confirmAddress'
        ],
        next:'/csig/csig-details-work'
    },
    '/csig/csig-details-work':{
        fields: [
            'csigProfession',
            'csigRetired'
        ],
        next:[
            //{ field: 'csigRetired', value: true, next:'/csig/csig-details-contact'},
            { field: 'csigRetired', value: true, next: [
                { field: 'address-lookup', value: false, next: '/csig/your-home-address'  },
                '/csig/csig-details-contact'
            ]},
            '/csig/csig-details-work-address'
        ]
    },
    '/csig/your-home-address':{
        fields: [
            'addressLine1',
            'addressLine2',
            'addressTown',
            'addressPostcode'
        ],
        next:'/csig/csig-details-contact'
    },

    '/csig/csig-details-work-address':{
        fields: [
            'workEmployerName',
            'workAddressLine1',
            'workAddressLine2',
            'workAddressTown',
            'workAddressPostcode'
        ],
        next:'/csig/csig-details-contact'
    },
    '/csig/csig-details-contact':{
        fields: [
            'csigEmail',
            'csigPhone'
        ],
        next:'/csig/confirmation'
    },
    '/csig/confirmation':{
        backLink: false
    }
}

const dps = {
    '/dps/dps-start': {
        controller: require('./controllers/dps-start'),
        entryPoint: true,
        resetJourney: true,
        next: '/filter/overseas'
    },
    '/dps/dps-not-eligible':{
    },
    '/dps/dps-lost-or-stolen-choose-different-service':{
        next:'/filter/begin'
    },
    '/dps/dps-lost-or-stolen-cannot-use-online-premium':{
        next:'https://www.gov.uk/report-a-lost-or-stolen-passport'
    },
    '/dps/dps-name-changed': {
        fields: [
            'nameChanged'
        ],
        next:[
            { field: 'nameChanged', value: 'false', next: '/filter/issue-date' },
            '/dps/dps-not-eligible'
        ]
    },
    '/dps/dps-damaged': {
        fields: [
            'damaged'
        ],
        next: [
            { field: 'dps', value: true, next: [
                { field: 'damaged', value: false, next: '/filter/other-passports' },
                '/dps/dps-not-eligible'
            ]},
            '/filter/other-passports'
        ]
    },
    '/dps/dps-how-to-apply':{
        next:'/dps/dps-choose-date-and-place'
    },
    '/dps/dps-choose-date-and-place':{
        noPost: true,
        next: '/dps/dps-choose-time'
    },
    '/dps/dps-choose-time':{
        noPost: true,
        next:'/dps/dps-check-appointment'
    },
    '/dps/dps-check-appointment':{
        next:'/photo/digital-photo'
    },
    '/dps/dps-name':{
        fields: [
            'title',
            'otherTitle',
            'firstName',
            'lastName'
        ],
        next:'/apply/previous-names'
    },
    '/dps/dps-new-passport':{
        fields: [
            'largePassport',
            'braille'
        ],
        editBackStep: '/apply/cost',
        next:'/apply/sign'
    }
}

const dps = {
    '/urgent/dps-start': {
        controller: require('./controllers/dps-start'),
        entryPoint: true,
        resetJourney: true,
        next: '/filter/overseas'
    },
    '/urgent/dps-not-eligible':{
    },
    '/urgent/dps-lost-or-stolen-choose-different-service':{
        next:'/filter/begin'
    },
    '/urgent/dps-lost-or-stolen-cannot-use-online-premium':{
        next:'https://www.gov.uk/report-a-lost-or-stolen-passport'
    },
    '/urgent/dps-name-changed': {
        fields: [
            'nameChanged'
        ],
        next:[
            { field: 'nameChanged', value: 'false', next: '/filter/issue-date' },
            '/urgent/dps-not-eligible'
        ]
    },
    '/urgent/dps-damaged': {
        fields: [
            'damaged'
        ],
        next: [
            { field: 'dps', value: true, next: [
                { field: 'damaged', value: false, next: '/filter/other-passports' },
                '/urgent/dps-not-eligible'
            ]},
            '/filter/other-passports'
        ]
    },
    '/urgent/dps-how-to-apply':{
        next:'/urgent/dps-choose-date-and-place'
    },
    '/urgent/dps-choose-date-and-place':{
        noPost: true,
        next: '/urgent/dps-choose-time'
    },
    '/urgent/dps-choose-time':{
        noPost: true,
        next:'/urgent/dps-check-appointment'
    },
    '/urgent/dps-check-appointment':{
        next:'/photo/digital-photo'
    },
    '/urgent/dps-name':{
        fields: [
            'title',
            'otherTitle',
            'firstName',
            'lastName'
        ],
        next:'/apply/previous-names'
    },
    '/urgent/dps-new-passport':{
        fields: [
            'largePassport',
            'braille'
        ],
        editBackStep: '/apply/cost',
        next:'/apply/sign'
    }
}

module.exports = {
    apply,
    tracking,
    csig,
    dps
}
