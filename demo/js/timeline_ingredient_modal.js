document.addEventListener('DOMContentLoaded', () => {

    const openModalButton = document.querySelector('.open-modal-button-ingredient');
    const modal = document.querySelector('.ingredient-modal');
    const closeModalButton = document.querySelector('.ingredient-modal__close-button');
    const modalOverlay = document.querySelector('.ingredient-modal__overlay');
    
    if (!openModalButton || !modal || !closeModalButton || !modalOverlay) {
        return;
    }

    const openModal = () => {
        modal.classList.remove('ingredient-modal--hidden');
    };

    const closeModal = () => {
        modal.classList.add('ingredient-modal--hidden');
    };

    openModalButton.addEventListener('click', openModal);

    closeModalButton.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', closeModal);

});