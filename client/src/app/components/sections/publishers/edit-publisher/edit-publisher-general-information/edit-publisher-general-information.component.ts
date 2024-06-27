import { TranslationService } from 'src/app/services/common/translation/translation.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { GeneralInformationResponse, GeneralInformationScraper, Publisher, PublisherGeneralInformation } from '../../interfaces';
import { HttpServiceService } from 'src/app/services/common/http-service/http-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormValidatorService } from 'src/app/services/common/form-validator/form-validator.service';
import { BootstrapService } from 'src/app/services/common/bootstrap/bootstrap.service';

@Component({
  selector: 'edit-publisher-general-information',
  templateUrl: './edit-publisher-general-information.component.html',
  styleUrls: ['./edit-publisher-general-information.component.scss']
})
export class EditPublisherGeneralInformationComponent implements OnInit {
  constructor(public translationService: TranslationService, private bootstrapService: BootstrapService,private httpServiceService: HttpServiceService,private formValidatorService: FormValidatorService){}
  
  @Input() publisher!: Publisher|null;
  @Output() publisherChange = new EventEmitter<Publisher>();
  
  private id: number = 0;
  public scraper: string = '';
  public name: string  = ''
  public headquarter: string | null  = null
  public origin: string | null  = null
  public founded: string | null  = null
  public website: string | null  = null

  private updatePublisher(newPublisher: Publisher): void {
    this.publisher = newPublisher;
    this.publisherChange.emit(this.publisher);
  }
  
  private changePublisherData(): void {
    if(this.publisher !== null){
      const updatedPublisher: Publisher = this.publisher;
      this.updatePublisher(updatedPublisher);
    }
  }

  public onSubmit(): void {

    let postData : Publisher = {
      'id' : this.id,
      'generalInformation' :{
        'name':this.name,
        'headquarter':this.headquarter,
        'origin':this.origin,
        'founded':this.founded,
        'website': this.website
      },
      descriptions: {
        'fr':(this.publisher?.descriptions.fr)? this.publisher?.descriptions.fr: '',
        'pl':(this.publisher?.descriptions.pl)? this.publisher?.descriptions.pl: '',
        'en':(this.publisher?.descriptions.en)? this.publisher?.descriptions.en: '',
      }
    }

    this.httpServiceService.putData(`http://localhost/api/publisher/edit/${this.publisher?.id}`,postData  ).subscribe({  
      next: (response : any) => {
        if(response.success){
          this.formValidatorService.restNotUseInputs({})
          this.bootstrapService.closeModal('editGeneralInformation');
          this.bootstrapService.showAlert('alert-publisher','alert-success',this.translationService.translate('editPublisherGeneralInformationSuccess'))
          this.updatePublisher(postData)
        }
      },
      error: (errorList: HttpErrorResponse) => {
        this.formValidatorService.processErrors(errorList.error.errors, postData ,'generalInformation','generalInformation.')
      } 
    });
  }

  public getDataFromScraper() :void {
    let postData : GeneralInformationScraper = {    
      url: this.scraper
    }

    this.httpServiceService.postData('http://localhost/api/publisher/web-scraper/add/general-information',postData).subscribe({  
      next: (response : GeneralInformationResponse ) => {
        const data = response['generalInformation']
        this.generalInformationSetValue(data);
      },
      error: (errorList: HttpErrorResponse) => {
        this.formValidatorService.processErrors(errorList.error.errors,postData,'generalInformation')
      }
    });
  }

  public updateGeneralInformation(data: PublisherGeneralInformation | null): void {
    this.id = this.publisher?.id || 0;
    this.name = data?.name || '';
    this.headquarter = data?.headquarter || null;
    this.origin = data?.origin || null;
    this.founded = data?.founded || null;
    this.website = data?.website || null;
  }
  
  public ngOnInit(): void {
    this.updateGeneralInformation(this.publisher?.generalInformation || null);
  }
  
  public generalInformationSetValue(data: PublisherGeneralInformation): void {
    this.updateGeneralInformation(data);
  }
}
