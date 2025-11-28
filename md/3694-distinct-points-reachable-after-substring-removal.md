### Leetcode 3694 (Medium): Distinct Points Reachable After Substring Removal [Practice](https://leetcode.com/problems/distinct-points-reachable-after-substring-removal)

### Description  
Given a movement sequence as a string of characters ('U', 'D', 'L', 'R'), starting at (0,0), each character represents a single move in the 2D grid (up, down, left, right). You are to remove exactly one contiguous substring of length k from the given string. After performing the remaining moves, you end at a certain coordinate. **Your task** is to return the number of distinct possible coordinates you can reach after removing any such substring.

### Examples  

**Example 1:**  
Input: `s = "LUL", k = 1`  
Output: `2`  
Explanation:  
- Remove 1ˢᵗ 'L' → moves are "UL", ending at (−1,1).  
- Remove 'U' → moves are "LL", ending at (−2,0).  
- Remove 2ⁿᵈ 'L' → moves are "LU", ending at (−1,1).  
Distinct final positions: (−2, 0), (−1, 1).

**Example 2:**  
Input: `s = "UDLR", k = 4`  
Output: `1`  
Explanation:  
- Remove entire string (k=4), no moves performed: end at (0,0).  

**Example 3:**  
Input: `s = "UU", k = 1`  
Output: `1`  
Explanation:  
- Remove 1ˢᵗ 'U': moves are "U", ending at (0,1).  
- Remove 2ⁿᵈ 'U': moves are "U", ending at (0,1).  
Distinct position: (0,1).

### Thought Process (as if you’re the interviewee)  
- Brute force: For every possible substring of length k, simulate the movement by removing that substring, execute the remaining moves, and record the end coordinate.  
  - This is O(nk) per simulation and O(n-k+1) substrings, which is slow if n is large.
- Optimization:  
  - Observation: **Movements are additive**; each move changes x/y in a fixed way.
  - Precompute **prefix sums** for x and y movement up to each index.
  - For substring removal from indices i to i+k−1:
    - The effect is removing the net Δx, Δy of this substring.
    - Final position = position after all moves − net effect of the removed substring.
  - For every i (start index), compute the coordinates, add to a set.
  - Only O(n) time if prefix sums and substring deltas are used.

### Corner cases to consider  
- k = length of s (removes whole string, always ends at (0,0))
- s contains only one direction ('UUUU', k=1)
- k = 1 (removes each individual move)
- s is empty (n = 0)
- k = 0 (no substring removed, position after all moves)
- Duplicate substrings/positions (need count of unique points)

### Solution

```python
def distinct_points_after_removal(s: str, k: int) -> int:
    # Maps for movement: U(+1 y), D(-1 y), L(-1 x), R(+1 x)
    delta = {'U': (0, 1), 'D': (0, -1), 'L': (-1, 0), 'R': (1, 0)}
    n = len(s)

    # Compute prefix sums:
    # prefix_x[i]: total x after first i chars
    # prefix_y[i]: total y after first i chars
    prefix_x = [0] * (n + 1)
    prefix_y = [0] * (n + 1)
    for i in range(n):
        dx, dy = delta[s[i]]
        prefix_x[i+1] = prefix_x[i] + dx
        prefix_y[i+1] = prefix_y[i] + dy

    # Total movement with whole string
    total_x = prefix_x[n]
    total_y = prefix_y[n]

    unique_coords = set()
    # Remove substring of length k starting at i (0 ≤ i ≤ n−k)
    for i in range(n - k + 1):
        # Calculate the net change (delta_x, delta_y) for substring s[i:i+k]
        rem_x = prefix_x[i+k] - prefix_x[i]
        rem_y = prefix_y[i+k] - prefix_y[i]
        # After removal: (total_x - rem_x, total_y - rem_y)
        coord = (total_x - rem_x, total_y - rem_y)
        unique_coords.add(coord)

    return len(unique_coords)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  - Building prefix arrays: O(n)
  - Looping over all possible substrings: O(n)
  - Set operations (insert): O(1) amortized per insert.

- **Space Complexity:** O(n).  
  - Prefix arrays: O(n)
  - Set to store positions: O(n) in worst case (all distinct positions).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could remove any number of substrings of length k?  
  *Hint: Consider the combination of indices and possible overlapping substrings.*

- How would you handle obstacles on the grid (e.g., forbidden cells)?  
  *Hint: You need to verify each move for validity before updating the final position.*

- Can you return the list of coordinates, not just the count, sorted lexicographically?  
  *Hint: Store the coordinates in a sorted collection or sort before returning.*

### Summary
This approach utilizes the **prefix sum** coding pattern to efficiently query the net movement of any substring, which enables fast calculation of the effect of removing any substring window. This is a common pattern in problems where additive properties allow range queries to be answered in constant time, such as in range sum queries or difference calculation. It can be applied to path-based grid movement, cumulative sum range queries, and sliding window problems.


### Flashcard
Information not available in search results.

### Tags
Hash Table(#hash-table), String(#string), Sliding Window(#sliding-window), Prefix Sum(#prefix-sum)

### Similar Problems
