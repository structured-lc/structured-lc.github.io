### Leetcode 1848 (Easy): Minimum Distance to the Target Element [Practice](https://leetcode.com/problems/minimum-distance-to-the-target-element)

### Description  
Given an integer array `nums` (0-indexed), a target value `target`, and an index `start`, find the minimum distance from `start` to any index `i` such that `nums[i] == target`. Distance is measured as `|i - start|`. Return this minimum distance.  
Imagine quickly locating the closest matching value in an array starting from a specific position — that's the problem here.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4,5], target = 5, start = 3`  
Output: `1`  
*Explanation: Only `nums[4] = 5` matches. The distance is |4 - 3| = 1.*

**Example 2:**  
Input: `nums = [1], target = 1, start = 0`  
Output: `0`  
*Explanation: The only element matches the target, and its index is `0`. Distance: |0 - 0| = 0.*

**Example 3:**  
Input: `nums = [1,1,1,1,1,1,1], target = 1, start = 3`  
Output: `0`  
*Explanation: Every element matches the target. Closest index is `3`, so |3 - 3| = 0.*

### Thought Process (as if you’re the interviewee)  
First, I’d think about brute-force:  
- Loop over the array, and for every index where the value equals `target`, compute the distance to `start` as `|i - start|`.
- Record and update the minimum of these distances.
- The requirement is “minimum” rather than “first found,” so we must check all occurrences.

Optimizing:  
- Since every index must be checked for a match, we can’t do better than O(n).
- The main tradeoff: space efficiency (no extra storage needed) and clear readability.
- If array is huge and target is very rare, we could early-exit if we ever find a distance of 0 (the shortest possible), but even then, linear scan is required in the general case.

### Corner cases to consider  
- Empty array (`nums = []`): Should not happen given constraints, but should return a sensible value or raise.
- No target present: Theoretically could return ‘inf’ or an error, but the problem likely guarantees at least one match.
- All elements equals target.
- Multiple matches for target, especially both left and right of `start`.
- start at boundaries: `start = 0` or `start = len(nums)-1`.
- Large input size.

### Solution

```python
def getMinDistance(nums, target, start):
    min_distance = float('inf')  # Initialize with infinity
    for i, num in enumerate(nums):
        if num == target:
            distance = abs(i - start)
            if distance < min_distance:
                min_distance = distance
            # Early exit: can't get smaller than 0
            if min_distance == 0:
                return 0
    return min_distance
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of nums. We must check every position to find all possible target matches.
- **Space Complexity:** O(1). Only a constant amount of space is used (for min_distance, distance, etc.) — no extra storage for auxiliary data.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need the index, not just the distance?
  *Hint: Store both the minimum distance and the corresponding index when updating.*

- Can you do this if the array is so large it can't fit in memory (streaming)?
  *Hint: Process the array in a single pass as items arrive, maintaining current min distance.*

- What if the target might not exist at all?
  *Hint: Decide and document what should happen: return -1, raise an exception, or return some sentinel.*

### Summary
This is a classic *linear scan / minimum tracking* pattern. It applies broadly to problems seeking closest/nearest values in a list, such as "minimum distance to X", "closest value to Y", or "find left/right neighbor."  
The implementation is straightforward, and can be directly reused wherever "find min (distance or difference) to target" logic is needed.