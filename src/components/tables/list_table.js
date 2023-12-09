"use client";
import React , {useState, useEffect} from 'react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Tag } from 'primereact/tag'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { addList , Deleteid ,getList ,Editbyid ,getbyid} from '@/lib/actions';

const ListTable = ({data}) =>{


const [globalFilter,setGlobalFilter] = useState(null)
const [displayDialog, setDisplayDialog] = useState(false); 
const [initialState , setinitialstate] = useState({
    title:'',
    description:''
})
const [edit,setedit] = useState(false)
const [list,setlist]=useState([])
const [list_id, setListId] = useState(null);
const [todo,settodo] = useState([])


useEffect(() => {
    
    const fetchData = async () => {
        
        if (list_id) {
            const data = await getbyid(list_id);
            const da = await getList();
            settodo(da)
            setlist(data);
        }
    };

    fetchData();



   
}, [list_id]);


useEffect(() =>{
     if(list){

        setinitialstate(prevstate => ({
            ...prevstate ,
            list_id:list[0]?.list_id,
         title:list[0]?.title,
         description:list[0]?.description
     
        }));

     }
},[list])

useEffect(()=>{
    if(displayDialog == false){
        return (()=>{
            setinitialstate({
                title:'',
                description:''  
            })
        })
    }
},[displayDialog])


const navigateEditProvider = async(list_id) =>{
    setListId(list_id)
    setDisplayDialog(true);
     setedit(true)
}

const onHide = () => {
    setDisplayDialog(false);
};

const handleUpdate =async (initialState) => {
    let res = await Editbyid(initialState)
    if(res){
        setDisplayDialog(false);
     }
}

const navigateAddProvider = () =>{
    setDisplayDialog(true);
    setedit(false)


}

const handleSave = async (initialState) =>{

    let res = await addList(initialState)
     if(res){
        setDisplayDialog(false);
     }

} 

const navigateViewProvider = async(list_id) =>{
    const id = list_id
    let res = await Deleteid(id)

}

    const columns = [
        { field: 'list_id', header: 'Id' },
        { field: 'title', header: 'Title' },
        { field: 'description', header: 'Description' },
        // {
        //     field: 'status', header: 'Status', headerStyle: { minWidth: '100px' }, body: (rowData) => {
        //         if (rowData.status === true) {
        //             return (
        //                 <>
        //                     <Tag severity="success" value="Active"></Tag>
        //                 </>
        //             );
        //         }
        //         if (rowData.status === false) {
        //             return (
        //                 <>
        //                     <Tag severity="danger" value="Disable"></Tag>
        //                 </>
        //             );
        //         }

        //     }
        // },
        // { field: 'created_date', header: 'Created Date' },
        {
            field: 'actions', header: 'Actions', headerStyle: { minWidth: '110px' }, body: (rowData) => {
                return (
                    <>
                        <div className='action_btns'>
                            <Button label='Edit' className='Edit_btn' onClick={()=>{navigateEditProvider(rowData.list_id);}} style={{ marginRight: '10px' }}  />
                            <Button label='Delete' className='View_btn'  onClick={() => navigateViewProvider(rowData.list_id) } style={{ border: '1px solid red' , backgroundColor: 'red', color: 'white' }}   />

                        </div>
                    </>
                );
            }
        }
    ];
    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                {/* <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." /> */}
            </span>
            <div className='view_box'>
                <Button className='add_btn mr-2' label="Add Todo" tooltip="Add Todo" 
                  onClick={navigateAddProvider}
                 />
            </div>
        </div>
    );


    return(
        <div className='container_box'>
        <div className="grid card">
          
            <div className="col-12 md:col-12">
                <DataTable value={data} header={header} showGridlines
                    paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}
                    globalFilter={globalFilter} emptyMessage="No records found">
                    {columns.map((column) => (
                        <Column
                            key={column.field}
                            field={column.field}
                            header={column.header}
                            body={column.body}
                        // body={column.field === 'actions' ? renderActions : undefined}
                        />
    
                    ))}
                </DataTable>
    
    
            </div>
        </div>

        <Dialog header={edit?'Edit Todo':'Add Todo'} visible={displayDialog} style={{ width: '50vw' }} onHide={onHide}>
                {/* Add your dialog content here */}
                <div className="p-fluid">
        <div className="p-field">
            <label htmlFor="title">Title</label>
            <InputText id="title" type="text"  value={initialState.title} onChange={(e) => setinitialstate({...initialState , title:e.target.value})} />
        </div>
        <div className="p-field">
            <label htmlFor="description">Description</label>
            <InputText id="description" type="text"  value={initialState.description} onChange={(e) => setinitialstate({...initialState , description:e.target.value})}/>
        </div>
    </div>
    <div className="p-mt-4">
        {edit?<Button label="Update" onClick={() =>handleUpdate(initialState)} />:<Button label="Save" onClick={() =>handleSave(initialState)} />}
    </div>
            </Dialog>
    </div>
    )
}



export default ListTable;
