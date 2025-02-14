document.addEventListener("DOMContentLoaded", function() {
    // Function to handle the change of any radio input and recalculate the result
    function updatePrice() {
        const userInputElement = document.querySelector('input[data-target="point_users"]');
        const users = userInputElement ? parseInt(userInputElement.value) : 0;
        const eachUserPrice = document.querySelector('input').getAttribute('data-each-user-price');  

        const support = document.querySelector('.form-group [name="_support"]:checked');
        const months = document.querySelector('.form-group [name="_months"]:checked');
        const obuchenie = document.querySelector('.form-group [name="_obuchenie"]:checked');
        const ipt = document.querySelector('.form-group [name="_ipt"]:checked');
        const kkt = document.querySelector('.form-group [name="_kkt"]:checked');
        const egis3 = document.querySelector('.form-group [name="_egis3"]:checked');

        // Check if any of the radio buttons are missing (i.e., null or undefined)
        if (!support || !months || !obuchenie || !ipt || !kkt || !egis3) {
            console.error('Missing required radio buttons.');
            return;
        }
    
        // Calculate the total for each item
        const supportValue = parseInt(support.getAttribute('data-value'));
        const monthsValue = parseInt(months.getAttribute('data-value'));
        const obuchenieValue = parseInt(obuchenie.getAttribute('data-value'));
        const iptValue = parseInt(ipt.getAttribute('data-value'));
        const kktValue = parseInt(kkt.getAttribute('data-value'));
        const egis3Value = parseInt(egis3.getAttribute('data-value'));

        // hidden inputs 
        const hidden_users = document.querySelector('input[name="users"]');
        const hidden_support = document.querySelector('input[name="support"]');
        const hidden_months = document.querySelector('input[name="months"]');
        const hidden_obuchenie = document.querySelector('input[name="obuchenie"]');
        const hidden_ipt = document.querySelector('input[name="ipt"]');
        const hidden_kkt = document.querySelector('input[name="kkt"]');
        const hidden_egis3 = document.querySelector('input[name="egis3"]');
        const hidden_totalResult = document.querySelector('input[name="totalPrice"]');
        
        // Calculate the total price
        const total = ((users * eachUserPrice) + (supportValue)) * monthsValue + obuchenieValue + iptValue + kktValue + egis3Value;

        // Update the table with the selected values
        const userRow = document.querySelector('[data-target-point="point_users"] span[data-point-text-value]');
        if (userRow) {
            userRow.textContent = users;
            hidden_users.value = users;
        }
        const userPriceRow = document.querySelector('[data-target-point="point_users"] span[data-point-value]');
        if (userPriceRow) {
            userPriceRow.textContent = users * eachUserPrice;
        }
    
        const supportRow = document.querySelector('[data-target-point="point_support"] span[data-point-text-value]');
        if (supportRow) {
            supportRow.textContent = support.getAttribute('data-text-value');
            hidden_support.value = support.getAttribute('data-text-value');
        }
        const supportValueRow = document.querySelector('[data-target-point="point_support"] span[data-point-value]');
        if (supportValueRow) {
            supportValueRow.textContent = supportValue ? supportValue +'р' : '?';
        }
        const monthsRow = document.querySelector('[data-target-point="point_months"] span[data-point-text-value]');
        if (monthsRow) {
            monthsRow.textContent = months.getAttribute('data-text-value');
        }
        const monthsValueRow = document.querySelector('[data-target-point="point_months"] span[data-point-value]');
        if (monthsValueRow) {
            monthsValueRow.textContent = months.getAttribute('data-text-value');
            hidden_months.value = months.getAttribute('data-text-value');
        }
        const obuchenieRow = document.querySelector('[data-target-point="point_obuchenie"] span[data-point-text-value]');
        if (obuchenieRow) {
            obuchenieRow.textContent = obuchenie.getAttribute('data-text-value');
            hidden_obuchenie.value = obuchenie.getAttribute('data-text-value');
        }
        const obuchenieValueRow = document.querySelector('[data-target-point="point_obuchenie"] span[data-point-value]');
        if (obuchenieValueRow) {
            obuchenieValueRow.textContent = obuchenieValue ? obuchenieValue +'р' : '?';
        }
        const iptRow = document.querySelector('[data-target-point="point_ipt"] span[data-point-text-value]');
        if (iptRow) {
            iptRow.textContent = ipt.getAttribute('data-text-value');
            hidden_ipt.value = ipt.getAttribute('data-text-value');
        }
        const iptValueRow = document.querySelector('[data-target-point="point_ipt"] span[data-point-value]');
        if (iptValueRow) {
            iptValueRow.textContent = iptValue ? iptValue +'р' : '?';
        }
    
        const kktRow = document.querySelector('[data-target-point="point_kkt"] span[data-point-text-value]');
        if (kktRow) {
            kktRow.textContent = kkt.getAttribute('data-text-value');
            hidden_kkt.value = kkt.getAttribute('data-text-value');
        }
        const kktValueRow = document.querySelector('[data-target-point="point_kkt"] span[data-point-value]');
        if (kktValueRow) {
            kktValueRow.textContent = kktValue ? kktValue +'р' : '?';
        }
    
        const egis3Row = document.querySelector('[data-target-point="point_egis3"] span[data-point-text-value]');
        if (egis3Row) {
            egis3Row.textContent = egis3.getAttribute('data-text-value');
        }
        const egis3ValueRow = document.querySelector('[data-target-point="point_egis3"] span[data-point-value]');
        if (egis3ValueRow) {
            egis3ValueRow.textContent = egis3Value ? egis3Value +'р' : '?';
            hidden_egis3.value = egis3.getAttribute('data-text-value');
        }
    
        // Update the total price in the table
        const resultPrice = document.querySelector('#resultPrice');
        if (resultPrice) {
            resultPrice.textContent = total;
            hidden_totalResult.value = total;
        }
    }
    
    document.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.addEventListener('change', updatePrice);
    });

    document.querySelector('.js-increase').addEventListener('click', function() {
        const userInputElement = document.querySelector('input[data-target="point_users"]');
        let users = parseInt(userInputElement.value);
        users += 1;
        userInputElement.value = users;
        updatePrice(); // Recalculate when value is updated
    });

    document.querySelector('.js-decrease').addEventListener('click', function() {
        const userInputElement = document.querySelector('input[data-target="point_users"]');
        let users = parseInt(userInputElement.value);
        if (users > 1) {  // Prevent users from going below 1
            users -= 1;
            userInputElement.value = users;
            updatePrice(); // Recalculate when value is updated
        }
    });

    updatePrice(); 
});
