package com.Himanshu.StudentManagement.service;

import com.Himanshu.StudentManagement.repo.StudentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class StudentService {

    private final StudentRepo repo;

    public String addStudent() {
        return repo.addStudent();
    }
}
