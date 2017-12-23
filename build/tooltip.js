'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Simple Tooltip component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Tooltip = function (_React$Component) {
  _inherits(Tooltip, _React$Component);

  function Tooltip() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Tooltip);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      x: _this.props.x,
      y: _this.props.y
    }, _this._updatePosition = function (currentX, currentY) {
      var _this$_container = _this._container,
          offsetHeight = _this$_container.offsetHeight,
          offsetWidth = _this$_container.offsetWidth;

      var maxX = Math.min(window.innerWidth - offsetWidth, currentX);
      var maxY = Math.min(window.innerHeight - offsetHeight, currentY);
      if (maxX !== currentX || maxY !== currentY) {
        _this.setState({
          x: maxX,
          y: maxY
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Tooltip, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var x = nextProps.x,
          y = nextProps.y;

      if (this.props.x !== x || this.props.y !== y) {
        this.setState({ x: x, y: y });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          content = _props.content,
          isEnabled = _props.isEnabled,
          style = _props.style;
      var _state = this.state,
          x = _state.x,
          y = _state.y;

      var mergedStyle = _extends({}, style, {
        left: x,
        top: y,
        display: isEnabled ? '' : 'none'
      });
      return React.createElement(
        'div',
        {
          ref: function ref(container) {
            _this2._container = container;
          },
          style: mergedStyle },
        content
      );
    }
  }]);

  return Tooltip;
}(React.Component);

Tooltip.defaultProps = {
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
    textAlign: 'center'
  }
};
exports.default = Tooltip;