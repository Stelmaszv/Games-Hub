import { Component,OnInit } from '@angular/core';
import { TranslationService } from 'src/app/services/common/translation/translation.service';
import { Language } from 'src/app/components/interface';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(public translationService: TranslationService){}
  lang: string | null = null;
  languages: Language[] | null = null;

  async ngOnInit(): Promise<void> {
    this.lang = this.translationService.getLang();
    this.languages = await this.translationService.setLanguagesList();
    this.languages.map(el => el.key);
  }

  isChosen(lang: string){
    return (this.lang === lang);
  }

  langChosen(lang: string) {
    this.lang = lang
  }

  langSaved(){
    this.translationService.setLang(this.lang)
    location.reload()
  }

  getCorrectLang(){
    return this.languages?.find(language => language.key == this.lang)?.flag
  }

}
