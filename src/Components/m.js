import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Loading from "./Loading";

export function NM(){
    let history=useHistory();
    let token=sessionStorage.getItem('token');
    if(token){
     history.push('/dashboard');
    }else{
        history.push('/login');
    }

    return(
        <div>
            <Loading/>
        </div>
    )
}