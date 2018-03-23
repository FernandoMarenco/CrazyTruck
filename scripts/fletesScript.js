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