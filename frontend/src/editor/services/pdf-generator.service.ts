import { Injectable, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import { PositionModel } from '../models/position.model';


@Injectable({
    providedIn: 'root'
})
export class PdfGeneratorService {
    constructor() {}

    beginPointXY = 10;
    maxLength = 187;

    generatePDF(src: ElementRef): jsPDF {
        const doc = new jsPDF();

        const position: PositionModel = {
          x: this.beginPointXY,
          y: this.beginPointXY
        };

        src.nativeElement.childNodes.forEach(node => {
          switch (node.nodeName) {
            case '#text':
              this.insertText(doc, node.textContent, position);
              break;
            case 'BR':
              position.x = this.beginPointXY;
              position.y = position.y + 6.48;
              break;
            case 'B':
              doc.setFontStyle('bold');
              this.insertText(doc, node.firstChild.textContent, position);
              doc.setFontStyle('normal');

              break;
            case 'I':
              doc.setFontStyle('italic');
              this.insertText(doc, node.firstChild.textContent, position);
              doc.setFontStyle('normal');

              break;
            case 'U':
              doc.setFontStyle('underline');
              this.insertText(doc, node.firstChild.textContent, position);
              doc.setFontStyle('normal');

              break;
            default:
              break;
          }
        });

        return doc;
    }

    insertText(doc: jsPDF, text: string, position: PositionModel): void {
      // write text, collapse if too long
      doc.text(text, position.x, position.y, {maxWidth: this.maxLength});

      // move pointer
      const textDimensions = doc.getTextDimensions(text);
      if (textDimensions.w > this.maxLength) {
        const multilines = Math.floor(textDimensions.w / this.maxLength);
        position.y = position.y + (6.48 * multilines);
        position.x = this.beginPointXY + (textDimensions.w - this.maxLength * multilines) + 2.2;
      } else {
        position.x = position.x + textDimensions.w + 0.2;
      }
    }
}
