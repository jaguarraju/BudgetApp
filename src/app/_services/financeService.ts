import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {of } from 'rxjs';
 import {HttpClient} from '@angular/common/http';
 import {finance} from '../_appData';

@Injectable({providedIn: 'root'})
export class financeService {
    ApiHost: string = "https://localhost:8085/api/";
//    ApiHost: string = "https://localhost:5001/api/";
     constructor(private http: HttpClient){}

    getIncomeList(count: number) : Observable<any> {
        return this.http.get(this.ApiHost + `Finance/IncomeList?Count=` + count);
    }

    getSpendingList(count: number) : Observable<any> {
        return this.http.get(this.ApiHost + `Finance/SpendingList?Count=` + count);
    }

    getPastMonthList(count: number) : Observable<any> {
        return this.http.get(this.ApiHost + `Finance/MonthList?Count=` + count);
    }

    getIncomeFList(count: number) : Observable<any> {
        return this.http.get(this.ApiHost + `Finance/IncomeForecastList?Count=` + count);
    }

    getSpendingFList(count: number) : Observable<any> {
        return this.http.get(this.ApiHost + `Finance/SpendingForecastList?Count=` + count);
    }

    getPastMonthFList(count: number) : Observable<any> {
        return this.http.get(this.ApiHost + `Finance/MonthForecastList?Count=` + count);
    }

    getCummulativeIncome() : Observable<any> {
        return this.http.get(this.ApiHost + `Finance/CummulativeIncome`);
    }

    getCummulativeSpending() : Observable<any> {
        return this.http.get(this.ApiHost + `Finance/CummulativeSpending`);
    }

    getCummulativeBalance() : Observable<any> {
        return this.http.get(this.ApiHost + `Finance/CummulativeBalance`);
    }

    saveTransaction(financeData: finance) : Observable<any>{
        return this.http.post(this.ApiHost + `Finance/SaveTransaction`, financeData, {responseType: 'text'});
    }

}