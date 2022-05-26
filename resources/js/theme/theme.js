import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography : {
        useNextVariants: true
    },
    palette : {
         primary : {
             main : '#0277bd'
         },
         common:{
             white : 'white'
         },
         secondary:{
             main : '#9e9e9e'
         }
    },
    spacing : 10
});

export default theme;