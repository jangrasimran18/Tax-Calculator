$(document).ready(function() {
    $('#taxForm').submit(function(event) {
        event.preventDefault();
        calculateTax();
    });

    $('.error-icon').click(function() {
        $(this).tooltip('dispose');
    });

    $('.close').click(function() {
        $('#resultModal').hide();
    });
});

function calculateTax() {
    var grossIncome = parseFloat($('#grossIncome').val());
    var extraIncome = parseFloat($('#extraIncome').val());
    var ageGroup = $('#age').val();
    var deductions = parseFloat($('#deductions').val());

    if (isNaN(grossIncome) || isNaN(extraIncome) || isNaN(deductions)) {
        displayErrorIcon();
        return;
    }

    var totalIncome = grossIncome + extraIncome - deductions;
    var tax = 0;

    if (totalIncome > 800000) {
        if (ageGroup === '<40') {
            tax = 0.3 * (totalIncome - 800000);
        } else if (ageGroup === '≥ 40 &lt; 60') {
            tax = 0.4 * (totalIncome - 800000);
        } else if (ageGroup === '≥ 60') {
            tax = 0.1 * (totalIncome - 800000);
        }
    }

    displayResultModal(tax);
}

function displayErrorIcon() {
    $('.error-icon').show();
    $('.error-icon').tooltip({
        title: 'Please enter a valid number',
        placement: 'right'
    });
}

function displayResultModal(tax) {
    $('#taxResult').text('Tax Amount: ' + tax.toFixed(2) + ' Lakhs');
    $('#resultModal').show();
}
