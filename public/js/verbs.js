$().ready(function(){

    //inicializar
    function inicializar(){
        $.ajax({		
            method: "GET",
            url: "http://127.0.0.1:3000/api/verbs",
            dataType:"json",
        }).
        done(function(verbs){
            
                    $("#tablaVerbs").empty();

                    verbs.forEach(function(verb){
                        
                        var id = verb._id,
                                verbo = verb.verb || "null",
                                past = verb.past_tense || "null",
                                participle = verb.past_participle || "null",
                                topic = verb.topic || "null";
                                
                        var nuevaFila = document.createElement("tr");
                        
                        var columna_id = document.createElement("td");
                        columna_id.innerHTML="<a id="+id+" href='#'>"+id+"</a>";
                        var columna_verbo = document.createElement("td");
                        columna_verbo.innerHTML=verbo;
                        var columna_past = document.createElement("td");
                        columna_past.innerHTML=past;
                        var columna_participle = document.createElement("td");
                        columna_participle.innerHTML=participle;
                        var columna_topic = document.createElement("td");
                        columna_topic.innerHTML=topic;
                        
                        nuevaFila.appendChild(columna_id);
                        nuevaFila.appendChild(columna_verbo);
                        nuevaFila.appendChild(columna_past);
                        nuevaFila.appendChild(columna_participle);
                        nuevaFila.appendChild(columna_topic);
                        
                        var tabla = document.getElementById("tablaVerbs");
                        tabla.appendChild(nuevaFila);
                        
                        $("#"+id).on("click", function(){
                            $("#myVerbo").html($("#"+id).html());
                        })
                    })
                
        }).
        fail(function(err){
            console.log(err);
            mostrarMensaje();
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
    
    //obtener verbo
    $("#Obtener").on("click", function(){
        if($("#myVerbo").html()!==""){
            var id = $("#myVerbo").html()
           
            $.ajax({		
                method: "GET",
                url: "http://127.0.0.1:3000/api/verbs/"+id,
                dataType:"json",
            }).
            done(function(verb){
                
                var div = document.createElement("div");
                
                if(verb.verb) div.innerHTML += "<p> <b>Verb:</b> "+verb.verb+"</p>";
                if(verb.past_tense) div.innerHTML += "<p> <b>past_tense:</b> "+verb.past_tense+"</p>";
                if(verb.past_participle) div.innerHTML += "<p> <b>past_participle</b> "+verb.past_participle+"</p>";
                if(verb.topic) div.innerHTML += "<p> <b>topic:</b> "+verb.topic+"</p>";

                if(verb.examples){
                    div.innerHTML += "<br/><p><b> Examples :</b></p>"
                    verb.examples.forEach(function(example){
                        div.innerHTML += "<p> <b>Context:</b> "+example.context+"</p>";
                        div.innerHTML += "<p> <b>Example:</b> "+example.example+"</p>";
                        div.innerHTML += "<br/>";
                    });
                }

                $("#modal_contenido").append(div);
                $("#myModal").modal();
            }).
            fail(function(err){
                console.log(err);
                mostrarMensaje();
            });
        }
        else{
            mostrarMensaje()
        } 
    })

    $(".btnModal").on("click", function(){
        $("#modal_contenido").empty();
    })
   
    //crear verbo    
    $("#Crear").on("click", function(){
        $("#crearVerbo").modal();
    });

    $("#btnCrearOk").on("click", function(){
        var data = {
            verb: $('#verb').val(),
            past_tense: $('#past').val(),
            past_participle: $('#participle').val(),
            topic: $('#topic').val()
        };
         
        $.ajax({		
            method: "POST",
            url: "http://localhost:3000/api/verbs",
            data: data,
            dataType:"json",
        }).
        done(function(verbs){
            $('#crearVerbo').modal('hide')
            inicializar();
        }).
        fail(function(err){
            console.log(err);
            mostrarMensaje();
        });
    })

    //actualizar verbo
    $("#Actualizar").on("click", function(){
        if($("#myVerbo").html()!==""){
            $("#objId").html($("#myVerbo").html());
            $("#actulalizarVerbo").modal();
        }
        else mostrarMensaje()
    });

    $("#btnActOk").on("click", function(){
        var id = $("#myVerbo").html();

        var data = {};

        if($('#actverb').val()!="") data.verb = $('#actverb').val();
        if($('#actpast').val()!="") data.past_tense = $('#actpast').val();
        if($('#actparticiple').val()!="") data.past_participle = $('#actparticiple').val();
        if($('#actTopic').val()!="") data.topic = $('#actTopic').val();
         
        $.ajax({		
            method: "PUT",
            url: "http://localhost:3000/api/verbs/"+id,
            data: data,
            dataType:"json",
        }).
        done(function(verbs){
            $('#actulalizarVerbo').modal('hide')
            inicializar();
        }).
        fail(function(err){
            console.log(err);
            mostrarMensaje();
        });
    })

    //eliminar verbo
    $("#Eliminar").on("click", function(){
        if($("#myVerbo").html()!==""){
            var id = $("#myVerbo").html();
            
            $.ajax({		
                method: "DELETE",
                url: "http://127.0.0.1:3000/api/verbs/"+id
            }).
            done(function(verb){
                inicializar();
                $("#myVerbo").html("");
            }).
            fail(function(err){
                console.log(err);
                mostrarMensaje();
            });
        }
        else mostrarMensaje()
    });
    
    //crear ejemplo    
    $("#CrearExample").on("click", function(){
        if($("#myVerbo").html()!==""){
            $("#objId_Example").html($("#myVerbo").html());
            $("#crearEjemplo").modal();
        }
        else mostrarMensaje()
    });

    $("#btnExampleOk").on("click", function(){
        
        var data = {
            id: $("#myVerbo").html(),
            context: $('#context').val(),
            example: $('#example').val(),
        };
         
        $.ajax({		
            method: "POST",
            url: "http://localhost:3000/api/examples",
            data: data,
            dataType:"json",
        }).
        done(function(verbs){
            $('#crearEjemplo').modal('hide');
        }).
        fail(function(err){
            alert("fallo en crear verbo");
        });
    })
 
});