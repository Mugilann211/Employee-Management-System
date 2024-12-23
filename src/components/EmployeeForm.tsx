import React, { useState } from 'react';
import { Employee } from '../types/Employee';

interface Props {
  onSubmit: (employee: Omit<Employee, 'id'>) => void;
  initialData?: Omit<Employee, 'id'>;
  onClose: () => void;
}

const EmployeeForm: React.FC<Props> = ({ onSubmit, initialData, onClose }) => {
  const [formData, setFormData] = useState<Omit<Employee, 'id'>>(initialData || {
    name: '',
    department: '',
    position: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        value={formData.position}
        onChange={handleChange}
        required
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default EmployeeForm;
