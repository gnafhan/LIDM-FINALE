import { createContext, useReducer } from "react"

export const AppReducer = (state, action) => {
    switch(action.type){
        case 'SCROLL_PAGE':
            let scrollToPage = action.payload.number
            state.pdfPage = scrollToPage
            action.type = 'DONE'
            return {
                ...state
            }
        case 'ZOOM_PAGE':
            let zoomPage = action.payload.zoom
            state.pdfZoom = zoomPage
            action.type = 'DONE'
            return {
                ...state
            }  
        default:
            return state
    }
}

const initialState = {
    pdfPage: 1,
    pdfZoom: 1
}

export const AppContext = createContext()

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider
            value={{
                dispatch,
                pdfPage: state.pdfPage,
                pdfZoom: state.pdfZoom
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}