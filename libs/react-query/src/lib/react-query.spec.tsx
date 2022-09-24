import { render } from '@testing-library/react';

import ReactQuery from './react-query';

describe('ReactQuery', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactQuery />);
    expect(baseElement).toBeTruthy();
  });
});
