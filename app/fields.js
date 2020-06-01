module.exports = {

    // ========================
    // Comment `labTestOptions` out if index.html does not need to use the form-wizard (normally doesn't).
    // TODO: Improve this: Viewing the first page (index.html) will reset the journey, so shouldn't be used normally.
    // Uncomment to use for purposes such as lab testing variations, and you need radio options in index.html.
    // ========================
    // labTestOptions: {
    //     validate: 'required'
    // },
    // ========================

    cookies: {
        journeyKey: 'application.cookies'
    },
    backURL: {
        journeyKey: 'application.backURL'
    },
    feedbackOrHelp: {
        validate: 'required'
    },

    isUKApplication: {
        formatter: 'boolean',
        validate: 'required'
    },
    countryOfApplication: {
        items: require('./data/countries'),
        validate: 'required',
        dependent: { field: 'isUKApplication', value: false }
    },
    dateOfBirth: {
        validate: ['required', 'date'],
        autocomplete: 'bday'
    },
    photoMethod: {
        validate: 'required'
    },
    photo: {
    },
    photoCode: {
        // validate: 'required'
    },
    photoCodeSld: {
        // validate: [
        //     // 'required',
        //     'alphanum',
        //     { type: 'minlength', arguments: 1 },
        //     { type: 'maxlength', arguments: 6 }
        // ]
    },
    photoCodeTld: {
        // validate: [
        //     // 'required',
        //     'alphanum',
        //     { type: 'minlength', arguments: 2 },
        //     { type: 'maxlength', arguments: 3 }
        // ]
    },
    photoCodePath: {
        // validate: [
        //     // 'required',
        //     'alphanum',
        //     { type: 'minlength', arguments: 6 },
        //     { type: 'maxlength', arguments: 8 }
        // ]
    },
    photoOverride: {
        formatter: 'boolean',
        validate: 'required'
    },
    photoOverrideReason: {
        validate: [
            'required',
            'alphanumex1',
            { type: 'maxlength', arguments: 250 }
        ],
        dependent: { field: 'photoOverride', value: true }
    },
    submitPhoto: {
        formatter: 'boolean',
        validate: 'required'
    },

    previousPassport: {
        formatter: 'boolean',
        validate: 'required'
    },
    lost: {
        formatter: 'boolean',
        validate: 'required'
    },
    cancelled: {
        formatter: 'boolean',
        validate: 'required'
    },
    passportIssue: {
        validate: ['required', 'date'],
        autocomplete: 'passport-issue',
        offset: 11
    },
    passportIssuingAuthority: {
    },
    damaged: {
        formatter: 'boolean'
    },
    damagedReason: {
        validate: [
            'required',
            'alphanumex1',
            { type: 'maxlength', arguments: 250 }
        ],
        dependent: { field: 'damaged', value: true }
    },
    naturalised: {
        formatter: 'boolean',
        validate: 'required'
    },
    otherPassports: {
        formatter: 'boolean',
        validate: 'required'
    },
    nationality: {
        validate: 'required'
    },

    applyReason: {
        validate: 'required'
    },
    applyNow: {
        validate: 'required'
    },

    whatYouNeed: {
        formatter: 'boolean',
        validate: [
            'required',
            { type: 'equal', arguments: true }
        ]
    },
    passportNumber: {
        validate: [
            'required',
            'numeric',
            { type: 'exactlength', arguments: 9 }
        ]
    },
    passportExpiry: {
        validate: [
            'required',
            'date'
        ],
        autocomplete: 'hmpo-passport-expiry',
        offset: 20
    },
    oldPassportNumber: {
        formatters: [
            'removespaces',
            'uppercase'
        ],
        validate: [
            'required',
            'alphanum',
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 9 }
        ]
    },
    oldPassportExpiry: {
        validate: [
            'required',
            'date'
        ],
        autocomplete: 'hmpo-passport-expiry',
        offset: 20
    },
    optionalPassportNumber: {
        formatters: [
            'removespaces',
            'uppercase'
        ],
        validate: [
            'alphanum',
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 9 }
        ]
    },
    optionalPassportExpiry: {
        validate: [
            'date'
        ],
        autocomplete: 'hmpo-passport-expiry',
        offset: 20
    },
    title: {
        validate: 'required'
    },
    otherTitle: {
        validate: [
            'required',
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 20 }
        ],
        dependent: {
            field: 'title',
            value: 'Other'
        }
    },
    firstName: {
        validate: [
            'required',
            { type: 'maxlength', arguments: 30 }
        ]
    },
    lastName: {
        validate: [
            'required',
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 30 }
        ]
    },
    changeOfName: {
        formatter: 'boolean',
        validate: 'required'
    },
    nameChangeReason: {
        validate: 'required'
    },
    previousNames: {
        formatter: 'boolean',
        validate: 'required'
    },
    previousFirstName1: {
        errorGroup: 'previousName1',
        validate: 'required',
        dependent: 'previousNames'
    },
    previousLastName1: {
        errorGroup: 'previousName1',
        validate: 'required',
        dependent: 'previousNames'
    },
    previousFirstName2: {
        errorGroup: 'previousName2',
        dependent: 'previousNames'
    },
    previousLastName2: {
        errorGroup: 'previousName2',
        dependent: 'previousNames'
    },
    previousFirstName3: {
        errorGroup: 'previousName3',
        dependent: 'previousNames'
    },
    previousLastName3: {
        errorGroup: 'previousName3',
        dependent: 'previousNames'
    },
    gender: {
        validate: 'required'
    },
    bornInUK: {
        formatter: 'boolean',
        validate: 'required'
    },
    countryOfBirth: {
        items: require('./data/countries'),
        validate: 'required',
        dependent: { field: 'bornInUK', value: false }
    },
    townOfBirth: {
        validate: [
            'required',
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 25 }
        ]
    },
    naturalisationCertificateNumber: {
        validate: [
            'required',
            { type: 'maxlength', arguments: 12 }
            // 'alphanum'
        ]
    },
    naturalisationIssueDate: {
        validate: [
            'required',
            'date',
            { type: 'before' }
        ],
        autocomplete: 'nat-reg-date'
    },
    parent1FirstName: {
        validate: [
            { type: 'maxlength', arguments: 30 }
            // 'firstname'
        ]
    },
    parent1LastName: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 30 }
            // 'surname'
        ]
    },
    parent1DateOfBirth: {
        validate: [
            'date'
            // { type: 'before' },
        ],
        autocomplete: 'parent1-bday'
    },
    parent1NoDetailsReason: {
        validate: [
            { type: 'maxlength', arguments: 250 },
            'alphanumex1'
        ]
    },
    parent2FirstName: {
        validate: [
            { type: 'maxlength', arguments: 30 }
            // 'firstname'
        ]
    },
    parent2LastName: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 30 }
            // 'surname'
        ]
    },
    parent2DateOfBirth: {
        validate: [
            'date'
            // { type: 'before' },
        ],
        autocomplete: 'parent2-bday'
    },
    parent2NoDetailsReason: {
        validate: [
            { type: 'maxlength', arguments: 250 }
            // 'alphanumex1'
        ]
    },
    parentsMarried: {
        formatter: 'boolean-unknown',
        validate: 'required'
    },
    parentsMarriageDate: {
        validate: [
            'date',
            { type: 'before' }
        ],
        autocomplete: 'parents-marriage-bday',
        dependent: 'parentsMarried'
    },
    parentsHaveEUSettledStatus: {
        formatter: 'boolean-unknown',
        validate: 'required'
    },
    parent1TownOfBirth: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 25 }
            // 'townOfBirth'
        ]
    },
    parent1CountryOfBirth: {
        items: require('./data/birth-countries') // TODO: replace with birth countries library
    },
    parent1Nationality: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 19 }
            // 'nationality'
        ]
    },
    parent1HasPassport: {
        formatter: 'boolean-unknown',
        validate: 'required'
    },
    parent1PassportNumber: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 9 },
            'alphanum'
        ],
        dependent: 'parent1HasPassport'
    },
    parent1PassportIssueDate: {
        validate: [
            'date'
            // { type: 'before' },
        ],
        autocomplete: 'parent1-issue-date',
        dependent: 'parent1HasPassport'
    },
    parent2TownOfBirth: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 25 }
            // 'townOfBirth'
        ]
    },
    parent2CountryOfBirth: {
        items: require('./data/birth-countries') // TODO: replace with birth countries library
    },
    parent2Nationality: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 19 }
            // 'nationality'
        ]
    },
    parent2HasPassport: {
        formatter: 'boolean-unknown',
        validate: 'required'
    },
    parent2PassportNumber: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 9 },
            'alphanum'
        ],
        dependent: 'parent2HasPassport'
    },
    parent2PassportIssueDate: {
        validate: [
            'date'
            // { type: 'before' },
        ],
        autocomplete: 'parent2-issue-date',
        dependent: 'parent2HasPassport'
    },
    parent1Parent1FirstName: {
        validate: [
            { type: 'maxlength', arguments: 30 }
            // 'firstname'
        ]
    },
    parent1Parent1LastName: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 30 }
            // 'surname'
        ]
    },
    parent1Parent1TownOfBirth: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 25 }
            // 'townOfBirth'
        ]
    },
    parent1Parent1CountryOfBirth: {
        items: require('./data/birth-countries') // TODO: replace with birth countries library
    },
    parent1Parent1DateOfBirth: {
        validate: [
            'date'
            // { type: 'before' },
        ],
        autocomplete: 'parent1-parent1-bday'
    },
    parent1Parent1NoDetailsReason: {
        validate: [
            { type: 'maxlength', arguments: 250 },
            'alphanumex1'
        ]
    },
    parent1Parent2FirstName: {
        validate: [
            { type: 'maxlength', arguments: 30 }
            // 'firstname'
        ]
    },
    parent1Parent2LastName: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 30 }
            // 'surname'
        ]
    },
    parent1Parent2TownOfBirth: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 25 }
            // 'townOfBirth'
        ]
    },
    parent1Parent2CountryOfBirth: {
        items: require('./data/birth-countries') // TODO: replace with birth countries library
    },
    parent1Parent2DateOfBirth: {
        validate: [
            'date'
            // { type: 'before' },
        ],
        autocomplete: 'parent1-parent2-bday'
    },
    parent1Parent2NoDetailsReason: {
        validate: [
            { type: 'maxlength', arguments: 250 },
            'alphanumex1'
        ]
    },
    parent1ParentsMarried: {
        formatter: 'boolean-unknown',
        validate: 'required'
    },
    parent1ParentsMarriageDate: {
        validate: [
            'date',
            { type: 'before' }
        ],
        autocomplete: 'parent1-parents-marriage-bday',
        dependent: 'parent1ParentsMarried'
    },
    parent2Parent1FirstName: {
        validate: [
            { type: 'maxlength', arguments: 30 }
            // 'firstname'
        ]
    },
    parent2Parent1LastName: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 30 }
            // 'surname'
        ]
    },
    parent2Parent1TownOfBirth: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 25 }
            // 'townOfBirth'
        ]
    },
    parent2Parent1CountryOfBirth: {
        items: require('./data/birth-countries') // TODO: replace with birth countries library
    },
    parent2Parent1DateOfBirth: {
        validate: [
            'date'
            // { type: 'before' },
        ],
        autocomplete: 'parent2-parent1-bday'
    },
    parent2Parent1NoDetailsReason: {
        validate: [
            { type: 'maxlength', arguments: 250 },
            'alphanumex1'
        ]
    },
    parent2Parent2FirstName: {
        validate: [
            { type: 'maxlength', arguments: 30 }
            // 'firstname'
        ]
    },
    parent2Parent2LastName: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 30 }
            // 'surname'
        ]
    },
    parent2Parent2TownOfBirth: {
        validate: [
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 25 }
            // 'townOfBirth'
        ]
    },
    parent2Parent2CountryOfBirth: {
        items: require('./data/birth-countries') // TODO: replace with birth countries library
    },
    parent2Parent2DateOfBirth: {
        validate: [
            'date'
            // { type: 'before' },
        ],
        autocomplete: 'parent2-parent2-bday'
    },
    parent2Parent2NoDetailsReason: {
        validate: [
            { type: 'maxlength', arguments: 250 },
            'alphanumex1'
        ]
    },
    parent2ParentsMarried: {
        formatter: 'boolean-unknown',
        validate: 'required'
    },
    parent2ParentsMarriageDate: {
        validate: [
            'date',
            { type: 'before' }
        ],
        autocomplete: 'parent2-parents-marriage-bday',
        dependent: 'parent2ParentsMarried'
    },
    addressLine1: {
        validate: [
            'required',
            // 'placename',
            { type: 'minlength', arguments: 3 },
            { type: 'maxlength', arguments: 40 }
        ]
    },
    addressLine2: {
        validate: [
            // 'placename',
            { type: 'maxlength', arguments: 40 }
        ]
    },
    addressTown: {
        validate: [
            'required',
            // 'placename',
            { type: 'maxlength', arguments: 30 }
        ]
    },
    addressPostcode: {
        formatter: 'uppercase',
        validate: [
            'required',
            { type: 'maxlength', arguments: 10 }
        ]
    },
    contactEmail: {
        formatter: ['trim'],
        validate: [
            'required',
            'email',
            { type: 'maxlength', arguments: 240 }
        ],
        type: 'email',
        'ignore-defaults': true // stops removing double dashes etc by default
    },
    contactEmailConfirm: {
        formatter: ['trim'],
        validate: [
            'required',
            { type: 'match', arguments: 'contactEmail' },
            { type: 'maxlength', arguments: 240 }
        ],
        type: 'email',
        'ignore-defaults': true
    },
    contactPhone: {
        formatter: ['removespaces', 'removehyphens'],
        validate: [
            'required',
            { type: 'maxlength', arguments: 15 }
            // 'numeric',
            // 'phonenumber'
        ],
        type: 'tel'
    },
    contactPrefsEmail: {
        formatter: 'boolean-strict' // checkbox
    },
    contactPrefsSMS: {
        formatter: 'boolean-strict' // checkbox
    },
    mobilePhone: {
        formatter: ['removespaces', 'removehyphens', 'removeslashes'],
        validate: [
            'required',
            { type: 'maxlength', arguments: 15 }
            // 'numeric',
        ],
        type: 'tel',
        dependent: 'contactPrefsSMS'
    },
    largePassport: {
        formatter: 'boolean',
        validate: 'required'
    },
    braille: {
        formatter: 'boolean-strict' // checkbox
    },
    canSign: {
        formatter: 'boolean',
        validate: ['required']
    },
    noSignReason: {
        validate: [
            'required',
            { type: 'maxlength', arguments: 250 }
            // 'alphanumex1'
        ],
        dependent: { field: 'canSign', value: false }
    },
    thirdParty: {
        formatter: 'boolean',
        validate: 'required'
    },
    relationship: {
        validate: 'required'
    },
    otherRelationship: {
        validate: [
            'required',
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 17 }
            // 'relationship'
        ],
        dependent: {
            field: 'relationship',
            value: 'other'
        }
    },
    thirdPartyFirstName: {
        validate: [
            'required',
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 30 }
            // 'firstname'
        ]
        // display: {
        //     formatter: 'name'
        // }
    },
    thirdPartyLastName: {
        validate: [
            'required',
            { type: 'minlength', arguments: 2 },
            { type: 'maxlength', arguments: 30 }
            // 'surname'
        ]
    },
    thirdPartyExplanation: {
        validate: [
            'required',
            { type: 'maxlength', arguments: 200 }
            // 'explanation'
        ]
    },
    urgentPassport: {
        formatter: 'boolean',
        validate: 'required'
    },
    documentsToSend: {
        formatter: 'boolean'
    },
    secureDelivery: {
        formatter: 'boolean',
        validate: 'required'
    },
    declaration: {
        formatter: 'boolean',
        validate: [
            'required',
            { type: 'equal', arguments: true }
        ]
    },
    appReference: {
        validate: 'required'
    },
    trackDateOfBirth: {
        validate: ['required', 'date'],
        autocomplete: 'bday'
    },
    trackEmail: {
        validate: 'required'
    },
    refereeFirstName: {
        validate: 'required'
    },
    refereeSurname: {
        validate: 'required'
    },
    refereeEmail: {
        formatter: ['trim'],
        validate: [
            'required',
            'email',
            { type: 'maxlength', arguments: 240 }
        ],
        type: 'email',
        className: 'js-nopaste',
        'ignore-defaults': true
    },
    refereeEmailConfirm: {
        formatter: ['trim'],
        validate: [
            'required',
            { type: 'match', arguments: 'refereeEmail' },
            { type: 'maxlength', arguments: 240 }
        ],
        type: 'email',
        className: 'js-nopaste',
        'ignore-defaults': true
    },
    refereeContactDeclaration: {
        formatter: 'boolean',
        validate: 'required'
    },
    paperForm: {
        formatter: 'boolean',
        validate: 'required'
    },
