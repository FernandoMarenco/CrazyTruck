$(document).ready(function() {

    //agregar modals
    $.get("modals/modalFormTrailer.html", function(html){
        $('#modals').append(html);
    });
    $.get("modals/modalDeleteTrailer.html", function(html){
        $('#modals').append(html);
    });

});

$('#btnShowAddTrailer').on({
    click: function(){
        //limpiar formulario
        $('.formTrailer input').val("");
        
        //abrir modal
        var modal = "#modalFormTrailer";
        $(modal).modal('show');

        //cambiar titulo
        $(modal+" .modal-title").text("Agregar trailer");

        //agregar boton editar
        $(modal+" .modal-footer button:first-child").remove();
        $(modal+" .modal-footer").prepend('<button type="button" class="btnAccept" id="btnAddTrailer"><span><i class="fas fa-check"></i></span><span>Agregar</span></button>');

        enableBtnAdd();

    }
});

function enableBtnAdd(){
    $('#btnAddTrailer').on({
        click: function(){
            var modal = "#modalFormTrailer";

            //metodo post
            $.ajax({
                url: '',
                data: JSON.stringify({trailer:{
                    matricula: $('#trailerMatricula').val(),
                    modelo: $('#trailerModelo').val(),
                    anio: $('#trailerAnio').val(),
                    color: $('#trailerColor').val()
                }}),
                type: 'POST',
                contentType: 'application/json; charset=utf-8'
            })
            .done(function() {
                alert("success");

                //cerrar modal
                $(modal).modal('hide');
            })
            .fail(function() {
                alert("error");

                //cerrar modal
                $(modal).modal('hide');
            });

            alert($(modal+' .formTrailer').serialize());
        }
    });
}

$('.btnShowEditTrailer').on({
    click: function(){
        
        //limpiar formulario
        $('.formTrailer input').val("");

        //obtener valores de la tabla
        var datos = [];
        $(this).parents("tr").find("td").each(function(){
            datos.push($(this).html());
        });

        //llenar formulario
        $('.formTrailer input').each(function(index, val){
            $(this).val(datos[index]);
        })

        //abrir modal
        var modal = "#modalFormTrailer";
        $(modal).modal('show');

        //cambiar titulo
        $(modal+" .modal-title").text("Editar trailer");

        //agregar boton editar
        $(modal+" .modal-footer button:first-child").remove();
        $(modal+" .modal-footer").prepend('<button type="button" class="btnAccept" id="btnEditTrailer"><span><i class="fas fa-check"></i></span><span>Editar</span></button>');

        enableBtnEdit();

    }
});

function enableBtnEdit(){
    $('#btnEditTrailer').on({
        click: function(){
            var modal = "#modalFormTrailer";

            //metodo post
            $.ajax({
                url: '',
                data: $(modal+' .formTrailer').serialize(),
                type: 'POST'
            })
            .done(function() {
                alert("success");

                //cerrar modal
                $(modal).modal('hide');
            })
            .fail(function() {
                alert("error");

                //cerrar modal
                $(modal).modal('hide');
            });

            alert($(modal+' .formTrailer').serialize());
        }
    });
}

$('.btnShowDeleteTrailer').on({
    click: function(){
        //limpiar formulario
        $('.formTrailer input').val("");

        //obtener id
        var id = $(this).parents("tr").find("td").eq(0).text();

        //setear id
        $('.formTrailer input').val(id);

        //abrir modal
        var modal = "#modalDeleteTrailer";
        $(modal).modal('show');

        
        //cambiar titulo
        $(modal+" .modal-title").text("Eliminar trailer");

        //agregar boton eliminar
        $(modal+" .modal-footer button:first-child").remove();
        $(modal+" .modal-footer").prepend('<button type="button" class="btnAccept" id="btnDeleteTrailer"><span><i class="fas fa-check"></i></span><span>Eliminar</span></button>');

        enableBtnDelete();
    }
});

function enableBtnDelete(){
    $('#btnDeleteTrailer').on({
        click: function(){
            var modal = "#modalDeleteTrailer";

            //metodo post
            $.ajax({
                url: '',
                data: $(modal+' .formTrailer').serialize(),
                type: 'POST'
            })
            .done(function() {
                alert("success");

                //cerrar modal
                $(modal).modal('hide');
            })
            .fail(function() {
                alert("error");

                //cerrar modal
                $(modal).modal('hide');
            });

            alert($(modal+' .formTrailer').serialize());
        }
    });
}