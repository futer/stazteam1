import { Injectable, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
    providedIn: 'root'
})
export class PdfGeneratorService {
    constructor() {}

    generatePDF(src: ElementRef): jsPDF {
        const doc = new jsPDF();

        let posX = 10;
        let posY = 10;
        const step = 10;
        const maxLength = 187;

        // let processed = 0;

        src.nativeElement.childNodes.forEach(node => {
          const width = doc.getTextDimensions(
                 node.textContent
               ).w;
          doc.text(node.textContent, posX, posY, {maxWidth: maxLength});
          posY = posY + (step * Math.ceil(width / maxLength));
        });

        // while (processed < src.nativeElement.childNodes.length) {
        //   const nodeWidth = doc.getTextDimensions(
        //     src.nativeElement.childNodes[processed].textContent
        //   );
        //   console.log(nodeWidth.w);
        //   // if (nodeWidth['w'] > maxLength) {
        //   //   src.nativeElement.childNodes[processed].splitText(maxLength);
        //   // }

        //   doc.text(src.nativeElement.childNodes[processed].textContent, posX, posY, {maxWidth: maxLength});
        //   // posY = posY + 10;
        //   processed++;
        // }

        return doc;
    }
}
