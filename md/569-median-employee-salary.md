### Leetcode 569 (Hard): Median Employee Salary [Practice](https://leetcode.com/problems/median-employee-salary)

### Description  
Given a table **Employee** with columns: `Id` (int), `Company` (varchar), and `Salary` (int).  
For each company, find the median salary. In case the number of employees in a company is even, the median is the average of the two middle salaries (after sorting all salaries for the company). In the case of an odd number, it's simply the middle one.  
Return the **median salary for each company**.

### Examples  

**Example 1:**  
Input:  
```
Id | Company | Salary
----------------------
1  |   A     | 100
2  |   A     | 200
3  |   A     | 300
4  |   B     | 400
5  |   B     | 500
```
Output:  
```
Company | Median
-----------------
A       | 200
B       | 450
```
*Explanation:  
Company A salaries, sorted: [100, 200, 300] (odd count) → median is 200 (middle value).  
Company B salaries, sorted: [400, 500] (even count) → median is (400+500)/2 = 450.*

**Example 2:**  
Input:  
```
Id | Company | Salary
----------------------
1  |   X     | 10
2  |   X     | 15
3  |   Y     | 20
```
Output:  
```
Company | Median
-----------------
X       | 12.5
Y       | 20
```
*Explanation:  
Company X: [10, 15] → (10+15)/2 = 12.5.  
Company Y:  → only one salary.*

**Example 3:**  
Input:  
```
Id | Company | Salary
----------------------
1  |   Z     | 120
```
Output:  
```
Company | Median
-----------------
Z       | 120
```
*Explanation:  
Single employee in company Z, so the median is 120.*

### Thought Process (as if you’re the interviewee)  

1. **Brute-force approach:**
   - For each company, collect all salaries, sort, and pick the median.
   - This works, but is not efficient if there are many companies or employees.

2. **Optimized approach:**
   - Use a hashing structure (dictionary) to group all salaries for each company.
   - Sort each salary list.
   - If size is odd, pick the middle; if even, average the two central values.
   - Time bottleneck: sorting per company; overall is O(n log n) where n is total employees, since sorting dominates and grouping is O(n).

3. **Why this approach?**
   - It’s clear, correct, and doesn’t require external libraries.
   - Sorting for small groups (per-company) is reasonable in interviews.
   - No need for advanced data structures since sort+median is direct and readable.

### Corner cases to consider  
- Company with **one employee** (median is the only salary).
- Companies where **all salaries are the same**.
- **Even number of employees** affecting median calculation (need average).
- **Empty company** (should not appear in input; but good to handle).
- Extremely large salary values.
- Different companies with overlapping salaries.

### Solution

```python
def median_employee_salary(employee):
    """
    employee: List[List], each element is [id, company, salary]
    Returns: dict mapping company -> median salary (float if needed)
    """
    # Step 1: Group salaries by company
    company_salaries = {}
    for eid, company, salary in employee:
        if company not in company_salaries:
            company_salaries[company] = []
        company_salaries[company].append(salary)
    
    # Step 2: Compute median for each company
    result = {}
    for company, salaries in company_salaries.items():
        salaries.sort()
        n = len(salaries)
        mid = n // 2
        if n % 2 == 1:
            # Odd: take the middle element
            result[company] = salaries[mid]
        else:
            # Even: average the two middle elements
            median = (salaries[mid-1] + salaries[mid]) / 2
            result[company] = median
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Grouping salaries: O(n)  
  - Sorting salary list for each company: for all employees, total is O(n log n)
  - Final median selection: O(1) per company  
  - **Overall:** O(n log n) (sorting per group is the bottleneck)

- **Space Complexity:**  
  - O(n) to store grouped salaries plus output dictionary

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle **streaming data**, adding salaries on the fly and querying medians?
  *Hint: Consider two heaps (max-heap & min-heap) per company.*

- How would you return the **IDs of employees whose salaries are used as medians**, not just the median value?
  *Hint: Track salary positions and original IDs.*

- How would you improve if **salary values are too large to sort in memory**?
  *Hint: Use external sorting or approximate methods.*

### Summary
This problem uses **Sorting per group + median extraction**, a pattern common for grouped-statistic queries. It’s a foundational approach for “median by group” in both SQL and procedural programming. The solution is straightforward, leveraging hash maps and sorting, and is adaptable to problems like finding other percentiles by group, or for streaming median with heaps.


### Flashcard
Group salaries by company, sort each group, and select the median (middle value if odd, average of two if even).

### Tags
Database(#database)

### Similar Problems
- Find Median Given Frequency of Numbers(find-median-given-frequency-of-numbers) (Hard)