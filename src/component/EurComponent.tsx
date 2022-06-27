import { TextField } from "@mui/material";
import { InitialStateType } from "../redux/rootReducer";


type PropsType = {
    state : InitialStateType
    
  }

const EurComponent = (props: PropsType) => {
    const result = (props.state.inputValue * props.state.eur).toFixed(0)
   
    return (
        
            <div>
                 <hr/>
                <TextField inputProps={{ style: {textAlign: 'center'} }} sx={{ width: '100%', color: 'success.main'}}  
                type="text" id="outlined-basic" label="Отримаєте в EUR"  value={`${result} EUR`}  
                variant="outlined" />
            </div>


    )
}


export default EurComponent