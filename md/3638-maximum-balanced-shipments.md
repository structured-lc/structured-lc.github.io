### Leetcode 3638 (Medium): Maximum Balanced Shipments [Practice](https://leetcode.com/problems/maximum-balanced-shipments)

### Description  
Given an integer array `weight` of length n representing the weights of n parcels arranged in a straight line.  
A **shipment** is a contiguous subarray (segment) of parcels.  
A shipment is called **balanced** if the weight of the last parcel in the segment is **strictly less than** the maximum weight among all parcels in that segment.  
You can select any number of **non-overlapping balanced shipments** (each parcel at most once; some parcels may not be shipped at all).  
**Return the maximum number of balanced shipments** that can be formed.

### Examples  

**Example 1:**  
Input: `weight = [2, 5, 3, 6, 4]`  
Output: `2`  
*Explanation:  
- Segment `[2, 5, 3]` (last=3, max=5 ⇒ 3 < 5: balanced)  
- Segment `[6, 4]` (last=4, max=6 ⇒ 4 < 6: balanced)  
Both are balanced and do not overlap.*

**Example 2:**  
Input: `weight = [1, 2, 3, 4]`  
Output: `0`  
*Explanation:  
No balanced shipment possible since, for every segment, the last parcel is never strictly less than the max in that segment (for any contiguous segment, the last is always the largest).*

**Example 3:**  
Input: `weight = [4, 2, 4, 3, 4, 2, 4]`  
Output: `3`  
*Explanation: (One possible selection)  
- `[4, 2]` (last=2, max=4 ⇒ 2 < 4)  
- `[4, 3]` (last=3, max=4 ⇒ 3 < 4)  
- `[4, 2]` (last=2, max=4 ⇒ 2 < 4)*

### Thought Process (as if you’re the interviewee)  
Start by considering all possible segments (brute-force). For every segment [i, j], check if the last element (weight[j]) is strictly less than the maximum in that segment. This naive approach is O(n³) if we check all segments and all combinations for overlaps.

However, note:  
- We need **non-overlapping** balanced segments and to maximize their count (not their size or total shipped weight).
- We want to partition the array greedily: each time we can form a balanced segment, we "cut" it and move ahead.

A better approach:  
- **Observation:** For any segment ending at position j, if there was an occurrence earlier in the current search window where some weight is strictly higher, and j is not itself the maximum in this segment, then it can be balanced.
- Traverse left to right. At each index, keep track of the maximum so far in this current candidate segment (`max_in_segment`).  
- When you find a position where `weight[i] < max_in_segment`, you can form a segment ending here, increment the count, and start fresh from i+1.

- **Why greedy works:** Since each shipment can't overlap and the requirement for balanced is independent, picking the *earliest possible* balanced shipment leaves maximal space for future partitions.

### Corner cases to consider  
- All elements are the same: no segment can be balanced.
- Only one parcel: can't be balanced.
- The array is in strictly increasing order: impossible to balance any segment.
- The whole array is strictly decreasing: many possible balanced shipments.
- Segments with length 1 (never balanced).
- Last parcel in the array forms a segment.

### Solution

```python
def maximumBalancedShipments(weight):
    n = len(weight)
    count = 0
    i = 0
    while i < n:
        max_in_segment = weight[i]
        # Try to find the minimal balanced segment starting at 'i'
        for j in range(i+1, n):
            max_in_segment = max(max_in_segment, weight[j])
            # If last parcel < max_in_segment, it's a balanced shipment
            if weight[j] < max_in_segment:
                count += 1
                i = j  # Start next scan from next parcel
                break
        else:
            # No balanced segment starting at i, move to next parcel
            i += 1
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), since for each parcel i, in the worst case, the inner loop scans up to n. In practice, the greedy partitioning means we skip ahead quickly.
- **Space Complexity:** O(1) extra space. No auxiliary storage except counters and pointers.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you output the actual list of shipments/indices, not just the count?  
  *Hint: Store the segment start and end whenever a balanced shipment is made.*

- Would the answer change if "less than" was "less than **or equal to**"?  
  *Hint: Consider the case where the last and max are equal. Adjust the checking accordingly.*

- What if each parcel appears in at **most k** shipments instead of 1?  
  *Hint: Dynamic programming or interval scheduling may be required.*

### Summary
The problem fits a **greedy, partitioning** pattern—specifically, the “split when you can, then continue” approach, similar to interval partitioning or greedy segmentation. Core techniques here involve scanning for local constraints and early splitting to maximize non-overlapping segment selection. This pattern occurs in greedy string segmentation, interval partitioning, and some “max number of partitions” problems.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Stack(#stack), Greedy(#greedy), Monotonic Stack(#monotonic-stack)

### Similar Problems
