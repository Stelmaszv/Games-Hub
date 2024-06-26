import { Component } from '@angular/core';
import { HttpServiceService } from 'src/app/services/common/http-service/http-service.service';
import { IsGrantedService } from 'src/app/services/common/is-granted/is-granted.service';
import { PublisherList, PublisherListElement} from '../interfaces';

@Component({
  selector: 'app-publishers-main-list',
  templateUrl: './publishers-main-list.component.html',
  styleUrls: ['./publishers-main-list.component.scss']
})
export class PublishersMainListComponent {
  public canListPublishers : boolean | undefined;
  public publishers: PublisherListElement[] = [];

  public constructor(private HttpServiceService : HttpServiceService, private isGrantedService : IsGrantedService) { }

  public ngOnInit() : void 
  {
    this.getList()
    this.setList()
  }

  private async getList() : Promise<void>
  {
    const isGranted = await this.isGrantedService.checkIfGuardCanActivate('CAN_LIST_PUBLISHERS');
    this.canListPublishers = isGranted
  }

  private setList() : void
  {
    this.HttpServiceService.getData('http://localhost/api/publisher/list')
    .subscribe((data: PublisherList ) => {
      data.results.forEach((element: PublisherListElement) => {

        this.isGrantedService.setPermission('CAN_SHOW_PUBLISHER', element, 'canShowPublisher', 'Publisher')
        this.isGrantedService.setPermission('CAN_EDIT_PUBLISHER', element, 'canEditPublisher', 'Publisher' )
        this.isGrantedService.setPermission('CAN_DELETE_PUBLISHER', element, 'canDeletePublisher', 'Publisher' )
        this.publishers.push(element);
        
      });
    });
  }
}
