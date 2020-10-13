// Each method here maps to a command that you can use within Mattermost

function cmdHelp() {
  sendToMattermost("Available commands: !help !list !register !coffee !cleanup" )
}

function cmdRegister( mmUser, gEmail ) {
  registerMmUser(mmUser, gEmail)
  sendToMattermost(mmUser + " has been registered with the email " + gEmail + ".")
}

function cmdCoffee( mmUser, requiredTimeSlot ) {
  if(!isMmUserRegistered(mmUser)) {
    sendToMattermost("You (" + mmUser + ') are not registered.')
    return;
  }
  
  var splitTime = requiredTimeSlot.split('->')
  var from = splitTime[0]
  var to = splitTime[1]
  
  // TODO Implement doing coffee
  storeCoffeeRequest(mmUser, from, to)
  sendToMattermost("You (" + mmUser + ') are registered and requesting coffee between ' + from + " and " + to + " (Berlin time).")
}

function cmdSoon( mmUser, otherUser ) {
  if(!isMmUserRegistered(mmUser)) {
    sendToMattermost("You (" + mmUser + ') are not registered.')
    return;
  }
  if(!isMmUserRegistered(otherUser)) {
    sendToMattermost("The user you're requesting coffee with (" + otherUser + ') is not registered.')
    return;
  }
  var time = findSoonestFreeTime(getEmailFromMmUser(mmUser), getEmailFromMmUser(otherUser))
  if (!time) {
    sendToMattermost(mmUser + ", you have no overlapping free time with " + otherUser + " in the next two hours")
  } else {
    var event = createCalEvent(getEmailFromMmUser(mmUser), getEmailFromMmUser(otherUser), time.start, time.end)
  }
  sendToMattermost(mmUser + ", you have created a 30-minute coffee call with " + otherUser + "starting at "+ time.start)
}

function cmdNow( mmUser, otherUser ) {
  if(!isMmUserRegistered(mmUser)) {
    sendToMattermost("You (" + mmUser + ') are not registered.')
    return;
  }
  if(!isMmUserRegistered(otherUser)) {
    sendToMattermost("The user you're requesting coffee with (" + otherUser + ') is not registered.')
    return;
  }
  
  var event = createCalEventNow(getEmailFromMmUser(mmUser), getEmailFromMmUser(otherUser))
  
  sendToMattermost(mmUser + ", you have created a 30-minute coffee call with " + otherUser + " ( TBA link to call)")
  //sendToMattermost(mmUser + ", you have created a coffee call for 30 mins with " + otherUser + " (" + event.getLocation() + ")")
}

function cmdCleanup(){
  var deleted = deleteNonTodayRequests()
  sendToMattermost("Deleted " + deleted + " old requests." )
}

function cmdList(what) {
    switch (what) {
      case 'users':
        sendToMattermost("The following users are registered:\n" + getRegisteredUserEmails().join("\n") )
        break;
      case 'today':
        sendToMattermost("Today's active coffee requests:\n" + getCoffeeRequestsForToday().join("\n") )
        break;
      case 'requests':
        sendToMattermost("All existing coffee requests:\n" + getCoffeeRequests().join("\n") )
        break;
      default:
        sendToMattermost('Don\'t know how to list that! Valid arguments: users, today, requests.')
  }
}
