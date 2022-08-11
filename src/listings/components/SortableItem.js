import React from 'react'
import { sortable, HORIZONTAL } from 'react-sortable'

class Item extends React.Component {
  render() {
    console.log(this.props);
    return (
      <li {...this.props} class="aios-draggable-item">
        <span>{this.props.children.full_address}</span>
      </li>
    )
  }
}

export default sortable(Item, HORIZONTAL)