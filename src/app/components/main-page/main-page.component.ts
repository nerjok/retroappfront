import { Component } from '@angular/core';
import { Timeline } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


interface EventItem {
    status?: string;
    date?: string;
    icon?: string;
    color?: string;
    image?: string;
    description?: string;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  standalone: true,
  imports: [Timeline, CardModule, ButtonModule, FontAwesomeModule]

})
export class MainPageComponent {
  faEdit = faEdit;
    events: EventItem[];

    constructor() {
        this.events = [
            { status: 'New', description: "The task has been created but work hasn’t started yet.", date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
            { status: 'In Progress', description:'Work on the task is currently underway.', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
            { status: 'Blocked', description: 'Progress on the task is halted due to an issue or dependency.', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
            { status: 'Finished',description: 'The task has been completed successfully.', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
        ];
    }
}
