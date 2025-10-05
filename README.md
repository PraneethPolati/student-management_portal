# Student Management System

A comprehensive console-based CRUD (Create, Read, Update, Delete) application for managing student records, built with Java, JDBC, and database connectivity.

## Features

### Core CRUD Operations
- **Create**: Add new student records with comprehensive information
- **Read**: View individual students by ID or list all students
- **Update**: Modify existing student information
- **Delete**: Remove student records with confirmation

### Advanced Features
- **Search**: Find students by name (partial matching)
- **Filter**: View students by major/department
- **Reports**: Generate comprehensive statistics and analytics
- **Validation**: Robust input validation and error handling
- **Database**: Full JDBC integration with connection management

### Student Information Management
- Personal details (name, email, phone, date of birth)
- Academic information (major, GPA, enrollment date)
- Automatic age calculation
- GPA validation (0.0-4.0 scale)
- Email format validation

## Technical Architecture

### Object-Oriented Design
- **Model**: `Student` class with proper encapsulation
- **DAO Pattern**: `StudentDAO` interface with `StudentDAOImpl` implementation
- **Service Layer**: `StudentService` for business logic
- **Exception Handling**: Custom `StudentManagementException` class
- **Utility Classes**: `DatabaseConnection` for database management

### Database Support
- **H2 Database**: In-memory database for development and testing
- **MySQL Support**: Ready for production deployment
- **JDBC**: Direct database connectivity without ORM frameworks
- **Connection Pooling**: Efficient database connection management
- **Sample Data**: Pre-populated with test records

### Error Handling & Validation
- Comprehensive input validation
- Custom exception hierarchy
- Graceful error recovery
- User-friendly error messages
- Data integrity constraints

## Project Structure

```
src/main/java/com/studentmgmt/
├── model/
│   └── Student.java              # Student entity class
├── dao/
│   ├── StudentDAO.java           # Data Access Object interface
│   └── impl/
│       └── StudentDAOImpl.java   # DAO implementation
├── service/
│   └── StudentService.java       # Business logic layer
├── exception/
│   └── StudentManagementException.java # Custom exceptions
├── util/
│   └── DatabaseConnection.java   # Database utilities
└── main/
    └── StudentManagementApp.java # Main console application
```

## Getting Started

### Prerequisites
- Java 17 or later
- Maven 3.6 or later
- MySQL (optional, for production)

### Running the Application

1. **Compile and run using Maven:**
   ```bash
   mvn compile exec:java
   ```

2. **Or compile and run manually:**
   ```bash
   mvn compile
   java -cp target/classes:target/dependency/* com.studentmgmt.main.StudentManagementApp
   ```

### Database Configuration

#### H2 Database (Default - Development)
- Automatically configured for in-memory database
- No additional setup required
- Includes sample data for testing

#### MySQL Database (Production)
1. Create a MySQL database named `student_management_db`
2. Update database credentials in `DatabaseConnection.java`
3. Uncomment MySQL configuration lines
4. Create the students table using the provided schema

### Sample Database Schema (MySQL)

```sql
CREATE DATABASE student_management_db;
USE student_management_db;

CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(15),
    date_of_birth DATE NOT NULL,
    major VARCHAR(100) NOT NULL,
    gpa DECIMAL(3,2) CHECK (gpa >= 0.0 AND gpa <= 4.0),
    enrollment_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Usage Examples

### Adding a New Student
```
First Name: John
Last Name: Doe  
Email: john.doe@email.com
Phone Number: 555-0123
Date of Birth: 2000-05-15
Major: Computer Science
GPA: 3.75
Enrollment Date: 2022-08-25
```

### Generating Reports
The system provides comprehensive analytics including:
- Total student count
- Average GPA across all students
- Highest and lowest performing students
- Student distribution by major
- Enrollment statistics

## Architecture Highlights

### SOLID Principles Applied
- **Single Responsibility**: Each class has a focused purpose
- **Open/Closed**: Easy to extend with new features
- **Liskov Substitution**: Proper inheritance hierarchies
- **Interface Segregation**: Clean DAO interfaces
- **Dependency Inversion**: Service layer abstracts data access

### Design Patterns Used
- **Data Access Object (DAO)**: Separates data access logic
- **Service Layer**: Encapsulates business logic
- **Singleton**: Database connection management
- **Factory Method**: Connection creation

### Exception Handling Strategy
- Custom exception hierarchy for domain-specific errors
- Comprehensive validation at service layer
- Graceful degradation with user-friendly messages
- Proper resource cleanup with try-with-resources

## Testing

The application includes:
- Input validation testing
- Database connection testing
- CRUD operation verification
- Exception handling validation
- Sample data for immediate testing

## Future Enhancements

- Web-based interface using Spring Boot
- RESTful API development
- Advanced reporting with charts/graphs
- Student photo management
- Course enrollment tracking
- Grade management system
- Email notification system
- Advanced search and filtering options

## Dependencies

- **H2 Database**: In-memory database for development
- **MySQL Connector**: Production database connectivity
- **JUnit**: Unit testing framework
- **Maven**: Build and dependency management

## License

This project is developed for educational and portfolio purposes, demonstrating enterprise-level Java development practices.