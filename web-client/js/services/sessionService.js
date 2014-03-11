notesApp.factory('sessionService', function(cookieService)
{
    var sessionService = {};

    var user = null;

    var sessionToken = function()
    {
        return cookieService.readCookie('token');
    }

    sessionService.getLocalUser = function(callback)
    {
        if (user)
        {
            return callback(user);
        }

        $.ajax({
            type: 'POST',
            url: 'http://stickyapi.alanedwardes.com/user/getUser',
            data: {'token': sessionToken()},
            success: function(data) {

                user = data;
                return callback(user);

            },
            error: function(data) {
                console.log(data);
                return callback(null);
            }
        });
    }

    sessionService.setLocalUser = function(userObj)
    {
        user = userObj;
    }

    sessionService.getSessionToken = function()
    {
        return sessionToken();
    }

    sessionService.setSessionToken = function(value)
    {
        cookieService.writeCookie('token', value, '/');
    }

    // To be used when logging out
    sessionService.clearSessionToken = function()
    {
        cookieService.deleteCookie('token', '/');
    }

    return sessionService;
});