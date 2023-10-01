const wheel = document.getElementyID("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

//Object that stores values of minimum and maximum angle for a value
const rotation = [
    {minDegree:0, maxDegree: 30, value: 2}, 
    {minDegree:31, maxDegree: 90, value: 1}, 
    {minDegree:91, maxDegree: 150, value: 6}, 
    {minDegree:151, maxDegree: 210, value: 5}, 
    {minDegree:211, maxDegree: 270, value: 4}, 
    {minDegree:271, maxDegree: 330, value: 3}, 
    {minDegree:331, maxDegree: 360, value: 2}
];

//Size of each piece
const data = [16, 16, 16, 16, 16, 16];

//Background Colour for each piece
var pieColors = [
    "#8b35bc",
    "#b163da",
    "#8b35bc",
    "#b163da",
    "#8b35bc",
    "#b163da",
];

//Create Chart
let chart = new Chart(wheel, {
    //Plugin for displaying text on pie chart
    plugins: [ChartDataLabels],
    //Chart Type Pie
    type: "pie",
    data : {
        //Labels( values which are to be displayed on chart)
        labels: [1, 2, 3, 4, 5, 6],
        //Settings for dataset/pie
        datasets: [
            {
                backgroundColor: pieColors,
                data: data,
            },
        ],
    },
    options: {
        //Responsive Chart
        responsive: true,
        animation: { duration: 0},
        plugins: {
            //Hide tooltip and legend
            tooltip: false,
            legend: {
                display: false,
            },
            //Display labels inside pie chart
            datalabels: {
                color: "#ffffff",
                formatter: (_, context) => context.chart.data.labels[cont4ext.dataIndex],
                font: { size: 24},
            },
        },
    },
});

//Display value based on the randomAngle
const valueGenerator = (angleValue) => {
    for (let i of rotation) {
        //If angleValue is between min and max then display it
        if(angleValue >= i.minDegree && angleValue <= i.maxDegree) {
            finalValue.innerHTML = '<p>Value: ${i.value}</p>';
            spinBtn.disabled = false;
            break;
        }
    }
};

//Spinner Count
let count = 0;
//100 rotations for animation and last rotation for result
let result = 101;

//Start Spinning
spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    //Empty final value
    finalValue.innerHTML = '<p>Good Luck!</p>';
    //Generate random degrees to stop at
    let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
    //Interval for rotation animation
    let rotationInterval = window.setInterval(() => {
        //Set rotation for piechart
        /*Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees
        at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time. */
        chart.options.rotation = chart.options.rotation + result;
        //Update chart with new value;
        myChart.update();
        //If rotation > 360 reset back to 0
        if(chart.options.rotation >= 360) {
            count += 1;
            result -= 5;
            chart.options.rotation = 0;
        } else if (count > 15 && chart.options.rotation == randomDegree) {
            valueGenerator(randomDegree);
            clearInterval(rotationInterval);
            count = 0;
            result = 101;
        }
    }, 10);
});