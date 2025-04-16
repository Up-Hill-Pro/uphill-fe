import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Avatar,
    Chip,
} from '@mui/material';

const dummyData = [
    {
        name: 'רותם דניאל',
        id: '827353',
        image: '',
        rank: 1,
        status: 'עבר',
        score: 4.7,
        notes: 'אין הערות',
    },
    {
        name: 'תומר כהן',
        id: '829742',
        image: '',
        rank: 2,
        status: 'לא עבר',
        score: 3.2,
        notes: 'איחורים',
    },
];

const getStatusColor = (status: string) => {
    return status === 'עבר' ? 'success' : 'error';
};

const ApplicantsTable = () => {
    return (
        <Box sx={{ p: 3, direction: 'rtl' }}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
                חניכים
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell align="right">שם החניך</TableCell>
                            <TableCell align="right">מספר אישי</TableCell>
                            <TableCell align="right">תמונה</TableCell>
                            <TableCell align="right">דירוג בקבוצה</TableCell>
                            <TableCell align="right">סטטוס</TableCell>
                            <TableCell align="right">ציון סופי</TableCell>
                            <TableCell align="right">הערות</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dummyData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.id}</TableCell>
                                <TableCell align="right">
                                    <Avatar alt={row.name} src={row.image} />
                                </TableCell>
                                <TableCell align="right">{row.rank}</TableCell>
                                <TableCell align="right">
                                    <Chip
                                        label={row.status}
                                        color={getStatusColor(row.status)}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="right">{row.score}</TableCell>
                                <TableCell align="right">{row.notes}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ApplicantsTable;