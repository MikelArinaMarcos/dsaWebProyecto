//	Hacer tienda online de informatica usando: HTML, CSS, JS
//	En el codigo javascript hay que hacer la base de datos de los productos con un vector por ejemplo...




//BASE DE DATOS
 var productos = ["Escudo", "Espada", "Arco", "Armadura", "Casco", "Escudo de Oro", "Lanza", "Poción de Vida", "Poción de Escudo"];
 var imgGrandes = ["../resources/items/shield.png", "../resources/items/sword.png", "../resources/items/bow.png", "../resources/items/armor.png", "../resources/items/upg_helmet.png", "../resources/items/upg_shield.png", "../resources/items/upg_spear.png", "../resources/items/potionRed.png", "../resources/items/potionBlue.png"];
 var imgPeque = ["../resources/items/shield.png", "../resources/items/sword.png", "../resources/items/bow.png", "../resources/items/armor.png", "../resources/items/upg_helmet.png", "../resources/items/upg_shield.png", "../resources/items/upg_spear.png", "../resources/items/potionRed.png", "../resources/items/potionBlue.png"];
 var precios = [5, 10, 15, 5, 5, 15, 15, 5, 5];
 var stock = [1, 1, 1, 1, 1, 1, 1, 10, 10];
 var precioTransporte = [0, 0, 0, "gratis"];
 var IVA = 0.21;
 var uniUser;



//JAVASCRIPT A EJECUTARSE UNA VEZ CARGADA LA PAGINA:
 window.onload = function(){


 //Se cargan los productos dentro del HTML de forna dinamica haciendo uso de los datos de la base de datos, como si de un PHP se tratase:
 var DIVS = document.getElementsByName("DIVS");
 for (i in productos){
 DIVS[i].innerHTML = '<a id="imgG'+i+'" href="' +imgGrandes[i]+ '"><img id="imgP'+i+'" class="imagen" src="' +imgPeque[i]+ '"></a><div class="etiquetas"><b><span id="pro'+i+'">' +productos[i]+ '</span>: <span id="pre'+i+'">' +precios[i]+ '€</span></b></div><div class="stock">Hay en stock <span id="uni'+i+'">' +stock[i]+ '</span> unidades,<br/>¿Cuantas quiere?: <input class="uniBien" type="number" id="uniUser'+i+'" name="uniUser" value="0" size="4" /></div>';
 }


 //Rellena el campo dia y año, de la fecha de nacimiento y tarjeta de credito:
 //Mas info en: http://www.tallerwebmaster.com/tutorial/mostrar-fecha-actual-con-javascrip/58/
 //Fecha de nacimiento
 var fecha = new Date();
 var anio = fecha.getFullYear();

 //Tarjeta de credito:
 for (var i=1;i<=12;i++){
 document.getElementById("mesTarjeta").innerHTML = document.getElementById("mesTarjeta").innerHTML + '<option value="' +i+ '">' +i+ '</option>';
 }

 for (var i=anio;i<=(anio+21);i++){
 document.getElementById("anioTarjeta").innerHTML = document.getElementById("anioTarjeta").innerHTML + '<option value="' +i+ '">' +i+ '</option>';
 }



 //Botones que llevaran a cabo la ejecucion de determinadas secuencias de codigo JavaScript:
 document.getElementById("botonTotal").onclick = validaLasUnidades;
 document.getElementById("botonPago").onclick = pideDatosPago;
 document.getElementById("botonConfirmar").onclick = validaDatosPago;
 }




 /*-------------------COMIENZAN LAS FUNCIONES-------------------*/




