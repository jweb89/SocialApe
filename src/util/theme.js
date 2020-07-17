export default {
  palette: {
    primary: {
      light: "#9d46ff",
      main: "#6200ea",
      dark: "#0a00b6",
      contrastText: "#fff",
    },
    secondary: {
      light: "#6ec5ff",
      main: "#2195f2",
      dark: "#0068bf",
      contrastText: "#000",
    },
  },
  spreadThis: {
    typography: {
      useNextVariants: true,
    },
    form: {
      textAlign: "center",
    },
    image: {
      margin: "20px auto 20px auto",
    },
    pageTitle: {
      margin: "10px auto 10px auto",
    },
    textField: {
      margin: "10px auto 10px auto",
    },
    button: {
      marginTop: 20,
      position: "relative",
    },
    customeError: {
      color: "red",
      fontSize: ".8rem",
      marginTop: 10,
    },
    progress: {
      position: "absolute",
      alignSelf: "center",
    },
    invisibleSeparator: {
      color: "none",
      border: "none",
      margin: 4,
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginBottom: "20px",
    },
    paper: {
      padding: 20,
    },
    profile: {
      "& .image-wrapper": {
        textAlign: "center",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "80%",
          left: "70%",
        },
      },
      "& .profile-image": {
        width: 200,
        height: 200,
        objectFit: "cover",
        maxWidth: "100%",
        borderRadius: "50%",
      },
      "& .profile-details": {
        textAlign: "center",
        "& span, svg": {
          verticalAlign: "middle",
        },
        "& a": {
          color: "#6200ea",
        },
      },
      "& hr": {
        border: "none",
        margin: "0 0 10px 0",
      },
      "& svg.button": {
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    buttons: {
      textAlign: "center",
      "& a": {
        margin: "20px 10px",
      },
    },
  },
};
