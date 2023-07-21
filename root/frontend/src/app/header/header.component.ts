import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  menuItems: MenuItem[] = [];

  constructor(private router: Router, private currentRoute: ActivatedRoute, 
    private firebaseSerivce: FirebaseService) {

  }

  ngOnInit(): void {
    console.log('initialized')
    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        command: (() => {
          this.router.navigate(['/dashboard'], {relativeTo: this.currentRoute})
        })
      },
      {

        
        label: 'Track',
        icon: 'pi pi-pencil',
        command: (() => {
          this.router.navigate(['/tracking'], {relativeTo: this.currentRoute})
        })
      },
      {
        label: 'Settings',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: (() => {
              this.firebaseSerivce.logout()
              this.router.navigate(['/login'])
            })
          },
        ]
      },
      
    ]
  }

}
