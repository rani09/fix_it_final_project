import React, { Fragment } from 'react';
import spinner from './spinner.svg';

const spin = () => {
  return (
    <Fragment>
      <section className='container'>
        <img
          src={spinner}
          style={{ width: '200px', margin: 'auto', display: 'block' }}
          alt='Loading...'
        />
      </section>
    </Fragment>
  );
};

export default spin;