//FUNCION DE VALIDACION DE UNIDADES:
 function validaLasUnidades(elEvento) {

 var todoBien = true;
 uniUser = document.getElementsByName("uniUser");


 for (i in productos){

 if ( uniUser[i].value == "" || uniUser[i].value > stock[i] || uniUser[i].value < 0 ){

 todoBien = false;
 uniUser[i].className = "uniMal";

 //Modifica el css para quitar los formularios:
 document.getElementById("todo").className = "todoNo";
 document.getElementById("menu").className = "menuNo";
 document.getElementById("divZonaCompra").className = "divZonaCompraNo";
 document.getElementById("divTotal").className = "divsNo";
/**/ document.getElementById("divPago").className = "divsNo";



 //Con solo un error se para la validacion de unidades:
 return;
 }
 else{
 todoBien = true;
 uniUser[i].className = "uniBien";
 }
 }

 //Si no ha habido ni un solo error, se ejecuta la siguiente funcion que se encarga de cargar el carro de la compra:
 if (todoBien){
 calculaElTotal();
 }
 }




//FUNCION QUE MUSTRA EL CARRO DE LA COMPRA:
 function calculaElTotal(elEvento) {


 //Añade el encabezado de la tabla
 document.getElementById("tablaTotal").innerHTML = '<tr><td class="pro"><b>Producto</b></td><td class="uni"><b>Unidades</b></td><td class="preUni"><b>Precio Unidad</b></td><td class="preTotal"><b>Precio Total</b></td></tr>';


 //Inicializacion de las variables para esta funcion:
 var carroTotal = 0;
 var numProductos = 0;


 //Muestra el carrito de la compra
 for (i in productos){

 var tablaTotal = document.getElementById("tablaTotal").innerHTML;
 var preTotal = 0;


 //Cuenta el numero de productos para saber cuanto costara el transporte
 if (uniUser[i].value != 0){
 numProductos++;
 }


 if (uniUser[i].value != 0){

 //Modifica el css para hacer hueco a los formularios
 document.getElementById("todo").className = "todoSi";
 document.getElementById("menu").className = "menuSi";
 document.getElementById("divZonaCompra").className = "divZonaCompraSi";
 document.getElementById("divTotal").className = "divsSi";
/**/ document.getElementById("divDatos").className = "divsNo";
/**/ document.getElementById("divPago").className = "divsNo";

 //Habilita el boton de datos personales
 document.getElementById("botonPago").disabled = false;

 //Calcula el totalUnidades y rellena el carro de la compra
 preTotal = precios[i] * uniUser[i].value;
 carroTotal = carroTotal + preTotal;
 document.getElementById("tablaTotal").innerHTML = tablaTotal + '<tr class="proCarrito"><td>' +productos[i]+ '</td><td>' +uniUser[i].value+ '</td><td>' +precios[i]+ '</td><td id="preTotal' +i+'" name="preTotal">' +preTotal+ '</td></tr>';
 }
 }


 //Se calcula el transporte a pagar segun la cantidad de productos comprados:
 var precioTransporteAPagar;
 if (numProductos <= 2){
 precioTransporteAPagar = precioTransporte[0];
 }
 else if (numProductos <= 3){
 precioTransporteAPagar = precioTransporte[1];
 }
 else if (numProductos <= 4){
 precioTransporteAPagar = precioTransporte[2];
 }
 else if (numProductos >= 5){
 precioTransporteAPagar = precioTransporte[3];
 }

 //Se sacan las cuentas del transporte (si lo hubiese), del iva y el total:
 var totalTransporte = precioTransporteAPagar;
 if(totalTransporte == "gratis"){
 var totalIVA = (carroTotal * IVA);
 var totalAPagar = carroTotal + totalIVA;
 }
 else{
 var totalIVA = ((carroTotal + totalTransporte) * IVA);
 var totalAPagar = carroTotal + totalTransporte + totalIVA;
 }


 //Limitar a 2 los decimales a mostrar del IVA:
 totalIVA=totalIVA*100;
 totalIVA=Math.floor(totalIVA);
 totalIVA=totalIVA/100;
 //Limitar a 2 los decimales a mostrar del TOTAL A PAGAR:
 totalAPagar=totalAPagar*100;
 totalAPagar=Math.floor(totalAPagar);
 totalAPagar=totalAPagar/100;

 //Se añade a la tabla el TOTAL que suma el carrito:
 tablaTotal = document.getElementById("tablaTotal").innerHTML;
 document.getElementById("tablaTotal").innerHTML = tablaTotal + '<tr><td> </td> <td></td><td class="preUni"><b>Transporte: </b></td><td class="preTotal"><b>' +totalTransporte+ '</b></td></tr>' + '<tr><td> </td> <td></td><td class="preUni"><b>IVA ('+(IVA*100)+'%): </b></td><td class="preTotal"><b>' +totalIVA+ '</b></td></tr>' + '<tr><td> </td> <td></td><td class="preUni"><b>Total: </b></td><td class="preTotal" id="totalAPagar"><b>' +totalAPagar+ ' €</b></td></tr>';
 }


