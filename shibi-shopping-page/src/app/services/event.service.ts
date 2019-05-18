import {Injectable} from '@angular/core';
import * as Rx from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class EventsService {
  public refreshStatus = new Subject();
  listeners: any;
  eventsSubject: any;
  events;

  constructor() {
    this.listeners = {};
    this.eventsSubject = new Rx.Subject();


    this.events = Rx.Observable.from(this.eventsSubject);

    this.events.subscribe(
      ({name, args}) => {
        if (this.listeners[name]) {
          for (const listener of this.listeners[name]) {
            listener(...args);
          }
        }
      });
  }

  on(name, listener) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
      this.listeners[name].push(listener);
    }
    if (this.listeners[name]) {
        this.listeners[name][0] = listener;
    }
  }

  broadcast(name, ...args) {
    // //console.log('name=', name);
    this.eventsSubject.next({
      name,
      args
    });
  }

}
