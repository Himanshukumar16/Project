package com.Himanshu.StudentManagement.controller;

import com.Himanshu.StudentManagement.Student;
import com.Himanshu.StudentManagement.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class controller {

    private final StudentService service;

    @GetMapping ("/addStudent")
    public String addStudent(){
        return service.addStudent();
    }
}
