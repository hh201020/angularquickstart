import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'event-thumbnail',
  template: `
    <div class="well hoverwell thumbnail">
      <h2>{{event?.name}}</h2>
      <div>Date: {{event?.date}}</div>
      <div>Time: {{event?.time}}</div>
      <div>Price: \${{event?.price}}</div>
      <div *ngIf="event?.location">
        <span>Location: {{event?.location?.address}}</span>
        <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
      </div>
      <div [hidden]="!event?.onlineUrl">
        Online URL: {{event?.onlineUrl}}
      </div>
      <button class="btn btn-primary" (click)="handleClickMe()">Click Me!</button>
    </div>
  `,
  styles: [`
    .thumbnail { min-height: 220px; }
    .pad-left { margin-left: 10px; }
    .well div { color: #bbb; }
  `]
})
export class EventThumbnailComponent {
  @Input() event: any
  @Output() eventClick = new EventEmitter()
  someProperty: any = "some property"

  handleClickMe() {
    console.log('clicked!');
    this.eventClick.emit('from output: ' + this.event.name);
  }

  logFoo() {
    console.log('from template variable: ' + this.event.name);
  }
}