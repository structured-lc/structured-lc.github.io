### Leetcode 3288 (Hard): Length of the Longest Increasing Path [Practice](https://leetcode.com/problems/length-of-the-longest-increasing-path)

### Description  
Given a list of n 2D coordinates (`coordinates`), and an integer `k` (0 ≤ k < n), where `coordinates[i] = [xᵢ, yᵢ]` describes the iᵗʰ point:

An **increasing path** is a sequence of coordinate indices forming a path [(x₁, y₁), (x₂, y₂), ...], such that for every adjacent pair:  
- xᵢ < xᵢ₊₁ and yᵢ < yᵢ₊₁ (i.e., both x and y strictly increase at every step)  
Return the **length of the longest increasing path that includes coordinates[k]** (the kᵗʰ point).  
The path may start or end at any point, but must pass through the specified point at index k.

### Examples  

**Example 1:**  
Input: `coordinates = [[3,1],[2,2],[4,1],[0,0],[5,3]], k = 1`  
Output: `3`  
*Explanation: The longest increasing path including coordinates[1] = [2,2] is: [0,0] → [2,2] → [5,3]. Their x and y values both increase at each step.*

**Example 2:**  
Input: `coordinates = [[1,2],[2,3],[3,4],[4,5],[5,6]], k = 2`  
Output: `5`  
*Explanation: The coordinates are in order. The whole list is a strictly increasing path including [3,4].*

**Example 3:**  
Input: `coordinates = [[5,5],[4,4],[3,3]], k = 0`  
Output: `1`  
*Explanation: No other point has both x > 5 and y > 5 or x < 5 and y < 5, so only [5,5] itself can be the path.*

### Thought Process (as if you’re the interviewee)  

- **Clarify**: I must find the longest path (sequence of indices into the array), where each consecutive point has both x and y strictly increasing, and the path contains coordinates[k].

- **Naive Approach**:  
    - For each possible path that contains k, check if it is increasing in both dimensions.
    - However, exploring all possible paths is exponential (very slow).

- **Observation**:  
    - The problem is closely related to **Longest Increasing Subsequence (LIS)**, but in 2D.
    - Since both x and y must increase, we can sort all points by x, then for each, try to extend the path based on increasing y.

- **Dynamic Programming Approach**:
    - For each direction (before k and after k), treat k as the key point.
    - **Left of k**: For points with x < xₖ and y < yₖ, find the maximal increasing sequence ending at k.
    - **Right of k**: For points with x > xₖ and y > yₖ, find the maximal increasing sequence starting at k.

    - Use **2D LIS** for both sides and combine:
        - left_len = longest increasing path ending at k using points left of k
        - right_len = longest increasing path starting at k using points right of k
        - Final answer: left_len + right_len - 1 (since k is counted in both).

- **Efficient implementation**:
    - To get O(n log n), process points and for each, maintain the best possible increasing sequence using binary search.
    - Split points into "candidates before k" (x < xₖ, y < yₖ) and "candidates after k" (x > xₖ, y > yₖ).
    - Sort and process as typical for LIS, separately for left and right.

- **Trade-offs**:
    - O(n²): Simple DP for LIS in 2D, acceptable for small n.
    - O(n log n): Using Patience Sorting / Binary Indexed Trees (for LIS in 2D), efficient for large n.

### Corner cases to consider  
- No other point can be chained to or from coordinates[k], so answer is 1.
- All points are equal, so answer is 1.
- Only one point (n=1).
- There’s only one strict increasing direction (all x or all y same or not ordered).
- Points are not unique.
- More than one increasing path passes through k — be sure to return the longest.

### Solution

```python
def lengthOfLongestIncreasingPath(coordinates, k):
    # Helper to find LIS in 2D among the given points relative to origin [ox, oy], direction (+1: strictly greater, -1: strictly less)
    def lis_2d(points, ox, oy, direction):
        # Filter points strictly in desired direction from origin
        if direction == -1:
            filtered = [(x, y) for x, y in points if x < ox and y < oy]
        else:
            filtered = [(x, y) for x, y in points if x > ox and y > oy]
        # Sort by x, then y
        filtered.sort()
        # Extract y's for LIS
        ys = [y for x, y in filtered]
        # 1D LIS
        import bisect
        pile = []
        for y in ys:
            idx = bisect.bisect_left(pile, y)
            if idx == len(pile):
                pile.append(y)
            else:
                pile[idx] = y
        return len(pile)
    
    xk, yk = coordinates[k]
    n = len(coordinates)
    # Compute LIS left (ending at k)
    left = lis_2d(coordinates, xk, yk, -1)
    # Compute LIS right (starting after k)
    right = lis_2d(coordinates, xk, yk, 1)
    # Path: left (+k itself) + right
    return left + 1 + right - 1  # k double counted
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Each LIS call is O(n log n) due to sorting and binary search pile updates. Two calls, so O(n log n) overall.
- **Space Complexity:**  
  - O(n) extra storage for sorting, filtered lists, and LIS piles.

### Potential follow-up questions (as if you’re the interviewer)  

- If some points could repeat, how would your approach change?  
  *Hint: Think about duplicate handling in LIS — do we allow equal steps?*

- Can you return the actual path, not just its length?  
  *Hint: Store parent pointers during LIS construction, then reconstruct by tracing back.*

- How would you adapt this for 3D points?  
  *Hint: Generalizing LIS to higher dimensions is possible, but more complex (see "LIS in k-dimensions").*

### Summary
This problem uses the **2D Longest Increasing Subsequence** pattern, which generalizes the classic LIS from 1D to 2D.  
By splitting around coordinates[k] and combining the LIS to its left and right, we capture all increasing paths passing through k.  
This pattern is useful wherever you need to build increasing chains under coordinate-wise (multi-attribute) constraints and frequently appears in grid dynamic programming, box stacking, and scheduling problems.


### Flashcard
Use DP where dp[i] = longest increasing path ending at coordinates[i]; for each i, check all j < i where both x and y are strictly increasing, and take the maximum.

### Tags
Array(#array), Binary Search(#binary-search), Sorting(#sorting)

### Similar Problems
