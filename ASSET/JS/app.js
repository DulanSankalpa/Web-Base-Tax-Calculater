
function showSection(id) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}


function clearAll() {
    document.querySelectorAll('input').forEach(i => i.value = '');
    document.querySelectorAll('p').forEach(p => p.textContent = '');
}


function calculateWithholding() {
    const type = document.getElementById('wt-type').value;
    const amount = parseFloat(document.getElementById('wt-amount').value);
    if (isNaN(amount) || amount <= 0) {
        document.getElementById('wt-result').textContent = 'Please enter a valid positive number';
        return;
    }

    let tax = 0;
    if (type === 'rent' && amount > 100000) tax = amount * 0.10;
    else if (type === 'interest') tax = amount * 0.05;
    else if (type === 'dividend' && amount > 100000) tax = amount * 0.14;

    document.getElementById('wt-result').textContent = `Tax: Rs. ${tax.toFixed(2)}`;
}


function calculatePayable() {
    const salary = parseFloat(document.getElementById('salary').value);
    if (isNaN(salary) || salary <= 0) {
        document.getElementById('payable-result').textContent = 'Please enter a valid positive number';
        return;
    }

    const slabs = [
        { min: 0, max: 100000, rate: 0 },
        { min: 100001, max: 141667, rate: 6 },
        { min: 141668, max: 183333, rate: 12 },
        { min: 183334, max: 225000, rate: 18 },
        { min: 225001, max: 266667, rate: 24 },
        { min: 266668, max: 308333, rate: 30 },
        { min: 308334, max: Infinity, rate: 36 }
    ];

    let tax = 0;
    let remaining = salary;

    slabs.forEach(sl => {
        if (remaining <= 0) return;
        const taxable = Math.min(sl.max - sl.min + 1, remaining);
        tax += taxable * sl.rate / 100;
        remaining -= taxable;
    });

    document.getElementById('payable-result').textContent =
        `Tax: Rs. ${tax.toFixed(2)}, Net Salary: Rs. ${(salary - tax).toFixed(2)}`;
}

function calculateIncomeTax() {
    const income = parseFloat(document.getElementById('annual-income').value);
    if (isNaN(income) || income <= 0) {
        document.getElementById('income-result').textContent = 'Please enter a valid positive number';
        return;
    }

    const slabs = [
        { min: 0, max: 1200000, rate: 0 },
        { min: 1200001, max: 1700000, rate: 6 },
        { min: 1700001, max: 2200000, rate: 12 },
        { min: 2200001, max: 2700000, rate: 18 },
        { min: 2700001, max: 3200000, rate: 24 },
        { min: 3200001, max: 3700000, rate: 30 },
        { min: 3700001, max: Infinity, rate: 36 }
    ];

    let tax = 0;
    let remaining = income;

    slabs.forEach(sl => {
        if (remaining <= 0) return;
        const taxable = Math.min(sl.max - sl.min + 1, remaining);
        tax += taxable * sl.rate / 100;
        remaining -= taxable;
    });

    document.getElementById('income-result').textContent =
        `Tax: Rs. ${tax.toFixed(2)}, Net Income: Rs. ${(income - tax).toFixed(2)}`;
}


function calculateSSCL() {
    const value = parseFloat(document.getElementById('sscl-value').value);
    if (isNaN(value) || value <= 0) {
        document.getElementById('sscl-result').textContent = 'Please enter a valid positive number';
        return;
    }

    const saleTax = value * 0.025;
    const afterSale = value + saleTax;
    const vat = afterSale * 0.15;
    const sscl = saleTax + vat;

    document.getElementById('sscl-result').textContent =
        `Sale Tax: Rs.${saleTax.toFixed(2)}, After Sale: Rs.${afterSale.toFixed(2)}, VAT: Rs.${vat.toFixed(2)}, SSCL Total: Rs.${sscl.toFixed(2)}`;
}
