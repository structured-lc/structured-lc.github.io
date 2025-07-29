### Leetcode 1981 (Medium): Minimize the Difference Between Target and Chosen Elements [Practice](https://leetcode.com/problems/minimize-the-difference-between-target-and-chosen-elements)

### Description  
Given an m × n matrix `mat` of integers and an integer `target`, select **exactly one integer from each row** to form a collection. The **goal** is to minimize the absolute difference between the sum of the selected integers and the `target`. Return this minimum absolute difference.  
Put simply: For each row you pick one number, sum them all, and you want |sum - target| to be as small as possible.

### Examples  

**Example 1:**  
Input:  
mat = `[[1,2,3],[4,5,6],[7,8,9]]`, target = `13`  
Output: `0`  
*Explanation: Pick 3 (from row 1), 5 (from row 2), 5 (from row 3): 3 + 5 + 5 = 13, which is exactly the target. |13 - 13| = 0.*

**Example 2:**  
Input:  
mat = `[[1],[2],[3]]`, target = `6`  
Output: `0`  
*Explanation: Only one choice per row. 1 + 2 + 3 = 6, so answer is |6-6| = 0.*

**Example 3:**  
Input:  
mat = `[[2,9,2],[10,7,6],[10,7,6]]`, target = `13`  
Output: `1`  
*Explanation: One possible pick: 2 (row 1), 7 (row 2), 6 (row 3) → sum = 15, |15-13| = 2.  
But if you take: 2, 6, 6 → sum = 14, |14-13| = 1. This is the minimal possible.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try every combination of one number per row, compute the sum, and track the minimum absolute difference to target.  
    - For m rows and n columns, total combinations = n^m.  
    - Feasible only for very small matrices.

- **Optimized approach:** Use **Dynamic Programming**.  
    - Maintain a set of all possible sums attainable by picking one number per row as we iterate row by row.
    - Start with an initial set `{0}`.
    - For each row, update possible sums by adding each number in the row to every sum we've constructed so far.
    - After the last row, from all possible sums, find the one that minimizes |sum - target|.
    - Can prune values that are too large if needed, but storing all possible sums is feasible since matrix element values and row count are reasonably small (per problem constraint).
    - This is similar to the “knapsack” DP pattern.

- **Trade-offs:**  
    - Brute force is not efficient for larger cases.
    - The DP approach increases time and space but is manageable due to constraints and avoids exponential explosion.


### Corner cases to consider  
- Matrix contains only one row or one column.
- Very large or negative numbers.
- Target equals exact sum of minimum or maximum picks.
- All elements are identical.
- Duplicate elements in rows.
- Matrix size is at constraint boundary.


### Solution

```python
def minimizeTheDifference(mat, target):
    # Start with sum 0 (no picks yet)
    possible_sums = set([0])
    for row in mat:
        next_sums = set()
        for val in row:
            for current_sum in possible_sums:
                next_sums.add(current_sum + val)
        # To avoid unnecessary large sums, can trim values above target + max element × row count (optional)
        possible_sums = next_sums
    # After processing all rows, find minimal |sum - target|
    min_diff = float('inf')
    for s in possible_sums:
        min_diff = min(min_diff, abs(s - target))
    return min_diff
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n × S), where S is the number of possible unique sums encountered.  
  - At each step, for each current possible sum and each value in the row, we can generate new sums.
  - S is bounded by (max_element × m); typically much less for reasonable constraints.

- **Space Complexity:** O(S), where S is the number of possible unique sums tracked at every row.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you prune the search space when possible sum set grows too large?  
  *Hint: Consider only sums closer to the target or employ a min-heap to keep the closest k sums.*

- How would you modify the solution if negative numbers were allowed?  
  *Hint: Careful with sum bounds and possible use of dictionaries for DP mapping.*

- Can this be solved using classic Knapsack DP table rather than sets?  
  *Hint: Use a boolean DP table indexed by [row][sum].*


### Summary
This problem is a **dynamic programming/knapsack pattern**: for each row, construct and propagate all possible sums you can form so far, finally minimize the absolute difference to a fixed target.  
Variants of this approach apply to subset sum, coin change, knapsack, and other problems where decisions build up a set of partial results.  
Common patterns: propagate “reached” or “possible” states in layers as you make choices row by row (or item by item).