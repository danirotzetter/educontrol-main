import {Injectable} from '@angular/core';
import {MenuItem} from './menu-item';

/**
 * Provide menu functions
 */
@Injectable()
export class MenuProvider {

    /**
     * Array of menu items
     * @type {Array}
     */
    private menu:Array<MenuItem>;

    constructor() {
        /**
         * Set up the menu
         */
        this.menu = [new MenuItem(
            'home',
            '/home',
            'Home',
            'Home page'
        ),
            new MenuItem(
                'settings',
                '',
                'Administration',
                'Manage items and lists',
                [
                    new MenuItem(
                        'my_library_books',
                        '/projects',
                        'Projects',
                        'Manage projects',
                        undefined,
                        'user')
                    ,
                    new MenuItem(
                        'public',
                        '/regions',
                        'Regions',
                        'Manage regions',
                        undefined,
                        'user')
                    ,
                    new MenuItem(
                        'zoom_out_map',
                        '/districts',
                        'Districts',
                        'Manage districts',
                        undefined,
                        'user')
                    ,
                    new MenuItem(
                        'school',
                        '/schools',
                        'Schools',
                        'Manage schools',
                        undefined,
                        'user')
                    ,
                    new MenuItem(
                        'poll',
                        '/metrics',
                        'Metrics',
                        'Manage metrics',
                        undefined,
                        'user')
                    ,
                    new MenuItem(
                        'account_circle',
                        '/profile',
                        'Profile',
                        'Manage Profile',
                        undefined,
                        'user')
                ],
                'user')
            ,
            new MenuItem(
                'assignment',
                '/values',
                'M & E',
                'Activities, alerts, metrics',
                [
                    new MenuItem(
                        'functions',
                        '/values',
                        'Values',
                        'Overview of values',
                        undefined,
                        'user'),
                    new MenuItem(
                        'mode_edit',
                        '/values/capture',
                        'Capture',
                        'Manage values',
                        undefined,
                        'user')
                ],
                'user')
            ,
            new MenuItem(
                'vpn_key',
                '/login',
                'Login',
                undefined,
                undefined,
                'no-user')
            ,
            new MenuItem(
                'exit_to_app',
                '/logout',
                'Logout',
                undefined,
                undefined,
                'user')
        ]
    }


    /**
     * Get the menu
     * @returns {Array}
     */
    getMenu():Array<MenuItem> {
        return this.menu;
    }
}