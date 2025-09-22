import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { Router } from '@angular/router';
import { Menu } from '../core/model/menu';
import { User } from '../core/model/user';
import { AuthenticationService } from '../core/service/authentication.service';
import { AdminService } from '../core/service/admin.service';

declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}
//Menu Items
export const ROUTES_FACTURERO: RouteInfo[] = [{
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard'
}, {
    path: '/product',
    title: 'Products',
    type: 'link',
    icontype: 'widgets'

}, {
    path: '/customer',
    title: 'Customers',
    type: 'link',
    icontype: 'timeline'

}, {
    path: '/invoice',
    title: 'Invoices',
    type: 'link',
    icontype: 'date_range'
}
];

//Menu Items
export const ROUTES: RouteInfo[] = [{
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard'
}, {
    path: '/invoicing',
    title: 'Facturacion',
    type: 'sub',
    icontype: 'store',
    collapse: 'invoicing',
    children: [
        { path: 'product', title: 'Products', ab: 'P' },
        { path: 'customer', title: 'Customers', ab: 'C' },
        { path: 'establishment', title: 'Establishments', ab: 'E' },
        { path: 'invoice', title: 'Invoices', ab: 'I' },
        { path: 'user', title: 'Users', ab: 'U' }
    ]

}, {
    path: '/components',
    title: 'Components',
    type: 'sub',
    icontype: 'apps',
    collapse: 'components',
    children: [
        { path: 'buttons', title: 'Buttons', ab: 'B' },
        { path: 'grid', title: 'Grid System', ab: 'GS' },
        { path: 'panels', title: 'Panels', ab: 'P' },
        { path: 'sweet-alert', title: 'Sweet Alert', ab: 'SA' },
        { path: 'notifications', title: 'Notifications', ab: 'N' },
        { path: 'icons', title: 'Icons', ab: 'I' },
        { path: 'typography', title: 'Typography', ab: 'T' }
    ]
}, {
    path: '/forms',
    title: 'Forms',
    type: 'sub',
    icontype: 'content_paste',
    collapse: 'forms',
    children: [
        { path: 'regular', title: 'Regular Forms', ab: 'RF' },
        { path: 'extended', title: 'Extended Forms', ab: 'EF' },
        { path: 'validation', title: 'Validation Forms', ab: 'VF' },
        { path: 'wizard', title: 'Wizard', ab: 'W' }
    ]
}, {
    path: '/tables',
    title: 'Tables',
    type: 'sub',
    icontype: 'grid_on',
    collapse: 'tables',
    children: [
        { path: 'regular', title: 'Regular Tables', ab: 'RT' },
        { path: 'extended', title: 'Extended Tables', ab: 'ET' },
        { path: 'datatables.net', title: 'Datatables.net', ab: 'DT' }
    ]
}, {
    path: '/maps',
    title: 'Maps',
    type: 'sub',
    icontype: 'place',
    collapse: 'maps',
    children: [
        { path: 'google', title: 'Google Maps', ab: 'GM' },
        { path: 'fullscreen', title: 'Full Screen Map', ab: 'FSM' },
        { path: 'vector', title: 'Vector Map', ab: 'VM' }
    ]
}, {
    path: '/widgets',
    title: 'Widgets',
    type: 'link',
    icontype: 'widgets'

}, {
    path: '/charts',
    title: 'Charts',
    type: 'link',
    icontype: 'timeline'

}, {
    path: '/calendar',
    title: 'Calendar',
    type: 'link',
    icontype: 'date_range'
}, {
    path: '/pages',
    title: 'Pages',
    type: 'sub',
    icontype: 'image',
    collapse: 'pages',
    children: [
        { path: 'pricing', title: 'Pricing', ab: 'P' },
        { path: 'timeline', title: 'Timeline Page', ab: 'TP' },
        { path: 'login', title: 'Login Page', ab: 'LP' },
        { path: 'register', title: 'Register Page', ab: 'RP' },
        { path: 'lock', title: 'Lock Screen Page', ab: 'LSP' },
        { path: 'user', title: 'User Page', ab: 'UP' }
    ]
}
];
@Component({
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: Menu[];
    ps: any;
    user: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private adminService: AdminService
    ) {

    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        //this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.adminService.getMenu().subscribe(menus => this.menuItems = menus);
        this.user = this.authenticationService.currentUserValue;
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            this.ps = new PerfectScrollbar(elemSidebar);
        }
    }
    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this.ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }


    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/pages/login']);
    }
}
