import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidatorService } from 'src/app/services/common/form-validator/form-validator.service';
import { HttpServiceService } from 'src/app/services/common/http-service/http-service.service';
import { GeneralInformationResponse, GeneralInformationScraper, PublisherAddForm, PublisherDescriptions, PublisherDescriptionsScraper, PublisherDescriptionsScraperResponse, PublisherGeneralInformation} from '../interfaces';
import { TranslationService } from 'src/app/services/common/translation/translation.service';
import { Response } from 'src/app/components/interface';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Component({
  selector: 'app-add-publishers',
  templateUrl: './add-publishers.component.html',
  styleUrls: ['./add-publishers.component.scss']
})
export class AddPublishersComponent {
  public section: String = 'general_information_normal';
  private generalInformationValidation : boolean = false
  private add : boolean = false

  constructor(
    private fb: FormBuilder,
    private httpServiceService: HttpServiceService ,
    private formValidatorService: FormValidatorService,
    private router: Router,
    public translationService: TranslationService
  ) {}

  public generalInformation: FormGroup = this.fb.group({
    name: null,
    origin: null,
    founded: null,
    website: null,
    headquarter: null
  });

  public descriptions: FormGroup = this.fb.group({
    en: null,
    pl: null,
    fr: null,
  });

  public publisherForm : FormGroup = this.fb.group({
    generalInformation: this.generalInformation,
    descriptions: this.descriptions
  })

  public generalInformationScraperForm : FormGroup = this.fb.group({
    url: null,
  })

  public descriptionsScraperForm : FormGroup = this.fb.group({
    en: null,
    pl: null,
    fr: null,
  })

  private getDescription(lng: string, response: PublisherDescriptions): string {
    let description: string = '';

    if (this.descriptions?.get(lng)?.value === null || this.descriptions?.get(lng)?.value === '') {
        console.log(response);
        description = response[lng] ?? lng;
    } else {
        description = this.descriptions?.get(lng)?.value ?? '';
    }

    return description;
  }

  public onDescriptionsScraperSubmit() : void 
  {
    let postData : PublisherDescriptionsScraper = {    
      "descriptions":[
        {"url":this.descriptionsScraperForm?.get('en')?.value,"lng":"en"},
        {"url":this.descriptionsScraperForm?.get('pl')?.value,"lng":"pl"},
        {"url":this.descriptionsScraperForm?.get('fr')?.value,"lng":"fr"},
      ],
    }
    
    this.httpServiceService.postData('http://localhost/api/publisher/web-scraper/add/descriptions', postData ).subscribe({  
      next: (response : PublisherDescriptionsScraperResponse) => {
        const publisherDescriptions : PublisherDescriptions = {
          'en' : this.getDescription('en',response['description']),
          'fr': this.getDescription('fr',response['description']),
          'pl':this.getDescription('pl',response['description']),
        }
        this.descriptions.setValue(publisherDescriptions);
      },
      error: (errorList: HttpErrorResponse) => {
        if(errorList.status == 500){
          console.log('Server Error')
        }
        this.formValidatorService.processErrors(errorList.error.errors, postData ,'descriptions')
      }
    });
  }

  public onGeneralInformationScraperSubmit() : void 
  {
    let postData : GeneralInformationScraper = {    
      url: this.generalInformationScraperForm?.get('url')?.value
    }

    this.httpServiceService.postData('http://localhost/api/publisher/web-scraper/add/general-information',postData).subscribe({  
      next: (response : GeneralInformationResponse ) => {
        const data = response['generalInformation']
        this.generalInformation.setValue(data);
      },
      error: (errorList: HttpErrorResponse) => {
        this.formValidatorService.processErrors(errorList.error.errors,postData,'generalInformationScraperForm')
      }
    });
  }

  public onSubmit() : void 
  {     
    const generalInformation : PublisherGeneralInformation = {
      name: this.generalInformation?.get('name')?.value,
      origin: this.generalInformation?.get('origin')?.value,
      founded: this.generalInformation?.get('founded')?.value,
      website: this.generalInformation?.get('website')?.value,
      headquarter: this.generalInformation?.get('headquarter')?.value,
    };
  
    const descriptions : PublisherDescriptions = {
      en: this.descriptions?.get('en')?.value,
      pl: this.descriptions?.get('pl')?.value,
      fr: this.descriptions?.get('fr')?.value
    };

    let postData : PublisherAddForm = {
      'generalInformation' : generalInformation,
      'descriptions' :descriptions,
      'add' : this.add
    }

    this.httpServiceService.postData('http://localhost/api/publisher/add',postData ).subscribe({
      next: (response : Response) => {
        if(this.generalInformationValidation && response.success){
          this.router.navigate(['publisher/show', response.id]);
        }
      },
      error: (errorList: HttpErrorResponse) => {
        const generalInformationKeys = Object.keys(errorList.error.errors).filter(key => key.startsWith('generalInformation.'));
        this.generalInformationValidation = (generalInformationKeys.length === 0);
        if (this.generalInformationValidation) {
          this.section = 'descriptions_normal';
        }

        this.formValidatorService.processErrors(errorList.error.errors, postData ,'generalInformation','generalInformation.')
      }
    });
  }

  public showGeneralInformation() : void
  {
    this.section = 'general_information_normal'
  }

  public restGeneralInformation() : void {
    const publisherGeneralInformation : PublisherGeneralInformation = {
      name: '',
      origin: null,
      founded: null,
      website: null,
      headquarter: null
    }
    this.generalInformation.setValue(publisherGeneralInformation);
  }

  public addPublisher() : void {
    this.add = true;
    this.onSubmit()
  }

  public restDescription() : void {
    const publisherDescriptions : PublisherDescriptions = {
      'en' : null,
      'fr': null,
      'pl': null
    }
    this.descriptions.setValue(publisherDescriptions);
  }

  public checkErrors() : boolean {
    return this.generalInformationValidation
  }
}
