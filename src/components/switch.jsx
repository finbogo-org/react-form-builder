// @ts-ignore
import React from 'react';

const Switch = ({
                  isChecked,
                  onChange,
                }) => (
  <div className="flex rounded-full bg-gray-200 p-1 w-full justify-between">
    <div
      onClick={!isChecked ? undefined : onChange} // Call onChange when this button is clicked
      className={`
          px-4 py-1 flex-1 text-center rounded-full font-medium transition-colors duration-300 cursor-pointer
          ${!isChecked ? 'bg-white text-black' : 'text-gray-500'}
        `}
    >
      Elements
    </div>

    <div
      onClick={isChecked ? undefined : onChange} // Call onChange when this button is clicked
      className={`
          px-4 py-1 flex-1 text-center rounded-full font-medium transition-colors duration-300 cursor-pointer
          ${isChecked ? 'bg-white text-black' : 'text-gray-500'}
        `}
    >
      Layout
    </div>
  </div>
);

export default Switch;
