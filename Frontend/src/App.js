
import './App.css';
// import Admin from './Components/Admin-dashboard/Admin'
import Login from './Components/login';
import Signup from './Components/Signup';
import Home from './Components/Customer-dashboard/Home'
// import Sidebar from './Components/Admin-dashboard/Sidebar';
import Dashboard from './Components/Admin-dashboard/Dashboard';
import Places from './Components/Customer-dashboard/Place';
import Customer from './Components/Admin-dashboard/Customer/Customer';
import AddCustomer from './Components/Admin-dashboard/Customer/AddCustomer';
import EditCustomer from './Components/Admin-dashboard/Customer/EditCustomer';
import DetailCustomer from './Components/Admin-dashboard/Customer/DetailCustomer';
import Employee from './Components/Admin-dashboard/Employee/Employee';
import AddEmployee from './Components/Admin-dashboard/Employee/AddEmployee';
import EditEmployee from './Components/Admin-dashboard/Employee/EditEmployee';
import DetailEmployee from './Components/Admin-dashboard/Employee/DetailEmployee';
import Services from './Components/Admin-dashboard/Services/Services';
import AddServices from './Components/Admin-dashboard/Services/AddServices';
import EditServices from './Components/Admin-dashboard/Services/EditServices';
import DetailServices from './Components/Admin-dashboard/Services/DetailServices'
import CustAddser from './Components/Customer-dashboard/CustAddser'
import HomeserDetails from './Components/Customer-dashboard/HomeSerDetails'
import CustomerCart from './Components/Customer-dashboard/CustomerCart'
import SetTime from './Components/Customer-dashboard/SetTime'
import OrderCart from './Components/Customer-dashboard/OrderCart'
import About from './Components/Customer-dashboard/About';
import Contact from './Components/Customer-dashboard/Contact';
import Cart from './Components/Customer-dashboard/Cart';
import Sample from './Components/Customer-dashboard/Sample';
import Sample2 from './Components/Customer-dashboard/Sample2';
import EmpSer from './Components/Admin-dashboard/EmpSer/EmpSer';
import AddOn from './Components/Admin-dashboard/AddOn/AddOn';
// import CreateCustomer from './Components/Admin-dashboard/CreateCustomer';
// import Employee from './Components/Admin-dashboard/Employee';
// import Services from './Components/Admin-dashboard/Services';
import CustProfile from './Components/Customer-dashboard/CustProfile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustEditProfile from './Components/Customer-dashboard/CustEditProfile';
import CustOrder from './Components/Customer-dashboard/CustOrder';

function App() {
  return (
    <div>
      <Router>

        <Routes>
          <Route path="/login" element={<Login></Login>} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/Admin/" element={<Dashboard />} />
          <Route path="/Admin/Customer" element={<Customer />} />
          <Route path="/Admin/Addcustomer" element={<AddCustomer />} />
          <Route path="/Admin/EditCustomer/:id" element={<EditCustomer />} />
          <Route path="/Admin/DetailCustomer/:id" element={<DetailCustomer />} />
          <Route path="/Admin/Employee" element={<Employee />} />
          <Route path="/Admin/AddEmployee" element={<AddEmployee />} />
          <Route path="/Admin/EditEmployee/:id" element={<EditEmployee />} />
          <Route path="/Admin/DetailEmployee/:id" element={<DetailEmployee />} />
          <Route path="/Admin/Services" element={<Services />} />
          <Route path="/Admin/AddServices" element={<AddServices />} />
          <Route path="/Admin/EditServices/:id" element={<EditServices />} />
          <Route path="/Admin/DetailServices/:id" element={<DetailServices />} />
          <Route path="/Admin/EmpSer/" element={<EmpSer />} />
          <Route path="/Admin/AddOn/" element={<AddOn />} />


          <Route path="/" element={<Home></Home>} />
          <Route path="/Customer/AddServices/" element={<CustAddser />} />
          <Route path="/Customer/About/" element={<About />} />
          <Route path="/Customer/Contact/" element={<Contact />} />
          <Route path="/Home/DetailsServices/:id" element={<HomeserDetails />} />
          {/* <Route path="/Customer/Cart/" element={<CustomerCart />} /> */}
          <Route path="/Customer/SetTime/:id" element={<SetTime />} />
          <Route path="/Customer/OrderCart/:id" element={<OrderCart />} />
          <Route path="/Customer/Cart" element={<Cart />} />
          <Route path="/Customer/Sample" element={<Sample />} />
          <Route path="/Customer/Sample2" element={<Sample2 />} />
          <Route path="/Customer/Profile/:id" element={<CustProfile />} />
          <Route path="/Customer/CustEditProfile/:id" element={<CustEditProfile />} />
          <Route path="/Customer/CustOrder/" element={<CustOrder />} />
          <Route path="/Customer/Place/" element={<Places />} />
          
          {/* <Route path="/Admin/Employee" element={<Employee />} /> */}
          {/* <Route path="/Admin/Services" element={<Services />} /> */}
        </Routes>








      </Router>

    </div>
  );
}

export default App;
