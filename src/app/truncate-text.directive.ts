import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  AfterViewInit,
} from '@angular/core';

@Directive({
  selector: '[appTruncateText]',
})
export class TruncateTextDirective implements AfterViewInit {
  @Input() maxLines: number = 3;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const element = this.el.nativeElement;
    this.applyTruncation(element, this.maxLines);
  }

  private applyTruncation(element: HTMLElement, maxLines: number) {
    console.log(window.getComputedStyle(element).lineHeight);

    const lineHeight = parseFloat(window.getComputedStyle(element).lineHeight);
    const maxHeight = lineHeight * maxLines;

    this.renderer.setStyle(element, 'display', '-webkit-box');
    this.renderer.setStyle(element, '-webkit-box-orient', 'vertical');
    this.renderer.setStyle(element, '-webkit-line-clamp', maxLines.toString());
    this.renderer.setStyle(element, 'overflow', 'hidden');
    this.renderer.setStyle(element, 'max-height', `${maxHeight}px`);
  }
}
