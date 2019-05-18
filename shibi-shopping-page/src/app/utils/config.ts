import { Headers } from '@angular/http';
import { UserService } from '../services/user.service';
import { DateFormatting } from './util';
import {environment} from '../../environments/environment';




/**
 *  Environment type configuration
 */


export class ApiConfig extends DateFormatting {
    static API_DEFAULT_URL = environment.API_URL.default;
    static API_KEY = environment.API_KEY;
    protected headers = { headers: this.setHeaders() };
    protected authToken: any;
    constructor(private myUserService: UserService) {
        super();
    }

 /**
 * This is used to Set Headers on before request
 * @returns {Headers}
 */
    protected setHeaders(): Headers {
        this.authToken = this.myUserService.getAuthUser();

        const headersConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        if (this.myUserService.isLoggedIn()) {
            headersConfig['Authorization'] = `${this.myUserService.getAuthUserToken()}`;
        }
        if (ApiConfig.API_KEY) {
          headersConfig['API-KEY'] = ApiConfig.API_KEY;
        }
        // if (ApiConfig.API_KEY) {
        //   headersConfig['API-KEY'] = ApiConfig.API_KEY;
        // }
        return new Headers(headersConfig);
    }



}

