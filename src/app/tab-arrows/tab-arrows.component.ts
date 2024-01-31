import { Router, RouterModule } from '@angular/router';
import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  AfterContentInit,
  AfterViewChecked,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { OutputFileType } from 'typescript';

@Component({
  selector: 'app-tab-arrows',
  templateUrl: './tab-arrows.component.html',
  styleUrls: ['./tab-arrows.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TabArrowsComponent implements AfterViewInit {
  showArrowLeft = false;
  showArrowRight = false;

  get navigation(): HTMLElement {
    return document.getElementById('items') as HTMLElement;
  }

  constructor() {}

  selectedClasses() {
    return 'text-primary text-bold selected-sub-tab';
  }

  selectItem(i: number) {
    var navigation = this.navigation;
    let selectedItem = navigation.children[i] as HTMLElement;
    const parentRect = navigation.getBoundingClientRect();
    const rect = selectedItem.getBoundingClientRect();

    const target = Math.round(
      selectedItem.offsetLeft - parentRect.width * 0.5 + rect.width * 0.5
    );

    this.scrollNavbar(target);
  }

  scrollNavbar(tgt: number) {
    var navigation = this.navigation;
    let target = tgt;

    const max = navigation.scrollWidth - navigation.clientWidth;
    if (target < 0) {
      target = 0;
    }
    if (target > max) {
      target = max;
    }

    navigation.scrollLeft = tgt;
  }

  calculateArrows() {
    if (!this.navigation) return;
    var navigation = this.navigation;
    this.hideAndShowArrows(navigation);
    navigation.addEventListener('scroll', (_) => {
      this.hideAndShowArrows(navigation);
    });
  }
  hideAndShowArrows(navigation: any) {
    if (!navigation) return;
    if (navigation.clientWidth == 0) {
      navigation = this.navigation;
      setTimeout((_: any) => this.hideAndShowArrows(navigation), 100);
    } else {
      this.showArrowLeft = navigation.scrollLeft > 0;
      this.showArrowRight =
        Math.abs(navigation.scrollLeft) <=
        navigation.scrollWidth - navigation.clientWidth - 5; //added extra 5 as this seems to sometimes never get to high enough value to hide arrow
    }
  }

  moveNav(byX: number) {
    var navigation = this.navigation;
    navigation.scrollLeft = navigation.scrollLeft + byX;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateArrows();
    }, 0);
  }
}
