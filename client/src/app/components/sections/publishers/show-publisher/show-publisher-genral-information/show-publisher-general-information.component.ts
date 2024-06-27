import { Component, Input} from '@angular/core';
import { Publisher } from '../../interfaces';
import { TranslationService } from 'src/app/services/common/translation/translation.service';

@Component({
  selector: 'show-publisher-general-information',
  templateUrl: './show-publisher-general-information.component.html',
  styleUrls: ['./show-publisher-general-information.component.scss']
})
export class ShowPublisherGeneralInformationComponent{
  @Input() publisher!: Publisher|null;
  @Input() edit!: boolean | undefined;

  constructor(public translationService: TranslationService){}

  public onPublisherChange(updatedPublisher: Publisher): void {
    this.publisher = updatedPublisher;
  }
}
