import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    color: {
        primary: "#3f51b5",
        secondary: "#03A9F4",
        error:"#E64A19",
        textColor:"white",
        hover:'rgba(0,0,0,0.08)',
    },
    typoraphy:{
        fontFamily:"Roboto",
    },
    shape:{
        borderRadius: 4,
        backgroundColor:"#512DA8",
        textColor:"white",
        borderColor: "#cccccc"
    }
  });

  export default theme;