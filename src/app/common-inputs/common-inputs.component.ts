import { RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { add, parseISO } from 'date-fns';

@Component({
  selector: '[appCommonInputs]',
  templateUrl: './common-inputs.component.html',
  styleUrls: ['./common-inputs.component.scss'],
  standalone: true,
  imports: [CommonModule, NgIf, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CommonInputsComponent implements OnInit {
  notificationSettings = {
    manualNotifications: false,
    useHostToastrStyles: false,
  };
  ngOnInit() {}
}
