import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarChart from '../components/Graphs/BarChart'


const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const res = await axios.get('http://localhost:3000/api/data');
        //console.log(res.data.data)
        
        setData(res?.data.data); 
      
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();

  }, []); 


  return (
    <div>
      <BarChart data={data}/>
     
    </div>
  );
};

export default Dashboard;
