import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Plus } from 'lucide-react';
// import { useDrop } from 'react-dnd';

const PLACE_HOLDER = 'rounded-t-xl bg-[#F6F6F6] p-4 min-h-[30rem] w-full h-full';
const PLACE_HOLDER_HIDDEN = '';

class PlaceHolder extends React.Component {
  render() {
    const { intl } = this.props;
    const placeHolderClass = this.props.show ? PLACE_HOLDER : PLACE_HOLDER_HIDDEN;
    // eslint-disable-next-line no-nested-ternary,no-unused-expressions
    this.props.show ?
      (this.props.text === 'Dropzone' ? intl.formatMessage({ id: 'drop-zone' }) : this.props.text) : '';
    return (
      <div className={placeHolderClass}>
        {this.props.show && (
          <div
            className="flex flex-col bg-white border-gray-300 items-center justify-center h-1/8 w-full rounded-xl">
            <div className="inline-flex items-center justify-center">
              <div
                className="flex items-center justify-center  m-2 mr-2 rounded-full bg-gray-800">
                <Plus
                  size={20}
                  color={'white'}/> {/* Plus icon in white, add right margin */}
              </div>
              <div>Add Field</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default injectIntl(PlaceHolder);
PlaceHolder.propTypes = {
  text: PropTypes.string,
  show: PropTypes.bool,
};

PlaceHolder.defaultProps = {
  text: 'Dropzone',
  show: false,
};
