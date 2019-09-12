queue()
    .defer(d3.csv, "data/Salaries.csv")
    .await(makeGraphs);

function makeGraphs(error, salaryData) {
    var ndx = crossfilter(salaryData);

    show_gender_balance(ndx);

    dc.renderAll();
}

function show_gender_balance(ndx) {
    var dim = ndx.dimension(dc.pluck('sex'));
    var group = dim.group();

    var gfx = screen.width*0.5;
    var gfy = 300;

    dc.barChart("#gender-balance")
        .width(400)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Gender")
        .yAxis().ticks(20);


/*   FLEXIBLE GENDER VERSION 1   */
    dc.barChart("#gender-flexible")
        /*
        .width(400)
        .height(300)
        */
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Gender")
        .yAxis().ticks(20);


        dc.barChart("#gender-flexible2")
        .width(gfx)
        .height(gfy)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Gender")
        .yAxis().ticks(20);
}

/* Used in flexible gender 1*/
window.onresize = function(event) {

    dc.renderAll()

};