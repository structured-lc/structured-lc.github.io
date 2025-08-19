### Leetcode 1491 (Easy): Average Salary Excluding the Minimum and Maximum Salary [Practice](https://leetcode.com/problems/average-salary-excluding-the-minimum-and-maximum-salary)

### Description  
You are given an array of unique integers where each element represents the salary of an employee. Your task is to compute the average salary, **excluding** the minimum and maximum salaries from the calculation. The average should accurately reflect the remaining salaries, filtering out the outlier extremes.

### Examples  

**Example 1:**  
Input: `salary = [4000,3000,1000,2000]`  
Output: `2500.0`  
*Explanation: Minimum salary is 1000, maximum is 4000. Remaining salaries are 2000 and 3000. Average = (2000+3000)/2 = 2500.0*

**Example 2:**  
Input: `salary = [1000,2000,3000]`  
Output: `2000.0`  
*Explanation: Minimum is 1000, maximum is 3000. Remaining salary is 2000. Average = 2000/1 = 2000.0*

**Example 3:**  
Input: `salary = [6000,5000,4000,3000,2000,1000]`  
Output: `3500.0`  
*Explanation: Minimum is 1000, maximum is 6000. Remaining: 2000,3000,4000,5000. Average = (2000+3000+4000+5000)/4 = 14000/4 = 3500.0*

### Thought Process (as if you’re the interviewee)  
A simple brute-force approach is to:
- Find the minimum and maximum in the array.
- Compute the sum of all salaries.
- Subtract the minimum and maximum from the sum.
- Divide by (n - 2), since we exclude two salaries.

Since the array size is guaranteed to be >= 3 and all elements are unique, we won't have issues with identical min/max. We can do this in one loop to optimize for space and time, tracking sum, min, and max while iterating. The result only needs to be accurate to five decimals.

I prefer the one-pass approach for interviews to show efficiency, as sorting the array would take O(n log n) unnecessarily.

### Corner cases to consider  
- Array length is exactly 3 (only one salary remains after removing min and max).
- Minimum or maximum is at the first or last index.
- Salaries are consecutive numbers (e.g. [2,3,4]).
- Large salary values or spread out values.
- All elements are unique, as per constraints.

### Solution

```python
def average(salary):
    # Initialize min and max to very large/small values
    min_salary = float('inf')
    max_salary = float('-inf')
    total = 0

    # Find sum, min, and max in a single pass
    for s in salary:
        total += s
        if s < min_salary:
            min_salary = s
        if s > max_salary:
            max_salary = s

    # Remove min and max from sum
    total -= min_salary
    total -= max_salary

    # Return average (divide by n-2, as two elements are excluded)
    return total / (len(salary) - 2)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of salaries, as we loop through the array only once.
- **Space Complexity:** O(1), since we use only a few variables for calculation, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array were not guaranteed unique elements?  
  *Hint: How would you handle if min or max occurred more than once? Should you exclude all?*

- Can you solve this without explicitly storing min and max (i.e. only using sort)?  
  *Hint: What does sorting enable? Is it less efficient?*

- What if we had to exclude the k smallest and k largest salaries?  
  *Hint: How would you generalize? Could you use a heap or partial sort?*

### Summary
The approach uses the classic **array linear scan** pattern, tracking min, max, and sum in one pass. This is a common pattern for handling aggregates and outlier removal, and it applies to similar problems such as calculating a trimmed mean, finding average after removing specific elements, or in streaming data where you need quick statistics with exclusion criteria.

### Tags
Array(#array), Sorting(#sorting)

### Similar Problems
