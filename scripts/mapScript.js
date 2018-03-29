var map;
var gMarker;

function initMap(){
    var idMap = document.getElementById('mapAdd');
    var objMap = {
        center: {
            lat: 23.877435,
            lng: -102.620500
        },
        zoom: 6,
        streetViewControl: false
    }
    map = new google.maps.Map(idMap, objMap);

    google.maps.event.addListener(map, "click", function(event){
        //obtener lat y lng del click
        var coordenadas = event.latLng;

        //crear marcador si no existe
        createMaker();

        //setear marcador
        moveMarker(map, gMarker, coordenadas);
        console.log(coordenadas.lat() + " " +coordenadas.lng());
    });
}

//input on key Enter
$('#searchAddress').keypress(function(event){
    //13 = key Enter
    if (event.keyCode === 13) {
        //crear geocoder para obtener lugares con direcciones
        var gCoder = new google.maps.Geocoder();

        //buscar por direccion
        var objDirection = {
            address: this.value
        }
        gCoder.geocode(objDirection, fn_coder);

        function fn_coder(data, status){
            if(status === "OK"){
                //obtener coordenadas
                var coordenadas = data[0].geometry.location; //objLatLng

                //crear marcador si no existe
                createMaker();

                //setear marcador
                moveMarker(map, gMarker, coordenadas);
                map.setCenter(coordenadas);
                map.setZoom(18);
            }
            
        }
    }
    
});

function createMaker(){
    if(gMarker == undefined) {
        var objMarker = {
            map: map,
            animation: google.maps.Animation.DROP,
            draggable: true
        }
        gMarker = new google.maps.Marker(objMarker);

        var gInfoW;
        setListeners();

        console.log("se creo");
    } else {
        console.log("ya esta creado")
    }
}

function moveMarker(map, marker, coordenadas){
    //actualizar marker
    marker.setPosition(coordenadas);

    //actualizar nombre escala
    getAddress(marker, function(location){
        document.getElementById("escalaNombre").value = location;

        //actualizar info window
        var objWindow = {
            content: "<div><p>"+location+"</p></div>"
        }
        gInfoW = new google.maps.InfoWindow(objWindow);

    });
    
}

function setListeners(){
    //addListener(objeto asociado, evento, funcion)
    google.maps.event.addListener(gMarker, "click", function(){
        gInfoW.close();
        gInfoW.open(map, gMarker);
    });

    google.maps.event.addListener(gMarker, "dragend", function(){
        var markerLatLgn = gMarker.getPosition();

        console.log(markerLatLgn.lat()+" "+markerLatLgn.lng());

    });
}


function getAddress(marker, fn){
    var markerLatLgn = marker.getPosition();
    
    var gCoder = new google.maps.Geocoder();

    var objDirection = {
        location: markerLatLgn
    }
    gCoder.geocode(objDirection, function(data){
        fn(data[1].formatted_address);
        
    });

}

function resetMarker(marker){
    marker.setMap(null);
    marker = undefined;
    
}



/*((-111.0219734 + -110.9083503) / 2)=-110.965162
((27.92516586 + 29.09746723) /2)=28.511317
*/

function initMapRutas(){
    var idMap = document.getElementById('mapRutas');

    var objMap = {
        center: {
            lat: 23.877435,
            lng: -102.620500
        },
        zoom: 6,
        streetViewControl: false
    }
    map = new google.maps.Map(idMap, objMap);


    //generar rutas objetos
    var objDR = {
        map: map,
        suppressMarkers: true,
        //markerOptions: {icon: "images/miniMarker.png"}
    }

    var ds = new google.maps.DirectionsService(); //obtener coordenadas
    var dr = new google.maps.DirectionsRenderer(objDR); //traducir coordenadas

    //tabla de escalas
    var idTable = "#tableEscalas";

    createMarkers(map, idTable, function(markers){
        
        //inicializar cluster de markers
        var markerCluster = new MarkerClusterer(map, markers, {
            //imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
            imagePath: "images/m"
        });

        //guardar wayPoints
        var points = markers.slice(1, -1);
        var wayPoints = [];
        for(var i = 0; i < points.length; i++){
            var o = {
                location: {
                    lat: points[i].position.lat(),
                    lng: points[i].position.lng()
                },
                stopover: true
            }
            wayPoints.push(o);
        }

        console.log(wayPoints);

        //generar ruta
        var objDS = {
            origin: markers[0].position,
            destination: markers[markers.length-1].position,
            waypoints: wayPoints,
            optimizeWaypoints: true,
            provideRouteAlternatives: true,
            travelMode: "DRIVING"
        }
        ds.route(objDS, function(routes, status){
            if(status === "OK") {
                dr.setDirections(routes);
            } else {
                alert(status);
            }
            
        });

    });

}

//function para generar los markers
function createMarkers(map, idTable, fn){
    //obtener rutas de la tabla
    var routes = getRutas(idTable);
    var markers = [];

    //recorrer arreglo de rutas
    $.each(routes, function(index, val){
        //console.log(routes[index].lat+" aqui si "+ routes[index].lng+" n "+routes[index].nombre);
        
        //crear marcador
        var objMarker = {
            map: map,
            position: {
                //obtener posicion
                lat: routes[index].lat,
                lng: routes[index].lng
            }
        }
        var gMarker = new google.maps.Marker(objMarker);
        
        //set listener click
        var gInfoW = new google.maps.InfoWindow();

        google.maps.event.addListener(gMarker, "click", (function(gMarker){
            
            return function(){
                getAddress(gMarker, function(location){
                    
                    gInfoW.setContent("<div style='width:200px'><span>"+routes[index].nombre+"</span></div>");
                                        
                    //console.log(location);

                    gInfoW.close();
                    gInfoW.open(map, gMarker);
                    
                });

            }
            
        })(gMarker));

        //guardar marker
        markers.push(gMarker);
    });

    fn(markers);

}

//function para obtener las rutas de la tabla
function getRutas(idTable){
    var routes = [];

    if($(idTable+" tbody tr").length != 0) {

        //recorrer tabla de escalas
        $(idTable+" tbody tr").each(function(index){
            //redondear a 8
            var lat = round($(this).find("td").eq(2).text(), 8); //lat
            var lng = round($(this).find("td").eq(3).text(), 8); //lng
            var nombre = $(this).find("td").eq(4).text(); //nombre

            //guardar posicion
            //console.log("lat"+lat+"lng"+lng);
            var position = {lat: lat, lng: lng, nombre: nombre}
            routes.push(position);
        });

    }

    //console.log(routes);
    return routes;
}

//function para redondear
function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}  