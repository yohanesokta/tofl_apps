

        const testHistoryBody = document.getElementById('testHistoryBody');
        let parsedData = JSON.parse(localStorage.getItem('history'));

        function renderTable() {
            testHistoryBody.innerHTML = '';
            parsedData.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td data-label="Tanggal Tes"><b>${item.name}</b><br>${item.date}</td>
                    <td data-label="Skor Listening" class="score-column"><span>${item.listening}</span></td>
                    <td data-label="Skor Structure" class="score-column"><span>${item.structure}</span></td>
                    <td data-label="Skor Reading" class="score-column"><span>${item.reading}</span></td>
                    <td data-label="Skor Total" class="score-column"><span>${item.score}</span></td>
                    <td data-label="Aksi" class="actions">
                        <button class="remove-btn" onclick="removeItem(${index})"><i class="fas fa-trash-alt"></i> Hapus</button>
                        <button class="print-btn" onclick="printItem(${index})"><i class="fas fa-print"></i> Cetak</button>
                    </td>
                `;
                testHistoryBody.appendChild(row);
            });
        }

        function removeItem(index) {
            if (confirm("Apakah Yakin Mau Menghapus?")) {
            parsedData.splice(index, 1);
            localStorage.setItem('history',JSON.stringify(parsedData))
            renderTable();
            }
        }

        

renderTable();

function printItem(index) {
    const itemToPrint = parsedData[index];
    localStorage.setItem('print_data',JSON.stringify(itemToPrint));
    window.open('./print.html','_blank');
}