import React, { useState } from 'react';
import '../Components/style.css';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    department: "",
    salary: "",
    location: "",
    status: "Available" // Default status
  });
  const [editIndex, setEditIndex] = useState(null);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [availableEmployees, setAvailableEmployees] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({
      ...newEmployee,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newEmployee.name.trim() !== "" &&
      newEmployee.department.trim() !== "" &&
      newEmployee.salary.trim() !== "" &&
      newEmployee.location.trim() !== ""
    ) {
      if (editIndex !== null) {
        const updatedEmployees = [...employees];
        updatedEmployees[editIndex] = newEmployee;
        setEmployees(updatedEmployees);
        setEditIndex(null);
      } else {
        setEmployees([...employees, newEmployee]);
      }
      setNewEmployee({
        name: "",
        department: "",
        salary: "",
        location: "",
        status: "Available" // Reset status after adding/editing
      });

      // Update total and available employees
      setTotalEmployees(employees.length);
      setAvailableEmployees(
        employees.filter((employee) => employee.status === "Available").length
      );
    }
  };

  const handleEdit = (index) => {
    const employeeToEdit = employees[index];
    setNewEmployee(employeeToEdit);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
  };

  return (
    <div className="resource-management-container">
      <div className="dashboard">
        <div className="overview">
          <div className="total-employees-info">
            <p>Total Employees: {totalEmployees}</p>
          </div>
          <div className="available-employees-info">
            <p>Available Employees: {availableEmployees}</p>
          </div>
        </div>

        <div className="employees-list">
          <h2>Employees</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.name}</td>
                  <td>{employee.department}</td>
                  <td>{employee.salary}</td>
                  <td>{employee.location}</td>
                  <td>{employee.status}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              value={newEmployee.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Enter department"
              name="department"
              value={newEmployee.department}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Enter salary"
              name="salary"
              value={newEmployee.salary}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Enter location"
              name="location"
              value={newEmployee.location}
              onChange={handleChange}
            />
            <select
              name="status"
              value={newEmployee.status}
              onChange={handleChange}
            >
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
            <button type="submit">{editIndex !== null ? 'Update' : 'Add'} Employee</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;