import React, { useState, useEffect } from 'react';

export default function App() {
  const initialStudents = [
    { id: "S1001", fullName: "Jane Doe", age: 21, gender: "Female", email: "jane@limkokwing.ac.ls", course: "Diploma in Business Information Technology", isEnrolled: true },
    { id: "S1002", fullName: "John Smith", age: 23, gender: "Male", email: "john@limkokwing.ac.ls", course: "Diploma in Information Technology", isEnrolled: false }
  ];

  const courses = [
    { value: "Diploma in Business Information Technology", label: "Diploma in Business Information Technology" },
    { value: "Diploma in Information Technology", label: "Diploma in Information Technology" },
    { value: "Computer Science", label: "Computer Science" },
    { value: "Finance", label: "Finance" },
    { value: "Business Management", label: "Degree in Business Management" },
    { value: "Networking", label: "Degree in Networking" }
  ];

  const genders = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" }
  ];

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [formData, setFormData] = useState({ id: '', fullName: '', age: '', gender: genders[0].value, email: '', course: courses[0].value, isEnrolled: true });
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const validateForm = () => {
    if (!formData.id || !formData.fullName || !formData.age || !formData.gender || !formData.email || !formData.course) {
      setError('All fields are required.');
      return false;
    }
    let parsedAge = Number(formData.age);
    if (isNaN(parsedAge) || parsedAge < 16 || parsedAge > 100) {
      setError('Please enter a sensible age between 16 and 100.');
      return false;
    }
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    setError('');
    return true;
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const newStudent = {
      id: formData.id,
      fullName: formData.fullName,
      age: Number(formData.age),
      gender: formData.gender,
      email: formData.email,
      course: formData.course,
      isEnrolled: formData.isEnrolled
    };
    setStudents([...students, newStudent]);
    setIsAddOpen(false);
    setFormData({ id: '', fullName: '', age: '', gender: genders[0].value, email: '', course: courses[0].value, isEnrolled: true });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const updated = students.map((s) => s.id === editId ? { ...s, id: formData.id, fullName: formData.fullName, age: Number(formData.age), gender: formData.gender, email: formData.email, course: formData.course, isEnrolled: formData.isEnrolled } : s);
    setStudents(updated);
    setIsEditOpen(false);
    setEditId(null);
    setFormData({ id: '', fullName: '', age: '', gender: genders[0].value, email: '', course: courses[0].value, isEnrolled: true });
  };

  const confirmDelete = () => {
    const filtered = students.filter((s) => s.id !== deleteId);
    setStudents(filtered);
    setIsDeleteOpen(false);
    setDeleteId(null);
  };

  const filteredStudents = students.filter((student) =>
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', padding: '24px', maxWidth: '1280px', margin: '0 auto', background: 'linear-gradient(135deg, #f0fdf4 0%, #eff6ff 100%)', color: '#1e293b', minHeight: '100vh', position: 'relative' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #cbd5e1', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)' }}>
        <h2 style={{ color: '#0f172a', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px', marginBottom: '20px', fontSize: '24px', fontWeight: '700' }}>Student Records</h2>

        <div style={{ marginBottom: '20px', maxWidth: '320px', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <span style={{ position: 'absolute', left: '12px', fontSize: '16px', pointerEvents: 'none' }}></span>
          <input
            type="text"
            placeholder="Search student name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px 10px 10px 38px', boxSizing: 'border-box', backgroundColor: '#f8fafc', border: '1px solid #94a3b8', color: '#1e293b', borderRadius: '8px', outline: 'none', fontSize: '14px' }}
          />
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', color: '#334155', fontSize: '14px' }}>
                <th style={{ padding: '14px', borderBottom: '2px solid #cbd5e1', fontWeight: '600' }}>Student ID</th>
                <th style={{ padding: '14px', borderBottom: '2px solid #cbd5e1', fontWeight: '600' }}>Full Name</th>
                <th style={{ padding: '14px', borderBottom: '2px solid #cbd5e1', fontWeight: '600' }}>Age</th>
                <th style={{ padding: '14px', borderBottom: '2px solid #cbd5e1', fontWeight: '600' }}>Gender</th>
                <th style={{ padding: '14px', borderBottom: '2px solid #cbd5e1', fontWeight: '600' }}>Email</th>
                <th style={{ padding: '14px', borderBottom: '2px solid #cbd5e1', fontWeight: '600' }}>Course of Study</th>
                <th style={{ padding: '14px', borderBottom: '2px solid #cbd5e1', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '14px', borderBottom: '2px solid #cbd5e1', fontWeight: '600' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} style={{ borderBottom: '1px solid #e2e8f0', fontSize: '14px' }}>
                  <td style={{ padding: '14px', color: '#0284c7', fontWeight: '600' }}>{student.id}</td>
                  <td style={{ padding: '14px', fontWeight: '500' }}>{student.fullName}</td>
                  <td style={{ padding: '14px' }}>{student.age}</td>
                  <td style={{ padding: '14px' }}>{student.gender}</td>
                  <td style={{ padding: '14px', color: '#475569' }}>{student.email}</td>
                  <td style={{ padding: '14px' }}>{student.course}</td>
                  <td style={{ padding: '14px' }}>
                    <span style={{ padding: '5px 10px', borderRadius: '6px', backgroundColor: student.isEnrolled ? '#dcfce7' : '#fee2e2', color: student.isEnrolled ? '#166534' : '#991b1b', fontWeight: '600', fontSize: '12px' }}>
                      {student.isEnrolled ? 'Enrolled' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                      <button onClick={() => { setEditId(student.id); setFormData({ ...student, gender: student.gender || 'Male' }); setError(''); setIsEditOpen(true); }} style={{ padding: '6px 12px', backgroundColor: '#0ea5e9', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}>Edit</button>
                      <button onClick={() => { setDeleteId(student.id); setIsDeleteOpen(true); }} style={{ padding: '6px 12px', backgroundColor: '#e11d48', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>No student records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <button onClick={() => { setFormData({ id: 'S' + Math.floor(1000 + Math.random() * 9000), fullName: '', age: '', gender: genders[0].value, email: '', course: courses[0].value, isEnrolled: true }); setError(''); setIsAddOpen(true); }} style={{ position: 'fixed', bottom: '30px', right: '30px', width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#fff', border: 'none', fontSize: '30px', cursor: 'pointer', boxShadow: '0 10px 20px -3px rgba(2, 132, 199, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>+</button>

      {isAddOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(15, 23, 42, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1001, backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '16px', width: '420px', maxWidth: '90%', border: '1px solid #cbd5e1', color: '#1e293b', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.2)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>Add New Student</h3>
            {error && <p style={{ color: '#e11d48', fontSize: '14px', marginBottom: '15px', fontWeight: '500' }}>{error}</p>}
            <form onSubmit={handleAddSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontSize: '14px', fontWeight: '600' }}>Student ID:</label>
                <input type="text" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', backgroundColor: '#f8fafc', border: '1px solid #94a3b8', color: '#1e293b', borderRadius: '8px', fontSize: '14px' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontSize: '14px', fontWeight: '600' }}>Full Name:</label>
                <input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', backgroundColor: '#f8fafc', border: '1px solid #94a3b8', color: '#1e293b', borderRadius: '8px', fontSize: '14px' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontSize: '14px', fontWeight: '600' }}>Age:</label>
                <input type="number" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', backgroundColor: '#f8fafc', border: '1px solid #94a3b8', color: '#1e293b', borderRadius: '8px', fontSize: '14px' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontSize: '14px', fontWeight: '600' }}>Gender:</label>
                <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', backgroundColor: '#f8fafc', border: '1px solid #94a3b8', color: '#1e293b', borderRadius: '8px', fontSize: '14px' }}>
                  {genders.map((g) => (
                    <option key={g.value} value={g.value}>{g.label}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontSize: '14px', fontWeight: '600' }}>Email Address:</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', backgroundColor: '#f8fafc', border: '1px solid #94a3b8', color: '#1e293b', borderRadius: '8px', fontSize: '14px' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontSize: '14px', fontWeight: '600' }}>Course of Study:</label>
                <select value={formData.course} onChange={(e) => setFormData({ ...formData, course: e.target.value })} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', backgroundColor: '#f8fafc', border: '1px solid #94a3b8', color: '#1e293b', borderRadius: '8px', fontSize: '14px' }}>
                  {courses.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: '#334155', cursor: 'pointer', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
                  <input type="checkbox" checked={formData.isEnrolled} onChange={(e) => setFormData({ ...formData, isEnrolled: e.target.checked })} style={{ marginRight: '8px', width: '16px', height: '16px' }} />
                  Enrolled
                </label>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setIsAddOpen(false)} style={{ padding: '10px 18px', background: '#e2e8f0', color: '#334155', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 18px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>Add Student</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(15, 23, 42, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1001, backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '16px', width: '420px', maxWidth: '90%', border: '1px solid #cbd5e1', color: '#1e293b', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.2)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>Edit Student Record</h3>
            {error && <p style={{ color: '#e11d48', fontSize: '14px', marginBottom: '15px', fontWeight: '500' }}>{error}</p>}
            <form onSubmit={handleEditSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontSize: '14px', fontWeight: '600' }}>Student ID:</label>
                <input type="text" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', backgroundColor: '#f8fafc', border: '1px solid #94a3b8', color: '#1e293b', borderRadius: '8px', fontSize: '14px' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontSize: '14px', fontWeight: '600' }}>Full Name:</label>
                <input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', backgroundColor: '#f8fafc', border: '1px solid #94a3b8', color: '#1e293b', borderRadius: '8px', fontSize: '14px' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontSize: '14px', fontWeight: '600' }}>Age:</label>
                <input type="number" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', backgroundColor: '#f8fafc', border: '1px solid #94a3b8', color: '#1e293b', borderRadius: '8px', fontSize: '14px' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontSize: '14px', fontWeight: '600' }}>Gender:</label>
                <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', backgroundColor: '#f8fafc', border: '1px solid #94a3b8', color: '#1e293b', borderRadius: '8px', fontSize: '14px' }}>
                  {genders.map((g) => (
                    <option key={g.value} value={g.value}>{g.label}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontSize: '14px', fontWeight: '600' }}>Email Address:</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', backgroundColor: '#f8fafc', border: '1px solid #94a3b8', color: '#1e293b', borderRadius: '8px', fontSize: '14px' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontSize: '14px', fontWeight: '600' }}>Course of Study:</label>
                <select value={formData.course} onChange={(e) => setFormData({ ...formData, course: e.target.value })} style={{ width: '100%', padding: '10px', boxSizing: 'border-box', backgroundColor: '#f8fafc', border: '1px solid #94a3b8', color: '#1e293b', borderRadius: '8px', fontSize: '14px' }}>
                  {courses.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: '#334155', cursor: 'pointer', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center' }}>
                  <input type="checkbox" checked={formData.isEnrolled} onChange={(e) => setFormData({ ...formData, isEnrolled: e.target.checked })} style={{ marginRight: '8px', width: '16px', height: '16px' }} />
                  Enrolled
                </label>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" onClick={() => setIsEditOpen(false)} style={{ padding: '10px 18px', background: '#e2e8f0', color: '#334155', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 18px', background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(15, 23, 42, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1001, backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '16px', width: '400px', maxWidth: '90%', textAlign: 'center', border: '1px solid #cbd5e1', color: '#1e293b', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.2)' }}>
            <h3 style={{ marginTop: 0, fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>Confirm Deletion</h3>
            <p style={{ color: '#475569', fontSize: '14px', margin: '15px 0 25px 0', fontWeight: '500' }}>Are you sure you want to delete this student record? This action cannot be undone.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button type="button" onClick={() => setIsDeleteOpen(false)} style={{ padding: '10px 18px', background: '#e2e8f0', color: '#334155', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>Cancel</button>
              <button type="button" onClick={confirmDelete} style={{ padding: '10px 18px', background: '#e11d48', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}