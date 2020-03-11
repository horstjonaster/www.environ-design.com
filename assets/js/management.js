$(document).ready(
    function() {
        $('.form-body-quantities-button').click(
            function()
            {
                $('.form-body-quantities').append('<div class="from-body-quantity form-body-row row">\n' +
                    '                                <div class="form-body-column left col-md-6">\n' +
                    '                                    <input class="form-body-group-input" type="text" name="sizes[]" placeholder="Size" autocomplete="off">\n' +
                    '                                </div>\n' +
                    '\n' +
                    '                                <div class="form-body-column right col-md-6">\n' +
                    '                                    <input class="form-body-group-input" type="number" name="quantities[]" placeholder="Quantity" autocomplete="off">\n' +
                    '                                </div>\n' +
                    '                            </div>');
            }
        );
    }
);
