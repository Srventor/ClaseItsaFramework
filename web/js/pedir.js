var selectedRow = null

function onFormsubmit() {

    var infoForm = leerInfoForm();



    if (selectedRow == null)
        ingresarNuevoDato(infoForm);

    else

        borrarForm();



}

function leerInfoForm() {


    var infoForm = {};
    //var e = document.getElementById("selectPlato");


    infoForm["selectPlato"] = document.getElementById("selectPlato").value;
    infoForm["selectSize"] = document.getElementById("selectSize").value;
    infoForm["direccion"] = document.getElementById("direccion").value;
    infoForm["cantidad"] = document.getElementById("cantidad").value;
    infoForm["valorTotal"] = document.getElementById('valorTotal').value;
    return infoForm;

}

function multi() {
    m1 = document.getElementById("selectSize").value;
    m2 = document.getElementById("cantidad").value;
    m3 = document.getElementById("propina").value;

    r = parseFloat(m1) * parseFloat(m2);
    t = parseFloat(r) + parseFloat(m3);

    document.getElementById('valorTotal').innerHTML = t;
}



function ingresarNuevoDato(info) {
    var tabla = document.getElementById("listaPedidos").getElementsByTagName('tbody')[0];
    var nuevaFila = tabla.insertRow(tabla.lenght);

    cell1 = nuevaFila.insertCell(0);
    cell1.innerHTML = info.selectPlato;

    cell2 = nuevaFila.insertCell(1);
    cell2.innerHTML = info.cantidad;

    cell3 = nuevaFila.insertCell(2);
    cell3.innerHTML = info.direccion;

    cell4 = nuevaFila.insertCell(3);
    cell4.innerHTML = info.valortotal;
    cell4 = nuevaFila.insertCell(4);
    cell4.innerHTML = `<a onClick="onDelete(this)">Cancelar Pedido</a>`;


}


function borrarForm() {
    document.getElementById("selectPlato").value = "";
    document.getElementById("cantidad").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("valorTotal").value = "";
    selectedRow = null;
}



function onDelete(td) {

    if (confirm('Estas seguro de esto? si lo borras perderas la informacion, asi como la perdiste a ella..')) {

        row = td.parentElement.parentElement;
        document.getElementById("listaPedidos").deleteRow(row.rowIndex);
        borrarForm();
    }


}

function validate() {
    isValid = true;
    if (document.getElementById("total").value == "") {
        isValid = false;
        // document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}