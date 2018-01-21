import React from 'react';

import ContextMenuContainer from './ContextMenuContainer';
import ContextMenuItem from './ContextMenuItem';

// Styles
import '../styles/ContextMenu.module.scss';

export class NestedContextMenu extends ContextMenuContainer {
  getSubmenu() {
    if (this.state.submenuShown) {
      // the bounding box of the element which initiated the subMenu
      // necessary so that we can position the submenu next to the initiating
      // element
      const bbox = this.state.submenuSourceBbox;
      const position = this.state.orientation === 'left' ? (
        {
          left: this.state.left,
          top: bbox.top,
        }
      ) : (
        {
          left: this.state.left + bbox.width + 7,
          top: bbox.top,
        }
      );

      const menuItem = this.state.submenuShown;

      if (menuItem.component) {
        console.log('hey');
        // this item provides its own component
        return React.cloneElement(menuItem.component, 
          { 
            position,
            orientation: this.state.orientation,
            parentBbox: bbox,
          });;
      }

      // if it doesn't provide its own component, we just assume
      // that it's actually 
      return (
        <NestedContextMenu
          menuItems={menuItem.children}
          orientation={this.state.orientation}
          parentBbox={bbox}
          position={position}
        />
      );
    }
    return (<div />);
  }

  componentWillUnmount() {

  }

  render() {
    const menuItems = [];

    // iterate over the list
    for (const menuItemKey in this.props.menuItems) {
      const menuItem = this.props.menuItems[menuItemKey];

      menuItems.push(
        <ContextMenuItem
          key={menuItemKey}
          onClick={menuItem.handler ? menuItem.handler : () => null}
          onMouseEnter={(menuItem.children || menuItem.component) ? e => this.handleItemMouseEnter(e, menuItem) : this.handleOtherMouseEnter.bind(this)}
          onMouseLeave={this.handleMouseLeave}
        >
          {menuItem.name}
          {(menuItem.children || menuItem.component) &&
            <svg
              styleName="play-icon"
            >
              <use xlinkHref="#play" />
            </svg>
          }
        </ContextMenuItem>,
      );
    }

    return (
      <div
        ref={c => this.div = c}
        style={{
          left: this.state.left,
          top: this.state.top,
        }}
        styleName="context-menu"
      >
        {menuItems}
        {this.getSubmenu()}
      </div>
    );
  }
}

export default NestedContextMenu;
