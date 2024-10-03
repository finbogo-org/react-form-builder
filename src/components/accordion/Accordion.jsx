import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Accordion = ({
                     children,
                     activeIndex
                   }) => {
  const [openIndex, setOpenIndex] = useState(null);

  // Use useEffect to sync openIndex with activeIndex when it changes
  useEffect(() => {
    setOpenIndex(activeIndex);
  }, [activeIndex]);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
              className={`h-4 w-4 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}/>
          </button>
          <div
            className={`
              overflow-scroll transition-all duration-300
              ${openIndex === index ? 'max-h-96 py-1 overflow-scroll' : 'max-h-0'}
            `}
          >
            {child.props.children}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
