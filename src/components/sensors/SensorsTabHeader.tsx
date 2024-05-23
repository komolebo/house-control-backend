import {TableCell, TableHead, TableRow, Typography} from "@mui/material";
import React from "react";

interface IProps {
    headerItems: string[],
    styles?: any
}

export function SensorsTabHeader({headerItems, styles}: IProps) {
    return <TableHead>
        <TableRow  sx={{borderBottom: "1px solid rgba(255, 255, 255, .07)"}}>
            {headerItems.map((headerItem: string, index: number) =>
                <TableCell align="left" key={index}>
                    <Typography variant="h4" color="primary">
                        {headerItem}
                    </Typography>

                </TableCell>
            )}
            {/* empty for aligning settings icon */}
            <TableCell/>
        </TableRow>
    </TableHead>
}