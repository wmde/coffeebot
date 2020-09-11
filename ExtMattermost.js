function sendToMattermost(message) {
  var url = MM_SEND_HOOK;
  var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(
    {
      "text": message,
    })
  };
  var response = UrlFetchApp.fetch(url, options);
}