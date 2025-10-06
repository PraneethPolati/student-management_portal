// Student Management System

// Storage functions
function saveToStorage() {
  localStorage.setItem('students', JSON.stringify(students));
}

function loadFromStorage() {
  const stored = localStorage.getItem('students');
  if (stored) {
    students = JSON.parse(stored);
  } else {
    // Add sample data only if no existing data
    students = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        dateOfBirth: '2003-05-15',
        major: 'Computer Science',
        gpa: 3.8,
        enrollmentDate: '2021-09-01'
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phone: '098-765-4321',
        dateOfBirth: '2004-08-22',
        major: 'Mathematics',
        gpa: 3.5,
        enrollmentDate: '2021-09-01'
      },
      {
        id: 3,
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob@example.com',
        phone: '555-123-4567',
        dateOfBirth: '2002-12-10',
        major: 'Physics',
        gpa: 3.9,
        enrollmentDate: '2020-09-01'
      }
    ];
    saveToStorage();
  }
}

// Initialize students array and load from storage
let students = [];
loadFromStorage();

// Student operations
const studentOperations = {
  addStudent: function(student) {
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const newStudent = { id: newId, ...student };
    students.push(newStudent);
    saveToStorage();
    return newStudent;
  },

  getAllStudents: function() {
    return students;
  },

  getStudentById: function(id) {
    return students.find(student => student.id === parseInt(id));
  },

  updateStudent: function(id, updatedData) {
    const index = students.findIndex(student => student.id === parseInt(id));
    if (index !== -1) {
      students[index] = { ...students[index], ...updatedData };
      saveToStorage();
      return students[index];
    }
    return null;
  },

  deleteStudent: function(id) {
    const index = students.findIndex(student => student.id === parseInt(id));
    if (index !== -1) {
      const deletedStudent = students.splice(index, 1)[0];
      saveToStorage();
      return deletedStudent;
    }
    return null;
  },

  searchStudents: function(query) {
    if (!query) return students;
    return students.filter(student =>
      student.firstName.toLowerCase().includes(query.toLowerCase()) ||
      student.lastName.toLowerCase().includes(query.toLowerCase()) ||
      student.email.toLowerCase().includes(query.toLowerCase()) ||
      student.major.toLowerCase().includes(query.toLowerCase())
    );
  }
};

// Navigation functions
function switchSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.remove('active'));

  // Show selected section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  // Update navigation
  const navButtons = document.querySelectorAll('.menu-btn');
  navButtons.forEach(btn => btn.classList.remove('active'));

  // Load data for specific sections
  if (sectionId === 'viewStudentsSection') {
    displayStudents();
  } else if (sectionId === 'homeSection') {
    updateStats();
  } else if (sectionId === 'reportsSection') {
    generateReports();
  }
}

// Make switchSection available globally
window.switchSection = switchSection;

// Home page functions
function updateStats() {
  const totalStudents = students.length;
  const averageGPA = students.length > 0 ?
    (students.reduce((sum, student) => sum + student.gpa, 0) / students.length).toFixed(2) : 0;
  const uniqueMajors = [...new Set(students.map(student => student.major))].length;

  document.getElementById('homeStudentCount').textContent = totalStudents;
  document.getElementById('homeAvgGPA').textContent = averageGPA;
  document.getElementById('homeMajorCount').textContent = uniqueMajors;
}

