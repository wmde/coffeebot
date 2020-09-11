// Crude storage, using the script property store service....
// TODO daily cleanup of the storage for coffee requests?

var STORE_PREFIX_USER = 'USER_'
var STORE_PREFIX_REQUEST = 'REQUEST_'

/**
 ** Require Meetings
 **/

function coffeeRequestKey(mmUser){
  return new Date().toLocaleDateString() + '@' + mmUser;
}

function storeCoffeeRequest(mmUser, from, to) {
    setProperty(STORE_PREFIX_REQUEST, coffeeRequestKey(mmUser), mmUser + "@" + from + "->" + to)
}

function getCoffeeRequests() {
  return getPropertiesWithPrefix(STORE_PREFIX_REQUEST)
}

function getCoffeeRequestsForToday() {
  return getPropertiesWithPrefix(STORE_PREFIX_REQUEST + new Date().toLocaleDateString())
}

function deleteNonTodayRequests() {
  return deletePropertiesWithPrefixWithoutPrefix(STORE_PREFIX_REQUEST, STORE_PREFIX_REQUEST + new Date().toLocaleDateString())
}

/**
 ** Users
 **/

function registerMmUser( mmUser, gEmail ){
  setProperty(STORE_PREFIX_USER, mmUser, gEmail)
}

function isMmUserRegistered(mmUser){
  return getProperty(STORE_PREFIX_USER, mmUser) !== null
}

function getEmailFromMmUser( mmUser ){
  return getProperty(STORE_PREFIX_USER, mmUser)
}

function getRegisteredUserEmails() {
  return getPropertiesWithPrefix('USER_')
}

/**
 ** General
 **/

function setProperty( prefix, key, value ){
  var scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty(prefix+key, value);
}

function getProperty( prefix, key, value ){
  var scriptProperties = PropertiesService.getScriptProperties();
  return scriptProperties.getProperty(prefix + key);
}

function getPropertiesWithPrefix(prefix){
  var scriptProperties = PropertiesService.getScriptProperties();
  var allPropKeys = scriptProperties.getKeys();
  var values = [];
  allPropKeys.forEach(function (item, index) {
    if( item.startsWith(prefix) ) {
      values.push(scriptProperties.getProperty(item));
    }
  });
  return values;
}

function deletePropertiesWithPrefixWithoutPrefix(hasPrefix, doesntHavePrefix){
    var scriptProperties = PropertiesService.getScriptProperties();
  var cleaned = 0;
  scriptProperties.getKeys().forEach(function (item, index) {
    if( item.startsWith(hasPrefix) && item.startsWith(doesntHavePrefix) === false ) {
      scriptProperties.deleteProperty(item)
      cleaned++
    }
  });
  return cleaned;
}