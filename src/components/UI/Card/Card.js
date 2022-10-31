import PropTypes from 'prop-types';

import classes from './Card.module.css';

const Card = ({ className, children }) => (
  <div className={`${classes.card} ${className}`}>{children}</div>
);

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Card.defaultProps = {
  className: '',
  children: null,
};

export default Card;
