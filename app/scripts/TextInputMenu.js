import React from 'react';

import ContextMenuContainer from './ContextMenuContainer';

// Styles
import '../styles/ContextMenu.module.scss';

export class TextInputMenu extends ContextMenuContainer {

  componentWillUnmount() {

  }

  handleKeyDown(e) {
    if (e.keyCode == 13) {
      // enter key pressed
      this.handleSubmit(e);
    } else if (e.keyCode == 27) {
      this.props.onCancel();
    }
  }

  handleSubmit(e) {
    console.log('submit');
    e.preventDefault();
  }

  render() {
    // add a text area for each specified option
    const inputDivs = this.props.inputOptions.map((x) => {
      return (
        <div
          style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {x.name}
          <input 
            type='text' 
          />
        </div>
      );
    });

    return (
      <div
        ref={c => this.div = c}
        style={{
          left: this.state.left,
          top: this.state.top,
        }}
        styleName="context-menu"
        onKeyDown={this.handleKeyDown.bind(this)}
      >
        { inputDivs }
        <div
          style={{ 
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <button 
            onClick={this.props.onCancel}
          >
            Cancel
          </button>
          <button
            type='submit'
            onClick={this.handleSubmit}
          >
            OK
          </button>
        </div>
      </div>
    );
  }
}

export default TextInputMenu;
