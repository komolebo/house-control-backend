import {createContext, useContext, useEffect, useState} from "react";

import {Card, IconButton, Modal} from "@mui/material";
import positionStyles from "../../styles/common/position.module.css";
import RemoveDevicePopup from "./RemoveDevice";
import SettingsPopup from "./SettingsPopup";
import UpdateDevicePopup from "./UpdateDevice";
import AddSensorPopup from "./add/AddSensorPopup";
import {ReactComponent as LogoClose} from "../../assets/close.svg";
import {darkTheme} from "../mui/darkThemeStyle";
import { EditSensorPopup } from "./edit/EditSensorPopup";

export enum POPUP_TYPE {
    AddSensor,
    EditDevice,
    RemoveDevice,
    Settings,
    SetupDevice,
    UpdateDevice,
    DefaultModal
}

export type PopupProps = {
    onClose: () => void,
    onAct: (data: any) => void
    data?: any,
}

type ContextType = {
    showPopup: (
        modelType: POPUP_TYPE,
        popupProps: PopupProps
    ) => void,
    hidePopup: () => void,
    popupProps: PopupProps
}

// add here new modal dialogues
const MODAL_COMPONENTS: any = {
    [POPUP_TYPE.AddSensor]: AddSensorPopup,
    [POPUP_TYPE.EditDevice]: EditSensorPopup,
    [POPUP_TYPE.RemoveDevice]: RemoveDevicePopup,
    [POPUP_TYPE.Settings]: SettingsPopup,
    [POPUP_TYPE.UpdateDevice]: UpdateDevicePopup,
    [POPUP_TYPE.DefaultModal]: null
}

interface IPropGlobalModal {
    children: any
}

const DEFAULT_POPUP_PROPS: PopupProps = {
    onClose: () => {
    },
    onAct: (data: any) => {
    },
    data: {}
}

const GlobalModalContext = createContext<ContextType> ({
    hidePopup: () => {
    },
    showPopup: () => {
    },
    popupProps: DEFAULT_POPUP_PROPS
})
export const useGlobalPopupContext = () => useContext (GlobalModalContext);


export function PopupProvider({children}: IPropGlobalModal) {
    const [modaltype, setType] = useState (POPUP_TYPE.DefaultModal);
    const [popupProps, setModalProps] = useState<PopupProps> ({
        onAct: () => {
        },
        onClose: () => {
        },
        data: {}
    });

    useEffect (() => {
        function handleEscapeKey(event: KeyboardEvent) {
            if (event.code === 'Escape') {
                popupProps.onClose ();
                hidePopup ();
            }
        }

        document.addEventListener ('keyup', handleEscapeKey)
        return () => document.removeEventListener ('keyup', handleEscapeKey)
    }, [])

    const showPopup = (modalType: POPUP_TYPE, popupProps: PopupProps) => {
        setType (modalType);
        setModalProps (popupProps);
    }

    const hidePopup = () => {
        setType (POPUP_TYPE.DefaultModal);
        setModalProps (DEFAULT_POPUP_PROPS);
    }

    const renderComponent = () => {
        const ModalComponent = MODAL_COMPONENTS[modaltype];
        if (modaltype === POPUP_TYPE.DefaultModal || !ModalComponent) {
            return null;
        }
        return <ModalComponent id="global-modal" {...popupProps}/>
    }

    return (
        <GlobalModalContext.Provider value={{showPopup: showPopup, hidePopup: hidePopup, popupProps}}>
            {modaltype !== POPUP_TYPE.DefaultModal &&
            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card
                    sx={{
                        p: 3, position: "absolute", left: "50%", top: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.default"
                    }}
                    className="blur"
                >
                    <div className={positionStyles.floatr} style={{width: 20, height: 20}}
                         onClick={() => {
                            popupProps.onClose();
                            hidePopup ();
                         } }
                    >
                        <IconButton>
                            <LogoClose fill={darkTheme.palette.secondary.main}/>
                        </IconButton>
                    </div>
                    {renderComponent ()}
                </Card>
            </Modal>
            }
            {children}
        </GlobalModalContext.Provider>
    )
}
