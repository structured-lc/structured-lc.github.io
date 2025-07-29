### Leetcode 2798 (Easy): Number of Employees Who Met the Target [Practice](https://leetcode.com/problems/number-of-employees-who-met-the-target)

### Description  
You are given an integer array representing the number of hours each employee has worked, and a target value. Your task is to count how many employees worked at least as many hours as the target. Simply return the number of employees whose hours are greater than or equal to the target. This is a basic counting problem: for each employee, if their hours ≥ target, they meet the requirement.

### Examples  

**Example 1:**  
Input: `hours = [5, 6, 8, 2], target = 6`  
Output: `2`  
*Explanation: Only the 2ⁿᵈ (6 hours) and 3ʳᵈ (8 hours) employees worked ≥ 6 hours.*

**Example 2:**  
Input: `hours = [4, 4, 4], target = 4`  
Output: `3`  
*Explanation: All 3 employees worked exactly the target hours; all meet the requirement.*

**Example 3:**  
Input: `hours = [1, 2, 3], target = 4`  
Output: `0`  
*Explanation: No employee worked enough hours to meet the target.*

### Thought Process (as if you’re the interviewee)  
First, I’d start by iterating through the list of employee hours and use a counter to track how many employees meet or exceed the target. For each hour value, if it’s greater than or equal to the target, increment the counter. There is no need for extra data structures since this can all be done in a single pass — O(n) time and O(1) space.  
The problem is so simple that no further optimization is needed — any more complicated approach would be unnecessary overhead. The only trade-off here is whether to use a for loop or a simple sum with generator (which is syntactic sugar and not always encouraged in interviews).

### Corner cases to consider  
- Empty hours array ⇒ should return 0.
- All employees meet the target.
- No employees meet the target.
- Target is 0 (all employees meet the requirement).
- Target is greater than any hours value (0 meets requirement).
- Single employee.

### Solution

```python
def number_of_employees_who_met_target(hours, target):
    # Initialize counter for employees meeting or exceeding target hours
    count = 0
    # Iterate through each employee's hours
    for h in hours:
        # If employee worked at least the target, increment counter
        if h >= target:
            count += 1
    # Return the total count
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of employees. Each employee's hours are checked once.
- **Space Complexity:** O(1). We use only a single counter variable, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input array is very large and you must process it with limited memory?
  *Hint: Can you process the input as a stream?*

- What if you also need the indices of employees who met the target?
  *Hint: Instead of just a count, store indices where the condition is true.*

- How to handle negative hours (if possible)?
  *Hint: What business rules should apply to negative input?*

### Summary
This is a classic single-pass counting problem — a bread-and-butter pattern for many array and stream processing questions. It teaches direct condition-based counting, iteration, and basic input validation. This pattern appears everywhere in data analytics, search-and-filter queries, and quick stats problems.