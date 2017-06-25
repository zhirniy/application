//Добавление в базу

$(document).ready(function () {
    $('#request_add_btn').click(function () {
        var data = $('#requstsAdd').serialize();
        $.ajax({
            type: 'POST',
            data: data,
            url: 'RequestCreator',
            dataType: 'text',
            success: function(resp){
                if(!(resp == "")){alert(resp);}
            }
        });
    });
});