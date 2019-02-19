import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavComponent } from './nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { DocumentModule } from 'src/document/document.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BookmarkEffect } from './store/bookmark/bookmark.effects';
import { UserModule } from 'src/user/user.module';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { EditorModule } from 'src/editor/editor.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { bookmarkReducer } from './store/bookmark/bookmark.reducers';
import { ReviewModule } from 'src/review/review.module';

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('316325069018310')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    NavComponent,
    MainComponent,
    SidebarComponent,
    ErrorPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    DocumentModule,
    UserModule,
    EditorModule,
    ReviewModule,
    StoreModule.forFeature('bookmarks', bookmarkReducer),
    EffectsModule.forFeature([BookmarkEffect]),
    SocialLoginModule,
  ],
  exports: [
    NavComponent,
    SidebarComponent
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ]
})
export class CoreModule { }
