### Leetcode 615 (Hard): Average Salary: Departments VS Company [Practice](https://leetcode.com/problems/average-salary-departments-vs-company)

### Description  
Given a company's payroll and employee tables, for each month and department, you need to compare that department's average salary to the company's overall average salary for the same month. For each (pay_month, department_id) group, return whether the department's average salary was "higher," "lower," or "same" compared to the whole company's average salary.

### Examples  

**Example 1:**  
Input:  
`employee = [[1,1],[2,2],[3,2]]`  
`salary = [[1,1,9000,"2017-03-31"], [2,2,6000,"2017-03-31"], [3,3,10000,"2017-03-31"]]`  
Output:  
`[["2017-03",1,"higher"], ["2017-03",2,"lower"]]`  
*Explanation: Company avg = (9000+6000+10000)/3 = 8333.33. Dept 1 avg = 9000 (higher), Dept 2 avg = (6000+10000)/2 = 8000 (lower).*

**Example 2:**  
Input:  
`employee = [[1,1],[2,2],[3,2]]`  
`salary = [[1,1,7000,"2017-02-28"], [2,2,6000,"2017-02-28"], [3,3,8000,"2017-02-28"]]`  
Output:  
`[["2017-02",1,"same"], ["2017-02",2,"same"]]`  
*Explanation: Company avg = (7000+6000+8000)/3 = 7000. Dept 1 avg = 7000 (same), Dept 2 avg = (6000+8000)/2 = 7000 (same).*

**Example 3:**  
Input:  
`employee = [[1,1],[2,1],[3,2],[4,2]]`  
`salary = [[1,1,10000,"2020-01-31"], [2,2,20000,"2020-01-31"], [3,3,15000,"2020-01-31"], [4,4,25000,"2020-01-31"]]`  
Output:  
`[["2020-01",1,"lower"], ["2020-01",2,"higher"]]`  
*Explanation: Company avg = (10000+20000+15000+25000)/4 = 17500. Dept 1 avg = (10000+20000)/2 = 15000 (lower), Dept 2 avg = (15000+25000)/2 = 20000 (higher).*

### Thought Process (as if you’re the interviewee)  
First, we need to group salary records by month and by department, requiring us to join the salary and employee tables. For each month, we:
- Compute the company's average salary.
- Compute the average salary per department.
- Compare these two numbers for each department.

A brute-force approach would be:
- For each (month, department), find all salaries, compute that department's average.
- For each month, compute the company's average.
- Compare each department's average for that month.

However, this is inefficient because it repeats computations per department. For an optimized solution, aggregate salaries in two steps:
- Precompute monthly company averages.
- Precompute department averages per month.
Then join/combine these aggregates to compare averages. This separation reduces redundant computation.

### Corner cases to consider  
- Only one employee in a month or department.
- Salaries for a month but not for some departments.
- All salaries equal.
- Multiple months.
- Departments with zero employees (should be filtered out, as there are no salaries).

### Solution

```python
def average_salary_departments_vs_company(employee, salary):
    # Step 1: Build lookups for employee's department
    emp_to_dept = {}
    for emp_id, dept_id in employee:
        emp_to_dept[emp_id] = dept_id
    
    # Step 2: Group salaries by (month, department) and by (month) for company
    from collections import defaultdict
    dept_month_salaries = defaultdict(list)
    month_salaries = defaultdict(list)
    
    for _, emp_id, amount, pay_date in salary:
        # Extract pay_month (yyyy-mm)
        pay_month = pay_date[:7]
        dept_id = emp_to_dept[emp_id]
        dept_month_salaries[(pay_month, dept_id)].append(amount)
        month_salaries[pay_month].append(amount)
    
    # Step 3: Compute average salaries
    # Company average per month
    company_avg = {}
    for pay_month, amts in month_salaries.items():
        company_avg[pay_month] = sum(amts) / len(amts)
    
    # Department average per (month, department)
    dept_avg = {}
    for (pay_month, dept_id), amts in dept_month_salaries.items():
        dept_avg[(pay_month, dept_id)] = sum(amts) / len(amts)
    
    # Step 4: Build result
    result = []
    for (pay_month, dept_id), dept_mean in dept_avg.items():
        comp_mean = company_avg[pay_month]
        if abs(dept_mean - comp_mean) < 1e-7:  # handle floating point equality
            comp = "same"
        elif dept_mean > comp_mean:
            comp = "higher"
        else:
            comp = "lower"
        result.append([pay_month, dept_id, comp])
    
    # Optional: sort by pay_month then department_id for consistent output
    result.sort()
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of salary records. Each step (grouping, averaging, result construction) iterates over the data a constant number of times.
- **Space Complexity:** O(N) for storing groupings by (month, department) and by month.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large datasets that do not fit in memory?  
  *Hint: Can you process monthly partitions independently, or stream data?*
- How would you handle missing employee-department associations?  
  *Hint: What if a salary references an employee not in the employee table?*
- Could you add support for other aggregate statistics (e.g., median)?  
  *Hint: Think about how median differs from average and how to aggregate.*

### Summary
This problem demonstrates the classic aggregation and grouping coding pattern, where data is first joined, then partitioned by one or more keys (month and department), and aggregate statistics (mean) are computed. The approach is common for analytics and reporting scenarios, and is widely applicable in SQL, MapReduce, and data pipelines. This is a good example of working with grouped data, multiple aggregation levels, and comparison logic.


### Flashcard
For each month, compare department average salary to company average; use group by and join to compute and filter results.

### Tags
Database(#database)

### Similar Problems
- Countries You Can Safely Invest In(countries-you-can-safely-invest-in) (Medium)