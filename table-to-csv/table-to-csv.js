const $tableRows = document.querySelectorAll(".anime-table__row");
const $convertBtn = document.querySelector('[data-js="convert-btn"]');

const getCellsText = ({ textContent }) => textContent;

const getStringSeparatedWithComma = ({ cells }) => Array.from(cells)
    .map(getCellsText)
    .join(",");

const getCSVString = () => Array.from($tableRows)
    .map(getStringSeparatedWithComma)
    .join("\n");

const setCSVDownload = csvString => {
    const CSVURI = 
        `data:text/csvcharset=utf-8,${encodeURIComponent(csvString)}`;
    
    $convertBtn.setAttribute('href', CSVURI);
    $convertBtn.setAttribute("download", "table.csv");
}

const exportTable = () => {
    const csvString = getCSVString();
    setCSVDownload(csvString);
}

$convertBtn.addEventListener("click", exportTable);