import { Component, OnInit } from '@angular/core';
import { appData, menuItem } from '../_appData';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  appData = appData;
  constructor() { 
    this.menuList = [
      { icon: 'list_alt', text: 'Dashboard', path: 'Dashboard'},
      { icon: 'create', text: 'Add Data', path: 'AddData'},
    ];
  }

  ngOnInit(): void {
  }
menuList: menuItem[];
}
