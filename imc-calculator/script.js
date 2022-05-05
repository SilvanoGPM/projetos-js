const $form = document.querySelector('[data-js="calculator"]');
const $modal = document.querySelector('[data-js="modal"]');
const $closeModal = document.querySelector('[data-js="closeModal"]');
const $imcValueOutput = document.querySelector('[data-js="imcValue"]');
const $imcStatusOutput = document.querySelector('[data-js="imcStatus"]');

function handleOpenModal() {
  $modal.classList.add('visible');
}

function handleCloseModal() {
  $modal.classList.remove('visible');
}

function calculateIMC(weight, height) {
  return weight / (height * height);
}

function getStatus(imc) {
  if (imc < 18.5) {
    return 'Abaixo do Peso';
  }

  if (imc <= 24.9) {
    return 'Peso Normal';
  }

  if (imc <= 29.9) {
    return 'Sobrepeso';
  }

  if (imc <= 34.9) {
    return 'Obesidade Grau I';
  }

  if (imc <= 39.9) {
    return 'Obesidade Grau II';
  }

  return 'Obesidade Mórbida';
}

function handleFormSubmit(event) {
  event.preventDefault();

  const height = Number(event.target.height.value.trim());
  const weight = Number(event.target.weight.value.trim());

  if (!height || !weight) {
    alert('Insira valores válidos');
    return;
  }

  const heightInMeters = height / 100;

  const imc = calculateIMC(weight, heightInMeters);

  const status = getStatus(imc);

  $imcValueOutput.textContent = imc.toFixed(2).replace('.', ',');
  $imcStatusOutput.textContent = status;

  handleOpenModal();
}

$form.addEventListener('submit', handleFormSubmit);
$closeModal.addEventListener('click', handleCloseModal);

$modal.addEventListener('click', (event) => {
  if (event.target === $modal) {
    handleCloseModal();
  }
});
