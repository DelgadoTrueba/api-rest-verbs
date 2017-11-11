$().ready(function(){

    //inicializar
    function inicializar(){
        $.ajax({		
            method: "GET",
            url: "http://127.0.0.1:3000/api/examples",
            dataType:"json",
        }).
        done(function(examples){
            
                    $("#tablaExamples").empty();

                    examples.forEach(function(example){
                        
                        var id = example._id,
                                verbo = example.verbId.verb ,
                                verboId = example.verbId._id ,
                                context = example.context;
                                
                        var nuevaFila = document.createElement("tr");
                        
                        var columna_id = document.createElement("td");
                        columna_id.innerHTML="<a id="+id+" href='#'>"+id+"</a>";
                        var columna_verbo = document.createElement("td");
                        columna_verbo.innerHTML=verbo;
                        var columna_verbo_id = document.createElement("td");
                        columna_verbo_id.innerHTML=verboId;
                        var columna_context = document.createElement("td");
                        columna_context.innerHTML=context;
                              
                        nuevaFila.appendChild(columna_verbo);
                        nuevaFila.appendChild(columna_verbo_id);
                        nuevaFila.appendChild(columna_id);
                        nuevaFila.appendChild(columna_context);
                   
                        var tabla = document.getElementById("tablaExamples");
                        tabla.appendChild(nuevaFila);
                        
                        $("#"+id).on("click", function(){
                            $("#myEjemplo").html($("#"+id).html());
                        })
                    })
                
        }).
        fail(function(err){
            console.error(err);
        });
    }

    function mostrarMensaje(){
        //mostrar mensaje
        $('.alert').show();
        //quitar mensaje
        setTimeout(function() {
            $("#info").css("display","none");
        }, 2000);
    }

    inicializar();


    //obtener ejemplo
    $("#Obtener").on("click", function(){
        if($("#myEjemplo").html()!==""){
            var id = $("#myEjemplo").html();
           
            $.ajax({		
                method: "GET",
                url: "http://127.0.0.1:3000/api/examples/"+id,
                dataType:"json"
            }).
            done(function(example){
                
                var div = document.createElement("div");
                
                if(example.context) div.innerHTML += "<p> <b>Context:</b> "+example.context+"</p>";
                if(example.example) div.innerHTML += "<p> <b>Example:</b> "+example.example+"</p>";
               
                $("#modal_contenido").append(div);
                $("#myModal").modal();
            }).
            fail(function(err){
                console.error(err);
                mostrarMensaje();
            });
        }
        else mostrarMensaje();
    })

    $(".btnModal").on("click", function(){
        $("#modal_contenido").empty();
    })

    //actualizar ejemplo    
    $("#Actualizar").on("click", function(){
        if($("#myEjemplo").html()!==""){
            $("#ExampleId").html($("#myEjemplo").html());
            $("#actEjemplo").modal();
        }
        else mostrarMensaje();
    });

    $("#btnExample").on("click", function(){
        var data = {},
            id = $("#myEjemplo").html();

        if($("#contextExample").val()!="") data.context = $('#contextExample').val();
        if($("#exampleExample").val()!="") data.example = $('#exampleExample').val();
         
        $.ajax({		
            method: "PUT",
            url: "http://localhost:3000/api/examples/"+id,
            data: data,
            dataType:"json"
        }).
        done(function(verbs){
            $('#actEjemplo').modal('hide');
            inicializar();
        }).
        fail(function(err){
            console.log(err);
            mostrarMensaje();
        });
        
    })

    //eliminar ejemplo
    $("#Eliminar").on("click", function(){
        if($("#myEjemplo").html()!==""){
            var id = $("#myEjemplo").html();
            
            $.ajax({		
                method: "DELETE",
                url: "http://127.0.0.1:3000/api/examples/"+id
            }).
            done(function(verb){
                inicializar();
                $("#myEjemplo").html("");
            }).
            fail(function(err){
                console.log(err);
                mostrarMensaje();
            });
        }
        else mostrarMensaje();
    });

});