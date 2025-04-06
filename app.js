document.addEventListener("DOMContentLoaded", function () {
  const texto = document.getElementById("texto-marquee");
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  let mostrarCelsius = true;
  let mostrarFechas = true;

  function diasFaltantes(fecha) {
    const hoy = new Date();
    const objetivo = new Date(fecha);
    const diff = Math.ceil((objetivo - hoy) / (1000 * 60 * 60 * 24));
    return diff;
  }

  function eventoNarrativo(descripcion, inicio, fin, emoji) {
    const hoy = new Date();
    const fechaInicio = new Date(inicio);
    const fechaFin = new Date(fin);
    const mismoMes = hoy.getMonth() === fechaFin.getMonth() && hoy.getFullYear() === fechaFin.getFullYear();
    if (hoy > fechaFin && !mismoMes) return null;

    const dias = hoy < fechaInicio ? diasFaltantes(inicio) : diasFaltantes(fin);
    const cambio = hoy < fechaInicio ? `Inicia ${dias} días` : `Finaliza ${dias} días`;

    return {
      nombre: `${emoji} ${descripcion}`,
      fechaInicio: `${formatoFechas(inicio, fin)}`,
      fechaFinaliza: cambio
    };
  }

  function formatoFechas(inicio, fin) {
    const fechaInicio = new Date(inicio);
    const fechaFin = new Date(fin);
    const opciones = { day: "numeric", month: "short" };
    const inicioTexto = fechaInicio.toLocaleDateString("es-MX", opciones);
    const finTexto = fechaFin.toLocaleDateString("es-MX", opciones);
    
    // Devolver el formato sin paréntesis y con meses en formato abreviado
    return `${inicioTexto.split(' ')[0]} ${inicioTexto.split(' ')[1].toUpperCase()}/${finTexto.split(' ')[0]} ${finTexto.split(' ')[1].toUpperCase()}`;
  }

  let descripcionEstacion = "";
  let eventos = [];

  // Primavera
  if (month >= 2 && month <= 4) {
    descripcionEstacion = `🌸 En Primavera, de marzo a mayo, las temperaturas promedio oscilan entre 14°C y 30°C.`;
    eventos = [
      eventoNarrativo("Liberación de tortugas", `${year}-08-01`, `${year}-12-31`, "🐢"),
      eventoNarrativo("Avistamiento de ballenas", `${year}-12-15`, `${year + 1}-04-15`, "🐋"),
      eventoNarrativo("Avistamiento de tiburón ballena", `${year}-10-01`, `${year + 1}-04-30`, "🦈"),
      eventoNarrativo("Avistamiento de delfines", `${year}-10-01`, `${year}-03-31`, "🐬")
    ];
  }
  // Verano
  else if (month >= 5 && month <= 7) {
    descripcionEstacion = `☀️ En Verano, de junio a agosto, las temperaturas promedio oscilan entre 28°C y 38°C.`;
    eventos = [
      eventoNarrativo("Avistamiento de Mobulas", `${year}-05-01`, `${year}-07-31`, "🪸"),
      eventoNarrativo("Anidación de tortugas", `${year}-07-01`, `${year}-09-30`, "🐢")
    ];
  }
  // Otoño
  else if (month >= 8 && month <= 10) {
    descripcionEstacion = `🍁 En Otoño, de septiembre a noviembre, las temperaturas promedio oscilan entre 24°C y 34°C.`;
    eventos = [
      eventoNarrativo("Liberación de tortugas", `${year}-08-01`, `${year}-12-31`, "🐢"),
      eventoNarrativo("Avistamiento de ballenas", `${year}-12-15`, `${year + 1}-04-15`, "🐋")
    ];
  }
  // Invierno
  else {
    descripcionEstacion = `❄️ En Invierno, de diciembre a febrero, las temperaturas promedio oscilan entre 15°C y 26°C.`;
    eventos = [
      eventoNarrativo("Avistamiento de ballenas", `${year}-12-15`, `${year + 1}-04-15`, "🐋"),
      eventoNarrativo("Spring Break", `${year}-03-02`, `${year}-04-03`, "🎉"),
      eventoNarrativo("Semana Santa", `${year}-04-13`, `${year}-04-19`, "🙏"),
      eventoNarrativo("Pascua", `${year}-04-20`, `${year}-04-20`, "🐰"),
      eventoNarrativo("Liberación de tortugas", `${year}-08-01`, `${year}-12-31`, "🐢")
    ];
  }

  const eventosEnTemporada = eventos.filter(e => e);

  // Asignar los eventos a las columnas
  function asignarEventosAColumnas(eventos) {
    const speciesColumns = [
      document.getElementById("species-colum-1"),
      document.getElementById("species-colum-2"),
      document.getElementById("species-colum-3"),
      document.getElementById("species-colum-4")
    ];
    const dateColumns = [
      document.getElementById("date-colum-1"),
      document.getElementById("date-colum-2"),
      document.getElementById("date-colum-3"),
      document.getElementById("date-colum-4")
    ];

    let index = 0;
    eventos.forEach(evento => {
      if (index < 4) {
        speciesColumns[index].innerHTML = `<span>${evento.nombre}</span>`;
        dateColumns[index].innerHTML = `<span id="fecha-inicio-${index}">${evento.fechaInicio}</span><br><span id="fecha-finaliza-${index}" style="display:none">${evento.fechaFinaliza}</span>`;
        index++;
      }
    });
  }

  asignarEventosAColumnas(eventosEnTemporada);

  // Marquee con la estación
  texto.innerHTML = descripcionEstacion;

  // Cambiar entre las fechas cada 4 segundos (mostrar inicio o finalizar)
  setInterval(() => {
    eventos.forEach((evento, index) => {
      const fechaInicioElement = document.getElementById(`fecha-inicio-${index}`);
      const fechaFinalizaElement = document.getElementById(`fecha-finaliza-${index}`);
      
      // Alternar entre la fecha de inicio y finaliza
      if (fechaInicioElement && fechaFinalizaElement) {
        fechaInicioElement.style.display = fechaInicioElement.style.display === 'none' ? 'inline-block' : 'none';
        fechaFinalizaElement.style.display = fechaFinalizaElement.style.display === 'none' ? 'inline-block' : 'none';
      }
    });
  }, 4000); // Cambiar cada 4 segundos

  // Cambiar entre Celsius y Fahrenheit
  setInterval(() => {
    if (mostrarCelsius) {
      // Actualizar las temperaturas en Celsius
    } else {
      // Actualizar las temperaturas en Fahrenheit
    }
    mostrarCelsius = !mostrarCelsius;
  }, 4000); // Alternar cada 4 segundos

  setInterval(() => {
    document.querySelectorAll('.evento-fecha').forEach(el => {
      el.style.display = mostrarFechas ? 'inline-block' : 'none';
    });
    document.querySelectorAll('.evento-dias').forEach(el => {
      el.style.display = mostrarFechas ? 'none' : 'inline-block';
    });
    mostrarFechas = !mostrarFechas;
  }, 3000);
});