<<<<<<< HEAD
    csigAppReference: {
        validate: 'required'
    },
    csigDateOfBirth: {
        validate: ['required', 'date'],
    },
    refereePassportNumber: {
        validate: [
            'required',
            'numeric',
            { type: 'exactlength', arguments: 9 }
        ]
    },
    refereePassportExpiry: {
        validate: [
            'required',
            'date'
        ]
    },
    refereeDateOfBirth: {
        validate: ['required', 'date']
    },
    csigFirstName: {
        validate: 'required'
    },
    csigMiddleName: {

    },
    csigLastName: {
        validate: 'required'
    },
    refereePostcode: {
        validate: 'required'
    },
    refereeAddressSelect: {
       // validate: 'required'
    },
    homeFlatName: {},
    homeBuildingName: {},
    homeBuildingNumber: {},
    homeStreet: {
        validate: 'required'
    },
    homeDistrict: {},
    addressTown: {
        validate: 'required'
    },
    homeCounty: {},
    addressPostcode: {
        validate: 'required'
    },
    isDetailsCorrect: {
        formatter: 'boolean',
        validate: 'required'
    },
    confirmPhotoAdult: {
        formatter: 'boolean',
        validate: 'required'
    },
    knowPersonallyAdult: {
        formatter: 'boolean',
        validate: 'required'
    },
    areRelatedInRelationshipOrLivingSameAddressAdult: {
        formatter: 'boolean',
        validate: 'required'
    },
    howKnowAdult: {
        validate: [
            'required',
            { type: 'maxlength', arguments: 30 }
        ]
    },
    howManyYearsKnownAdult: {
        validate: [
            'required',
            'numeric',
            { type: 'maxlength', arguments: 2 }
        ]
    },
    knowPersonallyChild: {
        formatter: 'boolean',
        validate: 'required'
    },
    areRelatedInRelationshipOrLivingSameAddressChild: {
        formatter: 'boolean',
        validate: 'required'
    },
    howKnowChild: {
        validate: [
            'required',
            { type: 'maxlength', arguments: 30 }
        ]
    },
    howManyYearsKnownChild: {
        validate: [
            'required',
            'numeric',
            { type: 'maxlength', arguments: 2 }
        ]
    },
    confirmPhoto: {
        formatter: 'boolean',
        validate: 'required'
    },
    describeProblemAdult: {
        validate: 'required'
    },
    describeProblemChild: {
        validate: 'required'
    },
    confirmTown: {
        formatter: 'boolean',
        validate: 'required'
    },
    parent1Details: {
        formatter: 'boolean',
        validate: 'required'
    },
    parent2Details: {
        formatter: 'boolean',
        validate: 'required'
    },
    confirmAddress: {
        formatter: 'boolean',
        validate: 'required'
    },
    csigProfession: {
        validate: 'required'
    },
    csigRetired: {
        formatter: 'boolean',
        validate: 'required'
    },
    addressLine1:{

    },
    addressLine2:{

    },
    workEmployerName: {
        validate: 'required'
    },
    workAddressLine1: {
        validate: [
            'required',
            { type: 'minlength', arguments: 3 },
            { type: 'maxlength', arguments: 40 }
        ]
    },
    workAddressLine2: {
        validate: [
            { type: 'maxlength', arguments: 40 }
        ]
    },
    workAddressTown: {
        validate: [
            'required',
            { type: 'maxlength', arguments: 30 }
        ]
    },
    workAddressPostcode: {
        formatter: 'uppercase',
        validate: [
            'required',
            { type: 'maxlength', arguments: 10 }
        ]
    },
    csigEmail: {
        formatter: ['trim'],
        validate: [
            'required',
            'email',
            { type: 'maxlength', arguments: 240 }
        ],
        type: 'email',
        'ignore-defaults': true // stops removing double dashes etc by default
    },
    csigPhone: {
        formatter: ['removespaces', 'removehyphens'],
        validate: [
            'required',
            { type: 'maxlength', arguments: 15 }
        ],
        type: 'tel'
=======
    dpsDamaged: {
        validate: 'required'
    },
    dpsOtherPassports:{
        validate: 'required'
>>>>>>> fbce94f... create dps filter pages with steps and fields
    }
}
