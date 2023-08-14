var traverseDomAndCollectElements = function (matchFunctionMaker, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ

  if(matchFunctionMaker(startEl)) resultSet.push(startEl); //si el primer elemento matchea colocarlo en el array

  for(let i = 0; i < startEl.children.length; i++){//recorre los hijos de body que es el primer element
   let result = traverseDomAndCollectElements(matchFunctionMaker, startEl.children[i])
   resultSet = [...resultSet, ...result]
  }
  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag

var selectorTypeMatcher = function (selector) {
  // tu código aquí
  if (selector[0] === '#') return "id"; //si selector en su posición 0 es igual a # retornar "id".
  if (selector[0] === '.') return "class";
  if (selector.split('.').length > 1) return "tag.class" //split hace un recorrido y tiene que ser mayor a 1 osea dos en este caso tag = 1 + class =1.
  return 'tag';
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;

  if (selectorType === "id") {
    matchFunction = (element) => `#${element.id}` === selector; //element es un obj, entonces entro para ver su propiedad id y lo comparo con el selector

  } else if (selectorType === "class") { //las etiquetas pueden tener varias clases pero van todas juntas. Ej."class= hola buenos dias" cuemta como tres clases.
    matchFunction = (element) => { //si hay mas de una clase, pido al elemento sus clases dentro del array classes. ClassList es un metodo de DOM API
      let classes = element.classList;
  
      // for(let i = 0; i< classes.length; i++){
      //   if(`.${classes[i]}` === selector) return true//si alguna de las clases coincide con el selector return true, si ninguna coincide return false.
      // }
      // return false

      //.contains de ECMAScript6: Devuelve un valor que indica si un carácter especificado aparece dentro de esta cadena.
      return classes.contains(selector.slice(1))// slice devuelve una copia desde la posición que se indica.
    }

  } else if (selectorType === "tag.class") { //destructuring, recursión + clousure
    matchFunction = (element) => {
      const [tag, className] = selector.split('.') // split: división de cadenas de textos (string) empleando un separador que puede ser solo un carácter, otra cadena o una expresión regular
     return matchFunctionMaker(tag)(element) && matchFunctionMaker(`.${className}`)(element) //parametro tag para la función padre y parametro element para la función hijo
    }
  } else if (selectorType === "tag") {
    matchFunction = (element) => element.tagName.toLowerCase() === selector;//tagName devuelve un string con el nombre del elemento, pero en mayusculas y yo lo necesito en minusculas.
  }
  return matchFunction;
};

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
