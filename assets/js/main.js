$(document).ready(
    function() {
        setTimeout(
            function ()
            {
                $('.loader').removeClass('active');
            }, 250
        );

        var resize = function()
        {
            $('.row').each(
                function()
                {
                    var max = 0;

                    $(this).find('.article-body-column').css('height', 'auto');

                    $(this).find('.article-body-column').each(
                        function()
                        {
                            var height = $(this).height();

                            if(height > max)
                            {
                                max = height;
                            }
                        }
                    );

                    $(this).find('.article-body-column').css('height', max + 'px');
                }
            );
        }

        resize();

        $(window).resize(
            function()
            {
                resize();
            }
        );

        $(window).scroll(
            function()
            {
                var top = $(this).scrollTop();

                if(top > 0)
                {
                    $('.header').addClass('active');
                }
                else
                {
                    $('.header').removeClass('active');
                }
            }
        );

        $('a').click(
            function(event)
            {
                var href = $(this).attr('href');

                $('.loader').addClass('active');

                setTimeout(
                    function()
                    {
                        window.location.href = href;
                    }, 250
                );

                event.preventDefault();
            }
        );

        $('form').submit(
            function(event)
            {
                var form = $(this);

                $('.loader').addClass('active');

                setTimeout(
                    function()
                    {
                        form.unbind().submit();
                    }, 250
                );

                event.preventDefault();
            }
        );
    }
);

var goto = function(href)
{
    $('.loader').addClass('active');

    setTimeout(
        function()
        {
            window.location.href = href;
        }, 250
    );
}