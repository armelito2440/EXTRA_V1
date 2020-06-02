import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-categories-corporation',
  templateUrl: './categories-corporation.component.html',
  styleUrls: ['./categories-corporation.component.scss']
})
export class CategoriesCorporationComponent implements OnInit {

  @Input() value = '';
  @Output() newCorporationCat: EventEmitter<string> = new EventEmitter();
  public corporationForm: FormGroup;
  corporations = ['', 'CHR', 'Corpo2'];
  selectedCorporationIndex ='1';

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.corporationForm = this.fb.group({
      corporationControl: ['CHR']
    });
    this.newCorporationCat.emit(this.selectedCorporationIndex);
  }

  callCorporation(event: any) {
    console.log('selected corporation', event.target.selectedIndex);
    this.selectedCorporationIndex = event.target.selectedIndex;
    this.newCorporationCat.emit('CHR');
  }

 
}
