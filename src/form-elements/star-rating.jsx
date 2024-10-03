import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Star } from 'lucide-react'; // Import Lucide Star Icon
import cx from 'classnames';

export default class StarRating extends Component {
  constructor(props) {
    super(props);

    this.min = 0;
    this.max = props.ratingAmount || 5;

    const ratingVal = props.rating;
    const ratingCache = {
      pos: ratingVal ? this.getStarRatingPosition(ratingVal) : 0,
      rating: props.rating,
    };

    this.state = {
      ratingCache,
      editing: props.editing || !props.rating,
      stars: 5,
      rating: ratingCache.rating,
      pos: ratingCache.pos,
    };
  }

  getPosition(e) {
    return e.pageX - this.root.getBoundingClientRect().left;
  }

  applyPrecision(val, precision) {
    return parseFloat(val.toFixed(precision));
  }

  getDecimalPlaces(num) {
    const match = (`${num}`).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    return !match ? 0 : Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
  }

  getWidthFromValue(val) {
    const min = this.min;
    const max = this.max;

    if (val <= min || min === max) {
      return 0;
    }
    if (val >= max) {
      return 100;
    }
    return (val / (max - min)) * 100;
  }

  getValueFromPosition(pos) {
    const precision = this.getDecimalPlaces(this.props.step);
    const maxWidth = this.ratingContainer.offsetWidth;
    const diff = this.max - this.min;
    let factor = (diff * pos) / (maxWidth * this.props.step);
    factor = Math.ceil(factor);
    let val = this.applyPrecision(parseFloat(this.min + factor * this.props.step), precision);
    val = Math.max(Math.min(val, this.max), this.min);
    return val;
  }

  calculate(pos) {
    const val = this.getValueFromPosition(pos);
    let width = this.getWidthFromValue(val);

    width += '%';
    return {
      width,
      val
    };
  }

  getStarRatingPosition(val) {
    const width = `${this.getWidthFromValue(val)}%`;
    return width;
  }

  handleMouseLeave() {
    this.setState({
      pos: this.state.ratingCache.pos,
      rating: this.state.ratingCache.rating,
    });
  }

  handleMouseMove(e) {
    const ratingEvent = this.getRatingEvent(e);
    this.updateRating(ratingEvent.width, ratingEvent.val);
  }

  updateRating(width, val) {
    this.setState({
      pos: width,
      rating: val,
    });
  }

  handleClick(e) {
    if (this.props.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }

    const ratingCache = {
      pos: this.state.pos,
      rating: this.state.rating,
      caption: this.props.caption,
      name: this.props.name,
    };

    this.setState({
      ratingCache,
    });

    this.props.onRatingClick(e, ratingCache);
    return true;
  }

  render() {
    const classes = cx({
      'react-star-rating': true,
      'rating-disabled': this.props.disabled,
      'rating-editing': this.state.editing,
    });

    const starRating = (
      <div
        ref={(c) => (this.node = c)}
        className="flex items-center rating-container rating-gly-star"
        onMouseMove={this.state.editing ? this.handleMouseMove.bind(this) : undefined}
        onMouseLeave={this.state.editing ? this.handleMouseLeave.bind(this) : undefined}
        onClick={this.state.editing ? this.handleClick.bind(this) : undefined}
      >
        <div
          className="relative "
          style={{ width: this.state.pos }}
        >
          <div className="inline-flex">
            {Array(this.props.ratingAmount)
              .fill()
              .map((_, i) => (
                <Star
                  key={i}
                  className="text-yellow-400"
                  size={this.props.size || 24}
                />
              ))}
          </div>
        </div>
      </div>
    );

    return (
      <span className="inline-flex react-star-rating">
        <span ref={(c) => (this.rootNode = c)}
              className={cx(classes, 'cursor-pointer')}>
          {starRating}
          <input
            type="hidden"
            name={this.props.name}
            value={this.state.ratingCache.rating}
            className="hidden"
            min={this.min}
            max={this.max}
            readOnly
          />
        </span>
      </span>
    );
  }
}

StarRating.propTypes = {
  name: PropTypes.string.isRequired,
  caption: PropTypes.string,
  ratingAmount: PropTypes.number.isRequired,
  rating: PropTypes.number,
  onRatingClick: PropTypes.func,
  disabled: PropTypes.bool,
  editing: PropTypes.bool,
  size: PropTypes.number,
};

StarRating.defaultProps = {
  step: 0.5,
  ratingAmount: 5,
  onRatingClick() {
  },
  disabled: false,
};
