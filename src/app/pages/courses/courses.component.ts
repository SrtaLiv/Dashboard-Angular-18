import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-courses',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, RouterModule],
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
    courses = [
        {
            id: 1,
            title: 'Introduction to Web Development',
            instructor: 'John Doe',
            image: 'https://media.licdn.com/dms/image/v2/D5612AQE4HCONpl5LIw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1682852665807?e=2147483647&v=beta&t=7qgNtHQhzJdje6LxEu2cPHFBAapX2D463YUWb3TCnyY',
            duration: '8 weeks',
            level: 'Beginner',
            students: 156,
            rating: 4.5,
            description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript.',
            tags: ['HTML', 'CSS', 'JavaScript']
        },
        {
            id: 2,
            title: 'Advanced Angular Development',
            instructor: 'Jane Smith',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYrjkPeRkL_Q3RThOD5F8Kow8fEKHJMcnwuA&s',
            duration: '10 weeks',
            level: 'Advanced',
            students: 89,
            rating: 4.8,
            description: 'Master Angular framework with real-world projects and best practices.',
            tags: ['Angular', 'TypeScript', 'RxJS']
        },
        {
            id: 3,
            title: 'Python Data Science',
            instructor: 'Sarah Johnson',
            image: 'https://www.ntuclearninghub.com/documents/39367/7431407/python-programming%20fundamentals.jpg/0f980a00-ced6-85e7-3d57-fa1651dd572b/',
            duration: '12 weeks',
            level: 'Intermediate',
            students: 234,
            rating: 4.7,
            description: 'Learn data analysis, visualization, and machine learning with Python.',
            tags: ['Python', 'NumPy', 'Pandas', 'ML']
        },
        {
            id: 4,
            title: 'Mobile App Development',
            instructor: 'Mike Wilson',
            image: 'https://www.devicemagic.com/wp-content/uploads/2021/06/mobile-apps-1-scaled.jpg',
            duration: '10 weeks',
            level: 'Intermediate',
            students: 167,
            rating: 4.6,
            description: 'Build cross-platform mobile applications using modern frameworks.',
            tags: ['React Native', 'Flutter', 'Mobile']
        },
        {
            id: 5,
            title: 'DevOps Fundamentals',
            instructor: 'Alex Brown',
            image: 'https://imageio.forbes.com/specials-images/imageserve/60f1e792c7e89f933811814c/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds',
            duration: '8 weeks',
            level: 'Advanced',
            students: 112,
            rating: 4.9,
            description: 'Master CI/CD, containerization, and cloud deployment strategies.',
            tags: ['Docker', 'Kubernetes', 'AWS']
        }
    ];

    constructor(private dialog: MatDialog, private router: Router) { }

    createCourse(): void {
        const dialogRef = this.dialog.open(CourseDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                result.id = this.courses.length + 1;
                this.courses.push(result);
            }
        });
    }

    editCourse(course: any): void {
        const dialogRef = this.dialog.open(CourseDialogComponent, {
            data: course
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const index = this.courses.findIndex(c => c.id === course.id);
                this.courses[index] = { ...result };
            }
        });
    }

    viewCourse(course: any): void {
        this.router.navigate(['/courses', course.id]);
    }
}