// Display functions
function displayStudents() {
  const studentList = document.getElementById('studentsTable');
  const allStudents = studentOperations.getAllStudents();

  if (allStudents.length === 0) {
    studentList.innerHTML = '<div class="no-data">No students found.</div>';
    return;
  }

  studentList.innerHTML = `
    <table class="students-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Major</th>
          <th>GPA</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${allStudents.map(student => `
          <tr>
            <td>${student.firstName || ''} ${student.lastName || ''}</td>
            <td>${student.email || ''}</td>
            <td>${student.phone || ''}</td>
            <td>${student.major || ''}</td>
            <td>${student.gpa || ''}</td>
            <td>
              <button onclick="window.openEditModal(${student.id})" class="btn-edit">Edit</button>
              <button onclick="window.deleteStudentConfirm(${student.id})" class="btn-delete">Delete</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// Make functions available globally
window.openEditModal = openEditModal;
window.deleteStudentConfirm = deleteStudentConfirm;
window.closeEditModal = closeEditModal;

function openEditModal(id) {
  const student = studentOperations.getStudentById(id);
  if (!student) return;

  document.getElementById('editStudentId').value = student.id;
  document.getElementById('editFirstName').value = student.firstName;
  document.getElementById('editLastName').value = student.lastName;
  document.getElementById('editEmail').value = student.email;
  document.getElementById('editPhone').value = student.phone;
  document.getElementById('editDateOfBirth').value = student.dateOfBirth;
  document.getElementById('editMajor').value = student.major;
  document.getElementById('editGpa').value = student.gpa;
  document.getElementById('editEnrollmentDate').value = student.enrollmentDate;

  document.getElementById('editModal').style.display = 'block';
}

function closeEditModal() {
  document.getElementById('editModal').style.display = 'none';
}

function deleteStudentConfirm(id) {
  const student = studentOperations.getStudentById(id);
  if (confirm(`Are you sure you want to delete ${student.firstName} ${student.lastName}?`)) {
    studentOperations.deleteStudent(id);
    displayStudents();
    updateStats();
    showMessage('Student deleted successfully!', 'success');
  }
}

function showMessage(message, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    background: ${type === 'success' ? '#4CAF50' : '#f44336'};
    color: white;
    border-radius: 4px;
    z-index: 10000;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  `;

  document.body.appendChild(messageDiv);

  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
}

// Search functionality
function performSearch() {
  const query = document.getElementById('searchInput').value;
  const results = studentOperations.searchStudents(query);

  const resultsContainer = document.getElementById('searchResults');

  if (results.length === 0) {
    resultsContainer.innerHTML = '<div class="no-data">No students found matching your search.</div>';
    return;
  }

  resultsContainer.innerHTML = `
    <table class="students-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Major</th>
          <th>GPA</th>
        </tr>
      </thead>
      <tbody>
        ${results.map(student => `
          <tr>
            <td>${student.firstName || ''} ${student.lastName || ''}</td>
            <td>${student.email || ''}</td>
            <td>${student.phone || ''}</td>
            <td>${student.major || ''}</td>
            <td>${student.gpa || ''}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// Reports functionality
function generateReports() {
  const allStudents = studentOperations.getAllStudents();

  if (allStudents.length === 0) {
    document.getElementById('reportsContent').innerHTML = '<div class="no-data">No data available for reports.</div>';
    return;
  }

  // Major distribution
  const majorCount = {};
  allStudents.forEach(student => {
    majorCount[student.major] = (majorCount[student.major] || 0) + 1;
  });

  // GPA statistics
  const gpas = allStudents.map(s => s.gpa);
  const avgGPA = (gpas.reduce((a, b) => a + b, 0) / gpas.length).toFixed(2);
  const maxGPA = Math.max(...gpas).toFixed(2);
  const minGPA = Math.min(...gpas).toFixed(2);

  // GPA ranges
  const gpaRanges = {
    '3.5-4.0': gpas.filter(g => g >= 3.5).length,
    '3.0-3.49': gpas.filter(g => g >= 3.0 && g < 3.5).length,
    '2.5-2.99': gpas.filter(g => g >= 2.5 && g < 3.0).length,
    'Below 2.5': gpas.filter(g => g < 2.5).length
  };

  document.getElementById('reportsContent').innerHTML = `
    <div class="report-section">
      <h3>Major Distribution</h3>
      <div class="report-grid">
        ${Object.entries(majorCount).map(([major, count]) => `
          <div class="report-item">
            <span class="report-label">${major}:</span>
            <span class="report-value">${count} students</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="report-section">
      <h3>GPA Statistics</h3>
      <div class="report-grid">
        <div class="report-item">
          <span class="report-label">Average GPA:</span>
          <span class="report-value">${avgGPA}</span>
        </div>
        <div class="report-item">
          <span class="report-label">Highest GPA:</span>
          <span class="report-value">${maxGPA}</span>
        </div>
        <div class="report-item">
          <span class="report-label">Lowest GPA:</span>
          <span class="report-value">${minGPA}</span>
        </div>
      </div>
    </div>

    <div class="report-section">
      <h3>GPA Distribution</h3>
      <div class="report-grid">
        ${Object.entries(gpaRanges).map(([range, count]) => `
          <div class="report-item">
            <span class="report-label">${range}:</span>
            <span class="report-value">${count} students</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Clear corrupted data and reset
function resetData() {
  localStorage.removeItem('students');
  students = [];
  loadFromStorage();
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Check if data is corrupted and reset if needed
  if (students.length > 0 && students.some(s => !s.firstName || !s.email)) {
    resetData();
  }

  // Show home page by default and load stats
  switchSection('homeSection');
  updateStats();

  // Navigation buttons
  const homeBtn = document.getElementById('homeBtn');
  if (homeBtn) {
    homeBtn.addEventListener('click', () => switchSection('homeSection'));
  }

  const addStudentBtn = document.getElementById('addStudentBtn');
  if (addStudentBtn) {
    addStudentBtn.addEventListener('click', () => switchSection('addStudentSection'));
  }

  const viewStudentsBtn = document.getElementById('viewStudentsBtn');
  if (viewStudentsBtn) {
    viewStudentsBtn.addEventListener('click', () => switchSection('viewStudentsSection'));
  }

  const searchStudentBtn = document.getElementById('searchStudentBtn');
  if (searchStudentBtn) {
    searchStudentBtn.addEventListener('click', () => switchSection('searchStudentSection'));
  }

  const reportsBtn = document.getElementById('reportsBtn');
  if (reportsBtn) {
    reportsBtn.addEventListener('click', () => switchSection('reportsSection'));
  }

  // Add student form
  const addStudentForm = document.getElementById('studentForm');
  if (addStudentForm) {
    addStudentForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const studentData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        major: document.getElementById('major').value,
        gpa: parseFloat(document.getElementById('gpa').value),
        enrollmentDate: document.getElementById('enrollmentDate').value
      };

      try {
        studentOperations.addStudent(studentData);
        e.target.reset();
        updateStats();
        showMessage('Student added successfully!', 'success');
      } catch (error) {
        showMessage('Error adding student: ' + error.message, 'error');
      }
    });
  }

  // Edit student form
  const editStudentForm = document.getElementById('editStudentForm');
  if (editStudentForm) {
    editStudentForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const id = parseInt(document.getElementById('editStudentId').value);
      const updatedData = {
        firstName: document.getElementById('editFirstName').value,
        lastName: document.getElementById('editLastName').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value,
        dateOfBirth: document.getElementById('editDateOfBirth').value,
        major: document.getElementById('editMajor').value,
        gpa: parseFloat(document.getElementById('editGpa').value),
        enrollmentDate: document.getElementById('editEnrollmentDate').value
      };

      studentOperations.updateStudent(id, updatedData);
      closeEditModal();
      displayStudents();
      updateStats();
      showMessage('Student updated successfully!', 'success');
    });
  }

  // Search functionality
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', performSearch);
  }

  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
  }

  const clearSearchBtn = document.getElementById('clearSearchBtn');
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      document.getElementById('searchInput').value = '';
      performSearch();
    });
  }

  // Modal close button
  const modalClose = document.querySelector('.close');
  if (modalClose) {
    modalClose.addEventListener('click', closeEditModal);
  }

  // Close modal when clicking outside
  window.addEventListener('click', function(event) {
    const modal = document.getElementById('editModal');
    if (event.target === modal) {
      closeEditModal();
    }
  });
});
