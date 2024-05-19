import React, {ReactNode} from "react";

interface ITableRoute {
    path: string;
    Component: ReactNode
}

export const publicRoutes: ITableRoute[] = [
    // {
    //     path: LOGIN_PAGE,
    //     Component: <LoginPage/>
    // }
]

export const privateRoutes: ITableRoute[] = [
    // {
    //     path: HOME_PAGE,
    //     Component: <HomePage/>
    // }
]