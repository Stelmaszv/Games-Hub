import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { IsGrantedService } from 'src/app/services/common/is-granted/is-granted.service';

@Injectable({
  providedIn: 'root'
})
export class CanEditPublisherGuard implements CanActivate {
  constructor(private isGrantedService : IsGrantedService){}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {
    const isGranted = await this.isGrantedService.checkIfGuardCanActive('CAN_EDIT_PUBLISHER', 'Publisher', Number(route.paramMap.get('id')));
    return isGranted;
}

}
