### Leetcode 1326 (Hard): Minimum Number of Taps to Open to Water a Garden [Practice](https://leetcode.com/problems/minimum-number-of-taps-to-open-to-water-a-garden)

### Description  
You have a one-dimensional garden represented as a line segment from 0 to n. There are n+1 taps placed at points 0 to n. Each iᵗʰ tap can water a range from (i - ranges[i]) to (i + ranges[i]), but not less than 0 or greater than n. You can open any subset of these taps. Find the **minimum number of taps** required to open so the entire garden [0, n] is watered. If it's impossible, return -1.

### Examples  

**Example 1:**  
Input: `n = 5`, `ranges = [3,4,1,1,0,0]`  
Output: `1`  
*Explanation: The tap at index 1 waters the entire garden [0,5].*

**Example 2:**  
Input: `n = 3`, `ranges = [0,0,0,0]`  
Output: `-1`  
*Explanation: No tap covers any section of the garden. Impossible to water the full interval.*

**Example 3:**  
Input: `n = 7`, `ranges = [1,2,1,0,2,1,0,1]`  
Output: `3`  
*Explanation:    
- Tap 0 covers [0,1]
- Tap 1 covers [0,3]
- Tap 4 covers [2,6]
- Tap 7 covers [6,7]
- One optimal way: open taps at 1, 4, 7 to cover [0,7].*

### Thought Process (as if you’re the interviewee)  
This is an interval covering problem, equivalent to the Jump Game II or minimum number of intervals to cover a segment. My brute-force idea: try all tap combinations, but that's exponential. To optimize:

- Preprocess: convert each tap into an interval [max(0, i − ranges[i]), min(n, i + ranges[i])].
- Sort taps or, better, for each position, mark the farthest right a tap can cover from the left.
- Use a greedy approach similar to solving the Jump Game II:
  - For each point in the garden from 0 to n, always open the tap that extends coverage the farthest. When you reach the end of "current coverage", increment tap count and "jump" to the next max extended interval.
- This is O(n) after preprocessing, because it only scans the garden length.

### Corner cases to consider  
- All ranges are zero (no tap can water).
- Full coverage by a single tap.
- Gaps between intervals (not possible to water the whole garden).
- Intervals overlap or subset each other.
- n = 0 (garden is a point).

### Solution

```python
class Solution:
    def minTaps(self, n: int, ranges: list[int]) -> int:
        # Build a "max reach" array for each start position
        max_right = [0] * (n + 1)
        for i in range(n + 1):
            left = max(0, i - ranges[i])
            right = min(n, i + ranges[i])
            max_right[left] = max(max_right[left], right)

        taps = 0
        curr_end = 0
        next_end = 0
        i = 0
        while curr_end < n:
            # Scan intervals starting at ≥ i and update next_end
            while i <= curr_end:
                next_end = max(next_end, max_right[i])
                i += 1
            if next_end == curr_end:
                # Can't extend further, so not possible
                return -1
            taps += 1
            curr_end = next_end
        return taps
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), since each garden position is visited at most twice (during interval setup and greedy scan).
- **Space Complexity:** O(n), for the max_right array.

### Potential follow-up questions (as if you’re the interviewer)  
- What if you need to return the indices of the opened taps?
  *Hint: Track the choices at each step*  

- What if ranges can have negative values (meaning tap cannot be used)?
  *Hint: Skip such taps during preprocessing*  

- Can this be generalized to two dimensions?  
  *Hint: The garden becomes a grid, and the problem becomes more complex, similar to Minimum Set Cover or covering with discs.*

### Summary
This is a classic greedy interval covering problem, closely related to the Jump Game II pattern. Transforming each tap into an interval, and greedily "jumping" as far as possible at each step, leads to the optimal minimum tap count. Useful for interval-related challenges or continuous coverage/selection problems.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Greedy(#greedy)

### Similar Problems
