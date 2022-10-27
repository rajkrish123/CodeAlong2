import { Component } from "react";
import Editor from "@monaco-editor/react";

import LanguageSelector from "./LanguageSelector";
import Loader from "./Loader";

import { VscRunAll } from "react-icons/vsc";

export default class CodeEditor extends Component {
  beforeMount(monaco) {
    console.log("editorWillMount", monaco);
  }

  onMount(editor, monaco) {
    editor.focus();
  }

  onChange(newCode, e) {
    this.props.onChange(newCode);
  }

  render() {
    const options = {
      selectOnLineNumbers: true,
      colorDecorators: true,
      automaticLayout: true,
      scrollbar: {
        alwaysConsumeMouseWheel: false,
      },
      padding: {
        top: 4,
      },
    };

    return (
      <div id="code-editor" className="expand">
        <div id="language-bar">
          <LanguageSelector
            socket={this.props.socket}
            onLanguageChange={this.props.onLanguageChange}
          />

          <div>
            {Object.keys(this.props.typing).map((lang) => {
              return (
                <div>
                  {this.props.typing[lang].userName} is typing in {lang}...
                </div>
              );
            })}
          </div>

          <button id="execute" onClick={this.props.onExecute}>
            <VscRunAll size="20" />
            Execute
          </button>
        </div>
        <div id="editor">
          <Editor
            language={this.props.language}
            theme="vs-dark"
            value={this.props.code}
            height="100%"
            loading={<Loader />}
            options={options}
            onChange={this.onChange.bind(this)}
            beforeMount={this.beforeMount.bind(this)}
            onMount={this.onMount.bind(this)}
          />
        </div>
      </div>
    );
  }
}
