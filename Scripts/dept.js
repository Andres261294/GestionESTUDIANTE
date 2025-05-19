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
        if (!item.departamento.toLowerCase().includes(filtro.toLowerCase())) return;

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.nombre}</td>
          <td>${item.documento}</td>
          <td>
            <span id="dep-text-${index}">${item.departamento}</span>
            <input type="text" id="dep-input-${index}" value="${item.departamento}" style="display:none; width: 150px;">
            <button class="edit-button" onclick="editarDepartamento(${index})">Editar</button>
            <button class="save-button" onclick="guardarDepartamento(${index})" style="display:none;">Guardar</button>
          </td>
        `;
        tabla.appendChild(row);
    });
}

function editarDepartamento(index) {
    document.getElementById(`dep-text-${index}`).style.display = 'none';
    document.getElementById(`dep-input-${index}`).style.display = 'inline';
    document.querySelector(`#dep-input-${index} + .edit-button`).style.display = 'none';
    document.querySelector(`#dep-input-${index} + .edit-button + .save-button`).style.display = 'inline';
}

function guardarDepartamento(index) {
    const data = getData();
    const nuevoValor = document.getElementById(`dep-input-${index}`).value;
    data[index].departamento = nuevoValor;
    saveData(data);
    renderEstudiantes(document.getElementById("busqueda").value);
}

function filtrarTabla() {
    renderEstudiantes(document.getElementById("busqueda").value);
}

renderEstudiantes();