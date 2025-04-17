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
    TextField,
    TableSortLabel,
    TablePagination
} from '@mui/material';
import { useState } from 'react';
import { mockInstructors } from '../../public/mockInstructors.ts';

type Instructor = {
  name: string;
  id: string;
  image: string;
  evaluatorNumber: number;
  evaluatedCount: number;
  detectedCount: number;
  detectedAndPassedCount: number;
  basicSeriesPassRate: string;
  averageScorePerCandidate: number;
  lastEvaluationDate: string;
};

const parseDate = (dateStr: string) => {
  const [datePart, timePart] = dateStr.split(' ');
  const [day, month, year] = datePart.split('-').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes);
};

const InstructorsTable = () => {
    const [nameFilter, setNameFilter] = useState('');
    const [idFilter, setIdFilter] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    const filteredInstructors: Instructor[] = mockInstructors.filter((instructor) => {
        return (
            instructor.name.includes(nameFilter) &&
            instructor.id.includes(idFilter)
        );
    });

    const handleSort = (field: string) => {
        const isAsc = sortBy === field && sortDirection === 'asc';
        setSortBy(field);
        setSortDirection(isAsc ? 'desc' : 'asc');
    };

    const sortedInstructors = [...filteredInstructors].sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;

      if (sortBy === 'lastEvaluationDate') {
          return (parseDate(a.lastEvaluationDate).getTime() - parseDate(b.lastEvaluationDate).getTime()) * direction;
      }

      const aVal = a[sortBy as keyof Instructor];
      const bVal = b[sortBy as keyof Instructor];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
          return aVal.localeCompare(bVal) * direction;
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
          return (aVal - bVal) * direction;
      }

      return 0;
    });

    const paginatedInstructors = sortedInstructors.slice(
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
            </Box>
            <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 250px)' }}>
                <Table stickyHeader>
                    <TableHead sx={{ backgroundColor: '#f5f5f5', position: 'sticky', top: 0, zIndex: 1 }}>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={sortBy === 'name'}
                                    direction={sortBy === 'name' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('name')}
                                >
                                    שם המאתר
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={sortBy === 'id'}
                                    direction={sortBy === 'id' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('id')}
                                >
                                    מספר אישי
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>תמונה</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={sortBy === 'evaluatorNumber'}
                                    direction={sortBy === 'evaluatorNumber' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('evaluatorNumber')}
                                >
                                    מספר מאתר
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={sortBy === 'evaluatedCount'}
                                    direction={sortBy === 'evaluatedCount' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('evaluatedCount')}
                                >
                                    כמות חניכים שבחן
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={sortBy === 'detectedCount'}
                                    direction={sortBy === 'detectedCount' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('detectedCount')}
                                >
                                    כמות חניכים שאיתר
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={sortBy === 'detectedAndPassedCount'}
                                    direction={sortBy === 'detectedAndPassedCount' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('detectedAndPassedCount')}
                                >
                                    כמות חניכים שאיתר ועברו איתור
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={sortBy === 'basicSeriesPassRate'}
                                    direction={sortBy === 'basicSeriesPassRate' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('basicSeriesPassRate')}
                                >
                                    אחוז מאותרים שסיימו סדרה בסיסית
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={sortBy === 'averageScorePerCandidate'}
                                    direction={sortBy === 'averageScorePerCandidate' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('averageScorePerCandidate')}
                                >
                                    ציון ממוצע לחניך
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={sortBy === 'lastEvaluationDate'}
                                    direction={sortBy === 'lastEvaluationDate' ? sortDirection : 'asc'}
                                    onClick={() => handleSort('lastEvaluationDate')}
                                >
                                    תאריך איתור אחרון
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedInstructors.map((instructor, index) => (
                            <TableRow key={index} hover sx={{ '&:hover': { backgroundColor: '#eef4ff' } }}>
                                <TableCell align="center">{instructor.name}</TableCell>
                                <TableCell align="center">{instructor.id}</TableCell>
                                <TableCell align="center">
                                    <Avatar alt={instructor.name} src={instructor.image} />
                                </TableCell>
                                <TableCell align="center">{instructor.evaluatorNumber}</TableCell>
                                <TableCell align="center">{instructor.evaluatedCount}</TableCell>
                                <TableCell align="center">{instructor.detectedCount}</TableCell>
                                <TableCell align="center">{instructor.detectedAndPassedCount}</TableCell>
                                <TableCell align="center">{instructor.basicSeriesPassRate}</TableCell>
                                <TableCell align="center">{instructor.averageScorePerCandidate}</TableCell>
                                <TableCell align="center">{instructor.lastEvaluationDate}</TableCell>
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
                    count={sortedInstructors.length}
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

export default InstructorsTable;
