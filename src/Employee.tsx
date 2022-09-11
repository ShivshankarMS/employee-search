import { useState, useEffect } from 'react';
import './Employee.css';

function Employee({
  isActive,
  email,
  tel,
}: {
  isActive: string;
  email: Array<string>;
  tel: Array<string>;
}) {
  const [employeeDetails, setEmployeeDetails] = useState<Array<any>>([]);
  const [filteredEmployeeList, setFilteredEmployeeList] = useState<Array<any>>(
    []
  );
  const [inputText, setInputText] = useState<string>('');
  useEffect(() => {
    fetchEmployeeDetails();
  }, []);

  function fetchEmployeeDetails() {
    fetch('/empsearch?isActive=' + isActive)
      .then(res => res.json())
      .then(data => {
        setEmployeeDetails(data);
        setFilteredEmployeeList(data);
      });
  }
  const onSearchFieldContentChange = (inputTxt: string) => {
    setInputText(inputTxt);
    let filteredList = employeeDetails.filter(
      employee =>
        employee.firstName.toLowerCase().indexOf(inputTxt.toLowerCase()) !==
          -1 ||
        employee.lastName.toLowerCase().indexOf(inputTxt.toLowerCase()) !== -1
    );
    setFilteredEmployeeList(filteredList);
  };
  const onSubmitButtonClick = () => {
    console.table(filteredEmployeeList);
  };
  return (
    <div>
      <div>
        <input
          type='text'
          onChange={event => onSearchFieldContentChange(event.target.value)}
          value={inputText}
          placeholder='i.e John'
        />
        <button onClick={onSubmitButtonClick}>Submit</button>
      </div>
      <div>
        {filteredEmployeeList.length !== 0 ? (
          <table id='employees'>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>e-Mail</th>
                <th>Tel</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployeeList.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>
                    {email.includes(employee.department) ? employee.email : ''}
                  </td>
                  <td>
                    {tel.includes(employee.department) ? employee.tel : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className='error'>
            Employee Details not found!! Please try with different name.
          </div>
        )}
      </div>
    </div>
  );
}

export default Employee;
