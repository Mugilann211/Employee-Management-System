import React, { useState } from 'react';
import { Employee } from '../types/Employee';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeTable from '../components/EmployeeTable';
import Modal from '../components/Modal';

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: 'Alice', department: 'HR', position: 'Manager' },
    { id: 2, name: 'Bob', department: 'IT', position: 'Developer' },
    { id: 3, name: 'Charlie', department: 'Finance', position: 'Analyst' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);

  const handleAdd = (employee: Omit<Employee, 'id'>) => {
    setEmployees((prev) => [
      ...prev,
      { ...employee, id: Date.now() },
    ]);
  };

  const handleEdit = (employee: Omit<Employee, 'id'>) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === currentEmployee?.id ? { ...e, ...employee } : e))
    );
    setCurrentEmployee(null);
  };

  const handleDelete = (id: number) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  const openAddModal = () => {
    setCurrentEmployee(null);
    setIsModalOpen(true);
  };

  const openEditModal = (employee: Employee) => {
    setCurrentEmployee(employee);
    setIsModalOpen(true);
  };

  return (
    <div className="employee-management">
      <button onClick={openAddModal}>Add Employee</button>
      <EmployeeTable
        data={employees}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <EmployeeForm
          onSubmit={currentEmployee ? handleEdit : handleAdd}
          initialData={currentEmployee || undefined}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default EmployeeManagement;
