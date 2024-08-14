document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addItemButton = document.getElementById('addItemButton');
    const itemList = document.getElementById('itemList');

    function createItemElement(itemText) {
        const li = document.createElement('li');
        li.textContent = itemText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.addEventListener('click', () => {
            itemList.removeChild(li);
        });

        li.appendChild(removeButton);
        return li;
    }

    function addItem() {
        const itemText = itemInput.value.trim();
        if (itemText === '') return;

        const itemElement = createItemElement(itemText);
        itemList.appendChild(itemElement);
        itemInput.value = '';
    }

    addItemButton.addEventListener('click', addItem);
    itemInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addItem();
        }
    });
});