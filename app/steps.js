const apply = {
    '/filter': {
        entryPoint: true,
        resetJourney: true,
        skip: true,
        next: '/filter/begin'
    },
    '/filter/begin': {
        backLink: '/start.html',
        next: '/filter/overseas'
    },
    '/filter/overseas': {
        fields: [
            'isUKApplication',
            'countryOfApplication'
        ],
        next: '/filter/intro'
    },
    '/filter/intro': {
        next: '/filter/age'
    },
    '/filter/age': {
        fields: [
            'dateOfBirth'
        ],
        next: '/photo/digital-photo'
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
    '/photo/upload': {
        controller: require('./controllers/upload'),
        fields: [
            'photo'
        ],
        next: [
            { field: 'photoQuality', value: 'good', next: '/photo/photo-check-result-good' },
            { field: 'photoQuality', value: 'fair', next: '/photo/photo-check-result-fair' },
            { field: 'photoQuality', value: 'poor', next: '/photo/photo-check-result-poor' },
            '/photo/not-accepted'
        ]
    },
    '/photo/retrieve': {
        // controller: require('../../controllers/photo-code'),
        // template: 'photo-code',
        fields: [
            'photoCodeSld',
            'photoCodeTld',
            'photoCodePath',
            'photoCode'
        ],
        next: '/photo/retrieving-image'
    },
    '/photo/retrieving-image': {
        next: '/photo/photo-check-result-good'
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
    '/photo/not-accepted': {
    },
    '/photo/code-error': {
    },
    '/photo/choose-submit-good-photo': {
        fields: [
            'submitPhoto'
        ],
        next: [
            { field: 'submitPhoto', value: false, next: '/photo/choose-photo-method' },
            '/filter/previous-passport'
        ]
    },
    '/photo/choose-submit-photo': {
        next: '/filter/previous-passport'
    },

    '/filter/previous-passport': {
        fields: [
            'previousPassport'
        ],
        next: [
            { field: 'previousPassport', value: true, next: '/filter/lost-or-stolen' },
            '/filter/naturalisation-certificate'
        ]
    },
    '/filter/lost-or-stolen': {
        fields: [
            'lost'
        ],
        next: [
            { field: 'lost', value: true, next: '/filter/cancelled-passport' },
            '/filter/issue-date'
        ]
    },
    '/filter/cancelled-passport': {
        fields: [
            'cancelled'
        ],
        next: [
            { field: 'cancelled', value: true, next: '/filter/other-passports' },
            'https://www.gov.uk/report-a-lost-or-stolen-passport'
        ]
    },
    '/filter/issue-date': {
        fields: [
            'passportIssue',
            'passportIssuingAuthority'
        ],
        next: '/filter/damaged'
    },
    '/filter/damaged': {
        fields: [
            'damaged',
            'damagedReason'
        ],
        next: '/filter/other-passports'
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
        next: [
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
        next: '/apply/name'
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
        next: '/apply/new-passport'
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
            { field: 'csigRequired', value: true, next: '/apply/urgent-passport' },
            { field: 'urgent', value: true, next: '/apply/urgent-passport' },
            { field: 'documentsRequired', value: 'none', next: '/apply/urgent-passport' },
            '/apply/documents-to-send'
        ]
    },
    '/apply/urgent-passport': {
        next: [
            '/ '
        ]
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
            { field: 'paperForm', value: true, next: '/track/view?status=PAPER_REFEREE_RECEIVED'},
            '/track/view'
        ]
    },
    '/track/confirm-identity-form': {
        prereqs: ['/track/view'],
        noPost: true,
    },
}

module.exports = {
    apply,
    tracking
}
