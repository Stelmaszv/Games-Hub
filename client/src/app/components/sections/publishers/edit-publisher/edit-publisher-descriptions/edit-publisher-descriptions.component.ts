import { Component,Input,Output,EventEmitter } from '@angular/core';
import { Publisher } from '../../interfaces';
import { TranslationService } from 'src/app/services/common/translation/translation.service';
import { HttpServiceService } from 'src/app/services/common/http-service/http-service.service';
import { FormValidatorService } from 'src/app/services/common/form-validator/form-validator.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BootstrapService } from 'src/app/services/common/bootstrap/bootstrap.service';

@Component({
  selector: 'edit-publisher-descriptions',
  templateUrl: './edit-publisher-descriptions.component.html',
  styleUrls: ['./edit-publisher-descriptions.component.scss']
})
export class EditPublisherDescriptionsComponent {

  @Input() publisher!: Publisher|null;
  @Output() publisherChange = new EventEmitter<Publisher>();

  private id: number = 0;
  public languagesForm : any = null;
  public allLanguage : boolean = false;

  constructor(public translationService: TranslationService, private httpServiceService: HttpServiceService,private formValidatorService: FormValidatorService, private bootstrapService: BootstrapService){}

  public onSubmit(): void {

    let postData : Publisher = {

      'id' : this.id,

      'generalInformation' :{
        'name':(this.publisher?.generalInformation.name)? this.publisher?.generalInformation.name : '',
        'headquarter':(this.publisher?.generalInformation.headquarter)? this.publisher?.generalInformation.headquarter : null,
        'origin':(this.publisher?.generalInformation.origin)? this.publisher?.generalInformation.origin : null,
        'founded':(this.publisher?.generalInformation.founded)? this.publisher?.generalInformation.founded : null,
        'website': (this.publisher?.generalInformation.website)? this.publisher?.generalInformation.website : null
      },

      'descriptions' : {
        'fr':(this.languagesForm.find((language: { key: any; })  => language.key === 'fr'))?  this.languagesForm.find((language: { key: any; })  => language.key === 'fr').value : '',
        'pl':(this.languagesForm.find((language: { key: any; })  => language.key === 'pl'))?  this.languagesForm.find((language: { key: any; })  => language.key === 'pl').value : '',
        'en':(this.languagesForm.find((language: { key: any; })  => language.key === 'en'))?  this.languagesForm.find((language: { key: any; })  => language.key === 'en').value : '',
      }

    }

    this.httpServiceService.putData(`http://localhost/api/publisher/edit/${this.id}`,postData  ).subscribe({  
      next: (response : any) => {
        if(response.success){
          this.formValidatorService.restNotUseInputs({})
          this.bootstrapService.closeModal('editDescriptions');
          this.bootstrapService.showAlert('alert-publisher','alert-success',this.translationService.translate('editPublisherGeneralInformationSuccess'))
        }
      },
      error: (errorList: HttpErrorResponse) => {
        this.formValidatorService.processErrors(errorList.error.errors, postData ,'generalInformation','generalInformation.')
      } 
    });
  }

  public ngOnInit(): void {
    this.id = this.publisher?.id || 0;
    let lang = this.translationService.getLang()

    this.languagesForm = [
      {
        'key' : 'fr',
        'value' : (this.publisher?.descriptions.fr) ? this.publisher?.descriptions.fr : '',
        'active' : (lang === 'fr'),
      },
      {
        'key' : 'en',
        'value' : (this.publisher?.descriptions.en) ? this.publisher?.descriptions.en : '',
        'active' : (lang === 'en'),
      },
      {
        'key' : 'pl',
        'value' : (this.publisher?.descriptions.pl) ? this.publisher?.descriptions.pl : '',
        'active' : (lang === 'pl'),
      }
    ]

  }

  public showAllLanguage() : void {
    this.allLanguage = true;
  }
}
