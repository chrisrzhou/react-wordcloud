/**
 * Simple Tooltip component
 * @flow
 */

import * as React from 'react';

type TProps = {
  content: React.Node,
  isEnabled: boolean,
  style: Object,
  x: number,
  y: number,
};

type TState = {
  x: number,
  y: number,
};

class Tooltip extends React.Component<TProps, TState> {
  _container: any;

  static defaultProps = {
    content: '',
    isEnabled: false,
    x: 0,
    y: 0,
    style: {
      background: '#000',
      border: '#aaa',
      borderRadius: 2,
      color: '#fff',
      fontFamily: 'arial',
      fontSize: 12,
      padding: '4px 8px',
      pointerEvents: 'none',
      position: 'fixed',
      textAlign: 'center',
    },
  };

  state = {
    x: this.props.x,
    y: this.props.y,
  };

  componentWillReceiveProps(nextProps: TProps): void {
    const {x, y} = nextProps;
    if (this.props.x !== x || this.props.y !== y) {
      this.setState({x, y});
    }
  }

  render(): React.Node {
    const {content, isEnabled, style} = this.props;
    const {x, y} = this.state;
    const mergedStyle = {
      ...style,
      left: x,
      top: y,
      display: isEnabled ? '' : 'none',
    };
    return (
      <div
        ref={(container): void => {
          this._container = container;
        }}
        style={mergedStyle}>
        {content}
      </div>
    );
  }

  _updatePosition = (currentX: number, currentY: number): void => {
    const {offsetHeight, offsetWidth} = this._container;
    const maxX = Math.min(window.innerWidth - offsetWidth, currentX);
    const maxY = Math.min(window.innerHeight - offsetHeight, currentY);
    if (maxX !== currentX || maxY !== currentY) {
      this.setState({
        x: maxX,
        y: maxY,
      });
    }
  };
}

export default Tooltip;
