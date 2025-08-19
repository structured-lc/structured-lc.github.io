### Leetcode 2975 (Medium): Maximum Square Area by Removing Fences From a Field [Practice](https://leetcode.com/problems/maximum-square-area-by-removing-fences-from-a-field)

### Description  
Given a rectangular field of size (m-1) × (n-1) with its boundaries always present, plus some horizontal and vertical fences (not at boundaries), remove any subset of these inside fences to form the largest possible square region (with sides parallel to axes). The length of each side can only be determined by the distances between pairs of horizontal fences and pairs of vertical fences (including the boundaries). Your task is to find the area of the largest possible square that can be formed this way, modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `m = 4, n = 3, hFences = [2], vFences = [2]`  
Output: `4`  
*Explanation:  
Boundaries are at 1 and m (or n). After adding all fences: heights at [1,2,4], widths at [1,2,3]. The possible square side lengths are min of all possible vertical and horizontal distances: (2-1=1, 4-2=2, etc.)  
Both vertical and horizontal differences are {1,2}. Taking square of side 2, area = 2×2 = 4.*  

**Example 2:**  
Input: `m = 3, n = 3, hFences = [], vFences = [2]`  
Output: `1`  
*Explanation:  
Horizontal fences: [1,3], vertical fences [1,2,3]. Only possible square side length is 1 because the only differences are 1 in either dimension.*  

**Example 3:**  
Input: `m = 6, n = 7, hFences = [2,4], vFences = [3,5]`  
Output: `4`  
*Explanation:  
Horizontal fences at [1,2,4,6], vertical at [1,3,5,7].  
Horizontal diffs: (2-1=1, 4-2=2, 6-4=2, 4-1=3, 6-2=4, etc.), vertical diffs: (3-1=2, 5-3=2, 7-5=2, etc.).  
Largest common side is 2, so area = 4.*  

### Thought Process (as if you’re the interviewee)  
- We want the largest square. A square side length l can only be achieved if there exists a horizontal gap and a vertical gap both of size l.  
- Boundaries must be included (field starts at 1, ends at m or n).
- **Brute-force:** Try all pairs of horizontal fences to get all possible heights, and all pairs of vertical fences for widths. Find the intersection.
- This gives O(k²) for each direction (k ≈ 600). For each side length present in both, pick the max and return max².
- This is efficient as total fences are small (≤ 600), so intersection of two sets of O(k²) can be done easily.

### Corner cases to consider  
- No extra fences ⇒ Only boundary considered, so square sizes may be limited.
- All fences clustered together ⇒ Only small squares possible.
- No common gap size between horizontal and vertical.
- Duplicates in input (shouldn't affect, as sets are used).
- m or n ≤ 2 ⇒ Only side 1 possible.
- Large m, n but few fences.

### Solution

```python
def maximizeSquareArea(m, n, hFences, vFences):
    MOD = 10**9 + 7

    # Helper: Get all possible distances between pairs in fence positions (including boundaries)
    def get_differences(positions, limit):
        fences = [1] + sorted(positions) + [limit]
        diffs = set()
        for i in range(len(fences)):
            for j in range(i+1, len(fences)):
                diffs.add(fences[j] - fences[i])
        return diffs

    h_diffs = get_differences(hFences, m)
    v_diffs = get_differences(vFences, n)

    # Find largest common possible side
    common = h_diffs & v_diffs
    if not common:
        return 0  # No possible square
    max_side = max(common)
    return (max_side * max_side) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(h² + v²), where h and v are the number of horizontal and vertical fences. This is because for each direction, all pairs are checked (including the boundaries).
- **Space Complexity:** O(h² + v²) for storing all possible distances.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of fences is very large (e.g., 10⁵)?  
  *Hint: Is there a way to optimize the difference generation, maybe with only adjacent distances?*
- Suppose the square region does not have to be axis-aligned.  
  *Hint: How would you compute possible side lengths then?*
- Can you return the number of distinct maximal squares if their size occurs more than once?  
  *Hint: How would you count the number of pairs that generate the maximal side length?*

### Summary
This problem uses the common "set of all differences" technique, where for a limited set of positions we enumerate all possible distance pairs. The intersection approach ensures only square sizes feasible in both axes are considered. This pattern of "possible rectangle/square sizes from fences/lines" is common, and set intersection is an efficient trick whenever possible distances must be matched in two dimensions.

### Tags
Array(#array), Hash Table(#hash-table), Enumeration(#enumeration)

### Similar Problems
- Maximize Area of Square Hole in Grid(maximize-area-of-square-hole-in-grid) (Medium)