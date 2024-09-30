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

const CatImageContainer = styled.li<{$width?: number}>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => props.$width}%;
`;

const CatImageImg = styled.img`
    max-width: 90%;
    max-height: 100%;
    width: auto;
    height: auto;
`;

const CatImageImgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const CatImage: React.FC<CatImageProps> = ({ catUrl, catId, index, imagesPerRow, withModal = true, icon}) => {
    const [showModal, setShowModal] = React.useState(false);
    const handleClick = () => {
        setShowModal(true);
    };

    return (
        <CatImageContainer data-testid="cat-image-container" key={catId} $width={100/imagesPerRow}>
            <CatImageImgContainer
                data-testid={`cat-image-${index}`}
                onClick={handleClick}
            >
                <CatImageImg src={catUrl} alt={`Cat ${index + 1}`} />
            </CatImageImgContainer>
            {withModal && showModal && (
                <Modal onClick={() => { setShowModal(false) }}>
                    <CatDetail imageUrl={catUrl} catId={catId} favouriteIcon={icon}/>
                </Modal>
            )}
            {!withModal && <CatDetail imageUrl={catUrl} catId={catId} />}
        </CatImageContainer>
    );
};

export default CatImage;