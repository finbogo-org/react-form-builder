import React from 'react';
import { SquarePen, Trash } from 'lucide-react';
import DragHandle from './component-drag-handle';

export default class HeaderBar extends React.Component {
  render() {
    return (
      <div
        className="toolbar-header flex justify-between items-center"> {/* Use flexbox for layout */}
        <span>{this.props.data.text}</span>
        <div
          className="toolbar-header-buttons flex items-center"> {/* Align icons in a row */}
          {this.props.data.element !== 'LineBreak' && (
            <div
              className="btn is-isolated"
              onClick={this.props.editModeOn.bind(this.props.parent, this.props.data)}
            >
              <i><SquarePen size={15}/></i>
            </div>
          )}
          <div
            className="btn is-isolated"
            onClick={this.props.onDestroy.bind(this, this.props.data)}
          >
            <i> <Trash size={15}/></i>
          </div>
          <DragHandle
            data={this.props.data}
            index={this.props.index}
            onDestroy={this.props.onDestroy}
            setAsChild={this.props.setAsChild}
          />
        </div>
      </div>
    );
  }
}
