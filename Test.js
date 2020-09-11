// This method can be run to pretend you have written a command in MatterMost (triggering the webhook)
function doTest(){
  //var text = '!register adam.shorland@wikimedia.de';
  //var text = '!coffee 10:00->11:00';
  //var text = '!cleanup'
  var text = '!soon thar'
  var user = 'adsh'
  
  doPost({
    parameter: {
    text: text,
    trigger_word: text.split(' ')[0],
    user_name: user,
    token: MM_TOKEN
    }
  })
}