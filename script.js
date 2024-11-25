
const BASE_URL = "http://localhost:3010";

// Fetch and display data (same as before)
async function fetchData(endpoint, tableId) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    const data = await response.json();

    const tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = ""; // Clear any existing rows

    data.forEach(item => {
      const row = document.createElement("tr");
      Object.values(item).forEach(value => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error(`Error fetching data for ${endpoint}:`, error);
  }
}

// Populate form fields dynamically
function populateFormFields(entity) {
  const formFields = document.getElementById("formFields");
  formFields.innerHTML = ""; // Clear any existing fields

  let fields = [];
  if (entity === "vendors") {
    fields = ["Name", "Contact"];
  } else if (entity === "agents") {
    fields = ["Name", "Contact"];
  } else if (entity === "customers") {
    fields = ["Name", "Contact"];
  } else if (entity === "products") {
    fields = ["Name", "Vendor ID"];
  } else if (entity === "deliveries") {
    fields = ["Product ID", "Agent ID", "Customer ID", "Date", "Location"];
  }

  fields.forEach(field => {
    const label = document.createElement("label");
    label.textContent = field;
    const input = document.createElement("input");
    input.name = field.toLowerCase().replace(/ /g, "_");
    input.required = true;

    formFields.appendChild(label);
    formFields.appendChild(input);
  });
}

// Handle form submission
async function handleFormSubmit(event) {
  event.preventDefault();
  const entity = document.getElementById("entity").value;
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(`${BASE_URL}/${entity}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      alert(`${entity} data added successfully!`);
      fetchData(entity, `${entity}Table`); // Refresh the table
    } else {
      alert(`Failed to add ${entity} data.`);
    }
  } catch (error) {
    console.error(`Error adding data to ${entity}:`, error);
  }
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  // Fetch existing data
  fetchData("vendors", "vendorTable");
  fetchData("agents", "agentTable");
  fetchData("customers", "customerTable");
  fetchData("products", "productTable");
  fetchData("deliveries", "deliveryTable");

  // Update form fields based on selected entity
  const entitySelect = document.getElementById("entity");
  entitySelect.addEventListener("change", () => populateFormFields(entitySelect.value));
  populateFormFields(entitySelect.value); // Initialize fields

  // Handle form submission
  const addDataForm = document.getElementById("addDataForm");
  addDataForm.addEventListener("submit", handleFormSubmit);
});
