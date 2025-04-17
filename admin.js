document.addEventListener("DOMContentLoaded", () => {
    const toggleCheckbox = document.getElementById("toggle-access");
    const formsSection = document.getElementById("forms-section");
    const label = document.getElementById("toggle-label");
  
    toggleCheckbox.addEventListener("change", () => {
      if (toggleCheckbox.checked) {
        formsSection.style.display = "block";
        label.textContent = "Disable Forms";
      } else {
        formsSection.style.display = "none";
        label.textContent = "Enable Forms";
      }
    });
  });
  