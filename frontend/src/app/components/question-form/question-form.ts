import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../services/question.service';
import { Question } from '../../models/question.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.html',
  imports: [FormsModule, CommonModule],
})
export class QuestionForm implements OnInit {
  question: Question = {
    runningNo: 0,
    title: '',
    choices: [
      { answerText: '', isKey: false },
      { answerText: '', isKey: false },
      { answerText: '', isKey: false },
      { answerText: '', isKey: false }
    ]
  };

  constructor(
    private service: QuestionService, 
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // ('add' หรือ 'edit')
    const action = this.route.snapshot.paramMap.get('action');

    // edit ให้ดึง id จาก history state (ที่ส่งมาจากหน้า list)
    if (action === 'edit') {
      const stateId = history.state.questionId;
      
      if (stateId) {
        this.service.getById(stateId).subscribe(res => {
          if (res.success) {
            this.question = res.result;
          }
        });
      }
    }
  }

  back() {
    this.router.navigate(['/']);
  }
  
  onSubmit() {
    if (!this.question.title?.trim()) {
      alert('กรุณากรอกคำถาม');
      return;
    }
  
    const choiceTexts = this.question.choices
      .map(c => c.answerText?.trim()) 
      .filter(text => text !== ''); 
      
    const hasDuplicates = new Set(choiceTexts).size !== choiceTexts.length;
  
    if (hasDuplicates) {
      alert('⚠️ ตรวจพบตัวเลือกที่ซ้ำกัน กรุณาแก้ไข');
      return; // ไม่ให้บันทึก
    }
  
    this.service.save(this.question).subscribe(res => {
      if (res.success) {
        alert('บันทึกข้อมูลเรียบร้อย');
        this.router.navigate(['/']);
      } else {
        alert('เกิดข้อผิดพลาด: ' + res.message);
      }
    });
  }
}