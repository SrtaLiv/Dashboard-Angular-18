import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
   
    
    courses = [
        {
            id: 1,
            title: 'Introduction to Web Development',
            instructor: 'John Doe',
            image: 'https://picsum.photos/seed/webdev/300/200',
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

  getCourses() {
    return this.courses;
  }

  getCourseById(id: number) {
    return this.courses.find(course => course.id === id);
  }

  addCourse(course: any) {
    course.id = this.courses.length + 1;
    this.courses.push(course);
    return course;
  }

  updateCourse(updatedCourse: any) {
    const index = this.courses.findIndex(c => c.id === updatedCourse.id);
    if (index !== -1) {
      this.courses[index] = updatedCourse;
    }
  }
}