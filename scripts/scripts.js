$(document).ready(function(){
    if($(window).outerWidth() < 768){
        $('#menuSection').appendTo('#menu');
    } else {
        $('#menuSection').prependTo('#menu');
    }
});

$('#menuSection a').on({
    click: function(){
        $('a').removeClass("menuSelected")
        $(this).addClass("menuSelected");
    }
});

$('#btnMenu').on({
    click: function() {
        $('#menuSection').slideToggle();
    }
});

$(window).resize(function(){
    if($(window).outerWidth() < 768){
        $('#menuSection').appendTo('#menu');
        $('#menuSection').removeClass('block');
    } else {
        $('#menuSection').prependTo('#menu');
        $('#menuSection').addClass('block');
    }
});

var dataTableLanguage = {
    "emptyTable":     "No hay datos en la tabla",
    "info":           "Mostrando _START_ a _END_ de un total de _TOTAL_ registros",
    "infoEmpty":      "Mostrando 0 registros",
    "infoFiltered":   "",
    "lengthMenu":     "Ver _MENU_ registros",
    "loadingRecords": "Cargando...",
    "processing":     "Procesando...",
    "search":         "Buscar:",
    "zeroRecords":    "No se encontraron resultados",
    "paginate": {
        "first":      '<i class="fas fa-angle-double-left"></i>',
        "last":       '<i class="fas fa-angle-double-right"></i>',
        "next":       '<i class="fas fa-chevron-right"></i>',
        "previous":   '<i class="fas fa-chevron-left"></i>'
    }
};