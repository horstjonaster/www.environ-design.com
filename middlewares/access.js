module.exports = (rank) =>
{
    return (request, response, next) =>
    {
        if(request.user.rank < rank)
        {
            return response.redirect('/user/login');
        }

        return next();
    };
};