document.addEventListener('DOMContentLoaded', () => {

    const openModalButton = document.querySelector('.open-modal-button-mission');
    const modal = document.querySelector('.mission-modal');
    const closeModalButton = document.querySelector('.mission-modal__close-button');
    const modalOverlay = document.querySelector('.mission-modal__overlay');
    
    if (!openModalButton || !modal || !closeModalButton || !modalOverlay) {
        return;
    }

    const openModal = () => {
        modal.classList.remove('mission-modal--hidden');
    };

    const closeModal = () => {
        modal.classList.add('mission-modal--hidden');
    };

    openModalButton.addEventListener('click', openModal);

    closeModalButton.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', closeModal);

});