//https://stackoverflow.com/questions/5980389/proper-way-to-use-ajax-post-in-jquery-to-pass-model-from-strongly-typed-mvc3-vie

$(document).ready(function() {

    //colorear tab
    $('#menuSection a').removeClass("menuSelected");
    $('#menuSection a:nth-child(4)').addClass("menuSelected");

    //set titulo seccion
    $('#titleSection h2').text("Operadores");
    
    /*//vaciar div modals
    $("#modals").empty();

    //agregar modals
    $.get("modals/modalFormOperador.html", function(html){
        $('#modals').append(html);
    });
    $.get("modals/modalDeleteOperador.html", function(html){
        $('#modals').append(html);
    });*/

});

/* Row details */
function format(dataSource){
    return '<div class="cont">'+
    '<div class="row table-details">'+
        '<div class="col-xs-12 col-sm-6">'+
            '<p>'+'<span>NSS: </span>'+dataSource[0]+'</p>'+
            '<p>'+'<span>CURP: </span>'+dataSource[1]+'</p>'+
            '<p>'+'<span>Teléfono: </span>'+dataSource[3]+'</p>'+
        '</div>'+
        '<div class="col-xs-12 col-sm-6">'+
            '<p>'+'<span>Dirección: </span>'+dataSource[2]+'</p>'+
        '</div>'+
    '</div>'+
    '</div>';
}

$(function(){

    //dar formato a la tabla
    var table = $('#tableOperadores').DataTable({
        language: dataTableLanguage,
        order: [[ 3, "asc" ]],

        responsive: {
            details: {
                renderer: function ( api, rowIdx, columns ) {
                    var data = $.map( columns, function ( col, i ) {
                        return col.hidden ?
                            '<div class="row table-details">'+
                                '<div class="col-xs-12">'+
                                    '<p>'+
                                    '<span>'+col.title+': '+'</span> '+col.data+'</span>'+
                                    '</p>'+
                                '</div>'+
                            '</div>' :
                            '';
                    } ).join('');
 
                    return data ?
                        $('<div class="rowOperadores"/>').append( data ) :
                        false;
                },
                type: 'column'
            }
        },

        columnDefs: [
            {
                //esconder columna id
                targets: 1,
                visible: false,
                searchable: false
            },
            //dar prioridad a la columna opciones y mas informacion
            { responsivePriority: 1, targets: -1 },
            { responsivePriority: 1, targets: 0 }
        ]

    });

    //listener para abrir y cerrar detalles
    $('#tableOperadores').on('click', 'td.details-control', function(){
        
        var tr = $(this).parents('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            tr.addClass('shown');

            $(this).empty();
            $(this).append('<i class="fas fa-minus-square"></i>');
        }
        else {
            tr.removeClass('shown');

            $(this).empty();
            $(this).append('<i class="fas fa-plus-square"></i>');
            
        }
    });
});

$('#btnShowAddOperador').on({
    click: function(){
        //limpiar formulario
        $('.formOperador input').val("");
        $('.formOperador textarea').val("");

        //abrir modal
        var modal = "#modalFormOperador";
        $(modal).modal('show');

        //cambiar titulo
        $(modal+" .modal-title").text("Agregar operador");

        //agregar boton editar
        $(modal+" .modal-footer button:first-child").remove();
        $(modal+" .modal-footer").prepend('<button type="button" class="btnAccept" id="btnAddOperador"><span><i class="fas fa-check"></i></span><span>Agregar</span></button>');

        enableBtnAdd();

    }
});

function enableBtnAdd(){
    $('#btnAddOperador').on({
        click: function(){
            var modal = "#modalFormOperador";

            //metodo post
            $.ajax({
                url: '/Operadores/agregar',
                data: JSON.stringify({
                    Operador: {
                        nombre: $('#operadorNombre').val(),
                        apellido: $('#operadorApellido').val(),
                        direccion: $('#operadorDireccion').val(),
                        curp: $('#operadorCurp').val(),
                        numLicencia: $('#operadorNumLicencia').val(),
                        telefono: $('#operadorTelefono').val(),
                        nss: $('#operadorNss').val(),
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

            //alert($(modal+' .formOperador').serialize());
        }
    });
}

$('.btnShowEditOperador').on({
    click: function(){
        
        //limpiar formulario
        $('.formOperador input').val("");
        $('.formOperador textarea').val("");

        //obtener valores de la tabla y los guarda en variables
        var row = $(this).parents("tr").find("td");

        var id = row.eq(1).text(); //id
        var nombre = row.eq(3).text(); //nombre
        var apellido = row.eq(4).text(); //apellido
        var licencia = row.eq(5).text(); //licencia

        var tr = $(this).parents("tr");

        var nss = tr.data('child-nss'); //nss
        var curp = tr.data('child-curp'); //curp
        var direccion = tr.data('child-direccion'); //direccion
        var telefono = tr.data('child-telefono'); //telefono

        //llenar formulario
        var idOperador = id;
        $('#operadorNombre').val(nombre);
        $('#operadorApellido').val(apellido);
        $('#operadorLicencia').val(licencia);

        $('#operadorNss').val(nss);
        $('#operadorCurp').val(curp);
        $('#operadorDireccion').val(direccion);
        $('#operadorTelefono').val(telefono);

        //abrir modal
        var modal = "#modalFormOperador";
        $(modal).modal('show');

        //cambiar titulo
        $(modal+" .modal-title").text("Editar operador");

        //agregar boton editar
        $(modal+" .modal-footer button:first-child").remove();
        $(modal+" .modal-footer").prepend('<button type="button" class="btnAccept" id="btnEditOperador"><span><i class="fas fa-check"></i></span><span>Editar</span></button>');

        enableBtnEdit(idOperador);

    }
});

function enableBtnEdit(idOperador){
    $('#btnEditOperador').on({
        click: function(){
            var modal = "#modalFormOperador";

            //metodo post
            $.ajax({
                url: '/Operadores/editar',
                data: JSON.stringify({
                    Operador: {
                        id: idOperador,
                        nombre: $('#operadorNombre').val(),
                        apellido: $('#operadorApellido').val(),
                        direccion: $('#operadorDireccion').val(),
                        curp: $('#operadorCurp').val(),
                        numLicencia: $('#operadorNumLicencia').val(),
                        telefono: $('#operadorTelefono').val(),
                        nss: $('#operadorNss').val(),
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

$('.btnShowDeleteOperador').on({
    click: function(){

        //obtener id
        var idOperador = $(this).parents("tr").find("td").eq(1).text();

        //abrir modal
        var modal = "#modalDeleteOperador";
        $(modal).modal('show');
        
        //cambiar titulo
        $(modal+" .modal-title").text("Eliminar operador");

        //agregar boton eliminar
        $(modal+" .modal-footer button:first-child").remove();
        $(modal+" .modal-footer").prepend('<button type="button" class="btnCancel" id="btnDeleteOperador"><span><i class="fas fa-times"></i></span><span>Eliminar</span></button>');

        enableBtnDelete(idOperador);
    }
});

function enableBtnDelete(idOperador){
    $('#btnDeleteOperador').on({
        click: function(){
            var modal = "#modalDeleteOperador";

            //metodo post
            $.ajax({
                url: '/Operadores/eliminar',
                data: JSON.stringify({
                    id: idOperador
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