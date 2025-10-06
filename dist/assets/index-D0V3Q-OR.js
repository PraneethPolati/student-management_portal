(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function t(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(o){if(o.ep)return;o.ep=!0;const i=t(o);fetch(o.href,i)}})();function f(){localStorage.setItem("students",JSON.stringify(d))}function b(){const n=localStorage.getItem("students");n?d=JSON.parse(n):(d=[{id:1,firstName:"John",lastName:"Doe",email:"john@example.com",phone:"123-456-7890",dateOfBirth:"2003-05-15",major:"Computer Science",gpa:3.8,enrollmentDate:"2021-09-01"},{id:2,firstName:"Jane",lastName:"Smith",email:"jane@example.com",phone:"098-765-4321",dateOfBirth:"2004-08-22",major:"Mathematics",gpa:3.5,enrollmentDate:"2021-09-01"},{id:3,firstName:"Bob",lastName:"Johnson",email:"bob@example.com",phone:"555-123-4567",dateOfBirth:"2002-12-10",major:"Physics",gpa:3.9,enrollmentDate:"2020-09-01"}],f())}let d=[];b();const u={addStudent:function(n){const t={id:d.length>0?Math.max(...d.map(a=>a.id))+1:1,...n};return d.push(t),f(),t},getAllStudents:function(){return d},getStudentById:function(n){return d.find(e=>e.id===parseInt(n))},updateStudent:function(n,e){const t=d.findIndex(a=>a.id===parseInt(n));return t!==-1?(d[t]={...d[t],...e},f(),d[t]):null},deleteStudent:function(n){const e=d.findIndex(t=>t.id===parseInt(n));if(e!==-1){const t=d.splice(e,1)[0];return f(),t}return null},searchStudents:function(n){return n?d.filter(e=>e.firstName.toLowerCase().includes(n.toLowerCase())||e.lastName.toLowerCase().includes(n.toLowerCase())||e.email.toLowerCase().includes(n.toLowerCase())||e.major.toLowerCase().includes(n.toLowerCase())):d}};function m(n){document.querySelectorAll(".section").forEach(o=>o.classList.remove("active"));const t=document.getElementById(n);t&&t.classList.add("active"),document.querySelectorAll(".menu-btn").forEach(o=>o.classList.remove("active")),n==="viewStudentsSection"?B():n==="homeSection"?h():n==="reportsSection"&&N()}window.switchSection=m;function h(){const n=d.length,e=d.length>0?(d.reduce((a,o)=>a+o.gpa,0)/d.length).toFixed(2):0,t=[...new Set(d.map(a=>a.major))].length;document.getElementById("homeStudentCount").textContent=n,document.getElementById("homeAvgGPA").textContent=e,document.getElementById("homeMajorCount").textContent=t}function B(){const n=document.getElementById("studentsTable"),e=u.getAllStudents();if(e.length===0){n.innerHTML='<div class="no-data">No students found.</div>';return}n.innerHTML=`
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
            <td>${t.firstName||""} ${t.lastName||""}</td>
            <td>${t.email||""}</td>
            <td>${t.phone||""}</td>
            <td>${t.major||""}</td>
            <td>${t.gpa||""}</td>
            <td>
              <button onclick="window.openEditModal(${t.id})" class="btn-edit">Edit</button>
              <button onclick="window.deleteStudentConfirm(${t.id})" class="btn-delete">Delete</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `}window.openEditModal=L;window.deleteStudentConfirm=w;window.closeEditModal=g;function L(n){const e=u.getStudentById(n);e&&(document.getElementById("editStudentId").value=e.id,document.getElementById("editFirstName").value=e.firstName,document.getElementById("editLastName").value=e.lastName,document.getElementById("editEmail").value=e.email,document.getElementById("editPhone").value=e.phone,document.getElementById("editDateOfBirth").value=e.dateOfBirth,document.getElementById("editMajor").value=e.major,document.getElementById("editGpa").value=e.gpa,document.getElementById("editEnrollmentDate").value=e.enrollmentDate,document.getElementById("editModal").style.display="block")}function g(){document.getElementById("editModal").style.display="none"}function w(n){const e=u.getStudentById(n);confirm(`Are you sure you want to delete ${e.firstName} ${e.lastName}?`)&&(u.deleteStudent(n),B(),h(),v("Student deleted successfully!","success"))}function v(n,e){const t=document.createElement("div");t.className=`message ${e}`,t.textContent=n,t.style.cssText=`
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 25px;
    background: ${e==="success"?"#4CAF50":"#f44336"};
    color: white;
    border-radius: 4px;
    z-index: 10000;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  `,document.body.appendChild(t),setTimeout(()=>{t.remove()},3e3)}function E(){const n=document.getElementById("searchInput").value,e=u.searchStudents(n),t=document.getElementById("searchResults");if(e.length===0){t.innerHTML='<div class="no-data">No students found matching your search.</div>';return}t.innerHTML=`
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
        ${e.map(a=>`
          <tr>
            <td>${a.firstName||""} ${a.lastName||""}</td>
            <td>${a.email||""}</td>
            <td>${a.phone||""}</td>
            <td>${a.major||""}</td>
            <td>${a.gpa||""}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `}function N(){const n=u.getAllStudents();if(n.length===0){document.getElementById("reportsContent").innerHTML='<div class="no-data">No data available for reports.</div>';return}const e={};n.forEach(s=>{e[s.major]=(e[s.major]||0)+1});const t=n.map(s=>s.gpa),a=(t.reduce((s,c)=>s+c,0)/t.length).toFixed(2),o=Math.max(...t).toFixed(2),i=Math.min(...t).toFixed(2),l={"3.5-4.0":t.filter(s=>s>=3.5).length,"3.0-3.49":t.filter(s=>s>=3&&s<3.5).length,"2.5-2.99":t.filter(s=>s>=2.5&&s<3).length,"Below 2.5":t.filter(s=>s<2.5).length};document.getElementById("reportsContent").innerHTML=`
    <div class="report-section">
      <h3>Major Distribution</h3>
      <div class="report-grid">
        ${Object.entries(e).map(([s,c])=>`
          <div class="report-item">
            <span class="report-label">${s}:</span>
            <span class="report-value">${c} students</span>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="report-section">
      <h3>GPA Statistics</h3>
      <div class="report-grid">
        <div class="report-item">
          <span class="report-label">Average GPA:</span>
          <span class="report-value">${a}</span>
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
        ${Object.entries(l).map(([s,c])=>`
          <div class="report-item">
            <span class="report-label">${s}:</span>
            <span class="report-value">${c} students</span>
          </div>
        `).join("")}
      </div>
    </div>
  `}function j(){localStorage.removeItem("students"),d=[],b()}document.addEventListener("DOMContentLoaded",function(){d.length>0&&d.some(r=>!r.firstName||!r.email)&&j(),m("homeSection"),h();const n=document.getElementById("homeBtn");n&&n.addEventListener("click",()=>m("homeSection"));const e=document.getElementById("addStudentBtn");e&&e.addEventListener("click",()=>m("addStudentSection"));const t=document.getElementById("viewStudentsBtn");t&&t.addEventListener("click",()=>m("viewStudentsSection"));const a=document.getElementById("searchStudentBtn");a&&a.addEventListener("click",()=>m("searchStudentSection"));const o=document.getElementById("reportsBtn");o&&o.addEventListener("click",()=>m("reportsSection"));const i=document.getElementById("studentForm");i&&i.addEventListener("submit",function(r){r.preventDefault();const p={firstName:document.getElementById("firstName").value,lastName:document.getElementById("lastName").value,email:document.getElementById("email").value,phone:document.getElementById("phone").value,dateOfBirth:document.getElementById("dateOfBirth").value,major:document.getElementById("major").value,gpa:parseFloat(document.getElementById("gpa").value),enrollmentDate:document.getElementById("enrollmentDate").value};try{u.addStudent(p),r.target.reset(),h(),v("Student added successfully!","success")}catch(y){v("Error adding student: "+y.message,"error")}});const l=document.getElementById("editStudentForm");l&&l.addEventListener("submit",function(r){r.preventDefault();const p=parseInt(document.getElementById("editStudentId").value),y={firstName:document.getElementById("editFirstName").value,lastName:document.getElementById("editLastName").value,email:document.getElementById("editEmail").value,phone:document.getElementById("editPhone").value,dateOfBirth:document.getElementById("editDateOfBirth").value,major:document.getElementById("editMajor").value,gpa:parseFloat(document.getElementById("editGpa").value),enrollmentDate:document.getElementById("editEnrollmentDate").value};u.updateStudent(p,y),g(),B(),h(),v("Student updated successfully!","success")});const s=document.getElementById("searchInput");s&&s.addEventListener("input",E);const c=document.getElementById("searchBtn");c&&c.addEventListener("click",E);const S=document.getElementById("clearSearchBtn");S&&S.addEventListener("click",()=>{document.getElementById("searchInput").value="",E()});const I=document.querySelector(".close");I&&I.addEventListener("click",g),window.addEventListener("click",function(r){const p=document.getElementById("editModal");r.target===p&&g()})});
