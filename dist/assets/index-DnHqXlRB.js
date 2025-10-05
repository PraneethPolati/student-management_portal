(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&d(r)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function d(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}})();function f(){localStorage.setItem("students",JSON.stringify(s))}function b(){const n=localStorage.getItem("students");n?s=JSON.parse(n):(s=[{id:1,firstName:"John",lastName:"Doe",email:"john@example.com",phone:"123-456-7890",dateOfBirth:"2003-05-15",major:"Computer Science",gpa:3.8,enrollmentDate:"2021-09-01"},{id:2,firstName:"Jane",lastName:"Smith",email:"jane@example.com",phone:"098-765-4321",dateOfBirth:"2004-08-22",major:"Mathematics",gpa:3.5,enrollmentDate:"2021-09-01"},{id:3,firstName:"Bob",lastName:"Johnson",email:"bob@example.com",phone:"555-123-4567",dateOfBirth:"2002-12-10",major:"Physics",gpa:3.9,enrollmentDate:"2020-09-01"}],f())}let s=[];b();const c={addStudent:function(n){const t={id:s.length>0?Math.max(...s.map(d=>d.id))+1:1,...n};return s.push(t),f(),t},getAllStudents:function(){return s},getStudentById:function(n){return s.find(e=>e.id===parseInt(n))},updateStudent:function(n,e){const t=s.findIndex(d=>d.id===parseInt(n));return t!==-1?(s[t]={...s[t],...e},f(),s[t]):null},deleteStudent:function(n){const e=s.findIndex(t=>t.id===parseInt(n));if(e!==-1){const t=s.splice(e,1)[0];return f(),t}return null},searchStudents:function(n){return n?s.filter(e=>e.firstName.toLowerCase().includes(n.toLowerCase())||e.lastName.toLowerCase().includes(n.toLowerCase())||e.email.toLowerCase().includes(n.toLowerCase())||e.major.toLowerCase().includes(n.toLowerCase())):s}};function u(n){document.querySelectorAll(".section").forEach(o=>o.classList.remove("active"));const t=document.getElementById(n);t&&t.classList.add("active"),document.querySelectorAll(".menu-btn").forEach(o=>o.classList.remove("active")),n==="viewStudentsSection"?B():n==="homeSection"?h():n==="reportsSection"&&w()}window.switchSection=u;function h(){const n=s.length,e=s.length>0?(s.reduce((d,o)=>d+o.gpa,0)/s.length).toFixed(2):0,t=[...new Set(s.map(d=>d.major))].length;document.getElementById("homeStudentCount").textContent=n,document.getElementById("homeAvgGPA").textContent=e,document.getElementById("homeMajorCount").textContent=t}function B(){const n=document.getElementById("studentsTable"),e=c.getAllStudents();if(e.length===0){n.innerHTML='<div class="no-data">No students found.</div>';return}n.innerHTML=`
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
        ${e.map(t=>`
          <tr>
            <td>${t.firstName} ${t.lastName}</td>
            <td>${t.email}</td>
            <td>${t.phone}</td>
            <td>${t.major}</td>
            <td>${t.gpa}</td>
            <td>
              <button onclick="openEditModal(${t.id})" class="btn-edit">Edit</button>
              <button onclick="deleteStudentConfirm(${t.id})" class="btn-delete">Delete</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `}window.openEditModal=L;window.deleteStudentConfirm=N;window.closeEditModal=g;function L(n){const e=c.getStudentById(n);e&&(document.getElementById("editStudentId").value=e.id,document.getElementById("editFirstName").value=e.firstName,document.getElementById("editLastName").value=e.lastName,document.getElementById("editEmail").value=e.email,document.getElementById("editPhone").value=e.phone,document.getElementById("editDateOfBirth").value=e.dateOfBirth,document.getElementById("editMajor").value=e.major,document.getElementById("editGpa").value=e.gpa,document.getElementById("editEnrollmentDate").value=e.enrollmentDate,document.getElementById("editModal").style.display="block")}function g(){document.getElementById("editModal").style.display="none"}function N(n){const e=c.getStudentById(n);confirm(`Are you sure you want to delete ${e.firstName} ${e.lastName}?`)&&(c.deleteStudent(n),B(),h(),v("Student deleted successfully!","success"))}function v(n,e){const t=document.createElement("div");t.className=`message ${e}`,t.textContent=n,t.style.cssText=`
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    background: ${e==="success"?"#4CAF50":"#f44336"};
    color: white;
    border-radius: 4px;
    z-index: 10000;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  `,document.body.appendChild(t),setTimeout(()=>{t.remove()},3e3)}function E(){const n=document.getElementById("searchInput").value,e=c.searchStudents(n),t=document.getElementById("searchResults");if(e.length===0){t.innerHTML='<div class="no-data">No students found matching your search.</div>';return}t.innerHTML=`
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
        ${e.map(d=>`
          <tr>
            <td>${d.firstName} ${d.lastName}</td>
            <td>${d.email}</td>
            <td>${d.phone}</td>
            <td>${d.major}</td>
            <td>${d.gpa}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `}function w(){const n=c.getAllStudents();if(n.length===0){document.getElementById("reportsContent").innerHTML='<div class="no-data">No data available for reports.</div>';return}const e={};n.forEach(a=>{e[a.major]=(e[a.major]||0)+1});const t=n.map(a=>a.gpa),d=(t.reduce((a,l)=>a+l,0)/t.length).toFixed(2),o=Math.max(...t).toFixed(2),i=Math.min(...t).toFixed(2),r={"3.5-4.0":t.filter(a=>a>=3.5).length,"3.0-3.49":t.filter(a=>a>=3&&a<3.5).length,"2.5-2.99":t.filter(a=>a>=2.5&&a<3).length,"Below 2.5":t.filter(a=>a<2.5).length};document.getElementById("reportsContent").innerHTML=`
    <div class="report-section">
      <h3>Major Distribution</h3>
      <div class="report-grid">
        ${Object.entries(e).map(([a,l])=>`
          <div class="report-item">
            <span class="report-label">${a}:</span>
            <span class="report-value">${l} students</span>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="report-section">
      <h3>GPA Statistics</h3>
      <div class="report-grid">
        <div class="report-item">
          <span class="report-label">Average GPA:</span>
          <span class="report-value">${d}</span>
        </div>
        <div class="report-item">
          <span class="report-label">Highest GPA:</span>
          <span class="report-value">${o}</span>
        </div>
        <div class="report-item">
          <span class="report-label">Lowest GPA:</span>
          <span class="report-value">${i}</span>
        </div>
      </div>
    </div>

    <div class="report-section">
      <h3>GPA Distribution</h3>
      <div class="report-grid">
        ${Object.entries(r).map(([a,l])=>`
          <div class="report-item">
            <span class="report-label">${a}:</span>
            <span class="report-value">${l} students</span>
          </div>
        `).join("")}
      </div>
    </div>
  `}document.addEventListener("DOMContentLoaded",function(){u("homeSection"),h();const n=document.getElementById("homeBtn");n&&n.addEventListener("click",()=>u("homeSection"));const e=document.getElementById("addStudentBtn");e&&e.addEventListener("click",()=>u("addStudentSection"));const t=document.getElementById("viewStudentsBtn");t&&t.addEventListener("click",()=>u("viewStudentsSection"));const d=document.getElementById("searchStudentBtn");d&&d.addEventListener("click",()=>u("searchStudentSection"));const o=document.getElementById("reportsBtn");o&&o.addEventListener("click",()=>u("reportsSection"));const i=document.getElementById("studentForm");i&&i.addEventListener("submit",function(m){m.preventDefault();const p={firstName:document.getElementById("firstName").value,lastName:document.getElementById("lastName").value,email:document.getElementById("email").value,phone:document.getElementById("phone").value,dateOfBirth:document.getElementById("dateOfBirth").value,major:document.getElementById("major").value,gpa:parseFloat(document.getElementById("gpa").value),enrollmentDate:document.getElementById("enrollmentDate").value};try{c.addStudent(p),m.target.reset(),h(),v("Student added successfully!","success")}catch(y){v("Error adding student: "+y.message,"error")}});const r=document.getElementById("editStudentForm");r&&r.addEventListener("submit",function(m){m.preventDefault();const p=parseInt(document.getElementById("editStudentId").value),y={firstName:document.getElementById("editFirstName").value,lastName:document.getElementById("editLastName").value,email:document.getElementById("editEmail").value,phone:document.getElementById("editPhone").value,dateOfBirth:document.getElementById("editDateOfBirth").value,major:document.getElementById("editMajor").value,gpa:parseFloat(document.getElementById("editGpa").value),enrollmentDate:document.getElementById("editEnrollmentDate").value};c.updateStudent(p,y),g(),B(),h(),v("Student updated successfully!","success")});const a=document.getElementById("searchInput");a&&a.addEventListener("input",E);const l=document.getElementById("searchBtn");l&&l.addEventListener("click",E);const S=document.getElementById("clearSearchBtn");S&&S.addEventListener("click",()=>{document.getElementById("searchInput").value="",E()});const I=document.querySelector(".close");I&&I.addEventListener("click",g),window.addEventListener("click",function(m){const p=document.getElementById("editModal");m.target===p&&g()})});
