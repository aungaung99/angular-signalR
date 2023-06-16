import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from "./pages/chat/chat.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './shared/auth-guard.service';
import { ConversationComponent } from './pages/chat/conversation/conversation.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: "full" },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  {
    path: 'chat',
    children: [
      { path: '', component: ChatComponent },
      {
        path: 'conversation', component: ConversationComponent, pathMatch: 'full'
      }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
