'use server'

import conn from "./pg";
const { signIn, signOut } = require("../auth");

export async function authenticate(formData) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if ((error).message.includes('CredentialsSignin')) {
            return 'CredentialsSignin';
        }
        throw error;
    }
}

export async function logout() {
    try {
        await signOut({ redirectTo: '/login' });
    } catch (error) {
        throw error;
    }
}

export async function getList(){
    try {
        const res = await conn.query(`SELECT * FROM public.fn_get_list(${0})`);
        // console.log(res.rows ,"kijgh");
        return res.rows;
    } catch (error) {
        console.error('Failed to get list:', error);
        
    }
}


export async function addList(initialState){
    try {
        const { title , description} = initialState
        const query = `CALL public."SP_Add_List"('${title}','${description}')`
        const res = await conn.query(query)
        return res.rows;

    } catch (error) {
        console.error('Failed to get list:', error);
        
    }
}

export async function getbyid(list_id) {
    try {
        const res = await conn.query(`SELECT * FROM public.fn_get_list(${list_id})`);
        return res.rows;


        
    } catch (error) {
        console.error('Failed to get list:', error);
        
    }
}

export async function Editbyid(initialState){
    try {
        const {list_id , title , description} = initialState
        const query = `CALL public."SP_Update_List"(${list_id},'${title}','${description}')`
        const res = await conn.query(query)
        return res.rows
    } catch (error) {
        console.error('Failed to get list:', error);
        
    }
}
export async function Deleteid (id) {
    try {
          const res = await conn.query(`CALL public."SP_DELETE_ID"(${id})`)
          return res.rows;
  
    } catch (error) {
        console.error('Failed to get list:', error);
        
    }
}

