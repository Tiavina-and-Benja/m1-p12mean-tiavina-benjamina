import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    MaterialModule,
    MatBadgeModule
  ],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit{
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  role: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout();
    let defaultLogoutRoute = `/auth/login`;
    if (this.role !== 'user') defaultLogoutRoute += `/${this.role}`;
    this.router.navigate([defaultLogoutRoute]);
  }

  ngOnInit(): void {
    this.authService.role$.subscribe(role => {
      this.role = role;
    });
  }

}