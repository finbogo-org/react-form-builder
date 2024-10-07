const AccordionItem = ({
                         title,
                         children
                       }) => {
  return (
    <div className="accordion-item mb-2">
      <div className="cursor-pointer bg-gray-200 p-4 rounded-lg">
        <h4 className="text-lg font-medium">{title}</h4>
      </div>
      <div className="accordion-content mt-2 p-2 bg-white rounded-lg">
        {children} {/* Render the children here */}
      </div>
    </div>
  );
};

export default AccordionItem;
