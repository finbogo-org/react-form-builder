/**
 * <Toolbar />
 */

import React from 'react';
import { injectIntl } from 'react-intl';
import {
  AArrowUp,
  CalendarDays,
  Camera,
  CaseSensitive,
  CircleDot,
  Columns2,
  File,
  Heading,
  Image,
  Link,
  Mail,
  Menu,
  MoveHorizontal,
  Phone,
  Pilcrow,
  Plus,
  Search,
  SlidersHorizontal,
  SquareCheck,
  SquareChevronDown,
  SquarePen,
  Star,
  Tags,
} from 'lucide-react';
import Accordion from './components/accordion/Accordion'; // Adjust the path if necessary
import AccordionItem from './components/accordion/AccordionItem';
import ToolbarItem from './toolbar-draggable-item';
import ID from './UUID';
import store from './stores/store';
import Switch from './components/switch';

// function isDefaultItem(item) {
//   const keys = Object.keys(item);
//   return keys.filter(x => x !== 'element' && x !== 'key' && x !== 'group_name').length === 0;
// }

function buildItems(items, defaultItems) {
  if (!items) {
    return defaultItems;
  }
  return items.map(x => {
    let found = defaultItems.find(y => (x.element === y.element && y.key === x.key));
    if (!found) {
      found = defaultItems.find(y => (x.element || x.key) === (y.element || y.key));
    }
    if (found) {
      if (x.inherited !== false) {
        found = { ...found, ...x };
      } else if (x.group_name) {
        found.group_name = x.group_name;
      }
    }
    return found || x;
  });
}

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    const { intl } = this.props;
    const items = buildItems(props.items, this._defaultItems(intl));
    this.state = {
      items,
      activeCategory: 'elements',
      searchQuery: '',
      showLayout: false, // New state to track the switch
      activeAccordionIndex: 0,
    };
    this.create = this.create.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
  }

  componentDidMount() {
    store.subscribe(state => this.setState({ store: state }));
  }

  handleSwitchChange = () => {
    this.setState(prevState => ({
      showLayout: !prevState.showLayout,
      activeAccordionIndex: null, // Reset activeAccordionIndex when switching tabs
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery || prevState.showLayout !== this.state.showLayout) {
      this.updateActiveAccordionIndex();
    }
  }

  updateActiveAccordionIndex() {
    const {
      showLayout,
      searchQuery,
    } = this.state;
    const categories = this._defaultItems(this.props.intl);

    const firstMatchingCategoryIndex = categories
      .filter(category => (showLayout ? category.group_name === 'Layout' : category.group_name !== 'Layout'))
      .findIndex(category => category.items.some(item => item.name.toLowerCase()
        .includes(searchQuery.toLowerCase())));

    this.setState({
      activeAccordionIndex: firstMatchingCategoryIndex !== -1 ? firstMatchingCategoryIndex : 0,
    });
  }

  static _defaultItemOptions(element, intl) {
    switch (element) {
      case 'Dropdown':
        return [
          {
            value: 'place_holder_option_1',
            text: intl.formatMessage({ id: 'place-holder-option-1' }),
            key: `dropdown_option_${ID.uuid()}`,
          },
          {
            value: 'place_holder_option_2',
            text: intl.formatMessage({ id: 'place-holder-option-2' }),
            key: `dropdown_option_${ID.uuid()}`,
          },
          {
            value: 'place_holder_option_3',
            text: intl.formatMessage({ id: 'place-holder-option-3' }),
            key: `dropdown_option_${ID.uuid()}`,
          },
        ];
      case 'Tags':
        return [
          {
            value: 'place_holder_tag_1',
            text: intl.formatMessage({ id: 'place-holder-tag-1' }),
            key: `tags_option_${ID.uuid()}`,
          },
          {
            value: 'place_holder_tag_2',
            text: intl.formatMessage({ id: 'place-holder-tag-2' }),
            key: `tags_option_${ID.uuid()}`,
          },
          {
            value: 'place_holder_tag_3',
            text: intl.formatMessage({ id: 'place-holder-tag-3' }),
            key: `tags_option_${ID.uuid()}`,
          },
        ];
      case 'Checkboxes':
        return [
          {
            value: 'place_holder_option_1',
            text: intl.formatMessage({ id: 'place-holder-option-1' }),
            key: `checkboxes_option_${ID.uuid()}`,
          },
          {
            value: 'place_holder_option_2',
            text: intl.formatMessage({ id: 'place-holder-option-2' }),
            key: `checkboxes_option_${ID.uuid()}`,
          },
          {
            value: 'place_holder_option_3',
            text: intl.formatMessage({ id: 'place-holder-option-3' }),
            key: `checkboxes_option_${ID.uuid()}`,
          },
        ];
      case 'RadioButtons':
        return [
          {
            value: 'place_holder_option_1',
            text: intl.formatMessage({ id: 'place-holder-option-1' }),
            key: `radiobuttons_option_${ID.uuid()}`,
          },
          {
            value: 'place_holder_option_2',
            text: intl.formatMessage({ id: 'place-holder-option-2' }),
            key: `radiobuttons_option_${ID.uuid()}`,
          },
          {
            value: 'place_holder_option_3',
            text: intl.formatMessage({ id: 'place-holder-option-3' }),
            key: `radiobuttons_option_${ID.uuid()}`,
          },
        ];
      default:
        return [];
    }
  }

  _defaultItems(intl) {
    // Text elements category
    const textItems = [
      {
        key: 'Header',
        name: intl.formatMessage({ id: 'header-text' }),
        icon: <Heading/>,
        static: true,
        content: intl.formatMessage({ id: 'place-holder-text' }),
      },
      {
        key: 'Label',
        name: intl.formatMessage({ id: 'label' }),
        static: true,
        icon: <CaseSensitive/>,
        content: intl.formatMessage({ id: 'place-holder-text' }),
      },
      {
        key: 'Paragraph',
        name: intl.formatMessage({ id: 'paragraph' }),
        static: true,
        icon: <Pilcrow/>,
        content: intl.formatMessage({ id: 'place-holder-text' }),
      },
      {
        key: 'LineBreak',
        name: intl.formatMessage({ id: 'line-break' }),
        static: true,
        icon: <MoveHorizontal/>,
      },
      {
        key: 'HyperLink',
        name: intl.formatMessage({ id: 'website' }),
        icon: <Link/>,
        static: true,
        content: intl.formatMessage({ id: 'place-holder-website-link' }),
        href: 'http://www.example.com',
      },
    ];

    // Input elements category
    const inputItems = [
      {
        key: 'Dropdown',
        canHaveAnswer: true,
        name: intl.formatMessage({ id: 'dropdown' }),
        icon: <SquareChevronDown/>,
        label: intl.formatMessage({ id: 'place-holder-label' }),
        field_name: 'dropdown_',
        options: [],
      },
      {
        key: 'DatePicker',
        canDefaultToday: true,
        canReadOnly: true,
        dateFormat: 'MM/dd/yyyy',
        timeFormat: 'hh:mm aa',
        showTimeSelect: false,
        showTimeSelectOnly: false,
        showTimeInput: false,
        name: intl.formatMessage({ id: 'date' }),
        icon: <CalendarDays/>,
        label: intl.formatMessage({ id: 'place-holder-label' }),
        field_name: 'date_picker_',
      },
      {
        key: 'Signature',
        canReadOnly: true,
        name: intl.formatMessage({ id: 'signature' }),
        icon: <SquarePen/>,
        label: intl.formatMessage({ id: 'signature' }),
        field_name: 'signature_',
      },
      {
        key: 'Rating',
        canHaveAnswer: true,
        name: intl.formatMessage({ id: 'rating' }),
        label: intl.formatMessage({ id: 'place-holder-label' }),
        icon: <Star/>,
        field_name: 'rating_',
      },
      {
        key: 'Tags',
        canHaveAnswer: true,
        name: intl.formatMessage({ id: 'tags' }),
        icon: <Tags/>,
        label: intl.formatMessage({ id: 'place-holder-label' }),
        field_name: 'tags_',
        options: [],
      },
      {
        key: 'Checkboxes',
        canHaveAnswer: true,
        name: intl.formatMessage({ id: 'checkboxes' }),
        icon: <SquareCheck/>,
        label: intl.formatMessage({ id: 'place-holder-label' }),
        field_name: 'checkboxes_',
        options: [],
      },
      {
        key: 'RadioButtons',
        canHaveAnswer: true,
        name: intl.formatMessage({ id: 'multiple-choice' }),
        icon: <CircleDot/>,
        label: intl.formatMessage({ id: 'place-holder-label' }),
        field_name: 'radiobuttons_',
        options: [],
      },
      {
        key: 'TextInput',
        canHaveAnswer: true,
        name: intl.formatMessage({ id: 'text-input' }),
        label: intl.formatMessage({ id: 'place-holder-label' }),
        icon: <CaseSensitive/>,
        field_name: 'text_input_',
      },
      {
        key: 'EmailInput',
        canHaveAnswer: true,
        name: intl.formatMessage({ id: 'email-input' }),
        label: intl.formatMessage({ id: 'place-holder-email' }),
        icon: <Mail/>,
        field_name: 'email_input_',
      },
      {
        key: 'NumberInput',
        canHaveAnswer: true,
        name: intl.formatMessage({ id: 'number-input' }),
        label: intl.formatMessage({ id: 'place-holder-label' }),
        icon: <Plus/>,
        field_name: 'number_input_',
      },
      {
        key: 'PhoneNumber',
        canHaveAnswer: true,
        name: intl.formatMessage({ id: 'phone-input' }),
        label: intl.formatMessage({ id: 'place-holder-phone-number' }),
        icon: <Phone/>,
        field_name: 'phone_input_',
      },
      {
        key: 'TextArea',
        canHaveAnswer: true,
        name: intl.formatMessage({ id: 'multi-line-input' }),
        label: intl.formatMessage({ id: 'place-holder-label' }),
        icon: <AArrowUp/>,
        field_name: 'text_area_',
      },
      {
        key: 'Range',
        name: intl.formatMessage({ id: 'range' }),
        icon: <SlidersHorizontal/>,
        label: intl.formatMessage({ id: 'place-holder-label' }),
        field_name: 'range_',
        step: 1,
        default_value: 3,
        min_value: 1,
        max_value: 5,
        min_label: intl.formatMessage({ id: 'easy' }),
        max_label: intl.formatMessage({ id: 'difficult' }),
      },
    ];

    // Layout elements category
    const layoutItems = [
      {
        key: 'FieldSet',
        canHaveAnswer: false,
        name: intl.formatMessage({ id: 'fieldset' }),
        label: intl.formatMessage({ id: 'fieldset' }),
        icon: <Menu/>,
        field_name: 'fieldset-element',
      },
      {
        key: 'TwoColumnRow',
        canHaveAnswer: false,
        name: intl.formatMessage({ id: 'two-columns-row' }),
        label: '',
        icon: <Columns2/>,
        field_name: 'two_col_row_',
      },
      {
        key: 'ThreeColumnRow',
        canHaveAnswer: false,
        name: intl.formatMessage({ id: 'three-columns-row' }),
        label: '',
        icon: <Columns2/>,
        field_name: 'three_col_row_',
      },
      {
        key: 'FourColumnRow',
        element: 'MultiColumnRow',
        canHaveAnswer: false,
        name: intl.formatMessage({ id: 'four-columns-row' }),
        label: '',
        icon: <Columns2/>,
        field_name: 'four_col_row_',
        col_count: 4,
        class_name: 'col-md-3',
      },
      {
        key: 'FiveColumnRow',
        element: 'MultiColumnRow',
        canHaveAnswer: false,
        name: intl.formatMessage({ id: 'five-columns-row' }),
        label: '',
        icon: <Columns2/>,
        field_name: 'five_col_row_',
        col_count: 5,
        class_name: 'col',
      },
      {
        key: 'SixColumnRow',
        element: 'MultiColumnRow',
        canHaveAnswer: false,
        name: intl.formatMessage({ id: 'six-columns-row' }),
        label: '',
        icon: <Columns2/>,
        field_name: 'six_col_row_',
        col_count: 6,
        class_name: 'col-md-2',
      },
    ];

    // Media elements category
    const mediaItems = [
      {
        key: 'Image',
        name: intl.formatMessage({ id: 'image' }),
        label: '',
        icon: <Image/>,
        field_name: 'image_',
        src: '',
      },
      {
        key: 'Camera',
        name: intl.formatMessage({ id: 'camera' }),
        icon: <Camera/>,
        label: intl.formatMessage({ id: 'place-holder-label' }),
        field_name: 'camera_',
      },
      {
        key: 'FileUpload',
        name: intl.formatMessage({ id: 'file-upload' }),
        icon: <File/>,
        label: intl.formatMessage({ id: 'place-holder-label' }),
        field_name: 'file_upload_',
      },
      {
        key: 'Download',
        name: intl.formatMessage({ id: 'file-attachment' }),
        icon: <File/>,
        static: true,
        content: intl.formatMessage({ id: 'place-holder-file-name' }),
        field_name: 'download_',
        file_path: '',
        _href: '',
      },
    ];
    return [
      {
        group_name: 'Text',
        items: textItems,
      },
      {
        group_name: 'Input',
        items: inputItems,
      },
      {
        group_name: 'Layout',
        items: layoutItems,
      },
      {
        group_name: 'Media',
        items: mediaItems,
      },
    ];
  }

  addCustomOptions(item, elementOptions) {
    if (item.type === 'custom') {
      const customOptions = { ...item, ...elementOptions };
      customOptions.custom = true;
      customOptions.component = item.component || null;
      customOptions.custom_options = item.custom_options || [];
      return customOptions;
    }
    return elementOptions;
  }

  create(item) {
    const { intl } = this.props;
    const elementKey = item.element || item.key;
    const elementOptions = this.addCustomOptions(item, {
      id: ID.uuid(),
      element: elementKey,
      text: item.name,
      group_name: item.group_name,
      static: item.static,
      required: false,
      showDescription: item.showDescription,
    });

    if (this.props.showDescription === true && !item.static) {
      elementOptions.showDescription = true;
    }

    if (item.static) {
      elementOptions.bold = false;
      elementOptions.italic = false;
    }

    if (item.canHaveAnswer) {
      elementOptions.canHaveAnswer = item.canHaveAnswer;
    }

    if (item.canReadOnly) {
      elementOptions.readOnly = false;
    }

    if (item.canDefaultToday) {
      elementOptions.defaultToday = false;
    }

    if (item.content) {
      elementOptions.content = item.content;
    }

    if (item.href) {
      elementOptions.href = item.href;
    }

    if (item.inherited !== undefined) {
      elementOptions.inherited = item.inherited;
    }

    elementOptions.canHavePageBreakBefore = item.canHavePageBreakBefore !== false;
    elementOptions.canHaveAlternateForm = item.canHaveAlternateForm !== false;
    elementOptions.canHaveDisplayHorizontal = item.canHaveDisplayHorizontal !== false;
    if (elementOptions.canHaveDisplayHorizontal) {
      elementOptions.inline = item.inline;
    }
    elementOptions.canHaveOptionCorrect = item.canHaveOptionCorrect !== false;
    elementOptions.canHaveOptionValue = item.canHaveOptionValue !== false;
    elementOptions.canPopulateFromApi = item.canPopulateFromApi !== false;

    if (item.class_name) {
      elementOptions.class_name = item.class_name;
    }

    if (elementKey === 'Image') {
      elementOptions.src = item.src;
    }

    if (elementKey === 'DatePicker') {
      elementOptions.dateFormat = item.dateFormat;
      elementOptions.timeFormat = item.timeFormat;
      elementOptions.showTimeSelect = item.showTimeSelect;
      elementOptions.showTimeSelectOnly = item.showTimeSelectOnly;
      elementOptions.showTimeInput = item.showTimeInput;
    }

    if (elementKey === 'Download') {
      elementOptions._href = item._href;
      elementOptions.file_path = item.file_path;
    }

    if (elementKey === 'Range') {
      elementOptions.step = item.step;
      elementOptions.default_value = item.default_value;
      elementOptions.min_value = item.min_value;
      elementOptions.max_value = item.max_value;
      elementOptions.min_label = item.min_label;
      elementOptions.max_label = item.max_label;
    }

    if (item.element === 'MultiColumnRow') {
      elementOptions.col_count = item.col_count;
    }

    if (item.defaultValue) {
      elementOptions.defaultValue = item.defaultValue;
    }

    if (item.field_name) {
      elementOptions.field_name = item.field_name + ID.uuid();
    }

    if (item.label) {
      elementOptions.label = item.label;
    }

    if (item.options) {
      if (item.options.length > 0) {
        elementOptions.options = item.options.map(x => ({
          ...x,
          key: `custom_option_${ID.uuid()}`,
        }));
      } else {
        elementOptions.options = Toolbar._defaultItemOptions(elementOptions.element, intl);
      }
    }

    return elementOptions;
  }

  _onClick(item) {
    // ElementActions.createElement(this.create(item));
    store.dispatch('create', this.create(item));
  }

  renderItem = (item) => (<ToolbarItem data={item} key={item.key}
                                       onClick={this._onClick.bind(this, item)}
                                       onCreate={this.create}/>);

  render() {
    const {
      searchQuery,
    } = this.state;
    const categories = this._defaultItems(this.props.intl);

    // Filter items based on search within each category
    const filteredCategories = categories.map(category => ({
      ...category,
      items: category.items.filter(item => item.name.toLowerCase()
        .includes(searchQuery.toLowerCase())),
    }));

    // Filter categories based on showLayout AFTER filtering items
    const displayedCategories = filteredCategories.filter(category => (this.state.showLayout ? category.group_name === 'Layout' : category.group_name !== 'Layout'));

    return (

      <div
        className="border-2 border-transparent shadow-md rounded-2xl w-[450px] p-2 h-full">
        <div className="mb-2 mt-2">
          <Switch isChecked={this.state.showLayout}
                  onChange={this.handleSwitchChange}/>
        </div>
        {/* Search bar container */}
        <div className="relative mb-4"> {/* Add margin-bottom for spacing */}
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => this.setState({ searchQuery: e.target.value })}
            className="pl-10 pr-10 py-1 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black w-full"
          />
          <div
            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={15}/>
          </div>
          {searchQuery
            && ( // Conditionally render the clear button
              <button
                onClick={() => this.setState({ searchQuery: '' })}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
        </div>
        <Accordion
          activeIndex={this.state.activeAccordionIndex}
          onChange={(index) => this.setState({ activeAccordionIndex: index })}
        >
          {displayedCategories.map((category) => (
            <AccordionItem key={category.group_name}
                           title={category.group_name}>
              <ul
                className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map(this.renderItem)}
              </ul>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

    );
  }
}

export default injectIntl(Toolbar);
