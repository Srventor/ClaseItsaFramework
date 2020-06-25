var crudApp = new function() {

    // UNA COLECCIÓN DE OBJETOS JSON CON VALORES.
    this.myPlatos = [
        { ID: '1', Nombre_Plato: 'Arroz Pollo', Categoria: 'Desayuno', Valor: 500 },
        { ID: '2', Nombre_Plato: 'Pollo Frito', Categoria: 'Almuerzo', Valor: 56.00 },
        { ID: '3', Nombre_Plato: 'Pollo Guisado', Categoria: 'Cena', Valor: 210.40 },
        { ID: '4', Nombre_Plato: 'Popular Science', Categoria: 'Cena', Valor: 210.40 }

    ]

    this.Categoria = ['Desayuno', 'Almuerzo', 'Cena', 'Merienda'];
    this.col = [];

    this.createTable = function() {

        // VALOR EXTRACTO PARA LA TABLA
        for (var i = 0; i < this.myPlatos.length; i++) {
            for (var key in this.myPlatos[i]) {
                if (this.col.indexOf(key) === -1) {
                    this.col.push(key);
                }
            }
        }

        // CREAR TABLA
        var table = document.createElement('table');
        table.setAttribute('id', 'tablaComida'); // ENVIAR TABLA ID.

        var tr = table.insertRow(-1); // CREA UNA FILA (PARA EL CABECERO).

        for (var h = 0; h < this.col.length; h++) {
            // AGREGAR TABLA ARRIBA
            var th = document.createElement('th');
            th.innerHTML = this.col[h].replace('_', ' ');
            tr.appendChild(th);
        }

        // AGREGAR FILAS CON DATOS JSON.
        for (var i = 0; i < this.myPlatos.length; i++) {

            tr = table.insertRow(-1); // CREA UNA NUEVA FILA.

            for (var j = 0; j < this.col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = this.myPlatos[i][this.col[j]];
            }

            // CREAR Y AGREGAR DINÁMICAMENTE ELEMENTOS PARA TABLAR LAS CELDAS CON ACCIONES.

            this.td = document.createElement('td');

            // *** OPCCION CANCELAR.
            tr.appendChild(this.td);
            var lblCancelar = document.createElement('label');
            lblCancelar.innerHTML = '✖';
            lblCancelar.setAttribute('onclick', 'crudApp.Cancel(this)');
            lblCancelar.setAttribute('style', 'display:none;');
            lblCancelar.setAttribute('title', 'Cancelar');
            lblCancelar.setAttribute('id', 'lbl' + i);
            this.td.appendChild(lblCancelar);

            // *** GUARDAR.
            tr.appendChild(this.td);
            var btnGuardar = document.createElement('input');

            btnGuardar.setAttribute('type', 'button'); // SET ATTRIBUTES.
            btnGuardar.setAttribute('value', 'Guardar');
            btnGuardar.setAttribute('id', 'Guardar' + i);
            btnGuardar.setAttribute('style', 'display:none;');
            btnGuardar.setAttribute('onclick', 'crudApp.Guardar(this)'); // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btnGuardar);

            // *** Actualizar.
            tr.appendChild(this.td);
            var btnActualizar = document.createElement('input');

            btnActualizar.setAttribute('type', 'button'); // SET ATTRIBUTES.
            btnActualizar.setAttribute('value', 'Actualizar');
            btnActualizar.setAttribute('id', 'Editar' + i);
            btnActualizar.setAttribute('style', 'background-color:#44CCEB;');
            btnActualizar.setAttribute('onclick', 'crudApp.Actualizar(this)'); // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btnActualizar);

            // *** Borrar.
            this.td = document.createElement('th');
            tr.appendChild(this.td);
            var btnBorrar = document.createElement('input');
            btnBorrar.setAttribute('type', 'button'); // SET INPUT ATTRIBUTE.
            btnBorrar.setAttribute('value', 'Borrar');
            btnBorrar.setAttribute('style', 'background-color:#ED5650;');
            btnBorrar.setAttribute('onclick', 'crudApp.Borrar(this)'); // ADD THE BUTTON's 'onclick' EVENT.
            this.td.appendChild(btnBorrar);
        }

        // AGREGAR FINA AL FINAL CON INPUTS EN BLANCO Y PARA VOLVER A AÑADIR

        tr = table.insertRow(-1); // CREAR ULTIMA FILA

        for (var j = 0; j < this.col.length; j++) {
            var newCell = tr.insertCell(-1);
            if (j >= 1) {

                if (j == 2) { // AGREGAREMOS UNA LISTA DE DESPLEGAMIENTO EN LA SEGUNDA COLUMNA (PARA Categoria).

                    var select = document.createElement('select'); // CREAMOS Y AGREGAMOS UN DROPDOWN
                    select.innerHTML = '<option value=""></option>';
                    for (k = 0; k < this.Categoria.length; k++) {
                        select.innerHTML = select.innerHTML +
                            '<option value="' + this.Categoria[k] + '">' + this.Categoria[k] + '</option>';
                    }
                    newCell.appendChild(select);
                } else {
                    var tBox = document.createElement('input'); // CREAMOS Y AGREGAMOS UN TEXTBOX.
                    tBox.setAttribute('type', 'text');
                    tBox.setAttribute('value', '');
                    newCell.appendChild(tBox);
                }
            }
        }

        this.td = document.createElement('td');
        tr.appendChild(this.td);

        var btNew = document.createElement('input');

        btNew.setAttribute('type', 'button'); // SET ATTRIBUTES.
        btNew.setAttribute('value', 'Crear Pedido');
        btNew.setAttribute('id', 'New' + i);
        btNew.setAttribute('style', 'background-color:#207DD1;');
        btNew.setAttribute('onclick', 'crudApp.CreateNew(this)'); // AÑADIMOS EL BOTON ONCLICK PARA LOS EVENTOS
        this.td.appendChild(btNew);

        var div = document.getElementById('container');
        div.innerHTML = '';
        div.appendChild(table); // AGREGAMOS TABLA A LA PAGINA
    };

    // ****** INICIO

    // CANCELAR.
    this.Cancel = function(oButton) {

        // ESCONDER BOTON.
        oButton.setAttribute('style', 'display:none; float:none;');

        var activeRow = oButton.parentNode.parentNode.rowIndex;

        // ESCONDER EL BOTON DE GUARDADO.
        var btnGuardar = document.getElementById('Guardar' + (activeRow - 1));
        btnGuardar.setAttribute('style', 'display:none;');

        // MOSTRAR EL BOTON DE GUARDADO.
        var btnActualizar = document.getElementById('Editar' + (activeRow - 1));
        btnActualizar.setAttribute('style', 'display:block; margin:0 auto; background-color:#44CCEB;');

        var tab = document.getElementById('tablaComida').rows[activeRow];

        for (i = 0; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            td.innerHTML = this.myPlatos[(activeRow - 1)][this.col[i]];
        }
    }


    // EDITAR DATOS 
    this.Actualizar = function(oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('tablaComida').rows[activeRow];

        //  MOSTRAR EL SELECT O DROPDOWN
        for (i = 1; i < 4; i++) {
            if (i == 2) {
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('select'); // DROPDOWN .
                ele.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
                for (k = 0; k < this.Categoria.length; k++) {
                    ele.innerHTML = ele.innerHTML +
                        '<option value="' + this.Categoria[k] + '">' + this.Categoria[k] + '</option>';
                }
                td.innerText = '';
                td.appendChild(ele);
            } else {
                var td = tab.getElementsByTagName("td")[i];
                var ele = document.createElement('input'); // TEXTBOX.
                ele.setAttribute('type', 'text');
                ele.setAttribute('value', td.innerText);
                td.innerText = '';
                td.appendChild(ele);
            }
        }

        var lblCancelar = document.getElementById('lbl' + (activeRow - 1));
        lblCancelar.setAttribute('style', 'cursor:pointer; display:block; width:20px; float:left; position: absolute;');

        var btnGuardar = document.getElementById('Guardar' + (activeRow - 1));
        btnGuardar.setAttribute('style', 'display:block; margin-left:30px; float:left; background-color:#2DBF64;');

        // HIDE THIS BUTTON.
        oButton.setAttribute('style', 'display:none;');
    };


    // Borrar INFO.
    this.Borrar = function(oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        this.myPlatos.splice((activeRow - 1), 1); // Borrar THE ACTIVE ROW.
        this.createTable(); // REFRESH THE TABLE.
    };

    // Guardar INFO.
    this.Guardar = function(oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('tablaComida').rows[activeRow];

        // Actualizar myPlatos ARRAY CON VALORES.
        for (i = 1; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') { // CHECK IF ELEMENT IS A TEXTBOX OR SELECT.
                this.myPlatos[(activeRow - 1)][this.col[i]] = td.childNodes[0].value; // Guardar THE VALUE.
            }
        }
        this.createTable(); // ACTUALIZAR TABLA
    }

    // CREAR NUEVO 
    this.CreateNew = function(oButton) {
        var activeRow = oButton.parentNode.parentNode.rowIndex;
        var tab = document.getElementById('tablaComida').rows[activeRow];
        var obj = {};

        // AGREGAR UN NUEVO VALOR AL ARRAY myPlatos.
        for (i = 1; i < this.col.length; i++) {
            var td = tab.getElementsByTagName("td")[i];
            if (td.childNodes[0].getAttribute('type') == 'text' || td.childNodes[0].tagName == 'SELECT') { // CHECK IF ELEMENT IS A TEXTBOX OR SELECT.
                var txtVal = td.childNodes[0].value;
                if (txtVal != '') {
                    obj[this.col[i]] = txtVal.trim();
                } else {
                    obj = '';
                    alert('Todos los Campos son OBLIGATORIOS');
                    break;
                }
            }
        }
        obj[this.col[0]] = this.myPlatos.length + 1; // NEW ID.

        if (Object.keys(obj).length > 0) { // VERIFICA SI ESTA VACIO
            this.myPlatos.push(obj); // EMPUJA (AGREGA)  INFO AL JSON .
            this.createTable(); // ACTUALIZAR TABLA.
        }
    }

    // ****** FIN.
}

crudApp.createTable();