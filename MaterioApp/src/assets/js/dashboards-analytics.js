/**
 * Dashboard Analytics
 */

'use strict';

(function () {
  let cardColor, labelColor, borderColor, chartBgColor, bodyColor;

  cardColor = config.colors.cardColor;
  labelColor = config.colors.textMuted;
  borderColor = config.colors.borderColor;
  chartBgColor = config.colors.chartBgColor;
  bodyColor = config.colors.bodyColor;

    // Weekly Overview Line Chart (Chart.js)
    const weeklyOverviewChartEl = document.getElementById('weeklyOverviewLineChart');
    if (weeklyOverviewChartEl) {
      // Get dynamic data from template
      const labels = JSON.parse(document.getElementById('student-chart-labels').textContent);
      const data = JSON.parse(document.getElementById('student-chart-data').textContent);
      new Chart(weeklyOverviewChartEl, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Students',
            data: data,
            borderColor: '#8e44ad',
            backgroundColor: 'rgba(142,68,173,0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: '#8e44ad',
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: true }
          },
          scales: {
            x: {
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }


  // Total Organizations Bar chart
  // --------------------------------------------------------------------
  const orgsLabels = JSON.parse(document.getElementById('orgs-labels').textContent);
  const orgsCounts = JSON.parse(document.getElementById('orgs-counts').textContent);
  // Example color palette (add more colors if you have more orgs)
  const orgsColors = [
    'rgba(116, 207, 55, 0.7)',
    'rgba(11, 168, 121, 0.7)',
    'rgba(255, 206, 86, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(153, 102, 255, 0.7)',
    'rgba(255, 159, 64, 0.7)'
  ];
  // Repeat colors if there are more orgs than colors
  const barColors = orgsLabels.map((_, i) => orgsColors[i % orgsColors.length]);
  const ctx = document.getElementById('totalOrganizationsBarChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: orgsLabels,
      datasets: [{
        // label: 'Organizations',
        data: orgsCounts,
        backgroundColor: barColors,
        borderColor: barColors.map(color => color.replace('0.7', '1')),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false }},
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  // Total Programs Pie chart
  // --------------------------------------------------------------------
  const programsLabels = JSON.parse(document.getElementById('programs-labels').textContent);
  const programsCounts = JSON.parse(document.getElementById('programs-counts').textContent);
  const programsColors = [
    'rgba(255, 99, 132, 0.7)',
    'rgba(54, 162, 235, 0.7)',
    'rgba(255, 206, 86, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(153, 102, 255, 0.7)',
    'rgba(255, 159, 64, 0.7)'
  ];
  const pieColors = programsLabels.map((_, i) => programsColors[i % programsColors.length]);
  const pieCtx = document.getElementById('totalProgramsPieChart').getContext('2d');
  new Chart(pieCtx, {
    type: 'pie',
    data: {
      labels: programsLabels,
      datasets: [{
        data: programsCounts,
        backgroundColor: pieColors,
        borderColor: pieColors.map(color => color.replace('0.7', '1')),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });
})();