//FUNCION DE VALIDAR DATOS y PEDIR DATOS PAGO
 function pideDatosPago(elEvento) {
/**/ document.getElementById("divTotal").className = "divsSi";
 document.getElementById("divPago").className = "divsSi";
 document.getElementById("botonConfirmar").disabled = false;
 }




//FUNCION DE VALIDAR DATOS PAGO:
 function validaDatosPago(elEvento) {

 var todoBien = true;

 //Titular de la cuenta:
 var vTitular = document.getElementById("titular").value;
 if( vTitular == null || vTitular.length == 0 || /^\s+$/.test(vTitular) || !isNaN(vTitular)) {
 todoBien=false;
 document.getElementById("titular").className = "textMal";
 }
 else{
 document.getElementById("titular").className = "textBien";
 }


 //Tipo de tarjeta:
 var vTarjetas = document.getElementsByName("tarjetas");
 var seleccionado = false;
 for(var i=0; i<vTarjetas.length; i++) {
 if(vTarjetas[i].checked) {
 seleccionado = true;
 //break;
 }
 }
 if(!seleccionado) {
 todoBien=false;
 document.getElementById("alertTipoDeTarjeta").className = "alertTipoDeTarjeta";
 }
 else{
 document.getElementById("alertTipoDeTarjeta").className = "";
 }


 //Numero de tarjeta:
 var vNumeroTarjeta = document.getElementById("numeroTarjeta").value;
 if( vNumeroTarjeta.length!=16 || vNumeroTarjeta=="" || isNaN(vNumeroTarjeta) ) {
 todoBien=false;
 document.getElementById("numeroTarjeta").className = "textMal";
 }
 else{
 document.getElementById("numeroTarjeta").className = "textBien";
 }


 //CVV de la tarjeta:
 var vCvcTarjeta = document.getElementById("cvcTarjeta").value;
 if( vCvcTarjeta.length!=3 || vCvcTarjeta=="" || isNaN(vCvcTarjeta) ) {
 todoBien=false;
 document.getElementById("cvcTarjeta").className = "textMal";
 }
 else{
 document.getElementById("cvcTarjeta").className = "textBien";
 }


 //Fecha de tarjeta MES:
 var vMesTarjeta = document.getElementById("mesTarjeta").selectedIndex;
 if( vMesTarjeta == null || vMesTarjeta == 0 ) {
 todoBien=false;
 document.getElementById("mesTarjeta").className = "textMal";
 }
 else{
 document.getElementById("mesTarjeta").className = "textBien";
 }
 //Fecha de tarjeta AÑO:
 var vAnioTarjeta = document.getElementById("anioTarjeta").selectedIndex;
 if( vAnioTarjeta == null || vAnioTarjeta == 0 ) {
 todoBien=false;
 document.getElementById("anioTarjeta").className = "textMal";
 }
 else{
 document.getElementById("anioTarjeta").className = "textBien";
 }


 //Si no ha habido ni un solo error, se ejecuta la siguiente funcion que se encarga de enviar los datos:
 if (todoBien){
 validaDatosPagoYEnviaCarro();
 }
 }




//FUNCION DE VALIDAR DATOS PAGO y ENVIAR DATOS
 function validaDatosPagoYEnviaCarro(elEvento) {
 alert("Gracias por su compra, en 24 horas recibirá su pedido\nAhora será redirigido a la pagina de inicio.");
 window.location.reload()
 }