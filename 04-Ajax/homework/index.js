//ocultar imagen
 let img = $('img');
 img.hide(); //método de jquery.
 
//constantes
const [boton] = $('#boton');
const [search] = $('#search');
const [input] = $('#input');
const [btnDelete] = $('#delete');
const url = 'http://localhost:5000/amigos';

const listFriends = (response) => {
  const [lista] = $('#lista');  
    response.forEach((friend) => {//recorrer a cada amigo.
        const newLi = document.createElement('li')
        newLi.innerText = friend.name
        lista.appendChild(newLi);
    });
}

//funciones
const showFriends = () => {
    $('#lista').empty(); //limpia la lista, no la borra realmente, empty es un método de array.
    $.get( url, listFriends) //le paso los parámetros necesarios: ruta, callback y datos.
}

const searchFriend = () => {
    const [input] = $('#input');
    const id = input.value; //id va a ser el número que yo busque.
    input.value = ''; //limpiar el input después de buscar.

    $.get(`${url}/${id}`, (response)  => {//concatenar.
        const [amigo] = $('#amigo');
        amigo.innerText = response.name;
    } )
}

const deleteFRiend = () => {
    const [inputDelete] = $('#inputDelete');
    const id = inputDelete.value;
    inputDelete.value = '';

    $.ajax({
        type: 'DELETE',
        url: `${url}/${id}`,
        success: (response) => {listFriends(response)
        const [success] = $('#success')
        success.innerText = "Tu amigo ha sigo borrado con éxito.";    
    }
    })

}

/*
//se utiliza $.ajax(), a la cual se le pasa un objeto {}, con la información
$.ajax({
    type:"POST", // la variable type guarda el tipo de la peticion GET,POST,..
    url:"http://ruta", //url guarda la ruta hacia donde se hace la peticion
    data:{nombre:"pepe",edad:10}, // data recive un objeto con la informacion que se enviara al servidor
    success:function(datos){ //success es una funcion que se utiliza si el servidor retorna informacion
         console.log(datos.promedio)
     },
    dataType: dataType // El tipo de datos esperados del servidor. Valor predeterminado: Intelligent Guess (xml, json, script, text, html).
})
*/

//eventos
boton.addEventListener('click', showFriends)
search.addEventListener('click', searchFriend)
btnDelete.addEventListener('click', deleteFRiend )
