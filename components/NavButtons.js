import RegistrationModal from './RegistratioModal';
import LoginModal from './LoginModal';
import { Button } from 'react-bootstrap';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from '../src/app/firebase';


const NavButtons = () => {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {  
            return (
                <div className='d-flex flex-wrap justify-content-center'>
                    <div className="d-flex">
                        <div className="mx-2">
                            <Button variant="outline-primary" className="rounded-pill border-2" disabled>
                                {user.email}
                            </Button>
                        </div>
                        <div className="mx-2">
                            <Button variant="outline-danger" className="rounded-pill border-2" href="#">
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            )
        } else {
            setUser(null); 
            return (
                <div className='d-flex flex-wrap justify-content-center'>
                    <div className="d-flex">
                        <div className="mx-2">
                            <LoginModal />
                        </div>
                        <div className="mx-2">
                            <RegistrationModal />
                        </div>
                    </div>
                </div>
            )
        }})
    

    // <div className="d-flex">
    //     <div className="mx-2">
    //         <Button variant="outline-dark" className="rounded-pill my-auto border-2" href="admin/index.php">
    //             Admin
    //         </Button>
    //     </div>
    // </div>
}

export default NavButtons;