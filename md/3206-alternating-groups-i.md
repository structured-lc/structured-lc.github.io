### Leetcode 3206 (Easy): Alternating Groups I [Practice](https://leetcode.com/problems/alternating-groups-i)

### Description  
Given an array `colors` representing a *circle* of tiles where each tile is colored either red (`0`) or blue (`1`), find the number of *alternating groups*.  
An **alternating group** is a group of 3 consecutive tiles (wrapping around the ends, since the arrangement is circular) such that the middle tile’s color is different from both its neighbors.

### Examples  

**Example 1:**  
Input: `colors = [1,1,1]`  
Output: `0`  
*Explanation: There are no groups of 3 consecutive tiles where the middle one is different from both neighbors. All are the same.*

**Example 2:**  
Input: `colors = [0,1,0,0,1]`  
Output: `3`  
*Explanation:  
- For positions 0,1,2: [0,1,0] — 1 is different from both 0s ⇒ count++
- For positions 1,2,3: [1,0,0] — 0 is not different from its right (both 0) ⇒ not counted  
- For positions 2,3,4: [0,0,1] — 0 is not different from its left (both 0) ⇒ not counted  
- For positions 3,4,0: [0,1,0] — 1 is different from both neighbors ⇒ count++
- For positions 4,0,1: [1,0,1] — 0 is different from both neighbors ⇒ count++  
Total: 3 groups.*

**Example 3:**  
Input: `colors = [0,1,1,0,1,0]`  
Output: `4`  
*Explanation:  
Check all consecutive triples around the circle: groups found at positions 0,1,2; 1,2,3; 3,4,5; 4,5,0.*

### Thought Process (as if you’re the interviewee)  
- Clarify the *alternating group* definition: check for triplets in the circle where the center tile is different from both its left and right neighbor.
- Since the array is circular, use modulo indexing for neighbors.
- Brute-force:  
  Scan every index i, treat it as the center, check if colors[i] ≠ colors[left] and colors[i] ≠ colors[right], where  
  left = (i-1+n)%n, right = (i+1)%n.
- This is O(n) as we look at every position once.
- No further optimization is needed since array length n ≤ 100.

### Corner cases to consider  
- All tiles the same color: output should be 0.  
- No alternating at all: all triplets are the same color.  
- Minium length: n = 3 ("triangle" of tiles: check one triplet, circularly).  
- Only two colors, but not in an alternating pattern.  
- Consecutive runs: like [0,0,1,1,0,1] or [1,0,1,0,1,0].  
- Duplicates at array ends: make sure wrapping is correct.

### Solution

```python
def numberOfAlternatingGroups(colors):
    n = len(colors)
    count = 0
    for i in range(n):
        # Use modulo for circular neighbors
        left = (i - 1 + n) % n
        right = (i + 1) % n
        if colors[i] != colors[left] and colors[i] != colors[right]:
            count += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of colors. We perform a constant-time check for each tile.
- **Space Complexity:** O(1), uses only fixed extra variables for counting (independent of input size).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you count alternating groups of larger sizes (e.g., groups of 5)?
  *Hint: Think about sliding window of size k and define the group criteria for "alternating".*

- How would you efficiently return the starting indices of each alternating group found?
  *Hint: Instead of only counting, store indices where the group condition holds.*

- What if the tiles can have more than 2 colors?
  *Hint: Try to generalize the check for "alternating" beyond binary colors.*

### Summary
The approach uses simple brute-force with modular arithmetic to handle the circular nature of the arrangement.  
This is a variation of **circular sliding window** or **wraparound array** pattern, often seen in ring buffer or circular structure problems.  
The coding pattern generalizes to cases where local groupings require custom neighbor checks, and can appear in pattern search in 2D grids, music intervals, or gaming board problems.