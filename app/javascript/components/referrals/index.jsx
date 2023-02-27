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

import { fetchReferrals } from "./referralActions";
import dateFormatter from '../../utils/dateFormatter';

import CreateReferral from './CreateReferral';

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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export function Referral() {
  const { data } = fetchReferrals();
  const referrals = data?.data?.referrals || [];
  
  return (
    <>
      <Typography variant="h4" className="mt-3"> 
        {referrals?.length == 0 ? "Referrals" : "Your referrals"}  
        <CreateReferral />
      </Typography>
      {referrals?.length > 0 && (
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
      )}
    </>
  )
}