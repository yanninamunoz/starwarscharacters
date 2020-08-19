// Array con los id de los personajes marcados como favoritos
var arrayFavoritos = [];

// Ready se dispara cuando se termino de cargar la pagina
$(document).ready(function(){
        
    // Llamada ajax para obtener el listado de personajes
    //todos los personajes, como no le paso id me trae todo, si le agrego un numero me trae el de ese personaje
    $.ajax({
        url: "https://swapi.dev/api/people/",
        cache: false
    })
    .done(function( data ) {
        
        /* 
        En la respuesta viene dentro de results los personajes
        Recorro los results con un for, voy agregando li dentro de la lista de personajes
        */
        for (var i = 0; i < data.results.length; i+=1) {
            $( "#personajes" ).append( "<li id='" + i + "' ><h2>" + data.results[i].name + "</h2><i id='" + i + "' class='far fa-star'></i><p>" + data.results[i].gender + " | Birth date: " + data.results[i].birth_year + "</p></li>" );
        }

        /* Evento de click en las estrellitas  */
        $("#personajes i").on('click',function(){
            
            /* Si tiene la clase far (estrellita sin relleno) */
            if($(this).hasClass('far'))
            {
                /* Agrego el id en el array y cambio el clas por fas que es la que tiene relleno */
                arrayFavoritos.push($(this).attr("id"));
                $(this).removeClass("far");
                $(this).addClass("fas");
            }else
            {
                /* Busco el id en el array y luego lo elimino */
                var index = arrayFavoritos.indexOf($(this).attr("id"));
                if (index > -1) {
                    arrayFavoritos.splice(index,1);
                 }
                 /* le vuelvo a cambiar la clase para que quede sin relleno */
                $(this).removeClass("fas");
                $(this).addClass("far");
            }
        })

        /* Evento para ampliar datos del personaje */
        $("li h2").on('click',function()
        {         
            $('#volver').css('display','inherit');
            $('#favoritos').css('display','none');
            $("#personaje-ampliado").html("");

            /* vuelve a dejar visibles todos los personajes */
            $("#personaje-ampliado").css("display","inherit");
            $("#personajes").css("display","none");


            //aca traigo al personaje, puedo agregarlo o no id
            //this es el titulo h2, pero no tengo el id. Lo puse en li entonces necesito
            //moverme un lugar para atras, para eso uso .parent
            var id = parseInt($(this).parent().attr("id")) + 1;
            $.ajax({
                url: "https://swapi.dev/api/people/" + id,
                cache: false
            })
            .done(function( data ) {
                $("#personaje-ampliado").html(
                    '<h2>' + data.name + '</h2><i id="' + (id - 1) + '" class="far fa-star"></i><p>' + data.gender + '<br>Birth date: ' + data.birth_year + '<br>Height: ' + data.height + ' | Mass: ' + data.mass + '</p>'
                );
                    
                var index = arrayFavoritos.indexOf( (id - 1).toString());
                if (index > -1) {
                    
                    $("#personaje-ampliado i").removeClass("far");
                    $("#personaje-ampliado i").addClass("fas");
                 }
                
                /* Evento de click en las estrellitas  */
                $("#personaje-ampliado i").on('click',function(){
                    
                    /* Si tiene la clase far (estrellita sin relleno) */
                    if($(this).hasClass('far'))
                    {
                        /* Agrego el id en el array y cambio el clas por fas que es la que tiene relleno */
                        arrayFavoritos.push($(this).attr("id"));
                        $(this).removeClass("far");
                        $(this).addClass("fas");

                        $("#personajes i#" + $(this).attr("id")).removeClass("far");
                        $("#personajes i#" + $(this).attr("id")).addClass("fas");
                    }else
                    {
                        /* Busco el id en el array y luego lo elimino */
                        var index = arrayFavoritos.indexOf($(this).attr("id"));
                        if (index > -1) {
                            arrayFavoritos.splice(index,1);
                        }
                        /* le vuelvo a cambiar la clase para que quede sin relleno */
                        $(this).removeClass("fas");
                        $(this).addClass("far");
                        $("#personajes i#" + $(this).attr("id")).removeClass("fas");
                        $("#personajes i#" + $(this).attr("id")).addClass("far");
                    }
                })
            })
        })
    });



    /* Evento en el boton filtrar favoritos */
    $("#favoritos").on('click',function()
    {
        if($(this).hasClass('active'))
        {
            $(this).removeClass('active');
            $("#personajes li").css("display","inherit");
        }else
        {
            $(this).addClass('active');
            /* oculta todos los personajes */
            $("#personajes li").css("display","none");
                
            /* recorro los id en favoritos y vuelvo a dejarlos visibles */
            for (var i = 0; i < arrayFavoritos.length; i+=1) 
            {
                $( "#" + arrayFavoritos[i] ).css("display","inherit");
            }
        }
        
    })

    /* Evento en el boton volver */
    $("#volver").on('click',function()
    {         
        $(this).css('display','none'); 
        $('#favoritos').css('display','inherit');
        
        /* vuelve a dejar visibles todos los personajes */
        $("#personaje-ampliado").css("display","none");
        $("#personajes").css("display","inherit");
        $("#personajes li").css("display","inherit");
    })

});