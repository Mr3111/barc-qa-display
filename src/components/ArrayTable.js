import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    { name: '2020-01-05', calories: '11091700', amount: 3 },
    { name: '2020-01-02', calories: 'Anonymous', amount: 1 },
];

export default function ArrayTable({heading, open, data}) {
    const classes = useStyles();
    let header = data.length>0 && data[0] instanceof Object? Object.keys(data[0]):null;
    console.log(heading, data)
    return (
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                        <Typography variant="h6" gutterBottom component="div">
                            {heading}
                        </Typography>
                        <Table size="small" aria-label="purchases">
                            { header && <TableHead>
                                <TableRow>
                                    {header.map(key=><TableCell>{key}</TableCell>)}
                                </TableRow>
                            </TableHead>}
                            <TableBody>
                                {data.map((row) => {
                                    return <TableRow >
                                        {header?
                                            data.map(row=>header.map(key=><TableCell>{row[key]}</TableCell>))
                                        :
                                        data.map(key=><TableCell>{row}</TableCell>)}

                                    </TableRow>}
                                )}
                            </TableBody>
                        </Table>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
}
