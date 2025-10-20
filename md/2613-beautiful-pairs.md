### Leetcode 2613 (Hard): Beautiful Pairs [Practice](https://leetcode.com/problems/beautiful-pairs)

### Description  
Given two integer arrays of equal length, nums1 and nums2, find a pair of indices (i, j) with 0 ≤ i < j < n such that the value  
**|nums1[i] - nums1[j]| + |nums2[i] - nums2[j]|** is minimized.  
Return any such **pair [i, j]**.  
If there are duplicate pairs (nums1[x], nums2[x]), return the first two indices having the same values.

### Examples  

**Example 1:**  
Input: `nums1 = [1,2], nums2 = [3,5]`  
Output: `[0,1]`  
*Explanation: Only one possible pair, so [0, 1] is the answer. Calculation is |1-2| + |3-5| = 1 + 2 = 3.*

**Example 2:**  
Input: `nums1 = [1,1,2], nums2 = [2,2,3]`  
Output: `[0,1]`  
*Explanation: (nums1, nums2) = (1,2) and (nums1[1], nums2[1]) = (1,2) are identical, so we instantly return [0,1] as a beautiful pair.*

**Example 3:**  
Input: `nums1 = [1,3,2], nums2 = [3,1,3]`  
Output: `[0,2]`  
*Explanation: All pairs:*
- *(0,1): |1-3| + |3-1| = 2 + 2 = 4*
- *(0,2): |1-2| + |3-3| = 1 + 0 = 1 (minimum)*
- *(1,2): |3-2| + |1-3| = 1 + 2 = 3*  
*So, [0,2] is the answer.*

### Thought Process (as if you’re the interviewee)  
Start with brute-force: For every pair (i, j), compute |nums1[i] - nums1[j]| + |nums2[i] - nums2[j]|, track the minimum.  
This is O(n²) and too slow for n up to 100,000.

Key observations:
- If any pair of indices have the same (nums1, nums2) values, their difference is 0, which is the absolute minimal possible. So, first check for duplicates and return the first two such indices directly.
- For the general case, this is a computational geometry/Manhattan distance minimization problem, known to be solvable by a divide and conquer approach (like Closest Pair of Points).
- The optimal approach is to treat (nums1[i], nums2[i]) as points, sort and solve with divide and conquer in O(n log n).

Why?  
- Brute-force is too slow for large n.
- Checking for duplicates is fast using a hashmap.
- The Manhattan distance can be minimized leveraging geometric properties, with appropriate transformations.

### Corner cases to consider  
- Input arrays of length < 2.
- Multiple pairs with the same minimum distance: any such valid pair is acceptable.
- Duplicate values—this should be detected and returned instantly.
- Negative values in nums1/nums2.
- Arrays where all points are distinct and require geometric solution.

### Solution

```python
def beautiful_pairs(nums1, nums2):
    n = len(nums1)
    # Step 1: Map to detect duplicates (nums1[i], nums2[i])
    value_to_indices = {}
    for i in range(n):
        key = (nums1[i], nums2[i])
        if key in value_to_indices:
            # Return the two indices with duplicate values
            return [value_to_indices[key], i]
        value_to_indices[key] = i

    # Step 2: Prepare points as (x, y, idx)
    points = [(nums1[i], nums2[i], i) for i in range(n)]

    # Helper: Recursively find minimal pair using divide and conquer
    def closest_pair(points_sorted_x):
        length = len(points_sorted_x)
        if length <= 1:
            return float('inf'), (-1, -1)
        if length == 2:
            i1, i2 = points_sorted_x[0][2], points_sorted_x[1][2]
            dist = abs(points_sorted_x[0][0] - points_sorted_x[1][0]) + abs(points_sorted_x[0][1] - points_sorted_x[1][1])
            return dist, (min(i1, i2), max(i1, i2))
        mid = length // 2
        xm = points_sorted_x[mid][0]

        # Divide
        left = points_sorted_x[:mid]
        right = points_sorted_x[mid:]

        dl, pair_l = closest_pair(left)
        dr, pair_r = closest_pair(right)

        dmin, pair = (dl, pair_l) if dl < dr else (dr, pair_r)

        # Build strip: only need to check points close to mid in x coordinate
        strip = []
        for px in points_sorted_x:
            if abs(px[0] - xm) <= dmin:
                strip.append(px)
        strip.sort(key=lambda x: x[1])

        # Check up to 7 next points in strip (since Manhattan, need up to 7)
        sz = len(strip)
        for i in range(sz):
            for j in range(i+1, min(i+8, sz)):
                p, q = strip[i], strip[j]
                dist = abs(p[0]-q[0]) + abs(p[1]-q[1])
                if dist < dmin:
                    dmin, pair = dist, (min(p[2], q[2]), max(p[2], q[2]))
        return dmin, pair

    # Sort points by x for the geometric divide and conquer
    points_sorted_x = sorted(points, key=lambda x: (x[0], x[1]))
    _, ans_pair = closest_pair(points_sorted_x)
    return list(ans_pair)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  Sorting and the recursive divide-and-conquer for closest pair both require O(n log n) time.
- **Space Complexity:** O(n)  
  Extra space for arrays/maps and recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- Can the solution be adapted for three or higher dimensions?
  *Hint: Review Closest Pair algorithms for higher dimensions—note that time complexities grow with dimension.*

- How would your strategy change if we only needed the minimal value (not the indices)?
  *Hint: You would still use the closest pair approach, but only track the value, not pairs.*

- Is there an efficient way to do this if only up to 10⁴ inputs, but multiple queries on the same arrays?
  *Hint: Preprocessing could help, perhaps with appropriate spatial data structures.*

### Summary
This problem is a classic application of divide and conquer for the Closest Pair of Points problem, adapted for Manhattan (L₁) distance. Hashmap detects duplicates instantly. The geometric approach ensures O(n log n) performance, making it feasible for large datasets. The same divide and conquer pattern appears in computational geometry, where it’s used for minimal pairing and proximity queries.


### Flashcard
If any pair has identical values, return them; else, find the pair with minimal Manhattan distance.

### Tags
Array(#array), Math(#math), Divide and Conquer(#divide-and-conquer), Geometry(#geometry), Sorting(#sorting), Ordered Set(#ordered-set)

### Similar Problems
