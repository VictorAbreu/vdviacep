import Address from '../models/address.js';
import * as addressService from '../services/address-service.js';
import * as listController from './list-controller.js';

function State() {
  this.address = new Address();

  this.btnSave = null;
  this.btnClear = null;
  this.inputCep = null;
  this.inputStreet = null;
  this.inputNumber = null;
  this.inputCity = null;
  this.errorCep = null;
  this.errorNumero = null;
}

const state = new State();

export function init() {
  state.inputCep = document.forms.newAddress.cep;
  state.inputStreet = document.forms.newAddress.logradouro;
  state.inputNumber = document.forms.newAddress.numero;
  state.inputCity = document.forms.newAddress.cidade;
  state.errorCep = document.querySelector('[data-error="cep"]');
  state.errorNumero = document.querySelector('[data-error="numero"]');
  state.btnSave = document.forms.newAddress.btnSave;
  state.btnClear = document.forms.newAddress.btnClear;

  state.inputNumber.addEventListener("change", handleInputNumberChange);
  state.inputNumber.addEventListener("keyup", handleInputNumberKeyup);
  state.inputCep.addEventListener("change", handleInputCepChange);
  state.btnClear.addEventListener("click", handleBtnCleanClick);
  state.btnSave.addEventListener("click", handleBtnSaveClick);
}

function handleInputNumberKeyup(event){
    state.address.numero = event.target.value;
}

async function handleInputCepChange(event) {
  const cep = event.target.value;
  try {
    const address = await addressService.findByCep(cep);
    state.inputStreet.value = address.logradouro;
    state.inputCity.value = address.cidade;
    state.address = address;
    setFormError("cep", "");
    state.inputNumber.focus();
  } catch (e) {
    state.inputStreet.value = "";
    state.inputCity.value = "";
    setFormError("cep", "Informe um CEP válido");
  }
}

async function handleBtnSaveClick(event) {
  event.preventDefault();
  listController.addCard(state.address);
}

function handleInputNumberChange(event) {
  if (event.target.value == "") {
    setFormError("numero", "Campo requerido");
  } else {
    setFormError("numero", "");
  }
}

function handleBtnCleanClick(event) {
  event.preventDefault();
  clearForm();
}

function clearForm() {
  state.inputCep.value = "";
  state.inputStreet.value = "";
  state.inputNumber.value = "";
  state.inputCity.value = "";
  setFormError("cep", "");
  setFormError("numero", "");
  state.inputCep.focus();
}

function setFormError(key, value) {
  const element = document.querySelector(`[data-error="${key}"]`);
  element.innerHTML = value;
}
