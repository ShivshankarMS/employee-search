import Employee from './Employee';
import './App.css';

type EmployeeConfig = {
  isActive: string;
  email: Array<string>;
  tel: Array<string>;
};
function App() {
  const employeeConfig: EmployeeConfig = {
    isActive: 'Y', //whether you want to analyse Active or inactive employees data
    email: ['Finance'], //We can add other deparments in future if required
    tel: ['IT'], //If support guy's both email and tel should be displayed then add in both arrays i.e email and tel
  };
  return (
    <div className='App'>
      <header>
        <h1>Employee Search App</h1>
        <Employee {...employeeConfig} />
      </header>
    </div>
  );
}

export default App;
