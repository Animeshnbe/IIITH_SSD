CREATE PROCEDURE `high_customers`()
BEGIN
	SELECT CUST_NAME,GRADE from customer WHERE OPENING_AMT+RECEIVE_AMT>10000;
END