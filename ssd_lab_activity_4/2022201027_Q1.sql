CREATE DEFINER=`animesh`@`localhost` PROCEDURE `Addnum`(IN num1 int, IN num2 int, OUT res INT)
BEGIN
	SET res=num1+num2;
END