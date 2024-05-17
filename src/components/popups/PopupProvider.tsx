import React, {createContext, useContext, useEffect, useState} from "react";

import {Card, Modal} from "@mui/material";
import buttonStyles from "../../styles/common/buttons.module.css";
import positionStyles from "../../styles/common/position.module.css";
import {AddDevicePopup} from "./add/AddDevice";
import {NotificationPopup} from "./notification/Notification";
import EditDevice from "./EditDevice";
import RemoveDevicePopup from "./RemoveDevice";
import SettingsPopup from "./SettingsPopup";
import DeviceSetup from "./SetupDevice";
import UpdateDevicePopup from "./UpdateDevice";

export enum POPUP_TYPE {
    AddDevice,
    Notification,
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
    [POPUP_TYPE.AddDevice]: AddDevicePopup,
    [POPUP_TYPE.Notification]: NotificationPopup,
    [POPUP_TYPE.EditDevice]: EditDevice,
    [POPUP_TYPE.RemoveDevice]: RemoveDevicePopup,
    [POPUP_TYPE.Settings]: SettingsPopup,
    [POPUP_TYPE.SetupDevice]: DeviceSetup,
    [POPUP_TYPE.UpdateDevice]: UpdateDevicePopup,
    [POPUP_TYPE.DefaultModal]: null
}

interface IPropGlobalModal {
    children: any
}

const DEFAULT_POPUP_PROPS: PopupProps = {
    onClose: () => {},
    onAct: (data: any) => {},
    data: {}
}

const GlobalModalContext = createContext<ContextType>({
    hidePopup: () => {},
    showPopup: () => {},
    popupProps: DEFAULT_POPUP_PROPS
})
export const useGlobalPopupContext = () => useContext(GlobalModalContext);


export function PopupProvider({children}: IPropGlobalModal){
    const [modaltype, setType] = useState(POPUP_TYPE.DefaultModal);
    const [popupProps, setModalProps] = useState<PopupProps>({
        onAct: () => {},
        onClose: () => {},
        data: {}
    });

    useEffect(() => {
        function handleEscapeKey(event: KeyboardEvent) {
            if (event.code === 'Escape') {
                hidePopup()
            }
        }

        document.addEventListener('keyup', handleEscapeKey)
        return () => document.removeEventListener('keyup', handleEscapeKey)
    }, [])

    const showPopup = (modalType: POPUP_TYPE, popupProps: PopupProps) => {
        setType(modalType);
        setModalProps(popupProps);
    }

    const hidePopup = () => {
        setType(POPUP_TYPE.DefaultModal);
        setModalProps(DEFAULT_POPUP_PROPS);
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
                    }}
                    className="blur"
                >
                    <div className={positionStyles.floatr} style={{width: 20, height: 20}}
                         onClick={() => hidePopup()}
                    >
                        <img alt={"Logo close"}
                             src={process.env.PUBLIC_URL + "Resources/ico_massege_close.png"}
                             className={buttonStyles['img-hover']}
                         />
                    </div>
                    {renderComponent()}
                </Card>
            </Modal>
            }
            {children}
        </GlobalModalContext.Provider>
    )
}
