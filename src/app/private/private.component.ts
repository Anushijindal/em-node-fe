import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-private',
  standalone: true,
  imports: [HeaderComponent,
    RouterModule,
    SidebarComponent,
    // BreadcrumbComponent,
    CommonModule,
    NgbCollapseModule,],
  templateUrl: './private.component.html',
  styleUrl: './private.component.scss'
})
export class PrivateComponent {
  navCollapsed!: boolean;
  navCollapsedMob!: boolean;

  // public method
  navMobClick() {
    if (
      this.navCollapsedMob &&
      !document
        .querySelector('app-navigation.pc-sidebar')
        ?.classList.contains('mob-open')
    ) {
      this.navCollapsedMob = !this.navCollapsedMob;
      setTimeout(() => {
        this.navCollapsedMob = !this.navCollapsedMob;
      }, 100);
    } else {
      this.navCollapsedMob = !this.navCollapsedMob;
    }
    if (
      document
        .querySelector('app-navigation.pc-sidebar')
        ?.classList.contains('navbar-collapsed')
    ) {
      document
        .querySelector('app-navigation.pc-sidebar')
        ?.classList.remove('navbar-collapsed');
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }

  closeMenu() {
    if (
      document
        .querySelector('app-navigation.pc-sidebar')
        ?.classList.contains('mob-open')
    ) {
      document
        .querySelector('app-navigation.pc-sidebar')
        ?.classList.remove('mob-open');
    }
  }
}
