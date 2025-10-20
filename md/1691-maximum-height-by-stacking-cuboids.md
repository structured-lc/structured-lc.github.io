### Leetcode 1691 (Hard): Maximum Height by Stacking Cuboids  [Practice](https://leetcode.com/problems/maximum-height-by-stacking-cuboids)

### Description  
Given a list of **cuboids**, each with ​width, length, height, you can rearrange the cuboids and place any of them in any orientation (length, width, height can be swapped, but remain axis-aligned). A cuboid can be stacked on top of another **only if all its dimensions are less than or equal to the corresponding dimensions below**. Compute the **maximum achievable stack height**.

### Examples  

**Example 1:**  
Input: `cuboids = [[50,45,20],[95,37,53],[45,23,12]]`  
Output: `190`  
*Explanation: Place cuboid 0 → cuboid 2 → cuboid 1 in that order and orientations to get 45+50+95 = 190.*

**Example 2:**  
Input: `cuboids = [[38,25,45],[76,35,3]]`  
Output: `76`  
*Explanation: Use the bigger one at bottom, can't stack further.*

**Example 3:**  
Input: `cuboids = [[7,11,17]]`  
Output: `17`  
*Explanation: Only one cuboid, so max height is its largest dimension.*

### Thought Process (as if you’re the interviewee)  
This problem is a 3D variation of the **longest increasing subsequence (LIS)** or **box stacking** problem. First, for each cuboid, permute the dimensions to sort them so that (w ≤ l ≤ h); this standardizes orientation choices and simplifies stacking criteria. Next, sort all cuboids so that for any i < j, cuboid[i] is not bigger in any dimension than cuboid[j], which allows dynamic programming similar to LIS. For DP, dp[i] can be the max height including cuboid[i] at the top; check all previous j < i which can be under i based on the sorted dimension check.

### Corner cases to consider  
- Only one cuboid.
- Duplicate cuboids with different reorderings.
- Some cuboids can't be stacked at all.
- Zero-sized cuboids.

### Solution

```python
# Apply box stacking with DP; sort each cuboid, then sort all cuboids; classic DP

def maxHeight(cuboids):
    # Standardize orientation: sort dims lowest to highest for each cuboid
    cuboids = [sorted(c) for c in cuboids]
    # Sort cuboids overall by all three dimensions (by w, l, h)
    cuboids.sort()
    n = len(cuboids)
    dp = [c[2] for c in cuboids]  # dp[i]: max height with cuboid[i] at top
    for i in range(n):
        for j in range(i):
            # If cuboid[j] can support cuboid[i]
            if (
                cuboids[j][0] <= cuboids[i][0] and
                cuboids[j][1] <= cuboids[i][1] and
                cuboids[j][2] <= cuboids[i][2]
            ):
                dp[i] = max(dp[i], dp[j] + cuboids[i][2])
    return max(dp)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n²) — for each i, check all j < i
- **Space Complexity:** O(n) — dp array for heights


### Potential follow-up questions (as if you’re the interviewer)  

- Can you reconstruct the stack itself, not just the height?  
  *Hint: Store prev index for each dp entry and trace back.*

- How would you handle thousands of cuboids efficiently?  
  *Hint: Try reducing comparisons or using LIS optimizations.*

- What if orientations are not allowed (must use original orientation)?  
  *Hint: Skip the dimension sort step.*

### Summary
This is an extension of the LIS/box-stacking DP pattern — standardize choices, sort, dp for best stacking ending at each cuboid. This is a classic and transferable technique in "stacking/subsequence under constraints" problems.


### Flashcard
Maximum Height by Stacking Cuboids

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Sorting(#sorting)

### Similar Problems
- The Number of Weak Characters in the Game(the-number-of-weak-characters-in-the-game) (Medium)
- Maximum Number of Groups Entering a Competition(maximum-number-of-groups-entering-a-competition) (Medium)