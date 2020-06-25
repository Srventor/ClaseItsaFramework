var selectedRow = null

function onFormsubmit(){
    if (validate()) 
        var infoForm = leerInfoForm();
            if(selectedRow == null)
        ingresarNuevoDato(infoForm);
        else
            actualizarDatos(infoForm);    
        borrarForm();
    
      
}

function leerInfoForm(){
    var infoForm={};
    infoForm ["id"]= document.getElementById("id").value;
    infoForm ["nombre"]= document.getElementById("nombre").value;
    infoForm ["precio"]= document.getElementById("precio").value;
    infoForm ["descripcion"]= document.getElementById("desc").value;
    return infoForm;
}

function ingresarNuevoDato(info){
    var tabla = document.getElementById("listaPlatos").getElementsByTagName('tbody')[0];
    var nuevaFila = tabla.insertRow(tabla.lenght);

    cell1 = nuevaFila.insertCell(0);
    cell1.innerHTML = info.id;

    cell2 = nuevaFila.insertCell(1);
    cell2.innerHTML = info.nombre;

    cell3 = nuevaFila.insertCell(2);
    cell3.innerHTML = info.precio;

    cell4 = nuevaFila.insertCell(3);
    cell4.innerHTML = info.descripcion;
    
    cell4 = nuevaFila.insertCell(4);
    cell4.innerHTML =   `<a onClick="onEdit(this)">Edit</a>
    <a onClick="onDelete(this)">Delete</a>`;
}


function borrarForm() {
    document.getElementById("id").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("desc").value = "";
    selectedRow = null;
}

function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById("id").value = selectedRow.cells[0].innerHTML;
    document.getElementById("nombre").value = selectedRow.cells[1].innerHTML;
    document.getElementById("precio").value = selectedRow.cells[2].innerHTML;
    document.getElementById("desc").value = selectedRow.cells[3].innerHTML;

}



function actualizarDatos(infoForm) {
    selectedRow.cells[0].innerHTML = infoForm.id;
    selectedRow.cells[1].innerHTML = infoForm.nombre;
    selectedRow.cells[2].innerHTML = infoForm.precio;
    selectedRow.cells[3].innerHTML = infoForm.descripcion;
    
}

function onDelete(td){

    if (confirm('Estas seguro de esto? si lo borras perderas la informacion, asi como la perdiste a ella..')){
        
        row = td.parentElement.parentElement;
        document.getElementById("listaPlatos").deleteRow(row.rowIndex);
        borrarForm();
    }


}

function validate() {
    isValid = true;
    if (document.getElementById("id").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}