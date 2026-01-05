package com.Himanshu.StudentManagement.controller;

import com.Himanshu.StudentManagement.Student;
import com.Himanshu.StudentManagement.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class controller {

    private final StudentService service;

    @PostMapping ("/add-student")
    public String addStudent(@RequestBody Student student){
        return service.addStudent(student);
    }

    @GetMapping("/show-student")
    public List<Student> showStudent(){
        return service.showStudent();
    }

    @GetMapping("/show-student-by-id-{id}")
    public Student showOneStudent(@PathVariable String id){
        return service.showOneStudent(id);
    }

    @PutMapping("/update-student-by-id-{id}")
    public String updateStudent(@PathVariable String id, @RequestBody Student student){
        return service.updateStudent(id, student);
    }

    @DeleteMapping("/delete-student-by-id-{id}")
    public String deleteStudent(@PathVariable String id){
        return service.deleteStudent(id);
    }
}
