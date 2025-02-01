interface CustomerData {
    Gender: number;
    Age: number;
    Married: number;
    State: number;
    Number_of_Referrals: number;
    Tenure_in_Months: number;
    Value_Deal: number;
    Phone_Service: number;
    Multiple_Lines: number;
    Internet_Service: number;
    Internet_Type: number;
    Online_Security: number;
    Online_Backup: number;
    Device_Protection_Plan: number;
    Premium_Support: number;
    Streaming_TV: number;
    Streaming_Movies: number;
    Streaming_Music: number;
    Contract: number;
    Paperless_Billing: number;
    Payment_Method: number;
    Monthly_Charge: number;
    Total_Charges: number;
    Total_Refunds: number;
    Total_Extra_Data_Charges: number;
    Total_Long_Distance_Charges: number;
    Total_Revenue: number;
    prediction: number;
  }
  
  const dataset: CustomerData[] = [
    { Gender: 1, Age: 35, Married: 0, State: 4, Number_of_Referrals: 7, Tenure_in_Months: 27, Value_Deal: 5, Phone_Service: 1, Multiple_Lines: 0, Internet_Service: 1, Internet_Type: 0, Online_Security: 0, Online_Backup: 1, Device_Protection_Plan: 0, Premium_Support: 1, Streaming_TV: 1, Streaming_Movies: 0, Streaming_Music: 0, Contract: 1, Paperless_Billing: 1, Payment_Method: 1, Monthly_Charge: 65.6, Total_Charges: 593.3, Total_Refunds: 0, Total_Extra_Data_Charges: 0, Total_Long_Distance_Charges: 381.51, Total_Revenue: 974.81, prediction: 0 },
    { Gender: 0, Age: 45, Married: 1, State: 12, Number_of_Referrals: 14, Tenure_in_Months: 13, Value_Deal: 5, Phone_Service: 1, Multiple_Lines: 1, Internet_Service: 1, Internet_Type: 0, Online_Security: 0, Online_Backup: 0, Device_Protection_Plan: 0, Premium_Support: 0, Streaming_TV: 0, Streaming_Movies: 1, Streaming_Music: 1, Contract: 0, Paperless_Billing: 0, Payment_Method: 1, Monthly_Charge: -4, Total_Charges: 542.4, Total_Refunds: 38.33, Total_Extra_Data_Charges: 10, Total_Long_Distance_Charges: 96.21, Total_Revenue: 610.28, prediction: 0 },
    { Gender: 1, Age: 51, Married: 0, State: 21, Number_of_Referrals: 4, Tenure_in_Months: 35, Value_Deal: 4, Phone_Service: 1, Multiple_Lines: 0, Internet_Service: 1, Internet_Type: 2, Online_Security: 0, Online_Backup: 0, Device_Protection_Plan: 1, Premium_Support: 0, Streaming_TV: 0, Streaming_Movies: 0, Streaming_Music: 0, Contract: 0, Paperless_Billing: 1, Payment_Method: 0, Monthly_Charge: 73.9, Total_Charges: 280.85, Total_Refunds: 0, Total_Extra_Data_Charges: 0, Total_Long_Distance_Charges: 134.6, Total_Revenue: 415.45, prediction: 1 },
    { Gender: 1, Age: 79, Married: 0, State: 9, Number_of_Referrals: 3, Tenure_in_Months: 21, Value_Deal: 3, Phone_Service: 1, Multiple_Lines: 0, Internet_Service: 1, Internet_Type: 2, Online_Security: 0, Online_Backup: 1, Device_Protection_Plan: 1, Premium_Support: 0, Streaming_TV: 1, Streaming_Movies: 1, Streaming_Music: 0, Contract: 0, Paperless_Billing: 1, Payment_Method: 0, Monthly_Charge: 98, Total_Charges: 1237.85, Total_Refunds: 0, Total_Extra_Data_Charges: 0, Total_Long_Distance_Charges: 361.66, Total_Revenue: 1599.51, prediction: 1 },
    { Gender: 0, Age: 80, Married: 0, State: 17, Number_of_Referrals: 3, Tenure_in_Months: 8, Value_Deal: 5, Phone_Service: 1, Multiple_Lines: 0, Internet_Service: 1, Internet_Type: 2, Online_Security: 0, Online_Backup: 0, Device_Protection_Plan: 0, Premium_Support: 1, Streaming_TV: 1, Streaming_Movies: 0, Streaming_Music: 0, Contract: 0, Paperless_Billing: 1, Payment_Method: 1, Monthly_Charge: 83.9, Total_Charges: 267.4, Total_Refunds: 0, Total_Extra_Data_Charges: 0, Total_Long_Distance_Charges: 22.14, Total_Revenue: 289.54, prediction: 1 },
    { Gender: 1, Age: 24, Married: 0, State: 18, Number_of_Referrals: 9, Tenure_in_Months: 2, Value_Deal: 4, Phone_Service: 1, Multiple_Lines: 0, Internet_Service: 1, Internet_Type: 0, Online_Security: 0, Online_Backup: 0, Device_Protection_Plan: 0, Premium_Support: 1, Streaming_TV: 1, Streaming_Movies: 1, Streaming_Music: 1, Contract: 0, Paperless_Billing: 1, Payment_Method: 1, Monthly_Charge: 69.4, Total_Charges: 571.45, Total_Refunds: 0, Total_Extra_Data_Charges: 0, Total_Long_Distance_Charges: 150.93, Total_Revenue: 722.38, prediction: 0 },
    { Gender: 0, Age: 66, Married: 1, State: 12, Number_of_Referrals: 9, Tenure_in_Months: 23, Value_Deal: 0, Phone_Service: 1, Multiple_Lines: 0, Internet_Service: 1, Internet_Type: 2, Online_Security: 1, Online_Backup: 1, Device_Protection_Plan: 1, Premium_Support: 1, Streaming_TV: 1, Streaming_Movies: 1, Streaming_Music: 1, Contract: 2, Paperless_Billing: 1, Payment_Method: 0, Monthly_Charge: 109.7, Total_Charges: 7904.25, Total_Refunds: 0, Total_Extra_Data_Charges: 0, Total_Long_Distance_Charges: 707.16, Total_Revenue: 8611.41, prediction: 0 },
    { Gender: 0, Age: 66, Married: 1, State: 12, Number_of_Referrals: 9, Tenure_in_Months: 23, Value_Deal: 0, Phone_Service: 1, Multiple_Lines: 0, Internet_Service: 1, Internet_Type: 2, Online_Security: 1, Online_Backup: 1, Device_Protection_Plan: 1, Premium_Support: 1, Streaming_TV: 1, Streaming_Movies: 1, Streaming_Music: 1, Contract: 2, Paperless_Billing: 1, Payment_Method: 0, Monthly_Charge: 109.7, Total_Charges: 7904.25, Total_Refunds: 0, Total_Extra_Data_Charges: 0, Total_Long_Distance_Charges: 707.16, Total_Revenue: 8611.41, prediction: 0 },
  ];
  
  const countPredictions = dataset.filter(item => item.prediction === 1).length;
  const negcountPredictions = dataset.filter(item => item.prediction === 0).length;
  const female = dataset.filter(item => item.Gender === 0).length;
  const male = dataset.filter(item => item.Gender === 1).length;
  
  const result = {
    total_predictions_with_1: countPredictions,
    total_prediction_with_0: negcountPredictions,
    gender_1: male,
    gender_0: female
  };
  
  console.log(result);

export default result;