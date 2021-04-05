import React from 'react';
import { TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-grid';
import { TemplatePlaceholder } from '@devexpress/dx-react-core';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
  headerContent: {
    overflow: 'hidden',
  },
});

type HeaderContentProps = TableHeaderRowBase.ContentProps;

const HeaderContent = (props: HeaderContentProps) => {
  const { column } = props;
  const classes = useStyles();
  return (
    <TableHeaderRow.Content {...props} className={classes.headerContent}>
      {props.children}
      <TemplatePlaceholder name="tableHeaderCellAfter" params={{ column }} />
    </TableHeaderRow.Content>
  );
};

export default HeaderContent;
