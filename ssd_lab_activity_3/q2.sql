SELECT concat(e.fname," ",e.minit," ",e.lname) as "Full name",e.ssn,e.dno,num 
from EMPLOYEE e join (SELECT e.super_ssn as sup,count(*) as num from EMPLOYEE e 
where e.super_ssn is not NULL group by e.super_ssn) as t on t.sup=e.ssn ORDER BY num;