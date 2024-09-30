import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Accordion = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {children.map((child, index) => (
        <div key={index} className="">
          <button
            onClick={() => handleClick(index)}
            className="w-full flex justify-between items-center py-3 px-4 text-left font-semibold focus:outline-none"
          >
            {child.props.title}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}/>
          </button>
          <div
            className={`${
              activeIndex === index ? 'block' : 'hidden'
            } overflow-hidden transition-all duration-300 p-4`} // Add padding to content
          >
            {child.props.children}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
