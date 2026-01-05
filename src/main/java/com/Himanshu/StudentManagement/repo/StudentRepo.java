package com.Himanshu.StudentManagement.repo;

import org.springframework.stereotype.Repository;

@Repository
public class StudentRepo {


    public String addStudent() {
        return "Student added to the database";
    }
}
