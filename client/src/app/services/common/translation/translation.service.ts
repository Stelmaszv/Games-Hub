import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: { [key: string]: string } = {};
  private languagesList = [{"lang":"pl","name":"Polski"},{"lang":"en","name":"English"}]
  public lang : string | null = null;

  constructor(private http: HttpClient) {
    const long = localStorage.getItem('lang')
    if(long !== null){
      this.loadTranslations(long);
      this.lang = long;
    }else{
      const preferredLanguage = navigator.language || navigator.language;
      const supportedLanguages = ['en', 'pl'];

      if (supportedLanguages.includes(preferredLanguage)) {
          document.documentElement.lang = preferredLanguage;
      } else {
          document.documentElement.lang = 'en';
      }

      this.loadTranslations(document.documentElement.lang);
      this.lang = document.documentElement.lang
    }
  }

  private loadTranslations(lang: string): void {
    this.http.get<any>(`assets/i18n/${lang}.json`).subscribe(translations => {
      for (const key in translations) {
        if (translations.hasOwnProperty(key)) {
          this.translations[key] = translations[key];
        }
      }
    });
  }

  public setLang(lang: string|null): void{
    if(lang === null){
      return;
    }

    localStorage.setItem('lang',lang)
  }

  public getLang() : string|null{
    return this.lang
  }

  public getLanguagesList(){
    return this.languagesList.map(el => el.lang);
  }

  public getLanguageName(langKey: string) : string {
    return this.getDataFromSubArray('languages',langKey)
  }

  private getDataFromSubArray(subArray:string, key:string) :string {
    const subData :any = this.translations[subArray];
    const subDataKey = subData.find((lang: any) => lang.hasOwnProperty(key));

    if (!subDataKey) {
      console.error('Language not found for key: ' + key);
      return '';
    }

    return subDataKey[key]
  }

  public translateMonth(monthNumber: number){
    const months = this.translate('month');
    if(Array.isArray(months)){
        return months[monthNumber];
    }
  }

  public translateLanguage(lang: string){
    const found = this.languagesList.find(element => element.lang === lang);
    
    if(found !== undefined){
        return found.name;
    }

    return '';
    
  }

  public translate(key: string, variables?: { [key: string]: string }): string {
    let translatedText = this.translations[key] && this.translations[key] ? this.translations[key] : key;
    if (variables) {
      for (const variable in variables) {
        if (variables.hasOwnProperty(variable)) {
          translatedText = translatedText.replace(`{{${variable}}}`, variables[variable]);
        }
      }
    }
    return translatedText;
  }
}