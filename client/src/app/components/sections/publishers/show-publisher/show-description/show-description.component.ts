import { Component, Input,OnInit } from '@angular/core';
import { Publisher } from '../../interfaces';

import { TranslationService } from 'src/app/services/common/translation/translation.service';
import { Languages } from '../../enum';

@Component({
  selector: 'show-description',
  templateUrl: './show-description.component.html',
  styleUrls: ['./show-description.component.scss']
})
export class ShowDescriptionComponent implements OnInit {
    public description : string | null | undefined = null
    public descriptionLength: number = 190

    @Input() publisher!: Publisher|null;
    @Input() edit!: boolean | undefined;

    constructor(public translationService : TranslationService){}

    public ngOnInit(): void 
    {
      this.getDescription(this.translationService.getLang())
    }

    private getDescription(key: string|null): void 
    {
      this.description = this.publisher?.descriptions[key as Languages.EN | Languages.FR | Languages.PL];
    }

    public onPublisherChange(updatedPublisher: Publisher): void 
    {
      this.publisher = updatedPublisher;
      this.getDescription(this.translationService.getLang())
    }

    public showMore() : boolean
    {
      if(this.description === null || this.description === undefined){
        return false
      }

      if (this.description?.length > this.descriptionLength ){
        return true;
      }

      return false;
    }
}
