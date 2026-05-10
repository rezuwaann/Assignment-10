import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ConnectedCard from '../components/ConnectedCard/ConnectedCard';

const Connections = () => {
const [connections,setConnections]=useState([])

    useEffect(()=>{
        axios.get('http://localhost:3000/connections')
        .then(res=>setConnections(res.data))
        .catch(err=>console.log(err))

        
    },[])
    // console.log(connections)
    return (
        <div  className='grid mx-auto w-11/12'>
            {
                connections.map((connection,index)=><ConnectedCard key={index+1} connection={connection}></ConnectedCard>)
            }
        </div>
    );
};

export default Connections;