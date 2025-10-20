### Leetcode 1798 (Medium): Maximum Number of Consecutive Values You Can Make [Practice](https://leetcode.com/problems/maximum-number-of-consecutive-values-you-can-make)

### Description  
Given an array of coins, each with a positive integer value (duplicates allowed), find the **maximum number of consecutive integer values starting from 0** that you can form using any number of these coins.  
You can use each coin at most once, and all coins must be considered.  
Return the maximal value **X** such that every integer value in `[0, X)` can be made by summing up some subset of the given coins.

### Examples  

**Example 1:**  
Input: `coins = [1,3]`  
Output: `2`  
Explanation:  
- 0 (use no coins)  
- 1 (use [1])  
- Can't make 2 (need [1,1] or 2, not available).  
The answer is 2.

**Example 2:**  
Input: `coins = [1,1,1,4]`  
Output: `8`  
Explanation:  
- Possible values: 0,1,2,3 (use one or more 1's), 4 (just [4]),  
- 5 (4+1), 6 (4+1+1), 7 (4+1+1+1)  
- Can't make 8.  
So answer is 8.

**Example 3:**  
Input: `coins = [1,4,10,3,1]`  
Output: `20`  
Explanation:  
- Sort: [1,1,3,4,10]  
- After including all coins, can reach all values from 0 to 19.  
So answer is 20.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible subsets, record their sums, and see how many consecutive numbers are created from 0 onward.  
  - **Downside:** Exponential – not feasible for larger arrays.
- **Optimized approach (Greedy):**  
  - **Observation:** If sorted, and current sum reaches `res`, then next coin `≤ res` extends the consecutive range. Otherwise, a gap forms.
  - Start with `res=1` (we can always make 0). For each sorted coin, if coin `≤ res`, then add it to the range (res += coin). If coin > res, can't build res, so stop.
  - **Why greedy works:** As soon as there is a gap (can't create `res`), we can't fill it anymore with bigger coins.
  - **Trade-offs:**  
    - Simple, efficient, single sweep after sort.

### Corner cases to consider  
- Empty array: Return 1 (i.e., can only make 0).
- Coin with value not 1: Can't make 1, so answer is always 1.
- Many coins with same value.
- Single element: e.g. [4], can only make 0.
- Very large coins that can't fill earlier gaps.

### Solution

```python
def getMaximumConsecutive(coins):
    # Sort coins to process smaller values first
    coins.sort()
    res = 1      # We can always make sum 0 (by picking nothing)
    for coin in coins:
        if coin > res:
            # Can't make res: gap detected, break early
            break
        # If coin ≤ res, we can now build sums up to (res + coin - 1)
        res += coin
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) due to sorting the coins.
  - The loop itself is O(n).
- **Space Complexity:** O(1) extra space (not counting input); only a few variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if coins can be used an unlimited number of times?  
  *Hint: How does it change if each denomination is available in infinite supply, classic coin change variant?*

- What if you must use each coin at least once?  
  *Hint: Minimum "consecutive" values under these constraints!*

- Is it possible to return all values that cannot be formed, not just the count?  
  *Hint: Requires tracking unreachable values in the gaps.*

### Summary
This problem uses the **greedy plus prefix extension pattern**: always extend the range of possible sums as much as small coins permit, stopping at the first gap.  
It's a classic example of a sorted scan where the minimal "next unreachable" logic is vital, and similar reasoning can be seen in interval covering, change-making, and coverage range algorithms.


### Flashcard
Sort coins and extend the consecutive range by adding coins that do not exceed the current sum.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Patching Array(patching-array) (Hard)