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
        if (!item.asistencia.toLowerCase().includes(filtro.toLowerCase())) return;

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.nombre}</td>
          <td>${item.documento}</td>
          <td>
            <span id="asis-text-${index}">${item.asistencia}</span>
            <select id="asis-select-${index}" style="display:none;">
              <option value="1">Asistió</option>
              <option value="0">No asistió</option>
              <option value="r">Retardo</option>
            </select>
            <button class="edit-button" onclick="editarAsistencia(${index})">Editar</button>
            <button class="save-button" onclick="guardarAsistencia(${index})" style="display:none;">Guardar</button>
          </td>
        `;
        tabla.appendChild(row);
    });
}

function editarAsistencia(index) {
    document.getElementById(`asis-text-${index}`).style.display = 'none';
    document.getElementById(`asis-select-${index}`).style.display = 'inline';
    document.querySelector(`#asis-select-${index} + .edit-button`).style.display = 'none';
    document.querySelector(`#asis-select-${index} + .edit-button + .save-button`).style.display = 'inline';
}

function guardarAsistencia(index) {
    const data = getData();
    const nuevoValor = document.getElementById(`asis-select-${index}`).value;
    data[index].asistencia = nuevoValor;
    saveData(data);
    renderEstudiantes(document.getElementById("busqueda").value);
}

function filtrarTabla() {
    renderEstudiantes(document.getElementById("busqueda").value);
}

renderEstudiantes();