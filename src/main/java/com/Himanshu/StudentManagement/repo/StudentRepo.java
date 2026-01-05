package com.Himanshu.StudentManagement.repo;

import com.Himanshu.StudentManagement.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepo extends JpaRepository<Student,String> {


}
