import {AfterViewInit, Directive, ElementRef, Host, OnDestroy, OnInit, Optional, Renderer2, Self} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {Subject} from "rxjs";

@Directive({
  selector: '[appCustomPagination]',
  standalone: true,
})
export class CustomPaginationDirective implements OnInit, AfterViewInit, OnDestroy {

  public count?: number;
  private unsubscribe = new Subject();

  constructor(
    @Host() @Self() @Optional() private readonly matPag: MatPaginator,
    private readonly elementRef: ElementRef,
    private readonly ren: Renderer2,
  ) {}

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.styleDefaultPagination();
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  private styleDefaultPagination() {
    const nativeElement = this.elementRef.nativeElement;
    this.ren.setStyle(nativeElement, 'background', '#FFFFFF');

    const buttons = Array.from(nativeElement.querySelectorAll('.mat-mdc-icon-button'));
    buttons.forEach(button => {
      this.ren.setStyle(button, 'display', 'none');
    })

    const text = this.ren.createText(`Колличество выбранных записей:`);
    const tagDIV = this.ren.createElement('div');
    this.ren.appendChild(tagDIV, text);
    this.ren.appendChild(nativeElement.querySelector('.mat-mdc-paginator-container'), tagDIV);

    const itemsPerPage = nativeElement.querySelector('.mat-mdc-paginator-page-size-select');
    this.ren.setStyle(itemsPerPage, 'width', '65px');

    const itemsPerPageText = nativeElement.querySelector('.mdc-text-field');
    this.ren.setStyle(itemsPerPage, 'border-radius', '4px');
    this.ren.setStyle(itemsPerPage, 'border', '3px solid rgba(130, 140, 150, 0.40)');

    const numberOFPage = nativeElement.querySelector('.mat-mdc-form-field');
    const text2 = this.ren.createText(`записей:`);
    this.ren.appendChild(numberOFPage, text2);


    const textNumber = nativeElement.querySelector('.mat-mdc-select-value-text');


    // this.ren.setStyle(textNumber, 'color', '#666F78');
    // this.ren.setStyle(textNumber, 'font-size', '25px');
  }
}
