$(document).ready(function() {

    //colorear tab
    $('#menuSection a').removeClass("menuSelected");
    $('#menuSection a:nth-child(1)').addClass("menuSelected");

    //set titulo seccion
    $('#titleSection h2').text("Fletes");

});

$(function(){
    
    //dar formato a la tabla
    var table = $('#tableFletes').DataTable({
        language: dataTableLanguage,
        order: [[ 5, "desc" ]],
        
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
                        $('<div class="rowFletes"/>').append( data ) :
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
    $('#tableFletes').on('click', 'td.details-control', function(){

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

//mostrar formulario agregar flete
$('#subtitleSection #btnShowAdd').on({
    click: function(){
        $(this).hide();
        $('#tableSection').hide();
        $('#addSection').show();
        $('#btnShowSearch').show();
        $('#subtitleSection h3').text("Agregar flete");
    }
});

//mostrar tabla de fletes
$('#subtitleSection #btnShowSearch').on({
    click: function(){
        $(this).hide();
        $('#addSection').hide();
        $('#tableSection').show();
        $('#btnShowAdd').show();
        $('#subtitleSection h3').text("Lista de fletes");
    }
});

$('select').change(function(){
    if($(this).val() != "-1") {
        $(this).removeClass("noSelected");
    } else {
        $(this).addClass("noSelected");
    }
});


function rowCarga(carga, index){
    return '<tr>'+
                '<td>'+carga[index].descripcion+'</td>'+
                '<td>'+carga[index].peso+'</td>'+
                '<td class="optionsTable"><button type="button" class="btnEdit btnShowEditCargaTemp"><i class="fas fa-pencil-alt"></i></button><button type="button" class="btnDelete btnShowDeleteCargaTemp"><i class="fas fa-trash-alt"></i></button></td>'+
            '</tr>';
}

var cargas1;
var cargas2;

$('#fleteTipoRemolque').change(function(){
    //obtener cantidad de remolques
    var cantidad = $(this).val();

    var table1 = "#tableCargas1 tbody";
    var table2 = "#tableCargas2 tbody";

    if(cantidad == "1"){
        
        createCargas1();

        $('#remolque2').hide();
        if(typeof(cargas2) == 'undefined' || cargas2.length >= 0){
            cargas2 = undefined;
        }

    } else if(cantidad == "2"){
        
        createCargas1();
        createCargas2();

    }

    function createCargas1(){
        if(typeof(cargas1) == 'undefined') {
            cargas1 = [];
            $('#remolque1').show();
        }
        updateTable(table1, cargas1);

    }

    function createCargas2(){
        if(typeof(cargas2) == 'undefined') {
            cargas2 = [];
            $('#remolque2').show();
        }
        updateTable(table2, cargas2);
        
    }

});

function updateTable(table, cargas){
    if(cargas.length == 0) {
        $(table).html('<tr><td colspan="3">No hay cargas</td></tr>');
    } else {
        $(table).empty();
        $.each(cargas, function(i, val){
            $(table).append(rowCarga(cargas, i));
            console.log(cargas[i].descripcion+" "+cargas[i].peso);
        });
        setBtnEdit();
        setBtnDelete();
    }
}

$('.btnShowAddCarga').on({
    click: function(){
        //limpiar formulario
        $('.formCarga input').val("");
        $('.formCarga textarea').val("");

        //abrir modal
        var modal = "#modalFormCarga";
        $(modal).modal('show');

        //cambiar titulo
        var nombreRemolque = $(this).parents('.selectRemolque').find('select option:selected').text();
        $(modal+" .modal-title").text("Agregar carga para "+nombreRemolque);

        //agregar boton añadir
        $(modal+" .modal-footer button:first-child").remove();
        $(modal+" .modal-footer").prepend('<button type="button" class="btnAccept" id="btnAddCargaTemp"><span><i class="fas fa-check"></i></span><span>Agregar</span></button>');

        //habilitar boton añadir
        var idRemolque = $(this).parents('.selectRemolque').find('select').attr('id');
        enableBtnAddCargaTemp(idRemolque);

    }
});

function enableBtnAddCargaTemp(idRemolque){
    $('#btnAddCargaTemp').on({
        click: function(){
            var modal = "#modalFormCarga";
            var table1 = "#tableCargas1 tbody";
            var table2 = "#tableCargas2 tbody";

            //crear carga temporal
            var carga = {descripcion: $('#cargaDescripcion').val(), peso: $('#cargaPeso').val()};
            
            //agregar a correspondiente arreglo
            if(idRemolque == "fleteRemolque1"){
                cargas1.push(carga);
                updateTable(table1, cargas1);
            } else if(idRemolque == "fleteRemolque2") {
                cargas2.push(carga);
                updateTable(table2, cargas2);
            }

            //cerrar modal
            alert("Carga agregada");
            $(modal).modal('hide');

        }
    });
    
}


function setBtnEdit(){
    $('.btnShowEditCargaTemp').on({
        click: function(){
            //limpiar formulario
            $('.formCarga input').val("");
            $('.formCarga textarea').val("");

            //obtener valores de la tabla y los guarda en variables
            var row = $(this).parents("tr").find("td");

            var descripcion = row.eq(0).text(); //descripcion
            var peso = row.eq(1).text(); //peso

            //llenar formulario
            $('#cargaDescripcion').val(descripcion);
            $('#cargaPeso').val(peso);

            //abrir modal
            var modal = "#modalFormCarga";
            $(modal).modal('show');

            //cambiar titulo
            $(modal+" .modal-title").text("Editar carga");

            //agregar boton editar
            $(modal+" .modal-footer button:first-child").remove();
            $(modal+" .modal-footer").prepend('<button type="button" class="btnAccept" id="btnEditCargaTemp"><span><i class="fas fa-check"></i></span><span>Editar</span></button>');

            //habilitar boton editar
            var idRemolque = $(this).parents('.selectRemolque').find('select').attr('id');
            var rowIndex = $(this).parents('tr').index();
            //console.log(rowIndex);
            
            //enableBtnEditCargaTemp(idRemolque, rowIndex);

        }
    });
}



function setBtnDelete(){
    $('.btnShowDeleteCargaTemp').on({
        click: function(){

            //abrir modal
            var modal = "#modalDeleteCarga";
            $(modal).modal('show');
            
            //cambiar titulo
            $(modal+" .modal-title").text("Eliminar carga");

            //agregar boton eliminar
            $(modal+" .modal-footer button:first-child").remove();
            $(modal+" .modal-footer").prepend('<button type="button" class="btnCancel" id="btnDeleteCargaTemp"><span><i class="fas fa-times"></i></span><span>Eliminar</span></button>');

            //habilitar boton editar
            var idRemolque = $(this).parents('.selectRemolque').find('select').attr('id');
            var rowIndex = $(this).parents('tr').index();
           
            enableBtnDeleteCargaTemp(idRemolque, rowIndex);

        }
    })
}

function enableBtnDeleteCargaTemp(idRemolque, rowIndex){
    $('#btnDeleteCargaTemp').on({
        click: function(){
            var modal = "#modalDeleteCarga";
            var table1 = "#tableCargas1 tbody";
            var table2 = "#tableCargas2 tbody";

            //eliminar de correspondiente arreglo
            if(idRemolque == "fleteRemolque1"){
                cargas1.splice(rowIndex, 1);
                updateTable(table1, cargas1);
            } else if(idRemolque == "fleteRemolque2"){
                cargas2.splice(rowIndex, 1);
                updateTable(table2, cargas2);
            }

            //cerrar modal
            alert("Se elimino "+rowIndex);
            $(modal).modal('hide');
        }
    });
}