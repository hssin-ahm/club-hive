import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2,
  Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import MetisMenu from 'metismenujs';

import { MENU } from './menu';
import { MenuItem } from './menu.model';
import { Router, NavigationEnd } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('sidebarToggler') sidebarToggler: ElementRef;

  menuItems: MenuItem[] = [];
  @ViewChild('sidebarMenu') sidebarMenu: ElementRef;

  userRole: string;

  constructor(
   
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    router: Router,
    private service: JwtService
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        /**
         * Activating the current active item dropdown
         */
        this._activateMenuDropdown();

        /**
         * closing the sidebar
         */
        if (window.matchMedia('(max-width: 991px)').matches) {
          this.document.body.classList.remove('sidebar-open');
        }
      }
    });

  }

  
  getMenuItemsForRole(role: string): MenuItem[] {
    if (role === 'ADMIN') {
      return MENU;
    } else {
      // Filter out the 'Requests users' item for non-admin users
      return MENU.map(item => {
        if (item.label === 'Liste des invitations') {
          return {
            ...item,
            subItems: item.subItems.filter(subItem => subItem.label !== 'Requests users')
          };
        } else {
          return item;
        }
      });
    }
  }
  ngOnInit(): void {
    //this.document.body.classList.add('sidebar-dark');
    this.menuItems = MENU;
    let eventItems= {
      label: 'Events',
      icon: 'activity',
      link: '/events'
    }
    let clubItem= {
      label: 'Clubs',
      icon: 'command',
      link: '/apps/clublisttojoin'

    }
    let memberItem=  {
      label: 'My Memberships',
      icon: 'target',
      link : '/apps/clubs'
    
    }
    let roleItem:MenuItem[]= [ 
     {
      label: 'Liste des invitations',
      icon: 'layout',
      subItems: [
        {
          label: 'Requests users',
          link: '/users/request_users'
        }
      ]},
     { label: 'Clubs Managment',
      icon: 'slack',
      subItems: [
        {
          label: 'Add a Club',
          link: '/apps/club/create',
        },
        {
          label: 'Clubs List',
          link: '/apps/clubadminsite'
        },
       
      ]},
      {
        label:'Event admin',
        icon:'activity',
        link:'/eventdetailsadmin'
      }
    ]
    let presedentItem: MenuItem[] = [
      {
        label: 'Responsable',
        isTitle: true
      },
      {
        label: 'My Club',
        icon: 'eye', // replace with the correct icon
        link: '/apps/clublistadmin'
      },
      {
        label: 'Departments',
        icon: 'layers', // replace with the correct icon
        link: '/apps/departments'
      },
      {
        label: 'Tresory',
        icon: 'dollar-sign', // replace with the correct icon
        link: '/apps/finances'
      },
      {
        label: 'Members List',
        icon: 'users', // replace with the correct icon
        link: '/apps/members',
      },
      {
        label: 'Add Member',
        icon: 'user-plus', // replace with the correct icon
        link: '/apps/member/create',
      },
      {
        label: 'Requests',
        icon: 'inbox', // replace with the correct icon
        link: '/apps/requestlist'
      },
      {
        label: 'Quizzes',
        icon: 'clipboard', // replace with the correct icon
        link: '/apps/test'
      },
      {
        label: 'Events',
        icon: 'calendar', // replace with the correct icon
        link: '/eventform'
      },
    ];
  let idClub = localStorage.getItem("idClub");
  if(localStorage.getItem("Role")=="RESPONSABLE"){
    let position = 2; 
    this.menuItems.splice(position, 0, ...presedentItem);
    //this.menuItems.splice(position, 0, memberItem);
    //this.menuItems.splice(position, 0, clubItem);

  }
  let role = localStorage.getItem("Role");
  if(role=="ADMIN")
    {
         let position = 2;
          this.menuItems.splice(position, 0,... roleItem);
    }
    else{
      let position = 2;
      this.menuItems.splice(position, 0, memberItem);
      this.menuItems.splice(position, 0, clubItem);
      this.menuItems.splice(position, 0, eventItems);
    }


    /**
     * Sidebar-folded on desktop (min-width:992px and max-width: 1199px)
     */
    const desktopMedium = window.matchMedia(
      '(min-width:992px) and (max-width: 1199px)'
    );
    desktopMedium.addEventListener('change', () => {
      this.iconSidebar;
    });
    this.iconSidebar(desktopMedium);
  }

  ngAfterViewInit() {
    // activate menu item
    new MetisMenu(this.sidebarMenu.nativeElement);

    this._activateMenuDropdown();
  }

  /**
   * Toggle sidebar on hamburger button click
   */
  toggleSidebar(e: Event) {
    this.sidebarToggler.nativeElement.classList.toggle('active');
    this.sidebarToggler.nativeElement.classList.toggle('not-active');
    if (window.matchMedia('(min-width: 992px)').matches) {
      e.preventDefault();
      this.document.body.classList.toggle('sidebar-folded');
    } else if (window.matchMedia('(max-width: 991px)').matches) {
      e.preventDefault();
      this.document.body.classList.toggle('sidebar-open');
    }
  }

  /**
   * Toggle settings-sidebar
   */
  toggleSettingsSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('settings-open');
  }

  /**
   * Open sidebar when hover (in folded folded state)
   */
  operSidebarFolded() {
    if (this.document.body.classList.contains('sidebar-folded')) {
      this.document.body.classList.add('open-sidebar-folded');
    }
  }

  /**
   * Fold sidebar after mouse leave (in folded state)
   */
  closeSidebarFolded() {
    if (this.document.body.classList.contains('sidebar-folded')) {
      this.document.body.classList.remove('open-sidebar-folded');
    }
  }

  /**
   * Sidebar-folded on desktop (min-width:992px and max-width: 1199px)
   */
  iconSidebar(mq: MediaQueryList) {
    if (mq.matches) {
      this.document.body.classList.add('sidebar-folded');
    } else {
      this.document.body.classList.remove('sidebar-folded');
    }
  }

  /**
   * Switching sidebar light/dark
   */ 

  onSidebarThemeChange(event: Event) {
    
    this.document.body.classList.remove('sidebar-light', 'sidebar-dark');
    this.document.body.classList.add((<HTMLInputElement>event.target).value);
    this.document.body.classList.remove('settings-open');
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  /**
   * Reset the menus then hilight current active menu item
   */
  _activateMenuDropdown() {
    this.resetMenuItems();
    this.activateMenuItems();
  }

  /**
   * Resets the menus
   */
  resetMenuItems() {
    const links = document.getElementsByClassName('nav-link-ref');

    for (let i = 0; i < links.length; i++) {
      const menuItemEl = links[i];
      menuItemEl.classList.remove('mm-active');
      const parentEl = menuItemEl.parentElement;

      if (parentEl) {
        parentEl.classList.remove('mm-active');
        const parent2El = parentEl.parentElement;

        if (parent2El) {
          parent2El.classList.remove('mm-show');
        }

        const parent3El = parent2El?.parentElement;
        if (parent3El) {
          parent3El.classList.remove('mm-active');

          if (parent3El.classList.contains('side-nav-item')) {
            const firstAnchor = parent3El.querySelector('.side-nav-link-a-ref');

            if (firstAnchor) {
              firstAnchor.classList.remove('mm-active');
            }
          }

          const parent4El = parent3El.parentElement;
          if (parent4El) {
            parent4El.classList.remove('mm-show');

            const parent5El = parent4El.parentElement;
            if (parent5El) {
              parent5El.classList.remove('mm-active');
            }
          }
        }
      }
    }
  }

  /**
   * Toggles the menu items
   */
  activateMenuItems() {
    const links: any = document.getElementsByClassName('nav-link-ref');

    let menuItemEl = null;

    for (let i = 0; i < links.length; i++) {
      // tslint:disable-next-line: no-string-literal
      if (window.location.pathname === links[i]['pathname']) {
        menuItemEl = links[i];

        break;
      }
    }

    if (menuItemEl) {
      menuItemEl.classList.add('mm-active');
      const parentEl = menuItemEl.parentElement;

      if (parentEl) {
        parentEl.classList.add('mm-active');

        const parent2El = parentEl.parentElement;
        if (parent2El) {
          parent2El.classList.add('mm-show');
        }

        const parent3El = parent2El.parentElement;
        if (parent3El) {
          parent3El.classList.add('mm-active');

          if (parent3El.classList.contains('side-nav-item')) {
            const firstAnchor = parent3El.querySelector('.side-nav-link-a-ref');

            if (firstAnchor) {
              firstAnchor.classList.add('mm-active');
            }
          }

          const parent4El = parent3El.parentElement;
          if (parent4El) {
            parent4El.classList.add('mm-show');

            const parent5El = parent4El.parentElement;
            if (parent5El) {
              parent5El.classList.add('mm-active');
            }
          }
        }
      }
    }
  }
}
