import React from "react";
import { TableHeaderRow } from "@devexpress/dx-react-grid-material-ui";
import {
  Table,
  TableHeaderRow as TableHeaderRowBase,
} from "@devexpress/dx-react-grid";
import { TemplatePlaceholder } from "@devexpress/dx-react-core";

type HeaderCellProps = TableHeaderRowBase.CellProps;

const HeaderCell = (props: HeaderCellProps) => {
  const { tableColumn, tableRow }: Table.CellProps = props;

  return (
    <TableHeaderRow.Cell {...props}>
      {props.column.title}

      <TemplatePlaceholder
        name="tableHeaderCellAfter"
        params={{ tableColumn, tableRow }}
      />
    </TableHeaderRow.Cell>
  );
};

export default HeaderCell;
