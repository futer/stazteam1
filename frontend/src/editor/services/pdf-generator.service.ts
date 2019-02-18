import { Injectable, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import { PositionModel } from '../models/position.model';

@Injectable({
    providedIn: 'root'
})
export class PdfGeneratorService {
    constructor() { }

    beginPointXY = 10;
    maxLength = 187;

    generatePDF(src: ElementRef): jsPDF {
        const doc = new jsPDF();

        const position: PositionModel = {
            x: this.beginPointXY,
            y: this.beginPointXY,
            offset: this.maxLength,
            lines: 1
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
            position.x = position.x + textDimensions.w + 0.5;
            position.offset = position.offset - textDimensions.w;
        }
    }

    moveToNextLine(position: PositionModel): void {
        position.x = this.beginPointXY;
        position.y = position.y + 6.48;
        position.offset = this.maxLength;
        position.lines++;
    }

    formatText(doc: jsPDF, nodes: any, position: PositionModel): void {
        let processed = 0;

        while (processed < nodes.length) {

            if (position.lines % 45 === 0) {
                doc.addPage();
                position.x = this.beginPointXY;
                position.y = this.beginPointXY;
                position.offset = this.maxLength;
                position.lines++;
            }

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

                    this.formatText(doc, nodes[processed].childNodes, position);
                    doc.setFontStyle('normal');
                    processed++;

                    break;
                case 'U':
                    this.drawUnderline(doc, nodes[processed], position);
                    this.formatText(doc, nodes[processed].childNodes, position);
                    processed++;

                    break;
                case 'DIV':
                    this.formatText(doc, nodes[processed].childNodes, position);
                    processed++;

                    break;
                case 'P':
                    this.formatText(doc, nodes[processed].childNodes, position);
                    this.moveToNextLine(position);
                    processed++;

                    break;
                case 'DIV':
                    this.formatText(doc, nodes[processed].childNodes, position);
                    processed++;

                    break;
                case 'P':
                    this.formatText(doc, nodes[processed].childNodes, position);
                    this.moveToNextLine(position);
                    processed++;

                    break;
                default:
                    processed++;
                    break;
            }
        }
    }

    drawUnderline(doc: jsPDF, textNode: Text, position: PositionModel): void {
        const linePosition: PositionModel = {
            x: position.x,
            y: position.y,
            offset: position.offset,
            lines: position.lines
        };

        textNode.childNodes.forEach(node => {
            if (node.nodeName === 'BR') {
                this.moveToNextLine(linePosition);
            }

            const nodeDimensions = doc.getTextDimensions(node.textContent);
            let lineWidth = nodeDimensions.w;

            while (lineWidth > 0) {
                if (lineWidth > linePosition.offset) {
                    doc.line(linePosition.x, linePosition.y, linePosition.x + linePosition.offset, linePosition.y);
                    lineWidth = lineWidth - linePosition.offset;
                    this.moveToNextLine(linePosition);
                } else {
                    doc.line(linePosition.x, linePosition.y, linePosition.x + lineWidth, linePosition.y);
                    lineWidth = 0;
                }
            }
        });
    }
}
