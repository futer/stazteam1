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
            y: this.beginPointXY,
            offset: this.maxLength
        };

        const nodes = src.nativeElement.childNodes;

        this.formatText(doc, nodes, position);

        return doc;
    }

    insertText(doc: jsPDF, textNode: Text, position: PositionModel): void {
        const textDimensions = doc.getTextDimensions(textNode.textContent);

        if (textDimensions.w > position.offset) {
            const maxChar =
                (textNode.length * position.offset) / textDimensions.w;
            textNode.splitText(maxChar);
            const clearedText = textNode.textContent.replace(/\n/g, '');
            doc.text(clearedText, position.x, position.y);
            this.moveToNextLine(position);
        } else {
            const clearedText = textNode.textContent.replace(/\n/g, '');
            doc.text(clearedText, position.x, position.y);
            position.x = position.x + textDimensions.w + 0.2;
            position.offset = position.offset - textDimensions.w;
        }
    }

    moveToNextLine(position: PositionModel): void {
        position.x = this.beginPointXY;
        position.y = position.y + 6.48;
        position.offset = this.maxLength;
    }

    formatText(doc: jsPDF, nodes: any, position: PositionModel): void {
        let processed = 0;

        while (processed < nodes.length) {
            switch (nodes[processed].nodeName) {
                case '#text':
                    this.insertText(doc, nodes[processed], position);
                    processed++;
                    break;
                case 'BR':
                    this.moveToNextLine(position);
                    processed++;
                    break;
                case 'B':
                    if (nodes[processed].parentNode.nodeName === 'I') {
                        doc.setFontStyle('bolditalic');
                    } else {
                        doc.setFontStyle('bold');
                    }

                    if (position.offset !== this.maxLength) {
                        position.x = position.x + 0.4;
                    }

                    this.formatText(doc, nodes[processed].childNodes, position);
                    doc.setFontStyle('normal');
                    processed++;

                    break;
                case 'I':
                    if (nodes[processed].parentNode.nodeName === 'B') {
                        doc.setFontStyle('bolditalic');
                    } else {
                        doc.setFontStyle('italic');
                    }

                    if (position.offset !== this.maxLength) {
                        position.x = position.x + 0.8;
                    }

                    this.formatText(doc, nodes[processed].childNodes, position);
                    doc.setFontStyle('normal');
                    processed++;

                    break;
                case 'U':
                    doc.setFontStyle('underline');
                    this.formatText(doc, nodes[processed].childNodes, position);
                    doc.setFontStyle('normal');
                    processed++;

                    break;
                default:
                    processed++;
                    break;
            }
        }
    }
}