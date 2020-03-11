module.exports =
{
    success: (request, response, next) =>
    {
        if(request.isAuthenticated())
        {
            return next();
        }

        return response.redirect('/user/login?redirect=' + request.originalUrl);
    },

    failed: (request, response, next) =>
    {
        if(!request.isAuthenticated())
        {
            return next();
        }

        return response.redirect('/user/profile');
    }
};