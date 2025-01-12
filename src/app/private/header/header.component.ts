import { CommonModule, NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  HostListener,
  OnInit,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgScrollbarModule, NgScrollbar } from 'ngx-scrollbar';
// import { BreadcrumbComponent } from '../../private/shared/components/breadcrumb/breadcrumb.component';
import {
  NgbCollapseModule,
  NgbDropdownModule,
  NgbModule,
  NgbNav,
  NgbNavModule,
  NgbNavOutlet,
} from '@ng-bootstrap/ng-bootstrap';
// import { CardComponent } from '../../private/shared/components/card/card.component';
import { IconModule, IconService } from '@ant-design/icons-angular';

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  SearchOutline,
} from '@ant-design/icons-angular/icons';
import {
  BellOutline,
  SettingOutline,
  GiftOutline,
  MessageOutline,
  PhoneOutline,
  CheckCircleOutline,
  LogoutOutline,
  EditOutline,
  UserOutline,
  ProfileOutline,
  WalletOutline,
  QuestionCircleOutline,
  LockOutline,
  CommentOutline,
  UnorderedListOutline,
  ArrowRightOutline,
  GithubOutline,
} from '@ant-design/icons-angular/icons';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user-service.service';
interface userProfileData{
  firstName:string;
  lastName:string;
  userRole:string;
}
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    NgScrollbar,
    NgbNavOutlet,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // BreadcrumbComponent,
    NgbDropdownModule,
    NgbNavModule,
    NgbModule,
    NgbCollapseModule,
    NgScrollbarModule,
    // CardComponent,
    IconModule,
    NgClass,
    NgbNav,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Input() navCollapsed!: boolean;
  @Output() NavCollapse = new EventEmitter();
  @Output() NavCollapsedMob = new EventEmitter();
  windowWidth: number;
  userProfile!: userProfileData;
  constructor(
    private iconService: IconService,
    private route: Router,
    private storage: StorageService,
    private userService: UserService
  ) {
    this.windowWidth = window.innerWidth;
    this.iconService.addIcon(
      ...[
        MenuUnfoldOutline,
        MenuFoldOutline,
        SearchOutline,
        CheckCircleOutline,
        GiftOutline,
        MessageOutline,
        SettingOutline,
        PhoneOutline,
        LogoutOutline,
        UserOutline,
        EditOutline,
        ProfileOutline,
        QuestionCircleOutline,
        LockOutline,
        CommentOutline,
        UnorderedListOutline,
        ArrowRightOutline,
        BellOutline,
        GithubOutline,
        WalletOutline,
      ]
    );
  }
  ngOnInit(): void {
    //this.userService.userData();
    this.userService.userProfileObservable.subscribe({
      next: (userProfile) => {
        this.userProfile = userProfile;
      },
      error: (err) => console.error('Error occurred:', err)
    });
  }  
  profile = [
    {
      icon: 'edit',
      title: 'Edit Profile',
      url: '/my-profile/updateProfile',
    },
    {
      icon: 'user',
      title: 'View Profile',
      url: '/my-profile',
    },
  ];

  setting = [
    {
      icon: 'question-circle',
      title: 'Support',
    },
    {
      icon: 'user',
      title: 'Account Settings',
    },
    {
      icon: 'lock',
      title: 'Change Password',
      url: '/my-profile/changePassword',
    },
    {
      icon: 'comment',
      title: 'Feedback',
    },
  ];
  navCollapse() {
    this.NavCollapse.emit();
  }
  profileLogout() {
    this.storage.logout();
    // localStorage.removeItem("profileToken");
    this.route.navigate(['/login']);
  }
}
