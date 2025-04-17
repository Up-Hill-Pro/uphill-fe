import {
    Avatar,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    TablePagination,
    TextField,
} from '@mui/material';
import { useState } from 'react';
import {mockReviews} from '../../public/mockReviews.ts';
import { useSearchParams } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { he } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

interface Review {
    name: string;
    id: string;
    image: string;
    terrain: number;
    technical: number;
    learning: number;
    personal: number;
    finalAssessment: string;
    notes: string;
    finalScore: number;
    evaluatorName: string;
    evaluatorId: string;
    date: string;
    path: string;
}

const parseDate = (dateStr: string) => {
    const [datePart, timePart] = dateStr.split(' ');
    const [day, month, year] = datePart.split('-').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
};

const ReviewsTable = () => {
    const [reviews] = useState<Review[]>(mockReviews);
    const [searchParams] = useSearchParams();
    const idParam = searchParams.get('id');
    const evaluatorIdParam = searchParams.get('evaluatorId');
    const [nameFilter, setNameFilter] = useState('');
    const [idFilter, setIdFilter] = useState(idParam ?? '');
    const [evaluatorFilter, setEvaluatorFilter] = useState('');
    const [evaluatorIdFilter, setEvaluatorIdFilter] = useState(evaluatorIdParam ?? '');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [sortBy, setSortBy] = useState('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const navigate = useNavigate();
    const filteredReviews = reviews.filter((review) => {
        const reviewDate = parseDate(review.date);
        const isWithinRange =
            (!startDate || reviewDate >= startDate) &&
            (!endDate || reviewDate <= endDate);

        return (
            review.name.includes(nameFilter) &&
            review.id.includes(idFilter) &&
            review.evaluatorName.includes(evaluatorFilter) &&
            review.evaluatorId.includes(evaluatorIdFilter) &&
            isWithinRange
        );
    });

    const handleSort = (field: keyof Review) => {
        const isAsc = sortBy === field && sortDirection === 'asc';
        setSortBy(field);
        setSortDirection(isAsc ? 'desc' : 'asc');
    };

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortedReviews = [...filteredReviews].sort((a, b) => {
        const direction = sortDirection === 'asc' ? 1 : -1;

        if (sortBy === 'date') {
            return (parseDate(a.date).getTime() - parseDate(b.date).getTime()) * direction;
        }

        const aVal = a[sortBy as keyof Review];
        const bVal = b[sortBy as keyof Review];

        if (typeof aVal === 'string' && typeof bVal === 'string') {
            return aVal.localeCompare(bVal) * direction;
        }
        if (typeof aVal === 'number' && typeof bVal === 'number') {
            return (aVal - bVal) * direction;
        }

        return 0;
    });

    const paginatedReviews = sortedReviews.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Box sx={{ p: 3, direction: 'rtl' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                <TextField
                    label="חיפוש לפי שם חניך"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                    variant="outlined"
                    size="small"
                />
                <TextField
                    label="חיפוש לפי מספר אישי"
                    value={idFilter}
                    onChange={(e) => setIdFilter(e.target.value)}
                    variant="outlined"
                    size="small"
                />
                <TextField
                    label="חיפוש לפי שם מאתר"
                    value={evaluatorFilter}
                    onChange={(e) => setEvaluatorFilter(e.target.value)}
                    variant="outlined"
                    size="small"
                />
                <TextField
                    label="חיפוש לפי מספר אישי מאתר"
                    value={evaluatorIdFilter}
                    onChange={(e) => setEvaluatorIdFilter(e.target.value)}
                    variant="outlined"
                    size="small"
                />
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={he}>
                    <DatePicker
                        label="מתאריך"
                        value={startDate}
                        onChange={(newValue) => setStartDate(newValue)}
                        slotProps={{
                          textField: {
                            size: 'small',
                            InputProps: {
                              sx: {
                                direction: 'rtl',
                                '& .MuiInputAdornment-root': {
                                  order: -1,
                                  marginRight: 'auto',
                                  marginLeft: 0,
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
                            InputProps: {
                              sx: {
                                direction: 'rtl',
                                '& .MuiInputAdornment-root': {
                                  order: -1,
                                  marginRight: 'auto',
                                  marginLeft: 0,
                                },
                              },
                            },
                          },
                        }}
                    />
                </LocalizationProvider>
            </Box>
            <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 250px)' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {[
                                { id: 'name', label: 'שם החניך' },
                                { id: 'id', label: 'מספר אישי' },
                                { id: 'image', label: 'תמונה' },
                                { id: 'path', label: 'שם הציר' },
                                { id: 'terrain', label: 'קריאת שטח' },
                                { id: 'technical', label: 'תפעול טכני' },
                                { id: 'learning', label: 'למידה ויישום' },
                                { id: 'personal', label: 'הפעלה אישית' },
                                { id: 'finalAssessment', label: 'ציון סופי - הערכה אישית' },
                                { id: 'notes', label: 'הערות' },
                                { id: 'finalScore', label: 'ציון סופי' },
                                { id: 'evaluatorName', label: 'שם המאתר' },
                                { id: 'evaluatorId', label: 'מספר אישי מאתר' },
                                { id: 'date', label: 'תאריך ושעה' },
                            ].map((column) => (
                                <TableCell key={column.id} align="center" sx={{ fontWeight: 'bold' }}>
                                    {['image', 'notes'].includes(column.id) ? (
                                        column.label
                                    ) : (
                                        <TableSortLabel
                                            active={sortBy === column.id}
                                            direction={sortBy === column.id ? sortDirection : 'asc'}
                                            onClick={() => handleSort(column.id as keyof Review)}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedReviews.map((review, index) => (
                            <TableRow
                                key={index}
                                hover
                                onClick={() => navigate(`/reviews?id=${review.id}`)}
                                sx={{
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s',
                                    '&:hover': {
                                        backgroundColor: '#eef4ff',
                                    },
                                }}
                            >
                                <TableCell align="center">{review.name}</TableCell>
                                <TableCell align="center">{review.id}</TableCell>
                                <TableCell align="center">
                                    <Avatar alt={review.name} src={review.image} />
                                </TableCell>
                                <TableCell align="center">{review.path}</TableCell>
                                <TableCell align="center">{review.terrain}</TableCell>
                                <TableCell align="center">{review.technical}</TableCell>
                                <TableCell align="center">{review.learning}</TableCell>
                                <TableCell align="center">{review.personal}</TableCell>
                                <TableCell align="center">{review.finalAssessment}</TableCell>
                                <TableCell align="center">{review.notes}</TableCell>
                                <TableCell align="center">{review.finalScore}</TableCell>
                                <TableCell align="center">{review.evaluatorName}</TableCell>
                                <TableCell align="center">{review.evaluatorId}</TableCell>
                                <TableCell align="center">{review.date}</TableCell>
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
                count={sortedReviews.length}
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
                    '.MuiTablePagination-actions': {
                        flexDirection: 'row-reverse',
                    },
                }}
            />
        </Box>
    );
};

export default ReviewsTable;
