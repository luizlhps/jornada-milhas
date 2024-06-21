import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appTruncateText]',
})
export class TruncateTextDirective implements OnChanges {
  @Input() maxLines: number = 3;
  @Input() truncate: boolean = true;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('truncate' in changes || 'maxLines' in changes) {
      this.applyTruncation(this.el.nativeElement, this.maxLines, this.truncate);
    }
  }

  private applyTruncation(
    element: HTMLElement,
    maxLines: number,
    truncate: boolean
  ) {
    if (truncate) {
      const lineHeight = parseFloat(
        window.getComputedStyle(element).lineHeight
      );
      const maxHeight = lineHeight * maxLines;

      this.renderer.setStyle(element, 'display', '-webkit-box');
      this.renderer.setStyle(element, '-webkit-box-orient', 'vertical');
      this.renderer.setStyle(
        element,
        '-webkit-line-clamp',
        maxLines.toString()
      );
      this.renderer.setStyle(element, 'overflow', 'hidden');
      this.renderer.setStyle(element, 'max-height', `${maxHeight}px`);
    } else {
      this.renderer.removeStyle(element, 'display');
      this.renderer.removeStyle(element, '-webkit-box-orient');
      this.renderer.removeStyle(element, '-webkit-line-clamp');
      this.renderer.removeStyle(element, 'overflow');
      this.renderer.removeStyle(element, 'max-height');
    }
  }
}
