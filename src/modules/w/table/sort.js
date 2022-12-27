/**
 * Update the sorting state for each column
 * @param {Object} state
 */
export function updateSortingState(state) {
  const columns = state.columns;
  columns.forEach((column) => updateColumnSortingState(column, state));
}

/**
 * Update the sorting state for single column
 * @param {Object} column
 * @param {Object} state
 */
export function updateColumnSortingState(column, state) {
  const { sortedBy, sortedDirection, defaultSortDirection } = state;

  if (column.sortable) {
    Object.assign(column, {
      sorted: true,
      sortAriaLabel: sortedDirection === 'desc' ? 'descending' : 'ascending',
      sortedDirection
    });
  } else {
    Object.assign(column, {
      sorted: false,
      sortAriaLabel: column.sortable ? 'none' : null,
      sortedDirection: 'asc'
    });
  }
}
