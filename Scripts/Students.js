const form = document.getElementById("form-estudiante");
const inputBusqueda = document.getElementById("busqueda");
let editIndex = null;

function mostrarFormulario() {
    form.style.display = "block";
    form.scrollIntoView({ behavior: 'smooth' });
}

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
        if (!item.nombre.toLowerCase().includes(filtro.toLowerCase())) return;

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.nombre}</td>
          <td>${item.tipoDoc}</td>
          <td>${item.documento}</td>
          <td>${item.departamento}</td>
          <td>${item.codigo}</td>
          <td>${item.grupo}</td>
          <td>${item.semestre}</td>
          <td>${item.asignatura}</td>
          <td>${item.fecha}</td>
          <td>${formatearAsistencia(item.asistencia)}</td>
          <td>
            <button onclick="editarEstudiante(${index})">Editar</button>
            <button onclick="eliminarEstudiante(${index})">Eliminar</button>
          </td>
        `;
        tabla.appendChild(row);
    });
}

function formatearAsistencia(valor) {
    switch (valor) {
        case "1": return "Asistió";
        case "r": return "Retardo";
        default: return "No asistió";
    }
}

function filtrarTabla() {
    renderEstudiantes(inputBusqueda.value);
}

function editarEstudiante(index) {
    const data = getData();
    const est = data[index];
    document.getElementById("nombre").value = est.nombre;
    document.getElementById("tipoDoc").value = est.tipoDoc;
    document.getElementById("documento").value = est.documento;
    document.getElementById("departamento").value = est.departamento;
    document.getElementById("codigo").value = est.codigo;
    document.getElementById("grupo").value = est.grupo;
    document.getElementById("semestre").value = est.semestre;
    document.getElementById("asignatura").value = est.asignatura;
    document.getElementById("fecha").value = est.fecha;
    document.getElementById("asistencia").value = est.asistencia;
    editIndex = index;
    mostrarFormulario();
}

function eliminarEstudiante(index) {
    const data = getData();
    data.splice(index, 1);
    saveData(data);
    renderEstudiantes(inputBusqueda.value);
}

form.onsubmit = function (e) {
    e.preventDefault();
    const data = getData();
    const nuevo = {
        nombre: document.getElementById("nombre").value,
        tipoDoc: document.getElementById("tipoDoc").value,
        documento: document.getElementById("documento").value,
        departamento: document.getElementById("departamento").value,
        codigo: document.getElementById("codigo").value,
        grupo: document.getElementById("grupo").value,
        semestre: document.getElementById("semestre").value,
        asignatura: document.getElementById("asignatura").value,
        fecha: document.getElementById("fecha").value,
        asistencia: document.getElementById("asistencia").value
    };
    if (editIndex === null) {
        data.push(nuevo);
    } else {
        data[editIndex] = nuevo;
        editIndex = null;
    }
    saveData(data);
    form.reset();
    form.style.display = "none";
    renderEstudiantes(inputBusqueda.value);
}

renderEstudiantes();