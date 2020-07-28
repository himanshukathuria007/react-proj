import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../users/Pagination";

const Home = () => {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {

    loadUsers()
    .then((data)=>{

      setUser(data)
      
    })
  }, []);

  const loadUsers = async () => {
   //await axios.get("http://localhost:3003/api/employees");
    const result = await axios.get("http://localhost:3003/api/employees");
    //const result = await axios.get("http://localhost:3003/users");
    //setUser(result.data.users.reverse());

    return result.data.users
  };

  const deleteUser = async id => {
    await axios.delete(`http://localhost:3003/api/employee/${id}`);

  const list = await loadUsers();


    setUser(list);
   
  };


 // Get current posts
 const indexOfLastPost = currentPage * postsPerPage;
 const indexOfFirstPost = indexOfLastPost - postsPerPage;
 const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost);

 // Change page
 const paginate = pageNumber => setCurrentPage(pageNumber);

console.log("data",users);



  return (
    <div className="container">
      <div className="py-4">
        <h1>EMPLOYEES </h1>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">FirstName</th>
              <th scope="col">LastName</th>
              <th scope="col">Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.length >0 && currentPosts.map((user, index) => (
              <tr>
                <th scope="row"> # </th>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>
                  <Link class="btn btn-primary mr-2" to={`/users/${user.id}`}>
                    View
                  </Link>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/users/edit/${user.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={users.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Home;
