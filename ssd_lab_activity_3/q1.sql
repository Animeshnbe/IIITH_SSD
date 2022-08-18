USE COMPANY;
SELECT concat(e.fname," ",e.minit," ",e.lname) as 'full name',ssn,dno,d.dname FROM EMPLOYEE e join 
DEPARTMENT d on e.dno=d.dnumber where ssn in (SELECT mgr_ssn from DEPARTMENT where dnumber in
(SELECT dno from (SELECT e.dno,sum(wo.hours) as hrs FROM EMPLOYEE e join WORKS_ON wo on e.ssn=wo.essn group by e.ssn) t group by t.dno having min(hrs)<40));
