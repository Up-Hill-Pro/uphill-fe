import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar
} from '@mui/material';
import { mockInstructors } from '../../public/mockInstructors.ts';

const InstructorsTable = () => {
    return (
        <Box sx={{ p: 3, direction: 'rtl' }}>
            <TableContainer component={Paper} sx={{ maxHeight: 'calc(100vh - 200px)' }}>
                <Table stickyHeader>
                    <TableHead sx={{ backgroundColor: '#f5f5f5', position: 'sticky', top: 0, zIndex: 1 }}>
                        <TableRow>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>שם המאתר</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>מספר אישי</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>תמונה</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>מספר מאתר</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>כמות חניכים שבחן</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>כמות חניכים שאיתר</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>כמות חניכים שאיתר ועברו איתור</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>אחוז מאותרים שסיימו סדרה בסיסית</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>ציון ממוצע לחניך</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>תאריך איתור אחרון</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockInstructors.map((instructor, index) => (
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
        </Box>
    );
};

export default InstructorsTable;
