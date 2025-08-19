### Leetcode 2237 (Medium): Count Positions on Street With Required Brightness [Practice](https://leetcode.com/problems/count-positions-on-street-with-required-brightness)

### Description  
You are given an integer **n** representing the length of a street, which is laid out as positions `0` through `n-1`. There are several **street lamps** along the street, provided as a list of pairs: in each pair `[positionᵢ, rangeᵢ]`, the lamp is at position `positionᵢ` and lights up all positions from `max(0, positionᵢ - rangeᵢ)` to `min(n-1, positionᵢ + rangeᵢ)`, inclusive.  
You're also given an array **requirement** of length `n`, where `requirement[i]` gives the minimum number of lamps that must cover position **i** for it to be considered adequately lit.  
**Return:** The count of positions that have a brightness (coverage count) at least equal to their requirement.

### Examples  

**Example 1:**  
Input: `n = 5, lights = [[0,1],[2,1],[4,1]], requirement = [1,2,1,2,2]`  
Output: `4`  
*Explanation:  
- Lamp at 0, range 1: covers [0,1]  
- Lamp at 2, range 1: covers [1,2,3]  
- Lamp at 4, range 1: covers [3,4]  
Brightness: [1,2,1,2,1]  
Compare with requirement:  
Positions 0 (1≥1), 1 (2≥2), 2 (1≥1), 3 (2≥2) **meet** the requirement.  
Position 4 (1<2) does NOT.  
Total: 4.*

**Example 2:**  
Input: `n = 3, lights = [[1,1]], requirement = [0,2,0]`  
Output: `1`  
*Explanation:  
- Lamp at 1, range 1: covers [0,1,2]  
Brightness: [1,1,1]  
Only position 0 and 2 have requirement 0, position 1 has requirement 2, but brightness is 1.  
Only positions 0 and 2 meet requirement, but as 2 already requires at least 0.  
Position 1 fails.  
Total: 2.*

**Example 3:**  
Input: `n = 4, lights = [[2,2]], requirement = [1,1,1,1]`  
Output: `4`  
*Explanation:  
- Lamp at 2, range 2: covers [0,1,2,3]  
Brightness: [1,1,1,1]  
All positions have requirement 1, all met.  
Total: 4.*  

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For each position `i` on the street, count how many lamps cover `i` by looping through all lamps and checking whether `i` is within their `[positionᵢ - rangeᵢ, positionᵢ + rangeᵢ]`.
  - This would be O(n × m) where n = street length and m = number of lamps.  
  - Too slow for large inputs.

- **Optimized - Line Sweep / Difference Array:**  
  - For each lamp, increment brightness at `max(0, positionᵢ-rangeᵢ)` by 1, and decrement at `min(n, positionᵢ+rangeᵢ+1)` by 1 (out of bounds).
  - Do a prefix sum pass to recover per-position brightness.
  - Then for each position `i`, check if brightness[i] ≥ requirement[i].
  - Total time O(n + m) and space O(n).

- **Reason for approach:**  
  - The difference array efficiently simulates range additions, avoiding nested loops.
  - Pattern is very common for “range add, point query” or “range increment” problems.

### Corner cases to consider  
- Lamps with zero range (cover only their position).
- Overlapping lamp ranges.
- Lamp ranges that exceed street bounds (use `max(0, ...)` and `min(n-1, ...)`).
- All requirements zero, all positions "pass" by default.
- No lamps at all.
- n = 1 (single position).
- requirements of size different from n (invalid input but check bounds).

### Solution

```python
def meetRequirement(n, lights, requirement):
    # Create a brightness difference array of size n+1 for ease of implementation
    diff = [0] * (n + 1)
    
    # For each light, apply a range increment
    for position, rng in lights:
        start = max(0, position - rng)
        end = min(n - 1, position + rng)
        diff[start] += 1
        if end + 1 < n:
            diff[end + 1] -= 1

    # Prefix sum to recover per-position brightness
    brightness = [0] * n
    curr = 0
    for i in range(n):
        curr += diff[i]
        brightness[i] = curr

    # Count positions where brightness meets requirement
    count = 0
    for i in range(n):
        if brightness[i] >= requirement[i]:
            count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n is the length of the street and m is the number of lamps.  
  - Processing lights for difference array: O(m).
  - Prefix sum and final comparison: O(n).

- **Space Complexity:** O(n) — Used for the difference array and for the per-position brightness.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to support updates to lamp ranges or new lamps being switched on and off dynamically?  
  *Hint: Segment tree or Fenwick tree for faster range updates and queries.*

- How would the solution change if you needed to answer multiple queries regarding required brightness at arbitrary intervals?  
  *Hint: Precompute prefix sums or use advanced range query data structures.*

- What if the coverage radius is not symmetric or has different left/right values?  
  *Hint: Adjust how you calculate start and end ranges for each lamp accordingly.*

### Summary
This problem is a classic **range addition with point query** scenario, efficiently solved using a **difference array** (also known as line sweep or prefix sum difference technique). This pattern is common in interval problems, especially where overlapping updates are involved.  
Key ideas: convert range updates into two-point modifications, then prefix sum to get per-point results.  
Similar problems: **Range Addition** (Leetcode 370), skyline problems, subarray sum with updates, and some 2D image manipulation cases.  
Pattern is widely used for interval increment/count operations in competitive programming and real-world scenarios like event scheduling, lamps coverage, parking lots, etc.

### Tags
Array(#array), Prefix Sum(#prefix-sum)

### Similar Problems
- Range Addition(range-addition) (Medium)
- Brightest Position on Street(brightest-position-on-street) (Medium)
- Increment Submatrices by One(increment-submatrices-by-one) (Medium)