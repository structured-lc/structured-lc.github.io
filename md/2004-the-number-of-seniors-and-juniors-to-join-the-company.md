### Leetcode 2004 (Hard): The Number of Seniors and Juniors to Join the Company [Practice](https://leetcode.com/problems/the-number-of-seniors-and-juniors-to-join-the-company)

### Description  
Given a database table of candidates (employee_id, experience ['Senior'/'Junior'], salary), and a fixed hiring budget, select candidates to maximize:
1. The number of **Senior** hires (hiring the cheapest available Seniors first).
2. Then, with the remaining budget, maximize the number of **Juniors** that can be hired (again, with the cheapest salaries first).
Return the number of Seniors and Juniors hired.

### Examples  

**Example 1:**  
Input:  
Candidates =  
| employee_id | experience | salary  |
|-------------|------------|--------|
| 1           | Senior     | 10000  |
| 2           | Senior     | 30000  |
| 3           | Junior     | 40000  |
| 4           | Junior     | 15000  |  
Budget = 70000  
Output:  
Senior: 2  
Junior: 1  
Explanation:  
- Hire both Seniors (10000 + 30000 = 40000 spent, 30000 left).
- Hire one Junior (cheapest = 15000), now 15000 left (not enough for next Junior at 40000).

**Example 2:**  
Input:  
Candidates =  
| employee_id | experience | salary  |
|-------------|------------|--------|
| 1           | Junior     | 10000  |
| 2           | Senior     | 80000  |
| 3           | Senior     | 80000  |
| 4           | Junior     | 40000  |  
Budget = 70000  
Output:  
Senior: 0  
Junior: 2  
Explanation:  
- Cannot hire any Seniors (all require 80000), budget is 70000.
- With full budget, hire both Juniors: 10000 + 40000 = 50000 spent, 20000 left.

**Example 3:**  
Input:  
Candidates =  
| employee_id | experience | salary  |
|-------------|------------|--------|
| 1           | Senior     | 10000  |
| 2           | Junior     | 15000  |
| 3           | Junior     | 18000  |
| 4           | Senior     | 20000  |
| 5           | Senior     | 25000  |  
Budget = 45000  
Output:  
Senior: 2  
Junior: 1  
Explanation:  
- Hire Seniors with 10000 and 20000 (total 30000). 15000 budget left.
- Hire one Junior (cheapest = 15000). 0 left; cannot hire the other Junior (needs 18000).

### Thought Process (as if you’re the interviewee)  
- Brute-force: Try all possible combinations of Seniors and Juniors. This is inefficient.
- Optimal:  
  - Hire as many Seniors as the budget allows, prioritizing those with the lowest salaries.
  - After hiring Seniors, use remaining budget to hire as many Juniors as possible, also by lowest salary.
  - Sort Seniors and Juniors by salary, simulate hiring by accumulating salaries.
  - Trade-off: Assures the most Seniors possible, with any leftover given to Juniors. Maximizes total hires under constraints.

### Corner cases to consider  
- No Seniors or Juniors in the list.
- All salaries > budget.
- Budget exactly fits some combination.
- Duplicate salaries and/or employee_id values.
- Single candidate (either Senior or Junior).
- Some candidates have salary 0.
- Large input size.

### Solution

```python
# Function takes:
# candidates: list of dicts, each with 'employee_id', 'experience', 'salary'
# budget: integer, total money to hire
def number_of_seniors_and_juniors(candidates, budget):
    # Partition candidates into seniors and juniors
    seniors = [c['salary'] for c in candidates if c['experience'] == 'Senior']
    juniors = [c['salary'] for c in candidates if c['experience'] == 'Junior']

    # Sort salaries in ascending order
    seniors.sort()
    juniors.sort()

    # Hire as many seniors as possible (accumulating cost)
    total_budget = budget
    senior_hires = 0
    spent = 0
    for salary in seniors:
        if spent + salary <= total_budget:
            spent += salary
            senior_hires += 1
        else:
            break

    # Now, use remaining budget for juniors
    junior_hires = 0
    junior_spent = spent
    for salary in juniors:
        if junior_spent + salary <= total_budget:
            junior_spent += salary
            junior_hires += 1
        else:
            break

    return {'Senior': senior_hires, 'Junior': junior_hires}
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N log N), where N is the number of candidates. Sorting Seniors and Juniors' salaries dominates.
- **Space Complexity:** O(N), storing splits for Seniors and Juniors.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted to maximize total hires, not Seniors first?
  *Hint: Try a greedy approach across both groups by lowest salary.*

- How does the answer change if Seniors/Juniors must be hired in pairs (one-to-one ratio)?
  *Hint: Simulate hiring both types together.*

- What if the candidates must be hired in the order of their employee_id?
  *Hint: Do not sort by salary, but iterate employee_id order, picking if budget allows.*

### Summary
This problem uses the greedy pattern: always take the next cheapest candidate in the preferred group. Maximizing Seniors is prioritized, then Juniors, both via sorting and simulation. This pattern is common in resource allocation problems, conference scheduling, and classic "knapsack" variants where selection order matters.

### Tags
Database(#database)

### Similar Problems
- Last Person to Fit in the Bus(last-person-to-fit-in-the-bus) (Medium)
- The Number of Seniors and Juniors to Join the Company II(the-number-of-seniors-and-juniors-to-join-the-company-ii) (Hard)