Template.graph.onRendered(function () {
      var issues = Issues.find().fetch();
      if (issues) {
        var dates = [];
        var toDo = [];
        var inProgress = [];
        var codeReview = [];

        //set variable arrays to hold all counts for each category
        for (i = 0; i < issues.length; i++) {
          dates.push(issues[i].date);
          toDo.push(issues[i].countToDo);
          inProgress.push(issues[i].countInProgress);
          codeReview.push(issues[i].countCodeReview);
        }

        var chart = new Highcharts.Chart({
          chart: {renderTo: 'issuesGraph', type: 'line', marginRight: 0},
          title: {
            text: ''
          },
          xAxis: {
            categories: dates
          },
          yAxis: {
            title: {
              text: 'Number of Issues'
            },
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }]
          },
          tooltip: {
            valueSuffix: ''
          },
          legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
          },
          series: [{
            name: 'To Do',
            data: toDo
          }, {
            name: 'In Progress',
            data: inProgress
          }, {
            name: 'Code Review',
            data: codeReview
          }]
        });
      }

      else {
        console.log(("no issues to date"))
      }
    }
);