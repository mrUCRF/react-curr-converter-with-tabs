import { useState } from "react"
import { useSelector } from "react-redux"
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { InitialStateType } from "../redux/rootReducer";
import s from './TabPanel.module.css'


type PropsType = {
    state : InitialStateType
    
  }

const PlnComponent = (props: PropsType) => {

    const result = (props.state.inputValue * props.state.pln).toFixed(0)

    return (
        
            <div>
                 <hr/>
                <TextField inputProps={{ style: {textAlign: 'center'} }} sx={{ width: '100%', color: 'success.main'}} 
                type="text" id="outlined-basic" label="Отримаєте в PLN" value={`${result} PLN`}   variant="outlined" />
            </div>


    )
}


export default PlnComponent