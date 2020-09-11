// Handlers for the "Web app" part of this project.
// This is called by mattermost

// TODO probably turn this get off?
function doGet(e){
  doPost(e)
}

function doPost(e){
  if(e.parameter['token']!==MM_TOKEN){
    doLog("Called with bad token")
    return;
  }
  
  var triggerWord = e.parameter['trigger_word']
  var mmUser = e.parameter['user_name']
  var triggerWords = e.parameter['text'].split(' ')
  
  switch (triggerWord) {
    // REMEMBER!!! Whenever a new trigger word is added here, you need to add it to the hook in the mattermost UI
    case '!coffee':
      cmdCoffee(mmUser, triggerWords[1])
      break;
    case '!now':
      cmdNow(mmUser, triggerWords[1])
      break;
    case '!register':
      cmdRegister(mmUser, triggerWords[1])
      break;
    case '!list':
      cmdList(triggerWords[1])
      break;
    case '!cleanup':
      cmdCleanup()
      break;
    case '!soon':
      cmdSoon(mmUser, triggerWords[1])
      break;
    case '!help':
      cmdHelp()
      break;
    default:
      doLog('No Command!')
  }
}