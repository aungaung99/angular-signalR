import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent implements AfterViewInit {
  @Input('classes') classes!: string[];
  @ViewChild('svg') svg!: ElementRef<any>;

  ngAfterViewInit(): void {
    for (let i = 0; i < this.classes.length; i++) {
      this.svg.nativeElement.classList.add(this.classes[i]);
    }
    console.log(this.svg.nativeElement);
  }
}
