//  "use client"
import Header from '@/components/header'

// import React,{ useState} from 'react';
import {getList} from '@/lib/actions'
import ListTable from '@/components/tables/list_table';



const Dashboard = async () => {

     let list = await getList();
       console.log(list , "----------------");
    return (
        <div className='container_box animation_linear'>
        <Header/>
         <ListTable  data={list} />
             </div>
                  
                   
                  
    );
      
}

export default Dashboard