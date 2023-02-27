import React from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography 
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

import { fetchReferrals } from "./referralQueries";
import dateFormatter from '../../utils/dateFormatter';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export function Referral() {
  const { isLoading, data } = fetchReferrals();
  const referrals = data?.data?.referrals || [];
  
  return (
    <>    
      {referrals?.length > 0 && (
        <>
          <Typography variant="h4" className="mt-3"> Your referrals </Typography>
          <TableContainer component={ Paper } className="py-5">
            <Table sx={{ minWidth: 600 }} aria-label="list of referrals">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell align="right">Referred At</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {referrals.map((referral) => (
                <StyledTableRow key={ referral.id }>
                  <StyledTableCell component="th" scope="row">
                    { referral.email }
                  </StyledTableCell>
                  <StyledTableCell align="right">{ dateFormatter(referral.created_at) }</StyledTableCell>
                </StyledTableRow>
              ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  )
}