import React from 'react'
import ReactModal from 'react-modal'
import { AiOutlineCloseCircle } from 'react-icons/ai'

ReactModal.setAppElement('#modal-root')

interface Props {
    isOpen: boolean
    onAfterOpen?: ReactModal.OnAfterOpenCallback
    onRequestClose?: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void
    contentLabel?: string,
    children?: React.ReactNode
}

const Modal: React.FC<Props> = (props) => {
    const {
        isOpen,
        onAfterOpen,
        onRequestClose,
        contentLabel,
        children,
    } = props

    return (
        <ReactModal
            isOpen={isOpen}
            onAfterOpen={onAfterOpen}
            onRequestClose={onRequestClose}
            style={{
                overlay: {
                    background: 'rgba(0,0,0,0.75)',
                },
            }}
            contentLabel={contentLabel}
        >
            <div className="relative">
                <AiOutlineCloseCircle
                    className="absolute top-2 right-2 cursor-pointer text-3xl text-gray-600"
                    onClick={onRequestClose}
                />
                { children }
            </div>
        </ReactModal>
    );
};

export default Modal;