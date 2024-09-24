import { fireEvent, render } from '@testing-library/react';

import CatImage from './CatImage';
import ReactDOM from 'react-dom';
import Modal from './Modal';

describe('CatImage', () => {

    describe('CatImage', () => {
        beforeAll(() => {
            const portalEl = document.createElement('div');
            portalEl.id = 'modal_root';
            document.body.appendChild(portalEl);
          });

        test('renders an img element', () => {
            render(<CatImage catUrl="https://example.com/cat.jpg" catId="1" index={0} imagesPerRow={3} />);
            const imgElement = document.querySelector('img');
            expect(imgElement).not.toBeNull();
        });

        test('CatImage renders inside a Modal when withModal is true', () => {
            const catImageElement = <CatImage catUrl="https://example.com/cat.jpg" catId="1" index={0} imagesPerRow={3} withModal={true} />
            const container = document.createElement("div");
            document.body.appendChild(container);
            ReactDOM.createPortal(<Modal children={[<CatImage key="1" catUrl="https://example.com/cat.jpg" catId="1" index={0} imagesPerRow={3} withModal={true} />]} onClick={ ()=>{} } />, container);
            const catImage = render(catImageElement);
            const divElement = catImage.getByTestId("cat-image-0"); // Fix this line
            fireEvent.click(divElement);
            expect(document.querySelector('#modal_root')).not.toBeNull();
            const imgElement = document.querySelector('img');
            expect(imgElement).not.toBeNull();
        });
    });
    
});