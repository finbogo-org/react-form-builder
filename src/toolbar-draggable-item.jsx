/**
 * <ToolbarItem />
 */

import React from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';
import ID from './UUID';

const cardSource = {
  beginDrag(props) {
    return {
      id: ID.uuid(),
      index: -1,
      data: props.data,
      onCreate: props.onCreate,
    };
  },
};

class ToolbarItem extends React.Component {
  render() {
    const {
      connectDragSource,
      data,
      onClick
    } = this.props;
    if (!connectDragSource) return null;
    return (
      connectDragSource(
        <li
          onClick={onClick}
          className="w-full h-full p-4 rounded-2xl flex flex-col justify-center items-center gap-4 border-gray-100 border-[1px] shadow-md"
        >
          <i className={'text-4xl text-gray-400'}>{data.icon}</i>
          <div className="flex-grow flex items-center justify-center">
            <span className="text-xs font-medium text-black text-center">
              {data.name}
            </span>
          </div>
        </li>,
      )
    );
  }
}

export default DragSource(ItemTypes.CARD, cardSource, connect => ({
  connectDragSource: connect.dragSource(),
}))(ToolbarItem);
