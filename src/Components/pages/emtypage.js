import Button from '@mui/material/Button';
export function Firstpage() {
    return (
        <div id="firstpage" style={{textAlign:"center",height:"100vh"}}>
            <p style={{fontSize:'40px' ,color:"black"}}>SignUP your Account</p>
            <h2 style={{color:"black"}}>WELCOME TO Mobile Phone Shop Admin Page</h2>
           <h3 style={{color:"black"}}>One smartphone, endless possibilities.</h3>
            
         
            <Button href='/signup' variant="contained" color="success" style={{width:"350px",height:"100px",position:"relative", top: "55%" ,borderRadius:"30px"}}>
                Sign UP
            </Button>
        
        </div>
    )
}