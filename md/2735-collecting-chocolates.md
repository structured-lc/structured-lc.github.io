### Leetcode 2735 (Medium): Collecting Chocolates [Practice](https://leetcode.com/problems/collecting-chocolates)

### Description  
Given an array of integers `nums` (size n), where `nums[i]` is the cost to collect a chocolate of type i, your goal is to collect exactly one chocolate of each type at minimum total cost.  
You may perform any number of operations (including zero): each operation costs `x`, and after it, all chocolates cyclically shift to the next type (so type i becomes type (i+1) mod n).  
Find the minimal cost to collect one chocolate of each type, using any number of cyclic shifts (including zero).

### Examples  

**Example 1:**  
Input: `nums = [5,3,3]`, `x = 1`  
Output: `9`  
*Explanation: Buy at original positions: 5+3+3 = 11; but shifting once for cost 1, array becomes [3,3,5], total is 1 (operation) + 3+3+5=12;  
After 2 operations (shifts): [3,5,3], 2 (operations) + 3+5+3=10.  
Best choice is 9 by collecting each from the minimum cost across all possible rotations. You compute for 0, 1, 2 shifts and take the minimum total cost.*

**Example 2:**  
Input: `nums = [1,2,3]`, `x = 4`  
Output: `6`  
*Explanation: No matter how many shifts (since x is large), the minimum is to collect all chocolates at original positions: 1+2+3=6.*

**Example 3:**  
Input: `nums = [3,1,2]`, `x = 2`  
Output: `7`  
*Explanation:  
- 0 rotations: cost = 3+1+2 = 6  
- 1 rotation: cost = 2 + min(3,1)+min(1,2)+min(2,3) = 2 + 1+1+2=6  
But must include cost of operation: 2 (operation) + 1+1+2 = 6  
Try more rotations for a possible lower sum. In this case, best total is 7 (as shifting doesn't help due to cost of x).*

### Thought Process (as if you’re the interviewee)  
- Start by brute-forcing: For each possible number of shifts (from 0 to n-1), compute the cost of performing that many shifts (`j * x`),  
and for each type, track the lowest cost chocolate that could be collected for that type given j total shifts so far.  
- For rotation count j: For each position i, track the minimum value seen among nums[(i-j) mod n] for all j so far.  
- After each round, compute the total cost as sum of those min values for all types plus the total operation cost.  
- Return the minimum across all such totals.  
- Optimization: Instead of simulating each shift in O(n²), notice we can keep track of min cost so far for each position as we "simulate" extra shifts.  
- Trade-off: This approach is O(n²), but with constant n (usually ≤ 10⁴), and as we just keep cumulative minimums, it is actually feasible.  
- The best solution is to precompute the min cost for each type across at most n shifts, accumulating operation costs along the way.

### Corner cases to consider  
- Only one chocolate (n = 1).
- All costs equal.
- x = 0 (rotation is free).
- x is very large.
- nums contains very large or very small values.
- nums already sorted ascending or descending.
- nums of length 0 (empty array, not allowed per problem).

### Solution

```python
def minCost(nums, x):
    n = len(nums)
    # min_cost[i] keeps the minimal cost of chocolate type i after any number of rotations so far
    min_cost = nums[:]  # at 0 shifts, must buy at their positions
    answer = sum(min_cost)
    # Try shifting 1 to n-1 times
    for shift in range(1, n+1):
        # After 1 more shift, for each type, min so far
        for i in range(n):
            # cost at this position after `shift` rotations
            min_cost[i] = min(min_cost[i], nums[(i - shift)%n])
        # total cost = sum of min so far + operations cost
        answer = min(answer, sum(min_cost) + shift*x)
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²). Outer loop runs n times (number of rotations tried), and in each, inner loop updates the min_cost array of size n.
- **Space Complexity:** O(n), for storing the running minimum for each chocolate type.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want to know not only the minimum cost, but *which* positions to collect each chocolate from too?  
  *Hint: Keep a trace-back of where the min comes from at each stage for each type.*

- If x is very small (or zero), how does the solution change?  
  *Hint: Try all n possible rotations, as rotations become no-cost.*

- Can you optimize for very large n (e.g., n > 10⁵)?  
  *Hint: Is there a sliding window or amortized approach to reduce inner loop cost?*

### Summary
This problem fits the **"Greedy with rolling minimum"** pattern, updating the minimum cost per position across state transitions (shifts) and keeping the total minimum at each stage, trying all reasonable "operation count" breakpoints.  
The same pattern applies in cases involving rotation-and-take problems, cost minimization across permutations, and rolling minimums.  
Common for interview rounds on dynamic programming, greedy, and rotating window problems.


### Flashcard
For each possible rotation count, track the min cost to collect each chocolate type; sum min costs plus operation cost.

### Tags
Array(#array), Enumeration(#enumeration)

### Similar Problems
