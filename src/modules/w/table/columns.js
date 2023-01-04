export function normalizeColumns(state, columns, types) {
  if (columns.length !== 0) {

      const normalizedColumns = Object.assign([], columns);

      const columnKeyMap = {};
      state.columns = normalizedColumns.map((column, index) => {
          // Verify `columnKey` is unique
          const columnKey = column.columnKey;
          if (columnKey && columnKeyMap[columnKey]) {
              console.error(
                  `The "columnKey" column property must be unique. Found a duplicate of columnKey "${columnKey}".`
              );
          }
          columnKeyMap[columnKey] = true;

          const normalizedColumn = Object.assign(
              getColumnDefaults(column),
              column
          );
          normalizedColumn.ariaLabel =
              normalizedColumn.label || normalizedColumn.ariaLabel || null;

          // `customType` attribute is needed to render default iedit component
          normalizedColumn.editableCustomType =
              types.isStandardCellLayoutForCustomType(normalizedColumn.type);

          if (isCustomerColumn(normalizedColumn)) {
              normalizeColumnDataType(normalizedColumn, types);
              normalizeEditable(normalizedColumn, types);
              updateColumnSortingState(normalizedColumn, state);
          }

          if (isTreeType(normalizedColumn.type)) {
              normalizedColumn.typeAttributes = getNormalizedSubTypeAttribute(
                  normalizedColumn.type,
                  normalizedColumn.typeAttributes
              );
          }

          return Object.assign(normalizedColumn, {
              tabIndex: -1,
              colKeyValue: generateColKeyValue(normalizedColumn, index),
              isScopeCol: index === firstColumnForReaders,
          });
      });
  } else {
      state.columns = [];
  }
}
