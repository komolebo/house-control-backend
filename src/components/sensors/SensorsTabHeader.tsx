import {TableCell, TableRow, Typography} from "@mui/material";
import React from "react";

interface IProps {
    headerItems: string[],
    styles?: any
}

export function SensorsTabHeader({headerItems, styles}: IProps) {
    return <TableRow>
        {headerItems.map((headerItem: string, index: number) =>
            <TableCell align="left" style={{padding: 30}} key={index}>
                <Typography variant="h3" color="primary">
                    {headerItem}
                </Typography>

            </TableCell>
        )}
    </TableRow>
}