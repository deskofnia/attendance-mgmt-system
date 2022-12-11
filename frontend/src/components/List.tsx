import Header from './Header';
import './css//List.css';
import { useEffect, useState } from 'react';
import { IUser } from '../Interfaces/commonInterfaces';
import axios from 'axios';

export const List = () => {

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    axios.get<IUser[]>("http://localhost:5000/api/list")
    .then((res) =>{
        console.log(res);
        setUsers(res.data);
    });
  }, []);

  return (
    <>
          <div className='tableProp'>
              <table className="table table-striped">
                  <thead className='columnProp'>
                      <tr>
                          <th scope="col">#</th>
                          <th scope="col">Email</th>
                          <th scope="col">Password</th>
                          <th scope="col">ID</th>
                          <th scope="col">Status</th>
                      </tr>
                  </thead>
                  <tbody className='tableBodyStyle'>
                      {
                          users && users.map((user, i) => {
                              return (
                                  <tr key={i}>
                                      <td>{i + 1}</td>
                                      <td>{user.email}</td>
                                      <td>{user.password}</td>
                                      <td>{user._id}</td>
                                      <td>{user.status}</td>
                                  </tr>
                              )
                          })
                      }
                  </tbody>
              </table>
          </div>
          <a href="/login/admin" className='dashboardStyle'><i className="fas fa-angle-double-left"></i>Dashboard</a>
    </>
  )
}



// class List extends React.Component {

//     CheckingLogin
//     constructor(props) {
//         super(props);
//         this.state = {
//             employees: [],
//             ID: 0,
//             name: '',
//             email: '',
//             gender: '',
//             phone: 0,
//             list: [],
//             leave: 'No'
//         }
//         this.deleteEmployee = this.deleteEmployee.bind(this);
//     }



//     componentDidMount = () => {
//         this.getEmployee();
//     }

//     getEmployee = () => {
//         axios.get('http://localhost:4000/api/users')
//             .then((response) => {
//                 const data = response.data;
//                 console.log("data==", data);
//                 this.setState({ employees: data })
//                 console.log('Data loaded');
//             })
//             .catch(() => {
//                 console.log('not retreived data')
//             });
//     }

//     deleteEmployee(id) {
//         axios.get('http://localhost:4000/api/users/remove/' + id)
//             .then(() => {

//                 console.log('Employee Deleted !!!');
//                 window.location.reload(true);
//             })
//             .catch((error) => {
//                 console.log(error)
//             })
//     }




//     render() {
//         const { employees } = this.state;
//         return (
            
//         )

//     }

// }

// export default List;


