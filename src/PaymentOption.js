import React from 'react';

const PaymentOption = ({name, count, isRefined, classMenu, handleClick}) =>
<li className={classMenu + "__list-item" + (isRefined ? '--selected' : '')}
  onClick={handleClick}>
    <span className={classMenu + "__list-name" + (isRefined ? '--selected' : '')}>
      {name}{' '}
    </span>
    <span className={classMenu + "__list-result-count" + (isRefined ? '--selected' : '')}>
      {count}
    </span>
</li>;


export default PaymentOption;
