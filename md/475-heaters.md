### Leetcode 475 (Medium): Heaters [Practice](https://leetcode.com/problems/heaters)

### Description  
Given two lists of integers, **houses** and **heaters**, each representing positions along a horizontal line, find the **minimum radius** \(r\) such that every house is within distance \(r\) of at least one heater. All heaters have the same radius and can warm houses from their location − r to their location + r.

### Examples  

**Example 1:**  
Input: `houses = [1,2,3]`, `heaters = [2]`  
Output: `1`  
*Explanation: Heater at position 2 covers [1,3] with radius 1. Houses at 1 and 3 are exactly 1 unit from the heater. All houses are covered.*

**Example 2:**  
Input: `houses = [1,2,3,4]`, `heaters = [1,4]`  
Output: `1`  
*Explanation: Heater at position 1 covers [0,2], heater at position 4 covers [3,5]. All houses are within 1 unit of a heater.*

**Example 3:**  
Input: `houses = [1,5]`, `heaters = [2]`  
Output: `3`  
*Explanation: Heater at position 2 needs radius 3 to cover both house 1 (distance 1) and house 5 (distance 3).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
    For each house, calculate its distance to every heater and take the minimum. The answer is the maximum of these minimums.  
    - This is O(m \* n), where m = houses.length, n = heaters.length. Too slow for large inputs.

- **Optimization:**  
    - Sort both houses and heaters.  
    - For each house, use binary search to find the closest heater. This reduces finding the closest heater for each house to O(log n).  
    - For each house, compute distance to the nearest heater, then take the max distance needed over all houses (that must be the minimal possible radius that covers all).  
    - This approach is O(m log n), which is efficient for the constraints.

- **Trade-offs:**  
    - Sorting costs time (O(m log m) and O(n log n)), but overall time is dominated by O(m log n) for queries.
    - Avoids unnecessary brute-force checks and leverages the sorted positions for efficiency.

### Corner cases to consider  
- Houses or heaters located at the same position.
- Only one heater or one house.
- Houses or heaters arrays with duplicates.
- Very large or small values for positions (edge of allowed constraints).
- Houses all to the left/right of all heaters.
- Both arrays of length 1.

### Solution

```python
def findRadius(houses, heaters):
    # Sort houses and heaters for binary search use
    houses.sort()
    heaters.sort()
    
    def closest_heater(house):
        # Binary search to find the closest heater to given house
        left, right = 0, len(heaters) - 1
        while left < right:
            mid = (left + right) // 2
            if heaters[mid] < house:
                left = mid + 1
            else:
                right = mid
        # Now heaters[left] is the first heater ≥ house (may be out of bounds)
        dist_right = abs(heaters[left] - house)
        # Check left-1 heater (closest on left)
        if left > 0:
            dist_left = abs(heaters[left - 1] - house)
            return min(dist_left, dist_right)
        return dist_right  # No heater on the left

    min_radius = 0
    for house in houses:
        min_radius = max(min_radius, closest_heater(house))
    return min_radius
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
    - Sorting houses: O(m log m)  
    - Sorting heaters: O(n log n)  
    - For each house, binary search over heaters: m × O(log n)  
    - **Overall:** O(m log n + n log n + m log m), which simplifies to O(m log n + n log n) for large inputs.

- **Space Complexity:**  
    - O(1) extra (in-place sorting), plus O(m + n) for the input (excluding input storage).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the heaters have different radii?  
  *Hint: How would you pair houses to nearby heaters, and can you still use sorting or binary search?*

- How would you solve this if heaters and houses could appear at any point (floating point), not just integers?  
  *Hint: Does your binary search logic change with non-integer positions?*

- Can you do this in one sweep instead of per-house binary search?  
  *Hint: Try a two-pointer sweep through both sorted lists.*

### Summary
This problem uses the **closest element via binary search** pattern, commonly seen where you need to minimize maximum distances between points. It’s a powerful tweak for brute-force matching problems where both groups can be sorted. Variants are often found in allocation, coverage, k-closest, and facility location problems.

### Tags
Array(#array), Two Pointers(#two-pointers), Binary Search(#binary-search), Sorting(#sorting)

### Similar Problems
