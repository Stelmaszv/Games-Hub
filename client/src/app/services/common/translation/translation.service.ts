import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Language } from 'src/app/components/interface';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: { [key: string]: string } = {};
  private languagesList: Language[] = [];
  private translationsFiles : any[] = [];
  public lang : string | null = null;
  private defaultLand : string = 'en';

  constructor(private http: HttpClient) {
    this.initializeService();
  }

  private async initializeService(): Promise<void> {
    this.lang = localStorage.getItem('lang')

    try {
      this.languagesList = await this.setLanguagesList();
      const long = localStorage.getItem('lang');

      if (long !== null) {
        this.translationsFiles = await this.loadTranslationsList(long);
        this.loadTranslations()
        this.lang = long;
      } else {
        const preferredLanguage = navigator.language || this.defaultLand;
        const supportedLanguages = this.languagesList.map(language => language.key);;

        if (supportedLanguages.includes(preferredLanguage)) {
          document.documentElement.lang = preferredLanguage;
        } else {
          document.documentElement.lang = this.defaultLand;
        }

        this.translationsFiles = await this.loadTranslationsList(document.documentElement.lang);
        this.loadTranslations()
        this.lang = document.documentElement.lang;
      }

    } catch (error) {
      console.error('Error initializing TranslationService', error);
    }
  }


  public async setLanguagesList(): Promise<Language[]> {
    return await firstValueFrom(this.http.get<Language[]>('http://localhost/api/list_languages'));
  }

  private async loadTranslationsList(lang: string): Promise<any> {
    return await firstValueFrom(this.http.get<any>(`assets/i18n/${lang}.json`));
  }

  private loadTranslations(): void {
    for (const key in this.translationsFiles) {
      if (this.translationsFiles.hasOwnProperty(key)) {
        this.translations[key] = this.translationsFiles[key];
      }
    }
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

  public translateLanguage(key: string){
    const found = this.languagesList.find(element => element.key === key);
    
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