import { logout } from '@/lib/actions';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';

const Header = (() => {
    return (
        <>
            <form action={logout} >
                <Toolbar center={<h1>--: Todo-list :--</h1>} end={<Button label='Sign Out' icon='pi pi-sign-out' severity="danger" raised text />} />
            </form>
        </>
    );
});

export default Header;
