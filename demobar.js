import React from "react";
import { Eye, X } from "lucide-react";
import store from "./src/stores/store";
import { ReactFormGenerator } from "./src/index";
import { FormBuilderEventKeys } from "./src/utils";

const answers = {};
// const answers = {
//   'dropdown_38716F53-51AA-4A53-9A9B-367603D82548': 'd2',
//   'checkboxes_8D6BDC45-76A3-4157-9D62-94B6B24BB833': [
//     'checkboxes_option_8657F4A6-AA5A-41E2-A44A-3E4F43BFC4A6',
//     'checkboxes_option_1D674F07-9E9F-4143-9D9C-D002B29BA9E4',
//   ],
//   'radio_buttons_F79ACC6B-7EBA-429E-870C-124F4F0DA90B': [
//     'radiobuttons_option_553B2710-AD7C-46B4-9F47-B2BD5942E0C7',
//   ],
//   'rating_3B3491B3-71AC-4A68-AB8C-A2B5009346CB': 4,
// };

export default class Demobar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    };

    const update = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);

    store.subscribe((state) => update(state.data));
  }

  showPreview() {
    this.saveFormData();
    this.setState({
      previewVisible: true,
    });
  }

  showShortPreview() {
    this.saveFormData();
    this.setState({
      shortPreviewVisible: true,
    });
  }

  showRoPreview() {
    this.saveFormData();
    this.setState({
      roPreviewVisible: true,
    });
  }

  closePreview() {
    this.setState({
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    });
  }

  _onChange(data) {
    this.setState({
      data,
    });
    window.parent.postMessage(
      { formData: data, key: FormBuilderEventKeys.PostCreateFrom },
      "*"
    );
  }

  _onSubmit() {
    window.parent.postMessage(
      { isNextClicked: true, key: FormBuilderEventKeys.PostCreateFrom },
      "*"
    );
  }

  saveFormData() {
    store.dispatch("post");
  }

  render() {
    let modalClass = "modal";
    if (this.state.previewVisible) {
      modalClass += " show d-block";
    }

    let shortModalClass = "modal short-modal";
    if (this.state.shortPreviewVisible) {
      shortModalClass += " show d-block";
    }

    let roModalClass = "modal ro-modal";
    if (this.state.roPreviewVisible) {
      roModalClass += " show d-block";
    }

    return (
      <div
        className="clearfix"
        style={{
          marginTop: "20px",
          marginRight: "20px",
          width: "99vw",
        }}
      >
        <h4 className="float-left mt-2">Preview</h4>
        <button
          className="float-right items-center px-4 py-1 inline-flex text-black border border-gray-300 hover:bg-gray-50 rounded-full focus:outline-none"
          onClick={() => this.showPreview()}
        >
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </button>
        <button
          className="float-right items-center px-4 py-1 inline-flex text-white fill-black border-2 rounded-full hover:fill-black focus:outline-none"
          style={{
            marginRight: "10px",
            backgroundColor: "black",
            borderColor: "black",
          }}
          onClick={this._onSubmit.bind(this)}
        >
          Save Form
        </button>

        {this.state.previewVisible && (
          <div className={modalClass} role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content border-none shadow-md rounded-2xl p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Preview</h2>
                  <button
                    type="button"
                    className="cursor-pointer focus:outline-none hover:bg-gray-50 hover:rounded-2xl"
                    onClick={this.closePreview.bind(this)}
                  >
                    <X size={18} />
                  </button>
                </div>

                <ReactFormGenerator
                  download_path=""
                  back_action="/"
                  back_name=""
                  answer_data={answers}
                  action_name=""
                  // form_action="/api/form"
                  // form_method="POST"
                  variables={this.props.variables}
                  data={this.state.data}
                  locale="en"
                  hide_actions={true}
                  read_only={true}
                />
              </div>
            </div>
          </div>
        )}
        {this.state.roPreviewVisible && (
          <div className={roModalClass}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <ReactFormGenerator
                  download_path=""
                  back_action="/"
                  back_name="Back"
                  answer_data={answers}
                  action_name="Save"
                  // form_action="/"
                  // form_method="POST"
                  read_only={true}
                  variables={this.props.variables}
                  hide_actions={true}
                  data={this.state.data}
                  locale="en"
                />

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={this.closePreview.bind(this)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.shortPreviewVisible && (
          <div className={shortModalClass}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content border border-light p-3 mb-4">
                <ReactFormGenerator
                  download_path=""
                  back_action=""
                  answer_data={answers}
                  // form_action="/"
                  // form_method="POST"
                  data={this.state.data}
                  display_short={true}
                  variables={this.props.variables}
                  hide_actions={false}
                  locale="en"
                />

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={this.closePreview.bind(this)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
