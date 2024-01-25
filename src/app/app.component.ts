import { Component, OnInit, isDevMode } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  isDevMode = isDevMode();
  title = 'SignalRClient';
  private hubConnectionBuilder!: HubConnection;
  offers: any[] = [];

  get isLoggedIn(): boolean {
    return !!this.authService.authToken;
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  showToast() {
    this.messageService.add({
      severity: 'success',
      summary: 'Data updated',
      detail: 'More details in the list....',
    });
  }

  ngOnInit(): void {
    this.hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl(`${environment.apiUrl}offers`, {
        accessTokenFactory: () => this.authService.authToken!,
      })
      .configureLogging(LogLevel.Information)
      .build();
    this.hubConnectionBuilder
      .start()
      .then(() => console.log('Connection started.......!'))
      .catch((err) => console.log('Error while connect with server', err));
    this.hubConnectionBuilder.on('SendOffersToUser', (result: any) => {
      this.offers.push(result);
    });
    this.hubConnectionBuilder.on('SendToUser', (msg) => {
      console.log('[ userSpecificErrorReceived ]', msg);
      this.showToast();
    });

    // Websockets playground to be removed
    this.authService
      .handshake('Bearer ' + this.authService.authToken!)
      .subscribe((dt) => console.log('[handshake]', dt));
    const ws = new WebSocket('wss://localhost:7220/ws');
    ws.addEventListener('open', (event) => {
      // socket.send("Hello Server!");
      console.log('[[ onOpen ]]', event);
    });
    ws.onopen = () => {
      // ws.send(JSON.stringify(this.authService.authToken));
      console.log('[[ authToken ]]', this.authService.authToken);

      ws.send(
        JSON.stringify({
          type: 'auth',
          token: this.authService.authToken,
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'auth-success') {
        console.log('Authentication successful!');
      } else {
        console.error('Authentication failed.');
        // Handle authentication failure as needed
      }
    };

    ws.onclose = (event) => {
      // Handle connection close
      console.log(`Connection closed: ${event.code} - ${event.reason}`);
    };

    ws.onerror = (err) => {
      console.log('[ wsConnectionError ]', err);
    };
    ws.onmessage = function (event) {
      console.log('receivedMessage', event);
    };

    setTimeout(() => {
      ws.close();
    }, 100000);
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

  public sendMessage() {
    this.authService.sendMessage(this.authService.authToken!).subscribe();
  }
}
