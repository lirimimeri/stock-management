import { Injectable } from "@angular/core";

type Environments = "DEV";

export interface Server {
  url: string;
  protocol: string;
  name: string;
}

const SERVERS: {[key in Environments]: Server} = {
  DEV: {
    url: 'localhost:4000',
    protocol: 'http://',
    name: 'development'
  }
};

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private _currentServer;
  constructor() {
    switch(window.location.host) {
      case 'localhost':
      case 'localhost:4200':
        this._currentServer = SERVERS['DEV'];
        break;
      default:
        this._currentServer = SERVERS['DEV'];
    }
  }

  get server(): Server {
    return this._currentServer;
  }
}