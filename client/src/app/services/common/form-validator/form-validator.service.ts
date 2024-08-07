import { Injectable } from '@angular/core';
import { TranslationService } from '../translation/translation.service';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  private formControls: NodeListOf<Element> | null = null;


  public constructor(private translationService: TranslationService) { }

  public processErrors( errorList: any, values: any, formName:string ,subError : string|null = null) {
    let processKeys = Object.keys(errorList);
    if(subError){
      processKeys = Object.keys(errorList).filter(key => key.startsWith(subError));
    }

    let processErrors: { [key: string]: any } = {};
  
    for (let error of Object.entries(errorList)) {
      if (processKeys.indexOf(error[0].toString()) !== -1) {
        const key = error[0].replace(/\./g, "");
        processErrors[key] = error;
      }
    }
  
    this.setForm(formName);
    this.showErrors(processErrors, values);
    this.restNotUseInputs(processErrors);
  }

  public restNotUseInputsMultiError(multiErrorId:string) {
    const multiErrors = document.querySelectorAll(`[multi-error]`)
    Object.entries(multiErrors).forEach(([inputName, value]) => {
      if(value.getAttribute('multi-error-id') == multiErrorId){
        value.classList.remove('is-invalid');
      }
    });
  }

  private setForm(id: string): void {
    this.formControls = document.querySelectorAll(`[form="${id}"]`);
  }

  private showErrors(errorList: { [key: string]: string[] },values :any): void {

    Object.entries(errorList).forEach(([inputName, value]) => {
      const inputId = inputName.replace(/\./g, "");
      this.markInvalid(inputId);

      if (value.length > 1) {
        
        let keys = value[0].split('.');
        if(keys.length > 0){
            for (let key of keys){
              if(key == value[0]){
                value[2] = values[key]
              }
            }
        }

        const translationKey = value[1]; 
        const jsonString = this.convertStringToJson(value.slice(2).join(' '));
        const parsedJson = this.safeParseJson(jsonString);
        this.displayError(inputId, translationKey, parsedJson)
      }
    });
  }

  public restNotUseInputs(errorList: { [key: string]: string[] }): void {
    const invalidIds = Object.keys(errorList);

    this.formControls?.forEach(element => {
      const id = element.getAttribute('formId');
      if (id && !invalidIds.includes(id)) {
        element.classList.remove('is-invalid');
      }
    });
  }

  private markInvalid(inputId: string): void {
    let inputClass = document.querySelector(`[formId="${inputId}"]`);

    if(inputClass === null){
      inputClass = document.querySelector(`[id="${inputId}"]`);
    }

    if (inputClass) inputClass.classList.add('is-invalid');
  }

  private displayError(inputId: string, translationKey: string, parsedJson: { [key: string]: string }): void {
    let inputErrorValue = document.querySelector(`[formFeedback="${inputId}"]`);

    if(inputErrorValue === null){
      inputErrorValue = document.querySelector(`[id="fF${inputId}"]`);
    }
    
    if (inputErrorValue) {
      inputErrorValue.innerHTML = this.translationService.translate(translationKey, parsedJson);
    }
  }

  private convertStringToJson(str: string): string {
    const keyValuePairs = str.split(' ');
    const result: { [key: string]: any } = {};

    keyValuePairs.forEach(pair => {
      const [key, value] = pair.split(':');
      if (key && value !== undefined) {
        result[key] = isNaN(Number(value)) ? value : Number(value);
      }
    });

    return JSON.stringify(result);
  }

  private safeParseJson(jsonString: string): { [key: string]: string } {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      return {};
    }
  }
}