const styles = (theme) => ({
   
    drawerPaper:{
        width:240,
        zIndex:10,
        maxWidth: 240,
        height: '100%',
        position: 'relative'
    },
    menuLink:{
        textDecoration: 'none',
        color: 'black',
        
    },
    menuLinkActive:{
        '&>div':{
            backgroundColor: theme.color.hover
        }
    },
    listItem:{
        height: '6vh'
    }
});

export default styles;
