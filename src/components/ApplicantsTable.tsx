import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Chip,
    TextField,
    MenuItem,
    TableSortLabel,
    TablePagination,
} from '@mui/material';
import { mockApplicants } from '../../public/mockApplicants';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
//import { useTheme } from '@mui/material/styles';

const getStatusColor = (status: string) => {
    if (status === 'עבר') return 'success';
    if (status === 'לא עבר') return 'error';
    if (status === 'דרושה החלטה') return 'warning';
    return 'default';
};

const ApplicantsTable = () => {
    const [nameFilter, setNameFilter] = useState('');
    const [idFilter, setIdFilter] = useState('');
    const [unitFilter, setUnitFilter] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const weekIdParam = searchParams.get('weekId');
    const weekId = weekIdParam ? parseInt(weekIdParam) : null;

    const filteredApplicants = mockApplicants.filter((applicant) => {
        const matchesWeek = weekId === null || applicant.weekId === weekId;
        return (
            matchesWeek &&
            applicant.name.includes(nameFilter) &&
            applicant.id.includes(idFilter) &&
            (unitFilter === '' || applicant.unit === unitFilter)
        );
    });

    const handleSort = (field: string) => {
        const isAsc = sortBy === field && sortDirection === 'asc';
        setSortBy(field);
        setSortDirection(isAsc ? 'desc' : 'asc');
    };

    const sortedApplicants = [...filteredApplicants].sort((a, b) => {
        const direction = sortDirection === 'asc' ? 1 : -1;
        if (sortBy === 'name' || sortBy === 'status' || sortBy === 'unit') {
            return a[sortBy].localeCompare(b[sortBy]) * direction;
        }
        if (sortBy === 'rank' || sortBy === 'score') {
            return (a[sortBy] - b[sortBy]) * direction;
        }
        if (sortBy === 'id') {
            return a.id.localeCompare(b.id) * direction;
        }
        return 0;
    });

    const paginatedApplicants = sortedApplicants.slice(
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
                    label="חיפוש לפי שם"
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
                    label="יחידה"
                    value={unitFilter}
                    onChange={(e) => setUnitFilter(e.target.value)}
                    select
                    variant="outlined"
                    size="small"
                    sx={{
                        minWidth: 150,
                    }}
                >
                    <MenuItem value="">הכל</MenuItem>
                    <MenuItem value="סיירת צנחנים">סיירת צנחנים</MenuItem>
                    <MenuItem value="אגוז">אגוז</MenuItem>
                    <MenuItem value="מגלן">מגלן</MenuItem>
                    <MenuItem value="דובדבן">דובדבן</MenuItem>
                </TextField>
            </Box>
            <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 250px)' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {[
                                { id: 'name', label: 'שם החניך' },
                                { id: 'id', label: 'מספר אישי' },
                                { id: 'image', label: 'תמונה' },
                                { id: 'unit', label: 'יחידה' },
                                { id: 'rank', label: 'דירוג בקבוצה' },
                                { id: 'status', label: 'סטטוס' },
                                { id: 'score', label: 'ציון סופי' },
                                { id: 'notes', label: 'הערות' },
                            ].map((column) => (
                                <TableCell key={column.id} align="center" sx={{ fontWeight: 'bold' }}>
                                    {['image', 'notes'].includes(column.id) ? (
                                        column.label
                                    ) : (
                                        <TableSortLabel
                                            active={sortBy === column.id}
                                            direction={sortBy === column.id ? sortDirection : 'asc'}
                                            onClick={() => handleSort(column.id)}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedApplicants.map((row, index) => (
                            <TableRow
                                key={index}
                                hover
                                onClick={() => navigate(`/reviews?id=${row.id}`)}
                                sx={{
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s',
                                    '&:hover': {
                                        backgroundColor: '#eef4ff',
                                    },
                                }}
                            >
                                <TableCell align="center">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.id}</TableCell>
                                <TableCell align="center">
                                    <Avatar alt={row.name} src={row.image} />
                                </TableCell>
                                <TableCell align="center">{row.unit}</TableCell>
                                <TableCell align="center">{row.rank}</TableCell>
                                <TableCell align="center">
                                    <Chip
                                        label={row.status}
                                        color={getStatusColor(row.status)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="center">{row.score}</TableCell>
                                <TableCell align="center">{row.notes}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                dir="rtl"
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
                labelRowsPerPage="מספר פריטים בעמוד:"
                rowsPerPageOptions={[25, 50]}
                component="div"
                count={sortedApplicants.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelDisplayedRows={({ from, to, count }) =>
                    `מציג ${from}-${to} מתוך ${count !== -1 ? count : `יותר מ-${to}`}`
                }
            />
        </Box>
    );
};

export default ApplicantsTable;