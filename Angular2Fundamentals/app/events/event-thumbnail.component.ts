import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'event-thumbnail',
  template: `
    <div class="well hoverwell thumbnail">
      <h2>{{event.name}}</h2>
      <div>Date: {{event.date}}</div>
      <div>Time: {{event.time}}</div>
      <div>Price: \${{event.price}}</div>
      <div>
        <span>Location: {{event.location.address}}</span>
        <span>&nbsp:</span>
        <span>{{event.location.city}}, {{event.location.country}}</span>
      </div>
      <button class="btn btn-primary" (click)="handleClickMe()">Click Me!</button>
    </div>
  `
})
export class EventThumbnailComponent {
  @Input() event:any
  @Output() eventClick = new EventEmitter()

  handleClickMe() {
    console.log('clicked!');
    this.eventClick.emit('from output: ' + this.event.name);
  }

  logFoo(){
    console.log('from template variable: ' + this.event.name);
  }
}