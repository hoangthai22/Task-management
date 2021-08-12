const styles = (theme) => ({
    modal: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        position: "absolute",
        width: 500,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        //padding: theme.spacing(2, 4, 3),
        borderRadius: 10
      },
      header:{
        backgroundColor: theme.color.primary,
        padding: theme.spacing(2),
        borderRadiusTop: 10,
        lineHeight: 2
      },
      titleModel:{
        color: theme.color.textColor,
        fontWeight:700,
        textTransform: 'capitalize',
        
      },
      
      content:{
        padding: theme.spacing(4)
      }
});

export default styles;