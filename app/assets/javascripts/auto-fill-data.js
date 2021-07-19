/* eslint quote-props: ["error", "always"] */

(function () {
    window.hmpoAutoFillControls = {
        'age': {
            'adult': 'Adult',
            'rising16': 'Rising 16',
            'twelveToFifteen': 'Child 12 to 15',
            'underTwelve': 'Child Under 12'
        },
        'type': {
            'renew': 'Renewal',
            'lostAndStolen': 'Lost and stolen',
            'firstTime': 'First time',
            'oldBlue': 'Old blue book',
        },
        'damaged': 'Damaged',
        'naturalised': 'Naturalised',
        'changeOfName': 'Change of name',
        'grandparents': 'Grandparents',
        'thirdParty': 'Third party',
        'showCookieBanner': 'Show Cookie Banner'
    }

    window.hmpoAutoFillRestrictions = {
        'naturalised': {
            'type': ['firstTime']
        },

        // 'showCookieBanner': {
            
        // },

        'grandparents': {
            'type': ['firstTime'],
            'age': ['twelveToFifteen', 'underTwelve']
        },

        'damaged': {
            'type': ['renew', 'oldBlue']
        }
    }

    var now = new Date()
    var rising16Date = new Date()
    rising16Date.setFullYear(rising16Date.getFullYear() - 16)
    rising16Date.setDate(rising16Date.getDate() + 15)

    window.hmpoAutoFillData = {
        'base': { // adult renew
            'isUKApplication': true,
            'dateOfBirth-day': 20,
            'dateOfBirth-month': 7,
            'dateOfBirth-year': now.getFullYear() - 30,
            'photoMethod': 'digitalphoto',
            'submitPhoto': true,
            'previousPassport': true,
            'lost': false,
            'nameChanged': false,
            'passportIssue-day': 20,
            'passportIssue-month': 3,
            'passportIssue-year': now.getFullYear() - 9,
            'damaged': false,
            'otherPassports': false,
            'whatYouNeed': true,
            'passportNumber': '635263526',
            'passportExpiry-day': 25,
            'passportExpiry-month': 4,
            'passportExpiry-year': now.getFullYear() + 1,
            'title': 'Mr',
            'firstName': 'Jennifer Testy',
            'lastName': 'Longname McTestface-Smythe',
            'changeOfName': false,
            'previousNames': false,
            'gender': 'Female',
            'bornInUK': true,
            'townOfBirth': 'Brighton',
            'parent1FirstName': 'Mary',
            'parent1LastName': 'Smythe',
            'parent1DateOfBirth-day': 10,
            'parent1DateOfBirth-month': 3,
            'parent1DateOfBirth-year': now.getFullYear() - 50,
            'parent2FirstName': 'Peter',
            'parent2LastName': 'McTestface',
            'parent2DateOfBirth-day': 13,
            'parent2DateOfBirth-month': 5,
            'parent2DateOfBirth-year': now.getFullYear() - 51,
            'parentsMarried': true,
            'parentsMarriageDate-day': 1,
            'parentsMarriageDate-month': 1,
            'parentsMarriageDate-year': now.getFullYear() - 30,
            'parent1TownOfBirth': 'London',
            'parent1CountryOfBirth': 'GB',
            'parent1Nationality': 'British',
            'parent1HasPassport': true,
            'parent1PassportNumber': '362536273',
            'parent1PassportIssueDate-day': 1,
            'parent1PassportIssueDate-month': 2,
            'parent1PassportIssueDate-year': 2015,
            'parent2TownOfBirth': 'London',
            'parent2CountryOfBirth': 'GB',
            'parent2Nationality': 'British',
            'parent2HasPassport': true,
            'parent2PassportNumber': '372635463',
            'parent2PassportIssueDate-day': 3,
            'parent2PassportIssueDate-month': 4,
            'parent2PassportIssueDate-year': 2016,
            'addressLine1': '4 Privet Drive',
            'addressLine2': '',
            'addressTown': 'Watford',
            'addressPostcode': 'WD25 7FD',
            'contactEmail': 'test@example.com',
            'contactEmailConfirm': 'test@example.com',
            'contactPhone': '020 8759 9036',
            'contactPrefsEmail': true,
            'contactPrefsSMS': true,
            'mobilePhone': '+44 7700 900077',
            'largePassport': false,
            'braille': false,
            'canSign': true,
            'thirdParty': false,
            'secureDelivery': false,
            'declaration': true,

            // tracking
            'appReference': 'PEX 123 456 789X',
            'trackEmail': 'test@example.com',
            'trackDateOfBirth-day': 20,
            'trackDateOfBirth-month': 7,
            'trackDateOfBirth-year': now.getFullYear() - 30,
            'refereeFirstName': 'Arthur',
            'refereeSurname': 'Clarke',
            'refereeEmail': 'arthurclarke@example.com',
            'refereeEmailConfirm': 'arthurclarke@example.com',
            'refereeContactDeclaration': true,

            // confirm someone's identity (default as adult)
            'csigAppReference': '12A B34 5C6',
            'csigDateOfBirth-day' : '31',
            'csigDateOfBirth-month' : '08',
            'csigDateOfBirth-year' : '1970',
            'refereePassportNumber' : '502135326',
            'refereePassportExpiry-day' : '01',
            'refereePassportExpiry-month' : '08',
            'refereePassportExpiry-year' : '2024',
            'refereeDateOfBirth-day' : '20',
            'refereeDateOfBirth-month' : '06',
            'refereeDateOfBirth-year' : '1984',
            'csigFirstName' : 'Charles',
            'csigMiddleName' : 'John',
            'csigLastName' : 'Witman',
            'refereePostcode' : 'SE1 7XH',
            'confirmPhotoAdult' : true,
            'knowPersonallyAdult' : true,
            'areRelatedInRelationshipOrLivingSameAddressAdult' : false,
            'howKnowAdult' : 'Family friend',
            'howManyYearsKnownAdult' : '9',
            'knowPersonallyChild' : true,
            'areRelatedInRelationshipOrLivingSameAddressChild' : false,
            'howKnowChild' : 'Family friend',
            'howManyYearsKnownChild' : '9',
            'confirmPhoto' : true,
            'confirmTown' : true,
            'parent1Details' : true,
            'parent2Details' : true,
            'confirmAddress' : true,
            'csigProfession' : 'Civil servant',
            'csigRetired' : false,
            'workEmployerName' : 'Cabinet Office',
            'workAddressLine1' : '1 Horse Guards Road',
            'workAddressTown' : 'Westminster',
            'workAddressPostcode' : 'SW1A 2HQ',
            'csigEmail' : 'charleswitman@cabinetoffice.gov.uk',
            'csigPhone' : '07824433911',
            'homeBuildingNumber': '4',
            'homeStreet': 'Privet Drive',
            'isDetailsCorrect' : true,
        },
        'rising16': {
            'dateOfBirth-day': rising16Date.getDate(),
            'dateOfBirth-month': rising16Date.getMonth(),
            'dateOfBirth-year': rising16Date.getFullYear(),
            'passportIssue-year': now.getFullYear() - 5
        },
        'twelveToFifteen': {
            'dateOfBirth-day': 20,
            'dateOfBirth-month': 7,
            'dateOfBirth-year': now.getFullYear() - 14,
            'passportIssue-year': now.getFullYear() - 5
        },
        'underTwelve': {
            'dateOfBirth-day': 20,
            'dateOfBirth-month': 7,
            'dateOfBirth-year': now.getFullYear() - 5,
            'passportIssue-year': now.getFullYear() - 4
        },
        'firstTime': {
            'previousPassport': false,
            'naturalised': false
        },
        'oldBlue': {
            'passportIssue-year': '1994',
            'passportExpiry-year': '2004',
            'oldPassportNumber': 'A263526',
            'oldPassportExpiry-day': 25,
            'oldPassportExpiry-month': 4,
            'oldPassportExpiry-year': 2004
        },
        'lostAndStolen': {
            'lost': true,
            'cancelled': true,
            'optionalPassportNumber': '5263526',
            'optionalPassportExpiry-day': 25,
            'optionalPassportExpiry-month': 4,
            'optionalPassportExpiry-year': now.getFullYear() + 2
        },
        'naturalised': {
            'naturalised': true,
            'naturalisationCertificateNumber': '10273625',
            'naturalisationIssueDate-day': 15,
            'naturalisationIssueDate-month': 9,
            'naturalisationIssueDate-year': now.getFullYear() - 1
        },
        'damaged': {
            'damaged': true,
            'damagedReason': 'My dog ate my homework.\n\nHonest, ask my mum.'
        },
        'thirdParty': {
            'thirdParty': true,
            'relationship': 'mother',
            'thirdPartyFirstName': 'Mary',
            'thirdPartyLastName': 'Smythe',
            'thirdPartyExplanation': 'Third party explanation text.'
        },
        'changeOfName': {
            'changeOfName': true,
            'nameChangeReason': 'Marriage or civil partnership',
            'previousNames': true,
            'previousFirstName1': 'Jennifer',
            'previousLastName1': 'Smythe'
        },
        'grandparents': {
            // make grandparents required
            'parent1CountryOfBirth': 'FR',
            'parent1HasPassport': false,
            'parent1PassportNumber': '',
            'parent1PassportIssueDate-day': '',
            'parent1PassportIssueDate-month': '',
            'parent1PassportIssueDate-year': '',
            'parent2CountryOfBirth': 'FR',
            'parent2HasPassport': false,
            'parent2PassportNumber': '',
            'parent2PassportIssueDate-day': '',
            'parent2PassportIssueDate-month': '',
            'parent2PassportIssueDate-year': '',

            'parent1Parent1FirstName': 'June',
            'parent1Parent1LastName': 'Smythe',
            'parent1Parent1TownOfBirth': 'London',
            'parent1Parent1CountryOfBirth': 'GB',
            'parent1Parent1DateOfBirth-day': 11,
            'parent1Parent1DateOfBirth-month': 2,
            'parent1Parent1DateOfBirth-year': now.getFullYear() - 70,

            'parent1Parent2FirstName': 'Bob',
            'parent1Parent2LastName': 'Smythe',
            'parent1Parent2TownOfBirth': 'London',
            'parent1Parent2CountryOfBirth': 'GB',
            'parent1Parent2DateOfBirth-day': 14,
            'parent1Parent2DateOfBirth-month': 2,
            'parent1Parent2DateOfBirth-year': now.getFullYear() - 71,

            'parent1ParentsMarried': true,
            'parent1ParentsMarriageDate-day': 1,
            'parent1ParentsMarriageDate-month': 1,
            'parent1ParentsMarriageDate-year': now.getFullYear() - 53,

            'parent2Parent1FirstName': 'Jane',
            'parent2Parent1LastName': 'McTestface',
            'parent2Parent1TownOfBirth': 'London',
            'parent2Parent1CountryOfBirth': 'GB',
            'parent2Parent1DateOfBirth-day': 11,
            'parent2Parent1DateOfBirth-month': 2,
            'parent2Parent1DateOfBirth-year': now.getFullYear() - 70,

            'parent2Parent2FirstName': 'David',
            'parent2Parent2LastName': 'McTestface',
            'parent2Parent2TownOfBirth': 'London',
            'parent2Parent2CountryOfBirth': 'GB',
            'parent2Parent2DateOfBirth-day': 14,
            'parent2Parent2DateOfBirth-month': 2,
            'parent2Parent2DateOfBirth-year': now.getFullYear() - 71,

            'parent2ParentsMarried': true,
            'parent2ParentsMarriageDate-day': 1,
            'parent2ParentsMarriageDate-month': 1,
            'parent2ParentsMarriageDate-year': now.getFullYear() - 53

        }
    }
})()
