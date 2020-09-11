function doLog(toLog) {
  // Doc used during development....
  var doc = DocumentApp.openById(GDOC_ID_LOG);
  var body = doc.getBody();
  body.appendParagraph(toLog)
  Logger.log(toLog);
}