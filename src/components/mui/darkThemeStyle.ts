import {createTheme, darkScrollbar} from "@mui/material";
import {lightTheme} from "./lightThemeStyle";
import {commonMuiComponentStyles, typographyStyle} from "./bothThemeStyles";

export let darkTheme = createTheme ({});

const darkPalette = {
    background: {
        default: "#14131B",
        light: "#191A1E"
    },
    action: {
        disabledBackground: 'rgba(255,255,255,0.1)',
        disabled: "rgba(255,255,255,0.4)"
    },
    info: {
        main: lightTheme.palette.info.light,
        dark: "#2b2678"
    },
    primary: {
        main: "#FFFFFF",
        light: "#3f3e8b",
    },
    secondary: {
        main: "#8D8D8D"
    },
    text: {
        primary: "#FFFFFF"
    },
    special: {
        main: "#1B1A43"
    },
    success: {
        main: "green"
    }
}

darkTheme = createTheme(darkTheme, {
    palette: darkPalette,
    typography: {
        ...typographyStyle,
    },

    components: {
        ...commonMuiComponentStyles,
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                        backgroundColor: darkPalette.background.default
                    },
                    "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                        borderRadius: 5,
                        backgroundColor: darkPalette.secondary.main,
                        // minHeight: 10,
                        border: "6px solid",
                        borderColor: darkPalette.background.light
                    },
                    "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: darkPalette.info.main,
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: darkTheme.palette.secondary.main
                }
            }
        },
        // MuiCheckbox: {
        //     styleOverrides: {
        //         root: {
        //             color: "#4a7197"
        //         }
        //     }
        // },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    "&:hover, &.Mui-selected:hover": {
                        backgroundColor: darkPalette.background.light,
                        color: "white"
                    },
                    '&.Mui-selected': {
                        color: darkPalette.info.main, // Change to your desired selected text color
                        backgroundColor: darkPalette.background.default,
                    },

                    backgroundColor: darkTheme.palette.background,
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    // backgroundColor: "#141432",
                    backgroundColor: "#1B1A43",
                    borderRadius: "12px",

                    "&.blur": {
                        boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.05)",
                    },
                    "&.glow": {
                        boxShadow: `0px 2px 15px rgba(0, 0, 0, 0.2)`
                    }
                },

            }
        },
        MuiTypography: {
            styleOverrides: {
                caption: {
                    color: 'green'
                },
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    color: "#bababa",
                },
            }
        },
        MuiAppBar: {
            styleOverrides: {
                colorPrimary: {
                    backgroundColor: "#1B1A43"
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    // borderRadius: 47,
                    height: 42,
                    padding: "20px 20px",
                    borderRadius: "8px", // Set desired corner radius for rounded buttons
                },
                contained: {
                    '&:hover': { // Styles for hover state
                        backgroundColor: darkPalette.success.main
                      },
                },
            },
            variants: [
                {
                    props: { size: 'xlow' },
                    style: {
                        height: '24px'
                    },
                },
            ],
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    backgroundColor: "#26245e",
                    borderRadius: "12px",
                    "& .MuiInputBase-inputSizeSmall": {
                        boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.04)",
                        border: "solid 1px rgba(255, 255, 255, 0.25)",
                        borderRadius: "12px",
                    },
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: "#8D8D8D"
                }
            }
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "#14131B"
                }
            }
        },
        MuiCalendarPicker: {
            styleOverrides: {
                root: {
                    "& .MuiTypography-caption": {
                        color: "white"
                    },
                    "& .MuiIconButton-root.Mui-disabled": {
                        "& .MuiSvgIcon-root": {
                          color: darkTheme.palette.background.default
                        },
                    },
                    backgroundColor:  darkTheme.palette.background.default,
                },
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: darkTheme.palette.secondary.main,
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                icon: {
                    color: darkTheme.palette.secondary.main,
                },
                root: {
                    "&::before": {  // Target the underline pseudo-element
                        borderBottomColor: darkPalette.secondary.main, // Semi-transparent underline
                    },
                },
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiInput-underline:before': {
                        borderBottomColor: darkPalette.secondary.main // Semi-transparent underline
                    },
                },
            }
        },
        MuiPickersDay: {
          styleOverrides: {
              root: {
                  // backgroundColor: "green"
              },
              dayWithMargin: {
                  backgroundColor: darkTheme.palette.primary.light
              },
              selectedDays: {
                  backgroundColor: "red"
              }
          }
        },
        MuiStep: {
          styleOverrides: {
              root: {
                  "& .MuiStepLabel-root .Mui-disabled": {
                      color: darkPalette.secondary.main
                  },
                  "& .MuiStepLabel-root .Mui-completed": {
                      color: darkPalette.text.primary
                  },
                  "& .MuiStepLabel-root .Mui-active": {
                      color: darkPalette.text.primary
                  },
              }
          }
        },
        MuiStepper: {
            styleOverrides: {
                root: {
                    "&.MuiStepConnector-alternativeLabel": {
                        top: 10,
                        left: 'calc(-50% + 16px)',
                        right: 'calc(50% + 16px)',
                        borderColor: "yellow"
                    },
                    "& .MuiStepConnector-root.Mui-active .MuiStepConnector-line": {
                        // borderColor: darkPalette.info.main,
                        borderColor: "white",
                    },
                    "& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line": {
                        // borderColor: darkPalette.info.main,
                        borderColor: "white",
                    },
                    // "& .MuiStepConnector-line": {
                    //     borderColor: darkPalette.secondary.main,
                    //     borderTopWidth: 3,
                    //     borderRadius: 1,
                    // },
                }
            }
        },
        MuiStepIcon: {
            styleOverrides: {
                root: {
                    color: darkPalette.secondary.main,
                    display: 'flex',
                    height: 22,
                    alignItems: 'center',
                    '& .QontoStepIcon-completedIcon': {
                        color: '#784af4',
                        zIndex: 1,
                        fontSize: 18,
                    },
                    '& .QontoStepIcon-circle': {
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: 'currentColor',
                    },
                }
            }
        }
    },
})
//teasing-near-the-plumper-4/