import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import PropTypes from 'prop-types';

MarkListHead.propTypes = {
  headLabel: PropTypes.array,
};

export default function MarkListHead({ headLabel }) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            sx={{ paddingLeft: headCell.firstColumn ? 5 : 2 }}
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
          >
            <TableSortLabel hideSortIcon>{headCell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
