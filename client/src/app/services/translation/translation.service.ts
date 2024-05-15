import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations: { [key: string]: string } = {};

  constructor(private http: HttpClient) {
    this.loadTranslations('pl');
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

  translate(key: string, variables?: { [key: string]: string }): string {
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