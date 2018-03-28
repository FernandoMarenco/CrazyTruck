$(document).ready(function() {

    //colorear tab
    $('#menuSection a').removeClass("menuSelected");
    $('#menuSection a:nth-child(2)').addClass("menuSelected");

    //set titulo seccion
    $('#titleSection h2').text("Trailers");
    
    /*//vaciar div modals
    $("#modals").empty();
    //agregar modals
    $.get("modals/modalFormTrailer.html", function(html){
        $('#modals').append(html);
    });
    $.get("modals/modalDeleteTrailer.html", function(html){
        $('#modals').append(html);
    });*/

});

$(function(){
    //dar formato a la tabla
    var table = $('#tableTrailers').DataTable({
        language: dataTableLanguage,
        order: [[ 1, "asc" ]]
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
                url: '/Trailers/agregar',
                data: JSON.stringify({
                    Trailer:{
                        modelo: $('#trailerModelo').val(),
                        anio: $('#trailerAnio').val(),
                        matricula: $('#trailerMatricula').val(),
                        color: $('#trailerColor').val()
                }}),
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                success: function() {
                    alert("success");

                    //cerrar modal
                    $(modal).modal('hide');
                },
                error: function(){
                    alert("error");
                }
            });

            //alert($(modal+' .formTrailer').serialize());
        }
    });
}

$('.btnShowEditTrailer').on({
    click: function(){
        
        //limpiar formulario
        $('.formTrailer input').val("");

        //obtener valores de la tabla y los guarda en variables
        var row = $(this).parents("tr").find("td");

        var id = row.eq(0).text(); //id
        var modelo = row.eq(1).text(); //modelo
        var anio = row.eq(2).text(); //anio
        var matricula = row.eq(3).text(); //matricula
        var color = row.eq(4).text(); //color

        //llenar formulario
        var idTrailer = id;
        $('#trailerModelo').val(modelo);
        $('#trailerAnio').val(anio);
        $('#trailerMatricula').val(matricula);
        $('#trailerColor').val(color);

        //abrir modal
        var modal = "#modalFormTrailer";
        $(modal).modal('show');

        //cambiar titulo
        $(modal+" .modal-title").text("Editar trailer");

        //agregar boton editar
        $(modal+" .modal-footer button:first-child").remove();
        $(modal+" .modal-footer").prepend('<button type="button" class="btnAccept" id="btnEditTrailer"><span><i class="fas fa-check"></i></span><span>Editar</span></button>');

        enableBtnEdit(idTrailer);

    }
});

function enableBtnEdit(idTrailer){
    $('#btnEditTrailer').on({
        click: function(){
            var modal = "#modalFormTrailer";

            //metodo post
            $.ajax({
                url: '/Trailers/editar',
                data: JSON.stringify({
                    Trailer:{
                        id: idTrailer,
                        modelo: $('#trailerModelo').val(),
                        anio: $('#trailerAnio').val(),
                        matricula: $('#trailerMatricula').val(),
                        color: $('#trailerColor').val()
                }}),
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                success: function() {
                    alert("success");

                    //cerrar modal
                    $(modal).modal('hide');
                },
                error: function(){
                    alert("error");
                }
            });

            //alert($(modal+' .formTrailer').serialize());
        }
    });
}

$('.btnShowDeleteTrailer').on({
    click: function(){

        //obtener id
        var idTrailer = $(this).parents("tr").find("td").eq(0).text();

        //abrir modal
        var modal = "#modalDeleteTrailer";
        $(modal).modal('show');

        //cambiar titulo
        $(modal+" .modal-title").text("Eliminar trailer");

        //agregar boton eliminar
        $(modal+" .modal-footer button:first-child").remove();
        $(modal+" .modal-footer").prepend('<button type="button" class="btnCancel" id="btnDeleteTrailer"><span><i class="fas fa-times"></i></span><span>Eliminar</span></button>');

        enableBtnDelete(idTrailer);
    }
});

function enableBtnDelete(idTrailer){
    $('#btnDeleteTrailer').on({
        click: function(){
            var modal = "#modalDeleteTrailer";

            //metodo post
            $.ajax({
                url: '/Trailers/eliminar?idTrailer='+idTrailer,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                success: function() {
                    alert("success");

                    //cerrar modal
                    $(modal).modal('hide');
                },
                error: function(){
                    alert("error");
                }
            });

        }
    });
}