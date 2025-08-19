### Leetcode 176 (Medium): Second Highest Salary [Practice](https://leetcode.com/problems/second-highest-salary)

### Description  
Given a table of employees, each with a unique `id` and an integer `salary`, you need to find the **second highest distinct salary** among all employees. If there is no second highest (i.e., only one unique salary in the table), return null. In simple terms: find the "runner-up" salary, distinct from the highest.

### Examples  

**Example 1:**  
Input:  
Employee Table:  
```
+----+--------+
| Id | Salary |
+----+--------+
| 1  |  300   |
| 2  |  200   |
| 3  |  100   |
+----+--------+
```
Output: `200`  
*Explanation: Highest salary is 300. Next highest (second distinct) is 200.*

**Example 2:**  
Input:  
Employee Table:  
```
+----+--------+
| Id | Salary |
+----+--------+
| 1  |  100   |
+----+--------+
```
Output: `null`  
*Explanation: Only one salary; no second highest exists.*

**Example 3:**  
Input:  
Employee Table:  
```
+----+--------+
| Id | Salary |
+----+--------+
| 1  | 400    |
| 2  | 400    |
| 3  | 300    |
+----+--------+
```
Output: `300`  
*Explanation: Highest salary is 400 (appears twice). Next highest (second distinct) is 300.*

### Thought Process (as if you’re the interviewee)  
At first, my brute-force idea is to:
- Collect all unique (distinct) salary values from the table.
- Sort them in descending order.
- Pick the second highest if it exists, else return null.

However, relaying this in SQL or any language (even for Python, if asked):
- Use a `SET` to ensure uniqueness.
- After sorting, check the length:
    - If less than 2, output null.
    - Otherwise, pick the value at index 1.

I choose this approach because:
- It is clear and covers all edge cases, such as duplicates and only one salary.
- No O(n²) traversal or nested loops needed.
- It’s efficient in both SQL (using `DISTINCT` and `ORDER BY`) and in Python using set and sort.

### Corner cases to consider  
- **Empty table/list:** No salaries at all.
- **All salaries are the same:** E.g., [100, 100, 100], should return null.
- **Exactly two salaries, but equal:** E.g., [200, 200], should return null.
- **Exactly two distinct salaries:** Should return the smaller one.
- **Negative or zero values:** Unlikely per problem constraint (“salaries are positive”), but worth mentioning.
- **Non-integer/invalid salary input:** Out of scope since defined as integers.

### Solution

```python
def second_highest_salary(salaries):
    # Step 1: Remove duplicates to get distinct salaries
    distinct_salaries = set(salaries)
    
    # Step 2: If there's less than 2 unique salaries, return None
    if len(distinct_salaries) < 2:
        return None
    
    # Step 3: Sort the unique salaries in descending order
    sorted_salaries = sorted(distinct_salaries, reverse=True)
    
    # Step 4: Return second highest (index 1)
    return sorted_salaries[1]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Removing duplicates (set): O(n)
  - Sorting unique salaries: O(k log k), where k is the number of unique salaries (k ≤ n)
  - Overall: O(n + k log k); in the worst case, O(n log n) if all are unique.

- **Space Complexity:**  
  - O(k) where k is the number of unique salaries, since we build a set and a sorted list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted the kᵗʰ highest distinct salary?  
  *Hint: How would you modify your logic for k=3, 4, ...?*

- How would you do this efficiently for very large datasets, where memory use matters?  
  *Hint: Could you avoid sorting everything? Could you use a min-heap?*

- How would you handle streaming data (salary entries arriving one by one)?  
  *Hint: Could you always keep track of the top 2 (or k) unique highest values on the fly?*

### Summary
This problem is a common instance of the "Top K distinct values" coding pattern. The core steps are: deduplicating the input, sorting (or otherwise collecting) the values, and retrieving the appropriate rank. This approach—set for deduplication plus sorting for ranking—is found often in leaderboard problems and analysis tasks involving unique ranks or medians. The principle adapts easily for kᵗʰ largest/smallest queries, and is especially useful in SQL, interviews, and data processing.

### Tags
Database(#database)

### Similar Problems
