SELECT d.dnumber,hf.mng as "Manager ssn", hf.num as "Number of dependents" from DEPARTMENT d
JOIN
(SELECT dp.essn as mng, count(*) as num FROM DEPENDENT dp 
    join DEPARTMENT dept on dept.mgr_ssn=dp.essn where dp.essn in 
    (SELECT d.mgr_ssn from DEPARTMENT d join DEPT_LOCATIONS dl on d.dnumber=dl.dnumber 
        group by dl.dnumber having count(*)>1)
     group by dp.essn)
 as hf on hf.mng=d.Mgr_ssn;