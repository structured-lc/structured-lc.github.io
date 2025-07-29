### Leetcode 613 (Easy): Shortest Distance in a Line [Practice](https://leetcode.com/problems/shortest-distance-in-a-line)

### Description  
Given a list of integer points on a 1D number line, find the **minimum distance** (absolute difference) between any pair of two distinct points.  
In simpler terms: Given coordinates x₀, x₁, …, xₙ₋₁ (with n ≥ 2), return the smallest value of |xᵢ - xⱼ| for all pairs i ≠ j.  
If the same value appears twice, their distance is 0.

### Examples  

**Example 1:**  
Input: `x = [1, 4]`  
Output: `3`  
*Explanation: Only two points. Distance = |1 - 4| = 3.*

**Example 2:**  
Input: `x = [-1, 0, 2]`  
Output: `1`  
*Explanation: Distances are |−1−0|=1, |−1−2|=3, |0−2|=2. Minimum is 1.*

**Example 3:**  
Input: `x = [5, 5]`  
Output: `0`  
*Explanation: Both values are the same, so minimum distance is 0.*

### Thought Process (as if you’re the interviewee)  
First, let’s clarify that for each possible pair of points, we compute their absolute difference and return the minimum found.

**Brute-force idea:**  
- For every pair (i, j), compute |xᵢ - xⱼ| (i ≠ j).
- Time complexity: O(n²).  
For large n this is not efficient.

**Optimization:**  
- If we sort the array, the **smallest difference must occur between two adjacent elements** after sorting.  
- This is because any non-adjacent elements will have at least as large a difference as the closest adjacent pair.
- So, sort the list, compare each xᵢ with xᵢ₊₁, and track the minimum: O(n log n) time.

**Trade-offs:**  
- O(n log n) due to sorting vs. O(n²) for brute force.
- We use O(1) extra space if we can sort in-place, else O(n) required for storing a copy.

### Corner cases to consider  
- List has only two elements.
- List contains duplicates (minimum difference is zero).
- All elements negative, or all positive, or mixed.
- Large numbers (to avoid overflow in other languages).
- Points already sorted or reverse-sorted.

### Solution

```python
def shortest_distance_in_line(x):
    # Sort the input to bring closest values together
    x.sort()
    # Initialize min_distance to a large number
    min_distance = float('inf')
    # Compare each adjacent pair, since closest pair must be adjacent after sort
    for i in range(1, len(x)):
        distance = abs(x[i] - x[i-1])
        if distance < min_distance:
            min_distance = distance
    return min_distance
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) — Sorting dominates; single linear scan after sort.
- **Space Complexity:** O(1) if sorting in place, else O(n) if sort returns a new list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is very large and can’t be loaded into memory?
  *Hint: How can you stream the data to find a minimum gap, or does the problem require all data up-front?*

- How would you change the approach if the question asked for the k smallest distances, not just the minimum?
  *Hint: Consider storing distances in a heap or extra array after sorting.*

- How would you find not just the minimum distance but also all pairs that realize this distance?
  *Hint: Store all pairs whose differences match min_distance during the post-sort scan.*

### Summary
The core insight is that for points on a 1D line, the minimal absolute difference appears between two adjacent sorted values.  
Sorting, then performing a single linear scan, allows us to efficiently solve the problem in O(n log n) time using the **“Sort and Compare Adjacent”** pattern. This strategy is broadly useful for nearest-neighbor or minimal-difference-type problems across arrays and lists.