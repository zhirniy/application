//Добавление в базу

$(document).ready(function () {
    $('#user_reg_btn').click(function () {
        var data = $('#user_form').serialize();
        $.ajax({
            type: 'POST',
            data: data,
            url: 'Registration',
            dataType: 'text',
            success: function(resp){
                if(!(resp == "")){alert(resp);}
            }
        });
    });
});