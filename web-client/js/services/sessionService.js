notesApp.factory('sessionService', function(cookieService)
{
    var sessionService = {};

    sessionService.getSessionToken = function()
    {
        return cookieService.readCookie('token');
    }

    sessionService.setSessionToken = function(value)
    {
        cookieService.writeCookie('token', value, '/');
    }

    sessionService.getUserID = function()
    {
        return cookieService.readCookie('userID');
    }

    sessionService.setUserID = function(value)
    {
        cookieService.writeCookie('userID', value, '/');
    }

    // To be used when logging out
    sessionService.clearSessionToken = function()
    {
        cookieService.deleteCookie('token', '/');
    }

    return sessionService;
});