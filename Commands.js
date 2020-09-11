// Each method here maps to a command that you can use within Mattermost

function cmdHelp() {
  sendToMattermost("Current commands: !help !list !register !coffee !cleanup" )
}

function cmdRegister( mmUser, gEmail ) {
  registerMmUser(mmUser, gEmail)
  sendToMattermost(mmUser + " are registered with the email " + gEmail + "!")
}

function cmdCoffee( mmUser, requiredTimeSlot ) {
  if(!isMmUserRegistered(mmUser)) {
    sendToMattermost("You (" + mmUser + ') are not registered')
    return;
  }
  
  var splitTime = requiredTimeSlot.split('->')
  var from = splitTime[0]
  var to = splitTime[1]
  
  // TODO Implement doing coffee
  storeCoffeeRequest(mmUser, from, to)
  sendToMattermost("You (" + mmUser + ') are registered and requesting coffee between ' + from + " and " + to + " (Berlin time)")
}

function cmdSoon( mmUser, otherUser ) {
  if(!isMmUserRegistered(mmUser)) {
    sendToMattermost("You (" + mmUser + ') are not registered')
    return;
  }
  if(!isMmUserRegistered(otherUser)) {
    sendToMattermost("The user you want to coffee with (" + otherUser + ') is not registered')
    return;
  }
  var time = findSoonestFreeTime(getEmailFromMmUser(mmUser), getEmailFromMmUser(otherUser))
  if (!time) {
    sendToMattermost(mmUser + ", you have no overlapping free time with" + otherUser + "in the next two hours")
  } else {
    var event = createCalEvent(getEmailFromMmUser(mmUser), getEmailFromMmUser(otherUser), time.start, time.end)
  }
  sendToMattermost(mmUser + ", you have created a coffee call for 30 mins with " + otherUser + "starting at "+ time.start)
}

function cmdNow( mmUser, otherUser ) {
  if(!isMmUserRegistered(mmUser)) {
    sendToMattermost("You (" + mmUser + ') are not registered')
    return;
  }
  if(!isMmUserRegistered(otherUser)) {
    sendToMattermost("The user you want to coffee with (" + otherUser + ') is not registered')
    return;
  }
  
  var event = createCalEventNow(getEmailFromMmUser(mmUser), getEmailFromMmUser(otherUser))
  
  sendToMattermost(mmUser + ", you have created a coffee call for 30 mins with " + otherUser + " ( TBA link to call)")
  //sendToMattermost(mmUser + ", you have created a coffee call for 30 mins with " + otherUser + " (" + event.getLocation() + ")")
}

function cmdCleanup(){
  var deleted = deleteNonTodayRequests()
  sendToMattermost("Deleted " + deleted + " old requests" )
}

function cmdList(what) {
    switch (what) {
      case 'users':
        sendToMattermost("The following users are registered:\n" + getRegisteredUserEmails().join("\n") )
        break;
      case 'today':
        sendToMattermost("The coffee requests that currently exist for today:\n" + getCoffeeRequestsForToday().join("\n") )
        break;
      case 'requests':
        sendToMattermost("All the coffee requests that currently exist:\n" + getCoffeeRequests().join("\n") )
        break;
      default:
        sendToMattermost('Unknown thing to list! Use either users, today, or requests.')
  }
}