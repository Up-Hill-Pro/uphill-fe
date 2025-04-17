import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    TableSortLabel,
    TablePagination,
} from '@mui/material';
import { useState } from 'react';
import { mockWeeks } from '../../public/mockWeeks';
import type { Week } from '../../public/mockWeeks';

const parseDate = (dateStr: string) => {
    const [datePart, timePart] = dateStr.split(' ');
    const [day, month, year] = datePart.split('-').map(Number);
    const [hours, minutes] = timePart?.split(':').map(Number) || [0, 0];
    return new Date(year, month - 1, day, hours, minutes);
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'הסתיים': return 'success';
        case 'בוטל': return 'error';
        case 'בתהליך': return 'warning';
        case 'עתידי להתקיים': return 'default';
        default: return 'default';
    }
};

const WeeksTable = () => {
    const [sortBy, setSortBy] = useState('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    const handleSort = (field: keyof Week | string) => {
        const isAsc = sortBy === field && sortDirection === 'asc';
        setSortBy(field);
        setSortDirection(isAsc ? 'desc' : 'asc');
    };

    const sortedWeeks = [...mockWeeks].sort((a, b) => {
        const direction = sortDirection === 'asc' ? 1 : -1;

        const aVal = a[sortBy as keyof Week];
        const bVal = b[sortBy as keyof Week];

        if (sortBy === 'startDate') {
            return (parseDate(a.startDate).getTime() - parseDate(b.startDate).getTime()) * direction;
        }
        if (typeof aVal === 'string' && typeof bVal === 'string') {
            return aVal.localeCompare(bVal) * direction;
        }
        if (typeof aVal === 'number' && typeof bVal === 'number') {
            return (aVal - bVal) * direction;
        }

        return 0;
    });

    const paginatedWeeks = sortedWeeks.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{ p: 3, direction: 'rtl' }}>
            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {[
                                { id: 'weekNumber', label: 'שבוע חיה"א' },
                                { id: 'unit', label: 'יחידה' },
                                { id: 'applicantCount', label: 'מספר חניכים' },
                                { id: 'evaluatorCount', label: 'מספר מאתרים' },
                                { id: 'status', label: 'סטטוס' },
                                { id: 'activeEvaluators', label: 'כמות מאתרים' },
                                { id: 'cycle', label: 'מחזור' },
                                { id: 'startDate', label: 'תאריך התחלה' },
                            ].map((column) => (
                                <TableCell key={column.id} align="center" sx={{ fontWeight: 'bold' }}>
                                    {column.id ? (
                                        <TableSortLabel
                                            active={sortBy === column.id}
                                            direction={sortBy === column.id ? sortDirection : 'asc'}
                                            onClick={() => handleSort(column.id as keyof Week)}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    ) : (
                                        <span>{column.label}</span>
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedWeeks.map((week, index) => (
                            <TableRow key={index} hover>
                                <TableCell align="center">{week.weekNumber}</TableCell>
                                <TableCell align="center">{week.unit}</TableCell>
                                <TableCell align="center">{week.applicantCount}</TableCell>
                                <TableCell align="center">{week.evaluatorCount}</TableCell>
                                <TableCell align="center">
                                    <Chip label={week.status} color={getStatusColor(week.status)} size="small" />
                                </TableCell>
                                <TableCell align="center">{week.passed}</TableCell>
                                <TableCell align="center">{week.cycle}</TableCell>
                                <TableCell align="center">{week.startDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                dir="rtl"
                labelRowsPerPage="מספר פריטים בעמוד:"
                rowsPerPageOptions={[25, 50]}
                component="div"
                count={sortedWeeks.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelDisplayedRows={({ from, to, count }) =>
                    `מציג ${from}-${to} מתוך ${count !== -1 ? count : `יותר מ-${to}`}`
                }
                sx={{
                    direction: 'rtl',
                    '.MuiTablePagination-toolbar': {
                        flexDirection: 'row-reverse',
                    },
                    '.MuiTablePagination-selectLabel': {
                        order: 2,
                    },
                    '.MuiTablePagination-select': {
                        order: 1,
                    },
                }}
            />
        </Box>
    );
};

export default WeeksTable;