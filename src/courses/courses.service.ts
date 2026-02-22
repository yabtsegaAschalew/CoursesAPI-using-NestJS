import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';

export interface Course {
  id: number;
  title: string;
  level: string;
  duration: string;
}

@Injectable()
export class CoursesService {
  private courses: Course[] = [];
  private idCounter = 1;

  findAll(): Course[] {
    return this.courses;
  }

  findOne(id: number): Course {
    const course = this.courses.find(c => c.id === id);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  create(createCourseDto: CreateCourseDto): Course {
    const newCourse: Course = {
      id: this.idCounter++,
      ...createCourseDto,
    };
    this.courses.push(newCourse);
    return newCourse;
  }
}
