import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, SidenavComponent, MatIconModule, RouterModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  sidenavComponent = inject(SidenavComponent);

  toggleSidenav(): void {
    this.sidenavComponent.getDrawer().toggle();
  }
}
