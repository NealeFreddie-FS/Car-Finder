// Imports your SCSS stylesheet
import "./styles/index.scss";
import carData from "./car-dataset.json";

const yearSelect = document.getElementById("yearSelect");
const makeSelect = document.getElementById("makeSelect");
const modelSelect = document.getElementById("modelSelect");
const carDetails = document.getElementById("carDetails");

const years = [...new Set(carData.map((car) => car.year))].sort(
  (a, b) => b - a
);
years.forEach((year) => {
  const option = document.createElement("option");
  option.value = year;
  option.textContent = year;
  yearSelect.appendChild(option);
});

yearSelect.addEventListener("change", () => {
  makeSelect.disabled = false;
  makeSelect.innerHTML = '<option value="">Select Make</option>';
  modelSelect.innerHTML = '<option value="">Select Model</option>';
  modelSelect.disabled = true;

  const selectedYear = yearSelect.value;
  const makes = [
    ...new Set(
      carData
        .filter((car) => car.year == selectedYear)
        .map((car) => car.Manufacturer)
    ),
  ].sort();

  makes.forEach((make) => {
    const option = document.createElement("option");
    option.value = make;
    option.textContent = make.charAt(0).toUpperCase() + make.slice(1);
    makeSelect.appendChild(option);
  });
});

makeSelect.addEventListener("change", () => {
  modelSelect.disabled = false;
  modelSelect.innerHTML = '<option value="">Select Model</option>';

  const selectedYear = yearSelect.value;
  const selectedMake = makeSelect.value;
  const models = [
    ...new Set(
      carData
        .filter(
          (car) => car.year == selectedYear && car.Manufacturer === selectedMake
        )
        .map((car) => car.model)
    ),
  ].sort();

  models.forEach((model) => {
    const option = document.createElement("option");
    option.value = model;
    option.textContent = model;
    modelSelect.appendChild(option);
  });
});

modelSelect.addEventListener("change", () => {
  const selectedYear = yearSelect.value;
  const selectedMake = makeSelect.value;
  const selectedModel = modelSelect.value;

  const car = carData.find(
    (car) =>
      car.year == selectedYear &&
      car.Manufacturer === selectedMake &&
      car.model === selectedModel
  );

  if (car) {
    carDetails.innerHTML = `
      <h2>${car.model}</h2>
      <p>Year: ${car.year}</p>
      <p>Make: ${car.Manufacturer}</p>
      <p>Price: £${car.price}</p>
      <p>Mileage: ${car.mileage} miles</p>
      <p>Fuel Type: ${car.fuelType}</p>
      <p>MPG: ${car.mpg}</p>
      <p>Engine Size: ${car.engineSize}L</p>
    `;
    console.log("Selected Car:", car);
  }
});
