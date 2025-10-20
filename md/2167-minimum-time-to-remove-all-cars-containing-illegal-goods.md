### Leetcode 2167 (Hard): Minimum Time to Remove All Cars Containing Illegal Goods [Practice](https://leetcode.com/problems/minimum-time-to-remove-all-cars-containing-illegal-goods)

### Description  
Given a binary string s where each character is '0' (a legal car) or '1' (a car containing illegal goods), you want to remove all cars with illegal goods using the minimum time.  
You can:
- Remove a car from the **left end** (1 unit time)
- Remove a car from the **right end** (1 unit time)
- Remove any car from **any position** (2 units time)

Find the minimum total time required to remove all illegal ('1') cars.  

### Examples  

**Example 1:**  
Input: `"00 11 0 1"`  
Output: `5`  
Explanation: Remove the two leftmost cars in 2×1 = 2, remove the rightmost in 1, and the last '1' in the middle for 2. Total = 2 + 1 + 2 = 5.

**Example 2:**  
Input: `"0 1 0"`  
Output: `2`  
Explanation: Either remove both from ends or remove the middle car (at cost 2). Minimum is 2.

**Example 3:**  
Input: `"11 1"`  
Output: `3`  
Explanation: Remove all three from the ends for 1 each; total is 3.

### Thought Process (as if you’re the interviewee)  
Brute-force approach would be to simulate all possible sequences (try all partitions or choices for each '1'), but that's exponential and clearly not feasible for large n.  

Notice that removing at ends is always better (1 vs 2). So, for any partition, if we remove all cars with illegal goods up to a certain point from the left (each 1 → cost at least 1, but if not at end → cost 2), and the rest from the right, can we efficiently keep track of which parts were handled optimally?  

Key insight:  
- Compute prefix minimum cost to clear everything up to position i with left-removal and in-place-removal (DP).
- For every index, partition at i: remove all to the left (with optimal), remove all to the right (with right-removal).
- Try all split points to get probably the minimum time.

Optimized approach:  
- Create left[] where left[i] = minimum time to clear all illegal cars up to i.
    - left[i] = min(left[i-1] + (2 if s[i]=='1' else 0), i+1)
      (either extend previous or just remove all from start up to i using left-removal)
- For each i, minimum time = left[i] + (n-1-i) (rest from right end)
- Answer is min of all above.

This DP-like greedy sweep is O(n) and simple to code.

### Corner cases to consider  
- All zeros: should return 0.
- All ones: should be min(removing all from left or all from right).
- Isolated ones surrounded by long stretches of zeros.
- Single car (either '0' or '1')
- Large n with alternating 0,1 pattern.
- Input string is empty.

### Solution

```python
def minimumTime(s: str) -> int:
    n = len(s)
    # left[i]: minimum time to remove all illegal cars in s[0..i]
    left = [0] * n
    left[0] = 1 if s[0] == '1' else 0

    for i in range(1, n):
        # Option 1: remove s[i] in-place (cost: 2 if '1'), plus previous minimum
        # Option 2: remove everything up to i from left (cost: i+1)
        cost_inplace = left[i-1] + (2 if s[i] == '1' else 0)
        cost_fromleft = i+1
        left[i] = min(cost_inplace, cost_fromleft)

    ans = n  # upper bound
    for i in range(n):
        # left[i]: cost to clear s[0..i] optimally
        # (n-1-i): remainder can be cleared from the right (since only right removals needed)
        ans = min(ans, left[i] + (n - 1 - i))

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is length of s. Each index visited a constant number of times.
- **Space Complexity:** O(n) for the left[] array. (Can be optimized to O(1) by using a variable no array.)

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize space to O(1)?
  *Hint: Do you need to retain the entire left[] array, or just current and previous values?*

- What if instead of a binary string, you had costs for each car?
  *Hint: Parameterize cost of removing each car, generalize DP recurrence.*

- Could you reconstruct the sequence of deletions that yields the minimum time?
  *Hint: Track back the splitting points and choices during DP calculation.*

### Summary
We use a greedy DP that calculates the prefix minimal removal cost for all illegal ('1') cars, then tries every possible split between left and right end removals to minimize the total. This is a classical prefix DP (or partition DP) pattern, seen in string partitioning, coin flips, and greedy DP problems. It’s a common approach whenever you can optimally combine left and right costs through a split.


### Flashcard
For each partition point, compute the cost to remove all '1's from the left (cost 1 or 2 per car) and the right, then take the minimum over all partitions.

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Minimum Number of K Consecutive Bit Flips(minimum-number-of-k-consecutive-bit-flips) (Hard)