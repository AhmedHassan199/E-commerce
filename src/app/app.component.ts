import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './shared/services/flowbite/flowbite.service';
import { NavbarComponent } from './layout/addtionals/navbar/navbar.component';
import { FooterComponent } from './layout/addtionals/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ecommerce';
  constructor(private flowbiteService: FlowbiteService) { }

  ngOnInit(): void {

    this.flowbiteService.loadFlowbite(flowbite => {

      console.log('Flowbite loaded', flowbite);
    });
  }

}
