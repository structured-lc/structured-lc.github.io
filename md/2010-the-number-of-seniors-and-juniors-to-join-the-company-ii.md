### Leetcode 2010 (Hard): The Number of Seniors and Juniors to Join the Company II [Practice](https://leetcode.com/problems/the-number-of-seniors-and-juniors-to-join-the-company-ii)

### Description  
Given a table of candidates with their employee_id, experience (either `"Senior"` or `"Junior"`), and salary, the company wants to hire candidates with the following strategy:

- The company has a fixed budget (e.g., $70,000) to hire employees.
- **Step 1:** Among all seniors, select a subset whose total salary is as large as possible but does not exceed the budget. Pick all such seniors if multiple choices.
- **Step 2:** With the remaining budget, hire as many juniors as possible using the same rule: maximize the total junior salary under the remaining budget.

Return the list of `employee_id`s for all the selected seniors and juniors.

### Examples  

**Example 1:**  
Input:  
```
Candidates table:
| employee_id | experience | salary |
|-------------|------------|--------|
| 1           | Senior     | 30000  |
| 2           | Senior     | 25000  |
| 3           | Senior     | 40000  |
| 4           | Junior     | 20000  |
| 5           | Junior     | 15000  |
Budget = 70000
```
Output: `1, 2, 4`  
Explanation:  
- Choosing both seniors with lowest salaries: 1 ($30k) and 2 ($25k) totals $55k; add junior 4 ($20k) for a total $75k, which exceeds budget.
- Try seniors 1 ($30k) and 2 ($25k): total $55k. Remaining budget: $15k. Only junior 5 ($15k) can be added.  
Final: employee ids 1, 2, 5.

**Example 2:**  
Input:  
```
Candidates table:
| employee_id | experience | salary |
|-------------|------------|--------|
| 6           | Senior     | 60000  |
| 7           | Senior     | 20000  |
| 8           | Junior     | 10000  |
| 9           | Junior     | 5000   |
Budget = 70000
```
Output: `7, 8, 9`  
Explanation:  
- Hire senior 7 ($20k): remaining $50k.
- Hire both juniors (8 + 9: $15k). Total: $35k. This maximizes senior+junior salaries.

**Example 3:**  
Input:  
```
Candidates table:
| employee_id | experience | salary |
|-------------|------------|--------|
| 10          | Senior     | 80000  |
| 11          | Junior     | 30000  |
Budget = 70000
```
Output: `11`  
Explanation:  
- Senior 10 salary alone exceeds budget.
- Only junior 11 can be hired.

### Thought Process (as if you’re the interviewee)  
- First, **separate candidates into seniors and juniors**.
- Try **all combinations/subsets of seniors** to see which subset uses the largest possible budget not exceeding the total.
- For the chosen seniors, from the **remaining budget, pick as many juniors as possible** (maximize junior salary total, under remaining).
- To optimize: seniors and juniors can be sorted by salary (ascending), and use an accumulated sum.
- Brute force: try all combinations of seniors, which is exponential.
- For optimization: Since each employee can be picked **or not**:
  - We can try all possible subsets of seniors (since small N), find the one with max salary ≤ budget.
  - For juniors, with the remaining budget after picking seniors, we sort by salary and greedily pick as many as possible.
- Final output: the IDs of the hired seniors and juniors.

### Corner cases to consider  
- No seniors/juniors in candidate list.
- All candidates' salaries exceed budget individually.
- Only one candidate.
- Multiple different selections of seniors result in same used budget (pick all possible juniors).
- Empty input.

### Solution

```python
def max_hires(candidates, budget):
    # candidates: list of dicts [{'employee_id': int, 'experience': str, 'salary': int}]
    # budget: int

    seniors = [c for c in candidates if c['experience'] == 'Senior']
    juniors = [c for c in candidates if c['experience'] == 'Junior']

    n = len(seniors)
    best_senior_sum = 0
    best_senior_comb = []

    # Try all subsets of seniors
    for mask in range(1 << n):
        total = 0
        selected = []
        for i in range(n):
            if mask & (1 << i):
                total += seniors[i]['salary']
                selected.append(seniors[i]['employee_id'])
        if total <= budget and total > best_senior_sum:
            best_senior_sum = total
            best_senior_comb = selected

    remaining_budget = budget - best_senior_sum

    # For juniors, sort by salary low to high, pick as many as possible
    juniors_sorted = sorted(juniors, key=lambda x: x['salary'])
    junior_ids = []
    jr_sum = 0
    for jr in juniors_sorted:
        if jr_sum + jr['salary'] <= remaining_budget:
            jr_sum += jr['salary']
            junior_ids.append(jr['employee_id'])

    return best_senior_comb + junior_ids

# Example usage:
candidates = [
    {'employee_id': 1, 'experience': 'Senior', 'salary': 30000},
    {'employee_id': 2, 'experience': 'Senior', 'salary': 25000},
    {'employee_id': 3, 'experience': 'Senior', 'salary': 40000},
    {'employee_id': 4, 'experience': 'Junior', 'salary': 20000},
    {'employee_id': 5, 'experience': 'Junior', 'salary': 15000}
]
budget = 70000
print(max_hires(candidates, budget))  # Output: [1, 2, 5]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - For seniors: Try all subsets ⇒ O(2ˢ), s = # of seniors.
  - For juniors: Sort juniors O(j log j), then linear pass.
  - **Total:** For small # of seniors (s), feasible: O(2ˢ + j log j).
- **Space Complexity:**  
  - Store all candidates + working lists: O(n), n = total candidates.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of seniors is large?  
  *Hint: Can you use DP or prune branches similar to Knapsack problem?*

- What if salaries can be negative, or you can hire part-time for partial salaries?  
  *Hint: How does the combinatorial approach change with fractions or negatives?*

- Ask the candidate to output the total salaries spent or the ID list in sorted order.  
  *Hint: Simple postprocessing, sort as needed.*

### Summary
This problem is a variation of the **0/1 Knapsack** pattern, where you split candidates by type, try all combinations for one group (seniors), then maximize for the second group (juniors) with the leftover budget. The brute-force approach is feasible only for small senior groups; otherwise, a dynamic programming solution is needed. The concept applies to resource allocation and maximum profit/hiring subject to constraints.