import React, { useEffect, useState } from "react";

const App = () => {
  const [ipvalue, setipvalue] = useState("");
  const [lists, setlists] = useState([]);
  const [editid, seteditid] = useState(null);

 
  const getdata = async () => {
    try {
      const response = await fetch("http://localhost:5000");
      const result = await response.json();
      if (result.status === 200) {
        setlists(result.data);
        console.log(result.data);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  
  const postdata = async () => {
    try {
      const response = await fetch("http://localhost:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ipvalue }),
      });
      if (response.ok) {
        setipvalue("");
        getdata(); 
      }
    } catch (error) {
      console.error("Error posting data: ", error);
    }
  };

  const putdata = async (index) => {
    try {
      const response = await fetch(`http://localhost:5000?index=${index}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ipvalue }),
      });
      if (response.status === 200) {
        seteditid(null);
        setipvalue("");
        getdata(); 
      }
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };

  
  const deletedata = async (index) => {
    try {
      await fetch(`http://localhost:5000/${index}`, {
        method: "DELETE",
      });
      getdata(); 
    } catch (error) {
      console.error("Error deleting data: ", error);
    }
  };

  useEffect(() => {
    getdata(); 
  }, []);

  return (
    <>
      <input
        value={ipvalue}
        onChange={(e) => setipvalue(e.target.value)}
        type="text"
      />
      {editid !== null ? (
        <button onClick={() => putdata(editid)}>Update</button>
      ) : (
        <button onClick={postdata}>Add</button>
      )}
      <ul>
        {lists.map((item) => (
          <li key={item._id}>
            {item.ipvalue}{" "}
            <button
              onClick={() => {
                seteditid(item._id);
                setipvalue(item.ipvalue);
              }}
            >
              Edit
            </button>{" "}
            <button onClick={() => deletedata(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
