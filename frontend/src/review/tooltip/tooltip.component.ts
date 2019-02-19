import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {

  @Input() tooltipPositionStyles: object;
  @Input() tooltipStyle: string;
  @Input() markedText: string;

  @Output() commentEmitter = new EventEmitter<any>();

  addCommentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.tooltipStyle = '';
    this.markedText = '';
    this.addCommentForm = this.formBuilder.group({
      content: [
        '',
        Validators.required
      ]
    });
  }

  send(addCommentForm) {
    this.commentEmitter.emit(addCommentForm.value);
    this.addCommentForm.setValue({ content: '' });
  }
}
