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
//import { useTheme } from '@mui/material/styles';

const getStatusColor = (status: string) => {
    return status === 'עבר' ? 'success' : 'error';
};

const ApplicantsTable = () => {
    const [nameFilter, setNameFilter] = useState('');
    const [idFilter, setIdFilter] = useState('');
    const [unitFilter, setUnitFilter] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const filteredApplicants = mockApplicants.filter((applicant) => {
        return (
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
        if (sortBy === 'name' || sortBy === 'status') {
            return a[sortBy].localeCompare(b[sortBy]) * direction;
        }
        if (sortBy === 'rank' || sortBy === 'score') {
            return (a[sortBy] - b[sortBy]) * direction;
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
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={sortBy === 'name'}
                                    direction={sortBy === 'name' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('name')}
                                >
                                    שם החניך
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>מספר אישי</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>יחידה</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>תמונה</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={sortBy === 'rank'}
                                    direction={sortBy === 'rank' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('rank')}
                                >
                                    דירוג בקבוצה
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={sortBy === 'status'}
                                    direction={sortBy === 'status' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('status')}
                                >
                                    סטטוס
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={sortBy === 'score'}
                                    direction={sortBy === 'score' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('score')}
                                >
                                    ציון סופי
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>הערות</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedApplicants.map((row, index) => (
                            <TableRow
                              key={index}
                              hover
                              sx={{
                                cursor: 'pointer',
                                transition: 'background-color 0.2s',
                                '&:hover': {
                                  backgroundColor: '#eef4ff',
                                },
                              }}
                            >
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.id}</TableCell>
                                <TableCell align="center">{row.unit}</TableCell>
                                <TableCell align="center">
                                    <Avatar alt={row.name} src={row.image} />
                                </TableCell>
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
                rowsPerPageOptions={[10, 25, 50]}
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