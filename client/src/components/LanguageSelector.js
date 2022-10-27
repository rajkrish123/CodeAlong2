import React from "react";

class LanguageSelector extends React.Component {
  state = {
    language: "python",
  };
  languages = {
    "python": "Python",
    "javascript": "JavaScript", 
    "c": "C", 
    "cpp": "C++", 
    "java": "Java"
  };

  renderLanguageOptions() {
    return Object.keys(this.languages).map((language) => (
      <option key={language} value={language}>
        {this.languages[language]}
      </option>
    ));
  }

  handleChange(event) {
    console.log(`Language Selected:${event.target.value}`);
    this.props.socket.emit("setLanguage", {
      language: event.target.value,
    });
    this.props.onLanguageChange(event.target.value);
    this.setState({ language: event.target.value });
  }

  render() {
    return (
      <div id="language-select-wrapper">
        <label>Language</label>

        <select
          id="language-select"
          value={this.state.language}
          onChange={this.handleChange.bind(this)}
        >
          {this.renderLanguageOptions()}
        </select>
      </div>
    );
  }
}

export default LanguageSelector;
