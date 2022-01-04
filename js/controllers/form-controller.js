import Address from '../models/address.js';
import * as requestService from '../services/request-service.js';

function State(){
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

export function init(){
    state.inputCep = document.forms.newAddress.cep;
    state.inputStreet = document.forms.newAddress.logradouro;
    state.inputNumber = document.forms.newAddress.numero;
    state.inputCity = document.forms.newAddress.cidade;
    state.errorCep = document.querySelector('[data-error="cep"]')
    state.errorNumero = document.querySelector('[data-error="numero"]')
    state.btnSave = document.forms.newAddress.btnSave;
    state.btnClear = document.forms.newAddress.btnClear;

    state.inputNumber.addEventListener('change', handleInputNumberChange);
    state.btnClear.addEventListener('click', handleBtnCleanClick);
    state.btnSave.addEventListener('click', handleBtnSaveClick);
}

async function handleBtnSaveClick(event){
    event.preventDefault();
    const result = await requestService.getJson('https://viacep.com.br/ws/01001000/json/');
    console.log(result);
}

function handleInputNumberChange(event){
    if(event.target.value == ""){
        setFormError("numero", "Campo requerido");
    }else{
        setFormError("numero", "");
    }
}

function handleBtnCleanClick(event){
    event.preventDefault();
    clearForm();
}

function clearForm(){
    state.inputCep.value = "";
    state.inputStreet.value = "";
    state.inputNumber.value = "";
    state.inputCity.value = "";
    setFormError("cep", "");
    setFormError("numero", "");
    state.inputCep.focus();
}

function setFormError(key, value){
    const element = document.querySelector(`[data-error="${key}"]`);
    element.innerHTML = value;
}