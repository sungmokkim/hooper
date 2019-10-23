import { normalizeChildren } from './utils';
import './styles/slide.css';

export default {
  name: 'HooperSlide',
  inject: ['$hooper'],
  props: {
    isClone: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      default: null
    },
    isSmooth: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    style() {
      const { config, slideHeight, slideWidth } = this.$hooper || {};
      if (config.vertical) {
        return `height: ${slideHeight}px;`;
      }

      return `width: ${slideWidth}px;`;
    },
    isActive() {
      const { upper, lower } = this.$hooper.slideBounds;

      return this.index >= lower && this.index <= upper;
    },
    isPrev() {
      const { lower } = this.$hooper.slideBounds;
      const { itemsToSlide } = this.$hooper.config;

      return this.index < lower && this.index >= lower - itemsToSlide;
    },
    isNext() {
      const { upper } = this.$hooper.slideBounds;
      const { itemsToSlide } = this.$hooper.config;

      return this.index > upper && this.index <= upper + itemsToSlide;
    },
    isCurrent() {
      return this.index === this.$hooper.currentSlide;
    },
    transition() {
      if (this.isSmooth) {
        return `transition: 0.2s ease-in-out;`;
      } else {
        return null;
      }
    },
    opacity() {
      if (this.isSmooth) {
        return this.isActive ? `opacity: 1;` : `opacity: 0;`;
      } else {
        return null;
      }
    }
  },
  render(h) {
    const classes = {
      'hooper-slide': true,
      'is-clone': this.isClone,
      'is-active': this.isActive,
      'is-prev': this.isPrev,
      'is-next': this.isNext,
      'is-current': this.isCurrent,
      'is-smooth': this.isSmooth
    };

    const children = normalizeChildren(this);

    return h(
      'li',
      {
        class: classes,
        style: this.style + this.transition + this.opacity,
        attrs: {
          'aria-hidden': !this.isActive
        }
      },
      children
    );
  }
};
