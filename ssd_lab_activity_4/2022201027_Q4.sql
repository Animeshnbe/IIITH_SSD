CREATE DEFINER=`animesh`@`localhost` PROCEDURE `spl_agent`()
BEGIN
	DECLARE done INT DEFAULT 0;
	DECLARE l1 VARCHAR(50);
    DECLARE l2 VARCHAR(50);
    DECLARE l3 VARCHAR(50);
    DECLARE l4 VARCHAR(50);
	DECLARE c1 CURSOR FOR SELECT CUST_NAME, CUST_CITY, CUST_COUNTRY, GRADE
		from customer WHERE AGENT_CODE LIKE "A00%";
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done=1;
    OPEN c1;
    CREATE TABLE Tem(
		cname VARCHAR(50),
		city VARCHAR(50),
		country VARCHAR(50),
		grd VARCHAR(50));
    lbl: LOOP 
		fetch c1 into l1, l2, l3, l4;
        IF done=1 THEN LEAVE lbl;
        END IF;
        INSERT INTO Tem (cname,city,country,grd) VALUES (l1,l2,l3,l4);
	END LOOP lbl;
    SELECT * from Tem;
    DROP TABLE IF EXISTS Tem;
	CLOSE c1;
END