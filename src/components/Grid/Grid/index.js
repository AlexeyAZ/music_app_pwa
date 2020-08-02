import React from 'react'
import PropTypes, { oneOf } from 'prop-types'
import cn from 'classnames'

import styles from './styles.module.scss'

const getGapStyle = gap => ({ gap: `${gap[0]}px ${gap[1]}px` })
const getAutoColumnsStyle = columnSize => ({ gridAutoColumns: `${columnSize}px` })
const getGridColumnsStyle = columns => ({
  // gridTemplateColumns: `repeat(auto-fit, minmax(${itemSize}px, 1fr))`,
  gridTemplateColumns: `repeat(${columns}, minmax(1px, 1fr))`,
})
const getGridRowsStyle = gridRows => ({
  gridTemplateRows: `repeat(${gridRows}, minmax(min-content, 1fr))`,
})

const Grid = ({ children, className, gap, direction, itemSize, rows, columns }) => {
  return (
    <div
      className={cn(styles.grid, styles[`grid-${direction}`], className)}
      style={{
        ...getGapStyle(gap),
        ...(direction === 'vertical' && columns ? getGridColumnsStyle(columns) : {}),
        ...(direction === 'horizontal' && rows ? getGridRowsStyle(rows) : {}),
        ...(direction === 'horizontal' ? getAutoColumnsStyle(itemSize) : {}),
      }}
    >
      {children}
    </div>
  )
}

Grid.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  gap: PropTypes.array,
  itemSize: PropTypes.number,
  direction: oneOf(['horizontal', 'vertical']),
  rows: PropTypes.number,
  columns: PropTypes.number,
}
Grid.defaultProps = {
  children: null,
  className: '',
  gap: [10, 10],
  itemSize: 80,
  direction: 'vertical',
  rows: null,
  columns: 3,
}

export default Grid
