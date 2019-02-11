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
              // write text, collapse if too long
              doc.text(node.textContent, position.x, position.y, {maxWidth: maxLength});

              // move pointer
              const textDimensions = doc.getTextDimensions(node.textContent);
              if (textDimensions.w > maxLength) {
                const multilines = Math.floor(textDimensions.w / maxLength);
                position.y = position.y + (6.48 * multilines);
                position.x = 10 + (textDimensions.w - maxLength * multilines) + 2.2;
              } else {
                position.x = position.x + textDimensions.w + 0.2;
              }

              break;
            case 'BR':
              position.x = 10;
              position.y = position.y + 6.48;
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
        });

        return doc;
    }
}
