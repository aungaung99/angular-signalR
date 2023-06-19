import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './pages/chat/chat.component';
import { HomeComponent } from './pages/home/home.component';
import { ChatService } from "./core/services/chat.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthInterceptor } from "./core/services/auth.interceptor";
import { ConversationComponent } from './pages/chat/conversation/conversation.component';
import { LoginComponent } from './pages/login/login.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { AuthService } from './core/services/auth.service';
import { SignalRService } from './core/services/signal-r.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatSkeletonComponent } from './shared/components/chat-skeleton/chat-skeleton.component';
import { DateTimeComponent } from './shared/components/date-time/date-time.component';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { UiDirective } from './shared/directives/ui.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent,
    ConversationComponent,
    LoginComponent,
    ToastComponent,
    ChatSkeletonComponent,
    DateTimeComponent,
    SpinnerComponent,
    UiDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ChatService, AuthService, SignalRService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
