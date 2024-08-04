import React from 'react';

export const Alert = () => {
  const style = {
    backgroundColor: '#E6E6CC',
    color: '#000', 
    letterSpacing: '2px',
    fontWeight: 600,
    paddingBlock: '8px',
    textTransform: 'uppercase',
    fontSize: '0.8rem'
  };

  return (
    <div className='top-alert-container' style={style}>
      <h4>Shop Now and Get Free Shipping on $25+ Orders in Canada</h4>
    </div>
  );
};


