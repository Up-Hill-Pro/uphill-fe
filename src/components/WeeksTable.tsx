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
    TextField,
    MenuItem,
} from '@mui/material';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { he } from 'date-fns/locale';
import { mockWeeks } from '../../public/mockWeeks';
import type { Week } from '../../public/mockWeeks';
import { useNavigate } from 'react-router-dom';

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
    const [weekFilter, setWeekFilter] = useState('');
    const [unitFilter, setUnitFilter] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const navigate = useNavigate();

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

    const filteredWeeks = sortedWeeks.filter((week) => {
        const parsedStart = startDate ? new Date(startDate) : null;
        const parsedEnd = endDate ? new Date(endDate) : null;
        const weekStart = parseDate(week.startDate);
        const isInDateRange =
            (!parsedStart || weekStart >= parsedStart) &&
            (!parsedEnd || weekStart <= parsedEnd);

        return (
            (!weekFilter || week.weekNumber.toString() === weekFilter) &&
            (!unitFilter || week.unit === unitFilter) &&
            isInDateRange
        );
    });

    const paginatedWeeks = filteredWeeks.slice(
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
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                <TextField
                    label="חיפוש לפי שבוע חיה״א"
                    type="number"
                    value={weekFilter}
                    onChange={(e) => setWeekFilter(e.target.value)}
                    variant="outlined"
                    size="small"
                />
                <TextField
                    label="יחידה"
                    value={unitFilter}
                    onChange={(e) => setUnitFilter(e.target.value)}
                    select
                    variant="outlined"
                    size="small"
                    sx={{ minWidth: 150 }}
                >
                    <MenuItem value="">הכל</MenuItem>
                    <MenuItem value="סיירת צנחנים">סיירת צנחנים</MenuItem>
                    <MenuItem value="אגוז">אגוז</MenuItem>
                    <MenuItem value="מגלן">מגלן</MenuItem>
                    <MenuItem value="דובדבן">דובדבן</MenuItem>
                </TextField>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={he}>
                    <DatePicker
                        label="מתאריך"
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                        slotProps={{
                            textField: {
                                size: 'small',
                                sx: { minWidth: 150 },
                                InputProps: {
                                    sx: {
                                        direction: 'rtl',
                                        '& .MuiInputAdornment-root': {
                                            order: -1,
                                        },
                                    },
                                },
                            },
                        }}
                    />
                    <DatePicker
                        label="עד תאריך"
                        value={endDate}
                        onChange={(newValue) => setEndDate(newValue)}
                        slotProps={{
                            textField: {
                                size: 'small',
                                sx: { minWidth: 150 },
                                InputProps: {
                                    sx: {
                                        direction: 'rtl',
                                        '& .MuiInputAdornment-root': {
                                            order: -1,
                                        },
                                    },
                                },
                            },
                        }}
                    />
                </LocalizationProvider>
            </Box>
            <TableContainer component={Paper}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {[
                                { id: 'weekNumber', label: 'שבוע חיה"א' },
                                { id: 'unit', label: 'יחידה' },
                                { id: 'team', label: 'שם הצוות' },
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
                        <TableRow key={index} hover onClick={() => navigate(`/applicants?weekId=${week.weekId}`)} sx={{ minHeight: 50, height: 75, cursor: 'pointer', transition: 'background-color 0.2s', '&:hover': { backgroundColor: '#eef4ff' } }}>
                                <TableCell align="center">{week.weekNumber}</TableCell>
                                <TableCell align="center">{week.unit}</TableCell>
                                <TableCell align="center">{week.team}</TableCell>
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
                count={filteredWeeks.length}
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