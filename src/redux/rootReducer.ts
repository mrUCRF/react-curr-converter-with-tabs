import { getCurrencyApi } from "../api/api"




let initialState = {
    eur: 0 as number,
    usd: 0 as number,
    pln: 0 as number,
    inputValue: 0 as number 
}
export type InitialStateType = typeof initialState

export const getAllValues = (): any => {
    return async (dispatch: any) => {
        const dataEur = await getCurrencyApi.getEurData()
        const dataPln = await getCurrencyApi.getPlnData()
        const dataUsd = await getCurrencyApi.getUsdData()
        return dispatch(actions.setAllData(dataEur, dataPln, dataUsd))
    }
}
export const addInputValueAC = (value: number) => {
    
    return { type: 'ADD_INPUT_VALUE', value} as const
}

export const actions = {
    setAllData: (dataEur: number, dataPln: number, dataUsd: number) => {
        return { type: 'ADD_ALL', dataEur, dataPln, dataUsd } as const
    }
}
const rootReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        case 'ADD_ALL':
            return { ...state, eur: action.dataEur, pln: action.dataPln, usd: action.dataUsd }
        case 'ADD_INPUT_VALUE':
            return { ...state, inputValue: action.value }
        default:
            return state
    }
}




export default rootReducer