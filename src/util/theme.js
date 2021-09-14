const theme = {
    palette: {
        primary: {          
            light: '#2B9B9F',
            main: '#217679',
            dark: '#134445',            
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff6333',
            main: '#cc0000',
            dark: '#b22a00',
            contrastText: '#fff',
        }, 
        background: {
            default: '#fff',
            paper: '#fff',
            outerSpace: '#eee', // rgb(15,29,56)
        },        
    },
    shape:{
        // innerBorderRadius: '10px 10px 10px 10px',
        innerBorderRadius: '5px 5px 0px 0px',
        containerBorderRadius: '5px'
    },
    spacing: 8,
    customSpacings: {
        innerPosition: {
            // top: "10px",//'calc(2% + 10px)',
            top: "0px"
        },
        // innerHeight: 'calc(100% - 20px)',
        // innerWidth: 'calc(100% - 20px)',
        innerHeight: '100%',
        innerWidth: '100%',
    }

}

export default theme
