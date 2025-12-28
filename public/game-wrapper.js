// Script para agregar botón "Volver" a juegos HTML
(function() {
  // Crear botón de volver
  const backButton = document.createElement('button');
  backButton.innerHTML = '← Volver al Menú';
  backButton.style.cssText = `
    position: fixed;
    top: 16px;
    left: 16px;
    z-index: 9999;
    background-color: rgba(31, 41, 55, 0.95);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    transition: all 0.2s;
    font-family: system-ui, -apple-system, sans-serif;
  `;

  backButton.onmouseover = function() {
    this.style.backgroundColor = 'rgba(55, 65, 81, 0.95)';
    this.style.transform = 'scale(1.05)';
  };

  backButton.onmouseout = function() {
    this.style.backgroundColor = 'rgba(31, 41, 55, 0.95)';
    this.style.transform = 'scale(1)';
  };

  backButton.onclick = function() {
    window.location.href = '/';
  };

  // Agregar al DOM cuando esté listo
  if (document.body) {
    document.body.appendChild(backButton);
  } else {
    window.addEventListener('DOMContentLoaded', function() {
      document.body.appendChild(backButton);
    });
  }
})();
