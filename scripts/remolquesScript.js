$(document).ready(function() {

    //colorear tab
    $('#menuSection a').removeClass("menuSelected");
    $('#menuSection a:nth-child(3)').addClass("menuSelected");

    //set titulo seccion
    $('#titleSection h2').text("Remolques");

    /*//vaciar div modals
    $("#modals").empty();
    
    //agregar modals
    $.get("modals/modalFormRemolque.html", function(html){
        $('#modals').append(html);
    });
    $.get("modals/modalDeleteRemolque.html", function(html){
        $('#modals').append(html);
    });*/

});

$(function(){
    //dar formato a la tabla
    var table = $('#tableRemolques').DataTable({
        language: dataTableLanguage,
        order: [[ 1, "asc" ]]
    });
});

$('#btnShowAddRemolque').on({
    click: function(){
        //limpiar formulario
        $('.formRemolque input').val("");
        
        //abrir modal
        var modal = "#modalFormRemolque";
        $(modal).modal('show');

        //cambiar titulo
        $(modal+" .modal-title").text("Agregar remolque");

        //agregar boton editar
        $(modal+" .modal-footer button:first-child").remove();
        $(modal+" .modal-footer").prepend('<button type="button" class="btnAccept" id="btnAddRemolque"><span><i class="fas fa-check"></i></span><span>Agregar</span></button>');

        enableBtnAdd();

    }
});

function enableBtnAdd(){
    $('#btnAddRemolque').on({
        click: function(){
            var modal = "#modalFormRemolque";

            //metodo post
            $.ajax({
                url: '/Remolques/agregar',
                data: JSON.stringify({
                    Gandola: {
                        matricula: $('#remolqueMatricula').val(),
                        capacidad: $('#remolqueCapacidad').val(),
                    }
                }),
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

            });

        }
    });
}

$('.btnShowEditRemolque').on({
    click: function(){
        
        //limpiar formulario
        $('.formRemolque input').val("");

        //obtener valores de la tabla y los guarda en variables
        var row = $(this).parents("tr").find("td");

        var id = row.eq(0).text(); //id
        var matricula = row.eq(1).text(); //matricula
        var capacidad = row.eq(2).text(); //capacidad

        //llenar formulario
        var idRemolque = id;
        $('#remolqueMatricula').val(matricula);
        $('#remolqueCapacidad').val(capacidad);
        
        //abrir modal
        var modal = "#modalFormRemolque";
        $(modal).modal('show');

        //cambiar titulo
        $(modal+" .modal-title").text("Editar remolque");

        //agregar boton editar
        $(modal+" .modal-footer button:first-child").remove();
        $(modal+" .modal-footer").prepend('<button type="button" class="btnAccept" id="btnEditRemolque"><span><i class="fas fa-check"></i></span><span>Editar</span></button>');

        enableBtnEdit(idRemolque);

    }
});

function enableBtnEdit(idRemolque){
    $('#btnEditRemolque').on({
        click: function(){
            var modal = "#modalFormRemolque";

            //metodo post
            $.ajax({
                url: '/Remolques/editar',
                data: JSON.stringify({
                    Gandola: {
                        id: idRemolque,
                        matricula: $('#remolqueMatricula').val(),
                        capacidad: $('#remolqueCapacidad').val(),
                    }
                }),
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

            });

            //alert($(modal+' .formRemolque').serialize());
        }
    });
}

$('.btnShowDeleteRemolque').on({
    click: function(){

        //obtener id
        var idRemolque = $(this).parents("tr").find("td").eq(0).text();

        //abrir modal
        var modal = "#modalDeleteRemolque";
        $(modal).modal('show');

        //cambiar titulo
        $(modal+" .modal-title").text("Eliminar remolque");

        //agregar boton eliminar
        $(modal+" .modal-footer button:first-child").remove();
        $(modal+" .modal-footer").prepend('<button type="button" class="btnCancel" id="btnDeleteRemolque"><span><i class="fas fa-times"></i></span><span>Eliminar</span></button>');

        enableBtnDelete(idRemolque);
    }
});

function enableBtnDelete(idRemolque){
    $('#btnDeleteRemolque').on({
        click: function(){
            var modal = "#modalDeleteRemolque";

            //metodo post
            $.ajax({
                url: '/Remolques/eliminar',
                data: JSON.stringify({
                    id: idRemolque
                }),
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

            });

        }
    });
}