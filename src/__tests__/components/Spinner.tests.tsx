import { render } from '@testing-library/react';
import { Spinner } from '../../components/SpinnerComponent/Spinner';

describe('Spinner', () => {
    it('Spinner renders correctly', () => {
        // Arrange.
        // Act.
        const { asFragment } = render(<Spinner />);

        // Assert.
        expect(asFragment()).toMatchSnapshot();
    });
});
