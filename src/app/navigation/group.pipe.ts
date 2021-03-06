import {Pipe, PipeTransform, Injectable} from '@angular/core';
import {AuthenticationService} from '../session/authentication.service';
/**
 * Filter menu items depending on the current group
 */
@Pipe({
    name: 'groupFilter',
    pure: false
})
@Injectable()
export class GroupPipe implements PipeTransform {

    /**
     * Constructor
     * @param auth
     */
    constructor(private auth:AuthenticationService) {
    }

    /**
     * Filter the list of items
     * @param items
     * @param args
     * @returns {any[]}
     */
    transform(items:any[], args:any[]):any {
        // filter menu items array, items which match and return true will be kept, false will be filtered out
        var isLoggedIn = this.auth.isLoggedIn();

        return items.filter(item =>
        (item.groupRequired==undefined) || (item.groupRequired == 'user' && isLoggedIn) || (item.groupRequired == 'no-user' && !isLoggedIn));
    }
}