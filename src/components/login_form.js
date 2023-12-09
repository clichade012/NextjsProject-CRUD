"use client"
import { authenticate } from "@/lib/actions"
import { Button } from "primereact/button"
import { Checkbox } from "primereact/checkbox"
import { InputText } from "primereact/inputtext"
import { Message } from "primereact/message"
import { useState } from "react"
import { useFormState, useFormStatus } from 'react-dom';

const LoginForm = () => {
    const [state, dispatch] = useFormState(authenticate, undefined);
    const [checked, setChecked] = useState(false)
    const [userid, setUserid] = useState('')
    const [password, setPassword] = useState('')
    const { pending } = useFormStatus();

    return (
        <div>
            <label htmlFor="userid" className="block text-900 font-medium mb-2">Username</label>
            <InputText id="userid" type="text" placeholder="Username" className="w-full mb-3" onChange={e => setUserid(e.target.value)} />

            <label htmlFor="password" className="block text-900 font-medium mb-2">Password</label>
            <InputText id="password" type="password" placeholder="Password" className="w-full mb-3" onChange={e => setPassword(e.target.value)} />

            <div className="flex align-items-center justify-content-between mb-6">
                {/* <div className="flex align-items-center">
                    <Checkbox id="rememberme" onChange={e => setChecked(e.checked)} checked={checked} className="mr-2" />
                    <label htmlFor="rememberme">Remember me</label>
                </div> */}
                {/* <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot your password?</a> */}
            </div>

            <Button type="submit" disabled={pending} label="Sign In" icon="pi pi-user" className="w-full" onClick={e => {
                e.preventDefault();
                authenticate({ userid, password })
            }} />
            {/* {state === 'CredentialsSignin' && <Message severity="error" text="Invalid credentials" />} */}
        </div>
    )
}

export default LoginForm


chaitanya19$$