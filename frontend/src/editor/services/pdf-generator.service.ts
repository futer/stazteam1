import { Injectable, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import { PositionModel } from '../models/position.model';


@Injectable({
    providedIn: 'root'
})
export class PdfGeneratorService {
    constructor() {}

    generatePDF(src: ElementRef): jsPDF {
        const doc = new jsPDF();

        const position: PositionModel = {
          x: 10,
          y: 10
        };

        const maxLength = 187;

        src.nativeElement.childNodes.forEach(node => {
          switch (node.nodeName) {
            case '#text':
              doc.text(node.textContent, position.x, position.y, {maxWidth: maxLength});
              const textDimensions = doc.getTextDimensions(node.textContent);
              if (textDimensions.w > maxLength) {
                const multilines = Math.floor(textDimensions.w / maxLength);
                position.y = position.y + ((textDimensions.h + 0.84) * multilines);
                position.x = 10 + (textDimensions.w - maxLength * multilines) + 2.2;
              } else {
                position.x = position.x + textDimensions.w + 0.2;
              }
              doc.text('H', position.x, position.y, {maxWidth: maxLength});
              break;
            case 'BR':
              
              break;
            case 'B':
              
              break;
            case 'I':
              
              break;
            case 'U':
              
              break;

            default:
              break;
          }

          // const width = doc.getTextDimensions(node.textContent);
          // doc.text(node.textContent, position.x, position.y, {maxWidth: maxLength});
          // position.y = position.y + (10 * Math.ceil(width / maxLength));
        });

        return doc;
    }
}
