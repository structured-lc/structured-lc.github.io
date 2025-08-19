### Leetcode 1552 (Medium): Magnetic Force Between Two Balls [Practice](https://leetcode.com/problems/magnetic-force-between-two-balls)

### Description  
You are given an array `position` containing n integers, denoting positions on a number line where you can place balls. You are also given an integer `m`, the total number of balls to place. Place all the balls such that the minimum distance between any two balls is as big as possible. Return the maximum possible minimum distance between any two balls.

### Examples  

**Example 1:**  
Input: `position = [1, 2, 3, 4, 7], m = 3`  
Output: `3`  
*Explanation: Balls placed at positions 1, 4, 7. Minimum force (distance) is 3.*

**Example 2:**  
Input: `position = [5, 4, 3, 2, 1, 1000000000], m = 2`  
Output: `999999999`  
*Explanation: Balls placed at positions 1 and 1000000000. Minimum is 999999999.*

**Example 3:**  
Input: `position = [1, 3, 7, 9, 12], m = 4`  
Output: `3`  
*Explanation: Positions 1, 4, 7, 10; so minimal is 3.*

### Thought Process (as if you’re the interviewee)  
This problem is a type of "maximize the minimum" using greedy and binary search. If we fix a candidate minimum distance, can we place all balls with at least this distance? If yes, try a higher value; if not, reduce distance. 
1. Sort the positions.
2. Binary search on minimum possible force (distance) between balls.
3. For each candidate, greedily iterate and count how many balls can be placed.

### Corner cases to consider  
- Out-of-order positions, need to sort
- Very large or small values (positions, n, m)
- m = 2 (putting balls at extreme ends)
- All positions are clustered

### Solution

```python
def maxDistance(position, m):
    position.sort()  # Sort positions
    left, right = 1, position[-1] - position[0]  # Min, max possible distance
    res = 1
    
    def canPlace(dist):
        count, last = 1, position[0]
        for pos in position[1:]:
            if pos - last >= dist:
                count += 1
                last = pos
                if count == m:
                    return True
        return False
    
    while left <= right:
        mid = (left + right) // 2
        if canPlace(mid):
            res = mid
            left = mid + 1  # Try for bigger distance
        else:
            right = mid - 1  # Reduce distance
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log(max position)) — O(n) for canPlace check, O(log(range)) for binary search
- **Space Complexity:** O(1) extra space (apart from sort)

### Potential follow-up questions (as if you’re the interviewer)  
- What if you had to return the actual positions instead of just the value?  
  *Hint: Save the "placing" sequence during the canPlace check.*

- How would you solve it if positions can be changed or have costs per location?  
  *Hint: Consider cost function, perhaps greedy won't work directly.*

- Can you generalize to more than one dimension (2D, 3D) placements?  
  *Hint: This becomes a far more complex optimization problem.*

### Summary
Uses binary search on answer, a classic greedy + binary search mix for maximizing minimum pairwise distances (can also apply to cows-in-stalls, router placement, aggressive cows, etc). Very common interview pattern.

### Tags
Array(#array), Binary Search(#binary-search), Sorting(#sorting)

### Similar Problems
- Minimized Maximum of Products Distributed to Any Store(minimized-maximum-of-products-distributed-to-any-store) (Medium)