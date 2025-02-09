//TO make sure that the othercost table is still fully functional after the RDS redeployment:
//Test case for DB populator:
// {
//     "table": "otherCost",
//     "body": [
//       {
//         "Email": "ajwitt2@asu.edu",
//         "CostDate": "2024-11-24",
//         "CostName": "Labor Cost",
//         "CostCategory": "variable",
//         "Cost": 410
//       }
//     ]
//   }

//Testcase for updateTables
// {
//     "table": "otherCost",
//     "body": "{\"NewCostDate\":\"2024-11-03T00:00:00.000Z\",\"NewCostName\":\"Labor Cost\",\"NewCostCategory\":\"variable\",\"NewCost\":451,\"Email\":\"ajwitt2@asu.edu\",\"CostDate\":\"2024-11-24T00:00:00.000Z\",\"CostName\":\"Labor Cost\"}"
//   }

//Testcase for deleteRow
// {
//     "table": "otherCost",
//     "body": "{\"Email\":\"ajwitt2@asu.edu\",\"CostDate\":\"2024-11-03T00:00:00.000Z\",\"CostName\":\"Labor Cost\"}"
//   }

//Results:
//There does not seem to be a problem with otherCosts and its functionality after the redeployment of the RDS.
