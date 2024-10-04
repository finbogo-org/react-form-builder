import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const Accordion = ({
                     children,
                     activeIndex
                   }) => {
  const [openIndex, setOpenIndex] = useState(null);

  // Sync openIndex with activeIndex when it changes
  useEffect(() => {
    setOpenIndex(activeIndex);
  }, [activeIndex]);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full h-auto">
      {children.map((child, index) => (
        <div key={index} className="">
          <button
            onClick={() => handleClick(index)}
            className="w-full flex justify-between items-center py-3 px-4 text-left font-semibold focus:outline-none"
          >
            {child.props.title}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
            />
          </button>
          {/* Only render content if the accordion section is open */}
          {openIndex === index && (
            <div
              className="overflow-scroll transition-all duration-300 h-auto py-1 overflow-auto">
              {child.props.children}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
