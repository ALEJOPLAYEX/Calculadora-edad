document.getElementById('age-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
  
    const errorMessage = document.getElementById('error-message');
    const yearsElement = document.getElementById('years');
    const monthsElement = document.getElementById('months');
    const daysElement = document.getElementById('days');
  
    // Limpiar errores previos
    document.querySelectorAll('.input-group').forEach(group => {
      group.classList.remove('error');
    });
    errorMessage.style.display = 'none';
  
    // Validación de errores
    if (!day || !month || !year) {
      errorMessage.textContent = 'Por favor, ingresa todos los campos.';
      errorMessage.style.display = 'block';
      if (!day) document.getElementById('day').parentElement.classList.add('error');
      if (!month) document.getElementById('month').parentElement.classList.add('error');
      if (!year) document.getElementById('year').parentElement.classList.add('error');
      return;
    }
  
    if (day < 1 || day > 31) {
      errorMessage.textContent = 'El día debe estar entre 1 y 31.';
      errorMessage.style.display = 'block';
      document.getElementById('day').parentElement.classList.add('error');
      return;
    }
  
    if (month < 1 || month > 12) {
      errorMessage.textContent = 'El mes debe estar entre 1 y 12.';
      errorMessage.style.display = 'block';
      document.getElementById('month').parentElement.classList.add('error');
      return;
    }
  
    if (year > new Date().getFullYear()) {
      errorMessage.textContent = 'El año no puede ser en el futuro.';
      errorMessage.style.display = 'block';
      document.getElementById('year').parentElement.classList.add('error');
      return;
    }
  
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
  
    if (birthDate > today) {
      errorMessage.textContent = 'La fecha no es válida, asegúrate de que el día y el mes coincidan con un calendario real.';
      errorMessage.style.display = 'block';
      return;
    }
  
    // Calcular edad
    const ageInMilliseconds = today - birthDate;
    const ageDate = new Date(ageInMilliseconds);
  
    const years = ageDate.getUTCFullYear() - 1970;
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;
  
    // Mostrar los resultados con animación
    let currentYears = 0, currentMonths = 0, currentDays = 0;
  
    function animateAge() {
      if (currentYears < years) {
        currentYears++;
        yearsElement.textContent = currentYears;
      }
      if (currentMonths < months) {
        currentMonths++;
        monthsElement.textContent = currentMonths;
      }
      if (currentDays < days) {
        currentDays++;
        daysElement.textContent = currentDays;
      }
  
      if (currentYears < years || currentMonths < months || currentDays < days) {
        setTimeout(animateAge, 50);
      }
    }
  
    // Iniciar desde 0
    yearsElement.textContent = "0";
    monthsElement.textContent = "0";
    daysElement.textContent = "0";
    
    animateAge();
  });