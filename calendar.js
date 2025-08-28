/**
 * Opens a new `about:blank` window and displays the calendar.
 */
function openCalendar() {
  // Open a new `about:blank` window
  const calendarWindow = window.open('', '_blank', 'width=500,height=400');

  // If the new window is successfully created
  if (calendarWindow) {
    const calendarHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Calendar</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            height: 100%;
            background-color: #f7f7f7;
          }
          .calendar-popup {
            background: #fff;
            border: 1px solid #ccc;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            padding: 20px;
            font-size: 14px;
            width: 300px;
          }
          .calendar-popup table {
            border-collapse: collapse;
            width: 100%;
          }
          .calendar-popup th,
          .calendar-popup td {
            text-align: center;
            padding: 5px;
            width: 40px;
            height: 40px;
            border: 1px solid #ddd;
          }
          .calendar-popup td {
            cursor: pointer;
          }
          .calendar-popup td:hover {
            background-color: #f0f8ff;
          }
          .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }
          .header select,
          .header button {
            font-size: 14px;
            padding: 5px;
          }
        </style>
      </head>
      <body>
        <div class="calendar-popup">
          <div class="header">
            <button onclick="changeMonth(-1)">&#60;&#60;</button>
            <select id="monthSelect" onchange="updateCalendar()"></select>
            <select id="yearSelect" onchange="updateCalendar()"></select>
            <button onclick="changeMonth(1)">&#62;&#62;</button>
          </div>
          <table id="calendarTable">
            <thead>
              <tr>
                <th>Su</th>
                <th>Mo</th>
                <th>Tu</th>
                <th>We</th>
                <th>Th</th>
                <th>Fr</th>
                <th>Sa</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
        <script>
          let selectedMonth = new Date().getMonth();
          let selectedYear = new Date().getFullYear();

          const fillDropdowns = () => {
            const monthSelect = document.getElementById('monthSelect');
            const yearSelect = document.getElementById('yearSelect');
            const months = [
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December'
            ];

            months.forEach((month, index) => {
              const option = new Option(month, index);
              monthSelect.add(option);
            });
            monthSelect.value = selectedMonth;

            for (let year = 1900; year <= 2100; year++) {
              const option = new Option(year, year);
              yearSelect.add(option);
            }
            yearSelect.value = selectedYear;
          };

          const generateCalendar = (month, year) => {
            const tbody = document.querySelector('#calendarTable tbody');
            tbody.innerHTML = '';
            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            let row = document.createElement('tr');
            for (let i = 0; i < firstDay; i++) {
              row.appendChild(document.createElement('td'));
            }

            for (let day = 1; day <= daysInMonth; day++) {
              const cell = document.createElement('td');
              cell.textContent = day;
              cell.onclick = () => {
                alert(\`Selected Date: \${day}-\${month + 1}-\${year}\`);
              };
              row.appendChild(cell);
              if ((firstDay + day) % 7 === 0) {
                tbody.appendChild(row);
                row = document.createElement('tr');
              }
            }
            if (row.children.length > 0) {
              tbody.appendChild(row);
            }
          };

          const updateCalendar = () => {
            const month = parseInt(document.getElementById('monthSelect').value, 10);
            const year = parseInt(document.getElementById('yearSelect').value, 10);
            selectedMonth = month;
            selectedYear = year;
            generateCalendar(month, year);
          };

          const changeMonth = (delta) => {
            selectedMonth += delta;
            if (selectedMonth < 0) {
              selectedMonth = 11;
              selectedYear--;
            } else if (selectedMonth > 11) {
              selectedMonth = 0;
              selectedYear++;
            }
            document.getElementById('monthSelect').value = selectedMonth;
            document.getElementById('yearSelect').value = selectedYear;
            updateCalendar();
          };

          fillDropdowns();
          generateCalendar(selectedMonth, selectedYear);
        </script>
      </body>
      </html>
    `;

    // Write the calendar content into the new window
    calendarWindow.document.open();
    calendarWindow.document.write(calendarHTML);
    calendarWindow.document.close();
  } else {
    alert("Failed to create a new window. Please check your browser popup blocker.");
  }
}