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

  // Sessions Column Chart
  // --------------------------------------------------------------------
  const sessionsColumnChartEl = document.querySelector('#sessionsColumnChart'),
    sessionsColumnChartConfig = {
      chart: {
        height: 90,
        parentHeightOffset: 0,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        bar: {
          barHeight: '100%',
          columnWidth: '20px',
          startingShape: 'rounded',
          endingShape: 'rounded',
          borderRadius: 4,
          colors: {
            ranges: [
              {
                from: 25,
                to: 32,
                color: config.colors.danger
              },
              {
                from: 60,
                to: 75,
                color: config.colors.primary
              },
              {
                from: 45,
                to: 50,
                color: config.colors.danger
              },
              {
                from: 35,
                to: 42,
                color: config.colors.primary
              }
            ],
            backgroundBarColors: [chartBgColor, chartBgColor, chartBgColor, chartBgColor, chartBgColor],
            backgroundBarRadius: 4
          }
        }
      },
      grid: {
        show: false,
        padding: {
          top: -10,
          left: -10,
          bottom: -15
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        labels: {
          show: false
        },
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      series: [
        {
          data: [30, 70, 50, 40, 60]
        }
      ],
      responsive: [
        {
          breakpoint: 1350,
          options: {
            chart: {
              height: 80
            },
            plotOptions: {
              bar: {
                columnWidth: '40%'
              }
            }
          }
        },
        {
          breakpoint: 1200,
          options: {
            chart: {
              height: 100
            },
            plotOptions: {
              bar: {
                columnWidth: '20%'
              }
            }
          }
        },
        {
          breakpoint: 768,
          options: {
            chart: {
              height: 110
            },
            plotOptions: {
              bar: {
                columnWidth: '10%'
              }
            }
          }
        },
        {
          breakpoint: 480,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '20%'
              }
            }
          }
        }
      ]
    };
  if (typeof sessionsColumnChartEl !== undefined && sessionsColumnChartEl !== null) {
    const sessionsColumnChart = new ApexCharts(sessionsColumnChartEl, sessionsColumnChartConfig);
    sessionsColumnChart.render();
  }
})();
