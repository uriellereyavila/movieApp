import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from "@angular/platform-browser";

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    // switch (type) {
    //   case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
    //   case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
    //   case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
    //   case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
    //   case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
    //   default: throw new Error(`Invalid safe type specified: ${type}`);
    // }
  }

}
