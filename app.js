// app.js
document.addEventListener("DOMContentLoaded", () => {
  const accordionContainer = document.getElementById("scheduleAccordion");
  const searchInput          = document.getElementById("searchInput");
  const printButton          = document.getElementById("printButton");
  const currentYearSpan      = document.getElementById("currentYear");

  /* ======  CRONOGRAMA Dr. José Lopez – 3er Año UCI ===== */
  const scheduleData = [
    {
      dia: "Lunes",
      fecha: "05/05/2025",
      hora: "Hora por definir",
      asignatura: "Choque hipovolémico: abordaje diagnóstico y terapéutico inicial",
      docente: "Dr. Delgado (Resp.) / Dr. José Lopez (Exp.)",
      sala: "Sala por definir",
    },
    {
      dia: "Miércoles",
      fecha: "07/05/2025",
      hora: "Hora por definir",
      asignatura: "Trauma craneoencefálico severo: abordaje inicial",
      docente: "Dr. Vanegas (Resp.) / Dr. José Lopez (Exp.)",
      sala: "Sala por definir",
    },
    {
      dia: "Lunes",
      fecha: "12/05/2025",
      hora: "Hora por definir",
      asignatura: "Trauma raquimedular: abordaje inicial",
      docente: "Dr. Gustavo Espinoza (Resp.) / Dr. José Lopez (Exp.)",
      sala: "Sala por definir",
    },
    {
      dia: "Miércoles",
      fecha: "14/05/2025",
      hora: "Hora por definir",
      asignatura: "Trauma de tórax: abordaje inicial",
      docente: "Dr. Berman Mendoza (Resp.) / Dr. José Lopez (Exp.)",
      sala: "Sala por definir",
    },
    {
      dia: "Lunes",
      fecha: "19/05/2025",
      hora: "Hora por definir",
      asignatura: "Trauma abdominal y pélvico: abordaje inicial",
      docente: "Dr. Mauricio Manzanarez (Resp.) / Dr. José Lopez (Exp.)",
      sala: "Sala por definir",
    },
    {
      dia: "Miércoles",
      fecha: "21/05/2025",
      hora: "Hora por definir",
      asignatura: "Trauma osteomuscular severo: abordaje inicial",
      docente: "Dr. Yader Altamirano (Resp.) / Dr. José Lopez (Exp.)",
      sala: "Sala por definir",
    },
    {
      dia: "Lunes",
      fecha: "26/05/2025",
      hora: "Hora por definir",
      asignatura: "Quemaduras: abordaje diagnóstico y terapéutico inicial",
      docente: "Dr. Delgado (2.ª ses.) / Dr. José Lopez (Exp.)",
      sala: "Sala por definir",
    },
  ];
  /* ====================================================== */

  // Orden deseado de los días
  const daysOrder = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  /* =========  FUNCIONES  ========= */

  // Agrupa los eventos por día
  const groupByDay = (data) =>
    data.reduce((acc, cls) => {
      (acc[cls.dia] = acc[cls.dia] || []).push(cls);
      return acc;
    }, {});

  // Pinta el acordeón
  const renderSchedule = (data) => {
    const grouped      = groupByDay(data);
    accordionContainer.innerHTML = "";

    if (!Object.keys(grouped).length) {
      accordionContainer.innerHTML = `
        <div class="alert alert-warning text-center" role="alert">
          No se encontraron eventos…
        </div>`;
      return;
    }

    let first = true;

    daysOrder.forEach((day) => {
      if (!grouped[day]) return;

      const dayId       = `day-${day.replace(/\W/g, "")}`;
      const isShown     = first ? "show"       : "";
      const isCollapsed = first ? ""           : "collapsed";
      const expanded    = first ? "true"       : "false";
      first = false;

      accordionContainer.innerHTML += `
        <div class="accordion-item">
          <h2 class="accordion-header" id="heading-${dayId}">
            <button class="accordion-button ${isCollapsed}" type="button"
                    data-bs-toggle="collapse" data-bs-target="#collapse-${dayId}"
                    aria-expanded="${expanded}" aria-controls="collapse-${dayId}">
              ${day}
              <span class="badge bg-secondary ms-2">${grouped[day].length}</span>
            </button>
          </h2>

          <div id="collapse-${dayId}" class="accordion-collapse collapse ${isShown}"
               aria-labelledby="heading-${dayId}" data-bs-parent="#scheduleAccordion">
            <div class="accordion-body">
              <div class="table-responsive">
                <table class="table table-striped table-hover schedule-table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Tema</th>
                      <th>Responsables</th>
                      <th>Sala</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${grouped[day]
                      .map(
                        (c) => `
                      <tr>
                        <td>${c.fecha}</td>
                        <td>${c.hora}</td>
                        <td>${c.asignatura}</td>
                        <td>${c.docente}</td>
                        <td>${c.sala}</td>
                      </tr>`
                      )
                      .join("")}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>`;
    });
  };

  // Búsqueda dinámica
  const filterSchedule = () => {
    const q = searchInput.value.toLowerCase();
    const filtered = scheduleData.filter(
      (c) =>
        c.asignatura.toLowerCase().includes(q) ||
        c.docente.toLowerCase().includes(q)    ||
        c.fecha.includes(q)                    ||
        c.dia.toLowerCase().includes(q)
    );
    renderSchedule(filtered);
  };

  // Imprimir
  const printSchedule = () => window.print();

  /* =========  EVENTOS  ========= */
  searchInput.addEventListener("input", filterSchedule);
  printButton.addEventListener("click", printSchedule);

  /* =========  INICIO  ========= */
  if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();
  renderSchedule(scheduleData);
});
