package com.Himanshu.StudentManagement;

import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class Student {

    @NonNull
    private String sFirstName;

    @NonNull
    private String sLastName;

    @Id
    private int sId;

    @NonNull
    private Integer sMarks;
}
