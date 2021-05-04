const moment = require('moment');
const paramParser = require('./param-parser');

let availableAppointmentsByDateAndPlace = (req) => {

    let maxColumnLimit = 6;
    let dates = []
    let locationAvailability = {};
    let dateParam;

    let dpsAppointmentsAvailability = require('../data/dps-appointments-availability.json');
    let locations = dpsAppointmentsAvailability['locations'];
    let locationsMaxDates = locations['LONDON'].length;

    //** Skip this logic to show next 5 days **
    // if (!req.sessionModel.get('within5Urgent') && !req.params.direction) {
    //     //Skip 5 days in View to display non urgent appointments first
    //     dateParam = nonUrgentAppointment();
    // } else {
    //     dateParam = paramParser.parseDateTimeParam(req, 'DD-MM-YYYY', 'date');
    // }

    dateParam = paramParser.parseDateTimeParam(req, 'DD-MM-YYYY', 'date');

    let dateParamDiffFromTodaysDate = Math.ceil(moment(dateParam, 'DD-MM-YYYY').diff(moment(), 'days', true));

    for (let days = 1; days <= maxColumnLimit; days++) {
      dates.push(moment(dateParam, 'DD-MM-YYYY').add(days, 'days'));
    }

    for (let [key, value] of Object.entries(locations)) {
        locationAvailability[key] = value.slice(dateParamDiffFromTodaysDate, maxColumnLimit + dateParamDiffFromTodaysDate);
        for (let i = 0; i < locationAvailability[key].length; i++){
             locationAvailability[key][i].date = dates[i];
        }
    }

    return {
        'appointmentDaysAndPrices': locationAvailability['LONDON'],
        'appointmentsAvailability': locationAvailability,
        'links': createNextAndPreviousLinks(req, dateParam, locationsMaxDates, locationAvailability['LONDON'], dateParamDiffFromTodaysDate)
    };

};

//** No longer required to skip 5 days **
// let nonUrgentAppointment = () => {
//     let nextFiveDays = moment().add(5, 'days');
//     return nextFiveDays.format('DD-MM-YYYY');
// };

let createNextAndPreviousLinks = (req, dateParam, locationsMaxDates, locationAvailability, dateParamDiffFromTodaysDate) => {

    //Number of new dates to show in table navigation click
    let navDateIterations = 6;
    let nextDateLink;
    let previousDateLink;
    let locationAvailabilitySize = locationAvailability.length;

    let lastDateInView = locationAvailability[locationAvailabilitySize - 1].date.format('DD-MM-YYYY');

    let todaysDate = moment().format('DD-MM-YYYY');
    let directionParam = paramParser.parseDirectionParam(req);
    let nextDate = moment(dateParam, 'DD-MM-YYYY').add(navDateIterations, 'days');
    let previousDate = moment(dateParam, 'DD-MM-YYYY').subtract(navDateIterations, 'days');
    let lastAvailableDate = moment(todaysDate, 'DD-MM-YYYY').add(locationsMaxDates, 'days');

    if (dateParam == todaysDate) {
        //Only show next link if first page
        nextDateLink = nextDate.format('DD-MM-YYYY') + "/next";
    } else {
        if (dateParamDiffFromTodaysDate < (locationsMaxDates - 3)) {
           //Show next link if not last page
           if (lastAvailableDate.format('DD-MM-YYYY') != lastDateInView) {
               nextDateLink = nextDate.format('DD-MM-YYYY') + "/next";
           }
        }

        if (dateParamDiffFromTodaysDate <= 5) {
            previousDateLink = todaysDate + "/previous";
        } else {
            previousDateLink = previousDate.format('DD-MM-YYYY') + "/previous";
        }
    }

    return {
        'previous': previousDateLink,
        'next': nextDateLink
    }
};

module.exports = {
    availableAppointmentsByDateAndPlace
};
