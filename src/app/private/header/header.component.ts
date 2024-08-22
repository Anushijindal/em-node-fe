import { CommonModule, NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  HostListener,
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
import { UserServiceService } from '../../services/user-service.service';
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
export class HeaderComponent {
  @Input() navCollapsed!: boolean;
  @Output() NavCollapse = new EventEmitter();
  @Output() NavCollapsedMob = new EventEmitter();
  windowWidth: number;
  loggedUser: any;
  constructor(
    private iconService: IconService,
    private route: Router,
    private storage: StorageService,
    private userService: UserServiceService
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
    // this.user()
    console.log(this.userService.loggedUser);
    const data = this?.userService?.loggedUser;
    console.log('huibw4tu', data?.source);
    console.log(this.userService.userData());
    this.userService.loggedUser.subscribe(
      user=>console.log(user)
      
    );
    console.log(this.loggedUser)
    // console.log(userService.user)
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
  // user(){
  //   console.log(this.userService?.loggedUser);
  //   const data=this.userService?.userData();
  //   console.log(data)
  // }
  // ngOnInit(){
  //   this.userService.loggedUser.subscribe(
  //     loggedUser=>this.loggedUser=loggedUser
  //   );
  //   console.log(this.loggedUser);
  // }
}
