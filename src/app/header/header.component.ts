import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authSercive: AuthService){}

  ngOnInit() {
    this.userIsAuthenticated = this.authSercive.getIsAuth();
    this.authListenerSubs = this.authSercive
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onLogout() {
    this.authSercive.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
