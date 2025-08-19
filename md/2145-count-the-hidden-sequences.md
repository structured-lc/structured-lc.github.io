### Leetcode 2145 (Medium): Count the Hidden Sequences [Practice](https://leetcode.com/problems/count-the-hidden-sequences)

### Description  
You are given an integer array `differences` of length n and two integers `lower` and `upper`.  
There exists an unknown sequence `hidden` of length n+1 such that for every i (0 ≤ i < n):  
`differences[i] = hidden[i+1] - hidden[i]`.  
All values in the `hidden` sequence must be between `lower` and `upper` (inclusive).  
Your task is to count how many different valid `hidden` sequences exist that match the differences and range constraints.  
Return 0 if none exist.

### Examples  

**Example 1:**  
Input: `differences = [1, -3, 4]`, `lower = 1`, `upper = 6`  
Output: `2`  
*Explanation:  
Suppose the sequence is [a, b, c, d].  
From differences,  
- b = a + 1  
- c = b - 3 = a + 1 - 3 = a - 2  
- d = c + 4 = a - 2 + 4 = a + 2  
So hidden = [a, a+1, a-2, a+2].  
To be valid:  
- All must be in [1, 6].  
Trying a = 2: [2,3,0,4] (0 out of range)  
a = 3: [3,4,1,5] (all in range)  
a = 4: [4,5,2,6] (all in range)  
So a can be 3 or 4. Total = 2.*

**Example 2:**  
Input: `differences = [3, -4, 5, -2]`, `lower = -4`, `upper = 5`  
Output: `2`  
*Explanation:  
Let the starting value be x.  
hidden = [x, x+3, x-1, x+4, x+2]  
Find all integer x so hidden stays in [-4, 5].  
x = -3: [-3,0,-1,4,2] (valid)  
x = -4: [-4,-1,-5,0,-2] (-5 not valid)  
x = -2: [-2,1,0,5,3] (valid)  
x = -1: [-1,2,1,6,4] (6 out of range)  
So answers: x = -3,-2 ⇒ 2.*

**Example 3:**  
Input: `differences = [1,2,3]`, `lower = -100`, `upper = 100`  
Output: `201`  
*Explanation:  
With no tight restrictions, there are 201 possible valid sequences by trying all starting points between -100 and 100.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force approach is to try all starting values `s` in [lower, upper], construct the `hidden` sequence using differences, and count how many sequences stay entirely within the range.  
This is up to O((upper-lower+1) × n), which is too slow for large inputs.

We can notice that the sequence is always uniquely determined by its first value.  
Let hidden = x.  
Then, for each position, use running `prefix sum` to get hidden[i] = x + (prefix sum of differences up to i-1).  
To keep the sequence in range, every term hidden[i] must stay between lower and upper.  
That means x + current_prefix_sum must be in [lower, upper], or  
- lower - prefix_sum ≤ x ≤ upper - prefix_sum

So, for the entire sequence, look for the intersection of all such valid x-ranges as you compute prefix sums.  
- min_pref = the minimal prefix sum  
- max_pref = the maximal prefix sum  
Therefore,  
- lower - min_pref ≤ x ≤ upper - max_pref

The answer is:  
count = max(0, (upper - max_pref) - (lower - min_pref) + 1)

This is O(n) — just compute prefix sums, track min/max, and apply the formula.

### Corner cases to consider  
- All differences zero (sequence must be constant).  
- lower == upper (only one possible sequence).  
- No valid sequence exists.  
- Only one element in differences (shortest possible hidden sequence).  
- Negative lower/upper bounds.  
- Very large or very small (possibly negative) values in differences.

### Solution

```python
def count_hidden_sequences(differences, lower, upper):
    # prefix_sum keeps track of the sum of differences up to each position
    prefix_sum = 0
    min_pref = 0
    max_pref = 0
    
    for diff in differences:
        prefix_sum += diff
        min_pref = min(min_pref, prefix_sum)
        max_pref = max(max_pref, prefix_sum)
    
    # The valid starting value x must satisfy:
    # lower - min_pref ≤ x ≤ upper - max_pref
    left = lower - min_pref
    right = upper - max_pref
    if left > right:
        return 0
    return right - left + 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
Iterate over all differences once to compute prefix sums and min/max.

- **Space Complexity:** O(1)  
No extra storage scaling with input; only a few variables for computation.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the bounds are very large and exceed 32-bit integers?  
  *Hint: Watch for overflows and handle with 64-bit arithmetic if needed.*

- Can you output all possible valid `hidden` sequences themselves?  
  *Hint: This would usually require O(n × answer) time and space, not feasible if answer is large.*

- Can this be generalized to 2D or multidimensional differences?  
  *Hint: Think about prefix sum extension and constraints in multiple dimensions.*

### Summary
This problem is a classic **prefix sum range analysis**. The key is to anchor the sequence at the starting value, shift constraints using min/max prefix sums, and intersect the allowed initial value intervals. This pattern — mapping cumulative constraints back to bounds on initial terms — appears in many difference array and reconstruction problems. Analytical reasoning with prefix sums is powerful in signal balancing, time-series reconstruction, and difference equations.

### Tags
Array(#array), Prefix Sum(#prefix-sum)

### Similar Problems
