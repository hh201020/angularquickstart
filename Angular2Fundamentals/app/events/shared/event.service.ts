import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/RX'
import { IEvent, ISession } from './event.model'
import { Http, Response } from '@angular/http'

@Injectable()
export class EventService {

  constructor(private http: Http) {}

  getEvents():Observable<IEvent[]> {
    return this.http.get("/api/events").map((response: Response) => {
      return <IEvent[]>response.json();
    }).catch(this.handleError);
  }

  getEvent(id:number):Observable<IEvent> {
    return this.http.get("/api/events/" + id).map((response: Response) => {
        return <IEvent>response.json();
    }).catch(this.handleError);
  }

  saveEvent(event) {
    event.id = 999
    event.session = []
    EVENTS.push(event)
  }

  updateEvent(event) {
    let index = EVENTS.findIndex(x => x.id = event.id)
    EVENTS[index] = event
  }
  
  searchSessions(searchTerm: string) {
    var term = searchTerm.toLocaleLowerCase();
    var results: ISession[] = [];

    EVENTS.forEach(event => {
      var matchingSessions = event.sessions.filter(session => session.name.toLocaleLowerCase().indexOf(term) > -1);
      matchingSessions = matchingSessions.map((session:any) => {
        session.eventId = event.id;
        return session;
      })
      results = results.concat(matchingSessions);
    })

    var emitter = new EventEmitter(true);
    setTimeout(() => {
      emitter.emit(results);
    }, 100);
    return emitter;
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}

const EVENTS:IEvent[] = []