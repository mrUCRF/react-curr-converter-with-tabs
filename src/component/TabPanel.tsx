import { SetStateAction, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, Navigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, Button,ButtonBaseActions,ButtonBaseClasses,SxProps,Tab, TabClasses, Tabs, TextField, Theme, Typography } from "@mui/material";
import EurComponent from "./EurComponent";
import PlnComponent from "./PlnComponent";
import UsdComponent from "./UsdComponent";
import { connect, useDispatch, useSelector } from "react-redux";
import { addInputValueAC, getAllValues, InitialStateType } from "../redux/rootReducer";
import React from "react";
import s from './TabPanel.module.css'
import { TouchRippleProps, TouchRippleActions } from "@mui/material/ButtonBase/TouchRipple";
import { CommonProps } from "@mui/material/OverridableComponent";
import Loader from "../loader/Loader";

function TabPanel(props: { [x: string]: any; children: any; value: any; index: any; }) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};
function a11yProps(index: number) {
    return {
        id: `nav-tab-${index}`,
        "aria-controls": `nav-tabpanel-${index}`
    };
}
function LinkTab(props: {
    [x: string]: any 
})  {
    // console.log(props)
    return (
        <Tab
            component={Link}
            to={`/${props.pathname}`}
            {...props}
        />
    );
}
type PropsType = {
    addInputValue: (value: number | string) => void
    state: InitialStateType
}
const NavTabs = (props: PropsType) => {
    const [preloader, setPreloder] = useState<any>(true)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllValues()).then(() => {
            setPreloder(false)
        })
    }, [])
    const prevValueTab = localStorage.getItem('tab')
    const [value, setValue] = useState(Number(prevValueTab));

    const handleChange = (event: any, newValue: any) => {
        localStorage.setItem('tab', newValue)
        setValue(newValue)
        props.addInputValue(valueInput)
    };
    const [valueInput, setValueInput] = useState<number | string>('');
    const changeValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValueInput(Number(event.target.value))
    }
    const btnAddValue = () => {
        props.addInputValue(valueInput)
    }
    const keyPress = (e: { keyCode: number }) => {
        if (e.keyCode == 13) {
            props.addInputValue(valueInput)
        }
    }
    return (
        <div >
            {preloader
                ? <Loader />
                :
                <div className={s.converterBox}>
                    <div className={s.inputWrapper}>
                        <h3>Конвертер валют</h3>
                        <TextField inputProps={{ style: {textAlign: 'center'} }} sx={{ width: '100%', color: 'success.main', textAlign: 'center', cursor: 'none' }} 
                        type="number" onKeyDown={keyPress} id="outlined-basic" label="Введіть суму"
                            value={valueInput} onChange={changeValueInput} variant="outlined" />
                        <div className={s.btn}>
                            <Button variant="outlined" onClick={() => btnAddValue()}>Конвертувати</Button>
                        </div>
                        <div >
                            <BrowserRouter>
                                <div >
                                    <hr />
                                    <Box >
                                        <Tabs
                                            className={s.tabs}
                                            variant="fullWidth"
                                            value={value}
                                            onChange={handleChange}
                                            aria-label="nav tabs example"
                                        >
                                            <LinkTab className={s.tab} label="USD" pathname="usd" {...a11yProps(0)} />
                                            <LinkTab className={s.tab} label="EUR" pathname="eur" {...a11yProps(1)} />
                                            <LinkTab className={s.tab} label="PLN" pathname="pln" {...a11yProps(2)} />
                                        </Tabs>
                                    </Box>
                                </div>
                                <Routes>
                                    <Route path="/usd" element={<UsdComponent state={props.state} />} />
                                    <Route path="/eur" element={<EurComponent state={props.state} />} />
                                    <Route path="/pln" element={<PlnComponent state={props.state} />} />
                                    <Route path="*" element={<Navigate to="/usd" replace />} />
                                </Routes>
                            </BrowserRouter>
                        </div>
                    </div>
                </div>
            }
        </div >
    );
}
const mapStateToProps = (state: any) => {
    return {
      state 
    }
  }
  type mapDispatchToPropsType = {
    addInputValue: (value: string | number) => void
  }
  const mapDispatchToProps = (dispatch: any): mapDispatchToPropsType => {
        return {
          addInputValue: (value: any) => {
                dispatch(addInputValueAC(value))
            }
        }
    }
  export default connect(mapStateToProps, mapDispatchToProps)(NavTabs);
