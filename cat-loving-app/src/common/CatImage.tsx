import React from 'react';
import Modal from './Modal';
import CatDetail from '../cats/CatDetail';
import styled from 'styled-components';

interface CatImageProps {
  catUrl: string;
  index: number;
  catId: string;
  imagesPerRow: number;
  withModal?: boolean;
  icon?: React.ReactNode;
}

const CatImageContainer = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CatImage: React.FC<CatImageProps> = ({ catUrl, catId, index, imagesPerRow, withModal = true, icon}) => {
    const [showModal, setShowModal] = React.useState(false);
    const handleClick = () => {
        setShowModal(true);
    };

    return (
        <li data-testid="cat-image-container" key={catId} style={{ width: `${100 / imagesPerRow}%`, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div
                data-testid={`cat-image-${index}`}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
                onClick={handleClick}
            >
                <img src={catUrl} alt={`Cat ${index + 1}`} style={{ maxWidth: '90%', maxHeight: '100%', width: 'auto', height: 'auto' }} />
            </div>
            {withModal && showModal && (
                <Modal onClick={() => { setShowModal(false) }}>
                    <CatDetail imageUrl={catUrl} catId={catId} favouriteIcon={icon}/>
                </Modal>
            )}
            {!withModal && <CatDetail imageUrl={catUrl} catId={catId} />}
        </li>
    );
};

export default CatImage;