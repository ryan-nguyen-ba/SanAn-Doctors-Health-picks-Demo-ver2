document.addEventListener('DOMContentLoaded', () => {

    const openModalButton = document.querySelector('.open-modal-button');
    const modal = document.querySelector('.modal');
    const closeModalButton = document.querySelector('.modal__close-button');
    const modalOverlay = document.querySelector('.modal__overlay');

    const openModal = () => {
        modal.classList.remove('modal--hidden');
    };

    const closeModal = () => {
        modal.classList.add('modal--hidden');
    };

    openModalButton.addEventListener('click', openModal);

    closeModalButton.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', closeModal);

});