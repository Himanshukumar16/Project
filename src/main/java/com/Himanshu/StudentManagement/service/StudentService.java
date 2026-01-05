package com.Himanshu.StudentManagement.service;

import com.Himanshu.StudentManagement.Student;
import com.Himanshu.StudentManagement.repo.StudentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class StudentService {

    private final StudentRepo repo;

    public String addStudent(Student stu) {
        repo.save(stu);
        System.out.println("Remember your id for future reference: ");
        System.out.println(stu.getSId());
        return "Student added successfully";
    }

    public List<Student> showStudent() {
        return repo.findAll();
    }

    public Student showOneStudent(String id) {
        return repo.findById(id).orElse(null);
    }

    public String updateStudent(String id, Student student) {
        if (repo.existsById(id)) {
            repo.save(student);
            return "Student updated successfully";
        } else {
            return "Student with id " + id + " not found.";
        }
    }

    public String deleteStudent(String id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return "Student deleted successfully";
        } else {
            return "Student with id " + id + " not found.";
        }
    }
}
