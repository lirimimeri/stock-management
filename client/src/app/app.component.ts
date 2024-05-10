import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from './core/services/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  authenticationService = inject(AuthenticationService);
  title = 'market-client';

  ngOnInit(): void {
    this.authenticationService.storageAuthenticate();
  }

}
