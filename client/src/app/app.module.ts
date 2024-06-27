import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PublishersComponent } from './components/sections/publishers/publishers.component';
import { NavbarComponent } from './components/sections/common/navbar/navbar.component';
import { UserNavbarComponent } from './components/sections/common/navbar/user-navbar/user-navbar.component';

import { NotificationModelComponent } from './components/sections/common/navbar/user-navbar/notification-model/notification-model.component';
import { LoginComponent } from './components/sections/auth/login/login.component';
import { AuthNavbarComponent } from './components/sections/common/navbar/auth-navbar/auth-navbar.component';
import { ForgotPasswordComponent } from './components/sections/auth/forgot-password/forgot-password.component';
import { RegisterComponent } from './components/sections/auth/register/register.component';
import { FooterComponent } from './components/sections/auth/footer/footer.component';
import { TranslationService } from './services/common/translation/translation.service';
import { PublishersMainListComponent } from './components/sections/publishers/publishers-main-list/publishers-main-list.component';
import { DeveloperMainListComponent } from './components/sections/developer/developer-main-list/developer-main-list.component';
import { GamesMainListComponent } from './components/sections/games/games-main-list/games-main-list.component';
import { MainComponentComponent } from './components/sections/main-component/main-component.component';
import { AddPublishersButtonComponent } from './components/sections/publishers/add-publishers-button/add-publishers-button.component';
import { ShowPublisherComponent } from './components/sections/publishers/show-publisher/show-publisher.component';
import { AddPublishersComponent } from './components/sections/publishers/add-publishers/add-publishers.component';
import { UserProfileModalComponent } from './components/sections/common/navbar/user-navbar/user-profile-modal/user-profile-modal.component';
import { MessagesModelComponent } from './components/sections/common/navbar/user-navbar/messages-model/messages-model.component';
import { ShowPublisherGeneralInformationComponent } from './components/sections/publishers/show-publisher/show-publisher-genral-information/show-publisher-general-information.component';
import { EditPublisherGeneralInformationComponent } from './components/sections/publishers/edit-publisher/edit-publisher-general-information/edit-publisher-general-information.component';
import { ShowDescriptionComponent } from './components/sections/publishers/show-publisher/show-description/show-description.component';
import { EditPublisherDescriptionsComponent } from './components/sections/publishers/edit-publisher/edit-publisher-descriptions/edit-publisher-descriptions.component';



@NgModule({
  declarations: [
    AppComponent,
    PublishersComponent,
    NavbarComponent,
    UserNavbarComponent,
    UserProfileModalComponent,
    MessagesModelComponent,
    NotificationModelComponent,
    LoginComponent,
    AuthNavbarComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    FooterComponent,
    PublishersMainListComponent,
    DeveloperMainListComponent,
    GamesMainListComponent,
    MainComponentComponent,
    AddPublishersButtonComponent,
    ShowPublisherComponent,
    AddPublishersComponent,
    ShowPublisherGeneralInformationComponent,
    EditPublisherGeneralInformationComponent,
    ShowDescriptionComponent,
    EditPublisherDescriptionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [TranslationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
