import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    RouterModule,
    MatExpansionModule,
    MatProgressBarModule
  ],
  template: `
    <div class="course-details-container" *ngIf="course">
      <div class="course-navigation">
        <button mat-raised-button color="primary" 
          (click)="navigateToCourse(course.id - 1)" 
          [disabled]="course.id <= 1">
          <mat-icon>arrow_back</mat-icon> Curso anterior
        </button>
        <button mat-raised-button color="primary" 
          (click)="navigateToCourse(course.id + 1)" 
          [disabled]="course.id >= 5">
          Próximo curso <mat-icon>arrow_forward</mat-icon>
        </button>
      </div>

      <mat-card class="course-detail-card">
        <img mat-card-image [src]="course.image" [alt]="course.title">
        
        <mat-card-header>
          <mat-card-title>{{course.title}}</mat-card-title>
          <mat-card-subtitle>By {{course.instructor}}</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <h3>About this course</h3>
          <p>{{course.description}}</p>

          <div class="course-info">
            <div class="info-item">
              <mat-icon>schedule</mat-icon>
              <span>Duration: {{course.duration}}</span>
            </div>
            <div class="info-item">
              <mat-icon>signal_cellular_alt</mat-icon>
              <span>Level: {{course.level}}</span>
            </div>
            <div class="info-item">
              <mat-icon>people</mat-icon>
              <span>{{course.students}} students enrolled</span>
            </div>
            <div class="info-item">
              <mat-icon>star</mat-icon>
              <span>{{course.rating}}/5 rating</span>
            </div>
          </div>

          <h3>Topics covered</h3>
          <mat-chip-set>
            <mat-chip *ngFor="let tag of course.tags">{{tag}}</mat-chip>
          </mat-chip-set>
        </mat-card-content>

        <mat-card-actions align="end">
          <button mat-button routerLink="/courses">Volver a cursos</button>
        </mat-card-actions>
      </mat-card>

      <mat-card class="course-modules">
        <mat-card-header>
          <mat-card-title>Course Content</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <mat-accordion multi>
            <mat-expansion-panel *ngFor="let module of course.modules">
              <mat-expansion-panel-header>
                <mat-panel-title>
                  {{module.title}}
                </mat-panel-title>
                <mat-panel-description>
                  {{module.chapters.length}} chapters
                </mat-panel-description>
              </mat-expansion-panel-header>

              <div class="chapter-list">
                <div *ngFor="let chapter of module.chapters" class="chapter-item">
                  <div class="chapter-info">
                    <mat-icon>play_circle_outline</mat-icon>
                    <span class="chapter-title">{{chapter.title}}</span>
                    <span class="chapter-duration">{{chapter.duration}}</span>
                  </div>
                  <mat-progress-bar 
                    mode="determinate"
                    [value]="chapter.completed ? 100 : 0">
                  </mat-progress-bar>
                </div>
              </div>
            </mat-expansion-panel>
          </mat-accordion>
        </mat-card-content>
      </mat-card>

      <mat-card class="course-comments">
        <mat-card-header>
          <mat-card-title>Student Comments</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <div class="comment-list">
            <div class="comment-item" *ngFor="let comment of courseComments">
              <div class="comment-header">
                <div class="comment-author">
                  <mat-icon>account_circle</mat-icon>
                  <span>{{comment.author}}</span>
                </div>
                <div class="comment-rating">
                  <mat-icon *ngFor="let star of [1,2,3,4,5].slice(0, comment.rating)" class="star-filled">star</mat-icon>
                  <mat-icon *ngFor="let star of [1,2,3,4,5].slice(comment.rating)" class="star-empty">star_border</mat-icon>
                </div>
              </div>
              <p class="comment-text">{{comment.text}}</p>
              <span class="comment-date">{{comment.date | date:'mediumDate'}}</span>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .course-details-container {
      padding: 24px;
      max-width: 1000px;
      margin: 0 auto;
    }
    .course-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin: 24px 0;
    }
    .info-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    h3 {
      margin: 24px 0 16px;
    }
    
    .course-modules {
      margin-top: 24px;
    }

    .chapter-list {
      margin: 16px 0;
    }

    .chapter-item {
      padding: 12px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);

      &:last-child {
        border-bottom: none;
      }
    }

    .chapter-info {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }

    .chapter-title {
      flex-grow: 1;
    }

    .chapter-duration {
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
    }

    mat-progress-bar {
      height: 4px;
    }
    .course-comments {
      margin-top: 24px;
    }

    .comment-list {
      margin-top: 16px;
    }

    .comment-item {
      padding: 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }

    .comment-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .comment-author {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .comment-text {
      margin: 8px 0;
      line-height: 1.5;
    }

    .comment-date {
      color: rgba(0, 0, 0, 0.6);
      font-size: 12px;
    }

    .star-filled {
      color: #ffd700;
    }

    .star-empty {
      color: rgba(0, 0, 0, 0.3);
    }
    .course-navigation {
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    .course-navigation button {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class CourseDetailsComponent implements OnInit, OnDestroy {
  course: any;
  courseComments: any[] = [];
  private routeSub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      const courseId = Number(params['id']); // convierte el ID de la URL de texto a número
      this.loadCourse(courseId);
    });
  }

  ngOnDestroy() {  // se ejecuta cuando el componente se destruye. por ejemplo, cuando navegas a otra pagina
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  loadCourse(courseId: number) {
    const defaultModules = [
      {
        id: 1,
        title: 'Getting Started',
        chapters: [
          { id: 1, title: 'Course Introduction', duration: '30 min', completed: true },
          { id: 2, title: 'Setting Up Your Environment', duration: '45 min', completed: true },
          { id: 3, title: 'Basic Concepts', duration: '60 min', completed: false }
        ]
      },
      {
        id: 2,
        title: 'Core Concepts',
        chapters: [
          { id: 4, title: 'Fundamental Principles', duration: '60 min', completed: false },
          { id: 5, title: 'Best Practices', duration: '75 min', completed: false },
          { id: 6, title: 'Advanced Techniques', duration: '90 min', completed: false }
        ]
      },
      {
        id: 3,
        title: 'Practical Applications',
        chapters: [
          { id: 7, title: 'Real-world Examples', duration: '75 min', completed: false },
          { id: 8, title: 'Project Implementation', duration: '90 min', completed: false },
          { id: 9, title: 'Final Project', duration: '120 min', completed: false }
        ]
      }
    ];

    const courseComments = [
      {
        author: 'Maria García',
        rating: 5,
        text: 'Excellent course! The content is well-structured and the instructor explains everything clearly.',
        date: new Date('2024-01-15')
      },
      {
        author: 'John Smith',
        rating: 4,
        text: 'Very comprehensive material. The practical exercises really helped me understand the concepts.',
        date: new Date('2024-01-10')
      },
      {
        author: 'Laura Martínez',
        rating: 5,
        text: 'One of the best courses I\'ve taken. The real-world examples are particularly useful.',
        date: new Date('2024-01-05')
      }
    ];

    const courses = {
      1: {
        id: 1,
        title: 'Introduction to Web Development',
        instructor: 'John Doe',
        image: 'https://media.licdn.com/dms/image/v2/D5612AQE4HCONpl5LIw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1682852665807?e=2147483647&v=beta&t=7qgNtHQhzJdje6LxEu2cPHFBAapX2D463YUWb3TCnyY',
        duration: '8 weeks',
        level: 'Beginner',
        students: 156,
        rating: 4.5,
        description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        modules: defaultModules,
        comments: courseComments
      },
      2: {
        id: 2,
        title: 'Advanced Angular Development',
        instructor: 'Jane Smith',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYrjkPeRkL_Q3RThOD5F8Kow8fEKHJMcnwuA&s',
        duration: '10 weeks',
        level: 'Advanced',
        students: 89,
        rating: 4.8,
        description: 'Master Angular framework with real-world projects and best practices.',
        tags: ['Angular', 'TypeScript', 'RxJS'],
        modules: [/* ... existing modules */]
      },
      3: {
        id: 3,
        title: 'Python Data Science',
        instructor: 'Sarah Johnson',
        image: 'https://www.ntuclearninghub.com/documents/39367/7431407/python-programming%20fundamentals.jpg/0f980a00-ced6-85e7-3d57-fa1651dd572b/',
        duration: '12 weeks',
        level: 'Intermediate',
        students: 234,
        rating: 4.7,
        description: 'Learn data analysis, visualization, and machine learning with Python.',
        tags: ['Python', 'NumPy', 'Pandas', 'ML'],
        modules: [/* ... */]
      },
      4: {
        id: 4,
        title: 'Mobile App Development',
        instructor: 'Mike Wilson',
        image: 'https://www.devicemagic.com/wp-content/uploads/2021/06/mobile-apps-1-scaled.jpg',
        duration: '10 weeks',
        level: 'Intermediate',
        students: 167,
        rating: 4.6,
        description: 'Build cross-platform mobile applications using modern frameworks.',
        tags: ['React Native', 'Flutter', 'Mobile'],
        modules: [/* ... */]
      },
      5: {
        id: 5,
        title: 'DevOps Fundamentals',
        instructor: 'Alex Brown',
        image: 'https://imageio.forbes.com/specials-images/imageserve/60f1e792c7e89f933811814c/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds',
        duration: '8 weeks',
        level: 'Advanced',
        students: 112,
        rating: 4.9,
        description: 'Master CI/CD, containerization, and cloud deployment strategies.',
        tags: ['Docker', 'Kubernetes', 'AWS'],
        modules: [/* ... */]
      }
    };

    this.course = courses[courseId as keyof typeof courses] || courses[1];
    this.courseComments = this.course.comments;
}

  navigateToCourse(courseId: number) {
    this.router.navigate(['/courses', courseId]);
  }
}