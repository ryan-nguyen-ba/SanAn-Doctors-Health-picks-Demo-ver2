document.addEventListener('DOMContentLoaded', () => {

    const checkboxTriggers = document.querySelectorAll('.open-modal-button-mission');
    const modal = document.querySelector('.mission-modal');
    const closeModalButton = document.querySelector('.mission-modal__close-button');
    const modalOverlay = document.querySelector('.mission-modal__overlay');
    
    if (checkboxTriggers.length === 0 || !modal || !closeModalButton || !modalOverlay) {
        return;
    }

    const openModal = () => {
        modal.classList.remove('mission-modal--hidden');
    };

    const closeModal = () => {
        modal.classList.add('mission-modal--hidden');
    };

    checkboxTriggers.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                openModal();
            } else {
                let isAnyCheckboxChecked = false;
                checkboxTriggers.forEach(cb => {
                    if (cb.checked) {
                        isAnyCheckboxChecked = true;
                    }
                });

                if (!isAnyCheckboxChecked) {
                    closeModal();
                }
            }
        });
    });

    const closeModalAndUncheckAll = () => {
        closeModal();
        checkboxTriggers.forEach(checkbox => {
            checkbox.checked = false; // すべてのチェックボックスのチェックを外す
        });
    };

    closeModalButton.addEventListener('click', closeModalAndUncheckAll);
    modalOverlay.addEventListener('click', closeModalAndUncheckAll);

});