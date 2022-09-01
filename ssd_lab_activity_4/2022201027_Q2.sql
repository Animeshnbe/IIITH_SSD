CREATE PROCEDURE `custnames`(IN city_name varchar(45))
BEGIN
	SELECT CUST_NAME from customer where WORKING_AREA=city_name;
END