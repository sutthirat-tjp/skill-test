import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-question-list',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './question-list.html'
})
export class QuestionListComponent implements OnInit {
  questions: any[] = [];

  constructor(
    private service: QuestionService, 
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.getAll().subscribe({
      next: (res) => {
        if (res && res.success) {
          this.questions = [...res.result]; 
          
          this.cdr.detectChanges(); 
          
          console.log('ข้อมูลโหลดสำเร็จ:', this.questions);
        }
      },
      error: (err) => console.error('โหลดข้อมูลพลาด:', err)
    });
  }

  addQuestion() {
    this.router.navigate(['questions/add']);
  }

  editQuestion(id: number) {
    this.router.navigate(['questions/edit'], { state: { questionId: id } });
  }

  onDelete(id: number) {
    if (confirm('ยืนยันการลบข้อสอบข้อนี้?')) {
      this.service.delete(id).subscribe(res => {
        if (res.success) this.loadData();
      });
    }
  }
}