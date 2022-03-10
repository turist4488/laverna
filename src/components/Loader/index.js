import React from 'react';
import PropTypes from 'prop-types';
import './Loader.scss';

const Loader = ({position, size}) => (
  <div className={`loader-wrapper loader-wrapper--${position}`}>
      <div className={`loader loader--${size}`}>
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
      </div>
  </div>
);

Loader.propTypes = {
  position: PropTypes.oneOf(['absolute', 'fixed']),
  size: PropTypes.oneOf(['small', 'large', 'default'])
};

Loader.defaultProps = {
  position: 'fixed',
  size: 'default'
}

export default Loader;
