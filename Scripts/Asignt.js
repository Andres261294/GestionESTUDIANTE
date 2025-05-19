function getData() {
    return JSON.parse(localStorage.getItem("estudiantes")) || [];
}

function saveData(data) {
    localStorage.setItem("estudiantes", JSON.stringify(data));
}

function renderEstudiantes(filtro = "") {
    const data = getData();
    const tabla = document.getElementById("tabla-estudiantes");
    tabla.innerHTML = "";

    data.forEach((item, index) => {
        if (!item.asignatura.toLowerCase().includes(filtro.toLowerCase())) return;

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.nombre}</td>
          <td>${item.documento}</td>
          <td>
            <span id="asig-text-${index}">${item.asignatura}</span>
            <input type="text" id="asig-input-${index}" value="${item.asignatura}" style="display:none; width: 150px;">
            <button class="edit-button" onclick="editarAsignatura(${index})">Editar</button>
            <button class="save-button" onclick="guardarAsignatura(${index})" style="display:none;">Guardar</button>
          </td>
        `;
        tabla.appendChild(row);
    });
}

function editarAsignatura(index) {
    document.getElementById(`asig-text-${index}`).style.display = 'none';
    document.getElementById(`asig-input-${index}`).style.display = 'inline';
    document.querySelector(`#asig-input-${index} + .edit-button`).style.display = 'none';
    document.querySelector(`#asig-input-${index} + .edit-button + .save-button`).style.display = 'inline';
}

function guardarAsignatura(index) {
    const data = getData();
    const nuevoValor = document.getElementById(`asig-input-${index}`).value;
    data[index].asignatura = nuevoValor;
    saveData(data);
    renderEstudiantes(document.getElementById("busqueda").value);
}

function filtrarTabla() {
    renderEstudiantes(document.getElementById("busqueda").value);
}

renderEstudiantes();