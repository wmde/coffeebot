function createCalEventNow( gEmail1, gEmail2 ) {
  var now = new Date()
  var end = new Date(now.getTime() + 30*60000)
  createCalEvent( gEmail1, gEmail2, now, end)
}

function createCalEvent( gEmail1, gEmail2, startTime, endTime ) {
  var jitsiUrl = 'https://jitsi.wikimedia.de/coffeebot-' + gEmail1 + '_' + gEmail2
  var event = CalendarApp.getCalendarById(GCAL_ID).createEvent('CoffeeBot Meeting',
                                                           startTime,
                                                           endTime,
                                                           {
                                                             guests: gEmail1 + "," + gEmail2,
                                                             sendInvites: false,
                                                             location: jitsiUrl
                                                           }
                                                          );
  Logger.log('Created GCal Event ID: ' + event.getId());
  return event
}

function findSoonestFreeTime( gEmail1, gEmail2 ) {
  var now = new Date();
  var response = Calendar.Freebusy.query({
    timeMin: now.toISOString(),
    timeMax: ( new Date(now.getTime() + 120*60000) ).toISOString(),
    items: [
      { id: gEmail1},
      { id: gEmail2}
    ]
  });
  var busyTimeArray = [].concat(response.calendars[gEmail1].busy, response.calendars[gEmail2].busy)
  console.log(busyTimeArray)
  for (let step = 0; step < 24; step++) {
    var trialStartTime = new Date(now.getTime() + step*5*60000);
    var trialEndTime = new Date(now.getTime() + step*5*60000 + 30*60000);
    if (!datesHaveAnyOverlap( trialStartTime, busyTimeArray[0].start, trialEndTime, busyTimeArray[0].end )) {
      return {start: trialStartTime, end: trialEndTime}
    }
  }
  return null
}

function datesHaveAnyOverlap( startOne, startTwo, endOne, endTwo) {
  return ( !(endTwo <= startOne || startTwo >= endOne))
}