### Leetcode 986 (Medium): Interval List Intersections [Practice](https://leetcode.com/problems/interval-list-intersections)

### Description  
Given two lists of closed intervals—each sorted and with no overlapping intervals within the same list—return their intersection.  
Each intersection should also be a closed interval (i.e., includes both endpoints).  
The intersection of two intervals [a, b] and [c, d] is [max(a, c), min(b, d)], but only when max(a, c) ≤ min(b, d).  
You must return *all* such intersections for every combination of intervals from both lists without overlap or repetition.

### Examples  

**Example 1:**  
Input: `firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]`  
Output: `[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]`  
*Explanation:*
- [0,2] & [1,5] ⇒ [1,2] (overlap)
- [5,10] & [1,5] ⇒ [5,5] (endpoint touch)
- [5,10] & [8,12] ⇒ [8,10]
- [13,23] & [15,24] ⇒ [15,23]
- [24,25] & [15,24] ⇒ [24,24] (endpoint touch)
- [24,25] & [25,26] ⇒ [25,25]

**Example 2:**  
Input: `firstList = [[1,3],[5,9]], secondList = []`  
Output: `[]`  
*Explanation:*
- One list is empty, so no intersections.

**Example 3:**  
Input: `firstList = [[1,7]], secondList = [[3,10]]`  
Output: `[[3,7]]`  
*Explanation:*
- [1,7] & [3,10] ⇒ [3,7] (overlap is from 3 to 7)

### Thought Process (as if you’re the interviewee)  
First, the brute-force way is to compare each interval in the first list to every interval in the second list, find each pair’s intersection if they overlap, and add the result if the overlap is valid.  
But both lists are **sorted** and **disjoint within themselves**, so we don’t need to compare every pair. Instead, we can use the **two pointers** pattern:

- Start two pointers at the beginning of `firstList` (i) and `secondList` (j).
- For current intervals `[a1, b1] = firstList[i]` and `[a2, b2] = secondList[j]`, find overlap:
    - Start = max(a1, a2)
    - End = min(b1, b2)
    - If Start ≤ End, they overlap; add [Start, End] to the output.
- Move the pointer that has the earlier end (i.e., whichever interval ends first cannot produce any more overlaps).
- Repeat until one pointer reaches the end.
  
This approach is efficient because we only check valid candidates and move forward deterministically.

### Corner cases to consider  
- Either interval list is empty, e.g., `[]`  
- Intervals that only touch at edges but don’t overlap, e.g., [3,5] and [5,10] ⇒ [5,5]  
- Intervals in the lists are wide or narrow (single point intervals)  
- All intervals from one list may be before/after all intervals in the other  
- Intervals contained entirely within intervals from the other list  
- Very large interval values, but the logic doesn't change

### Solution

```python
def intervalIntersection(firstList, secondList):
    res = []
    i = j = 0

    while i < len(firstList) and j < len(secondList):
        a_start, a_end = firstList[i]
        b_start, b_end = secondList[j]

        # Find the overlap between firstList[i] and secondList[j]
        start = max(a_start, b_start)
        end = min(a_end, b_end)

        # If there is an overlap, add it to the result.
        if start <= end:
            res.append([start, end])

        # Move the pointer of the interval that ended first
        if a_end < b_end:
            i += 1
        else:
            j += 1

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m + n), where m and n are lengths of the two lists.  
  - We traverse each list at most once, moving pointers i and j only forward.
- **Space Complexity:** O(out), proportional to the number of intersections found and stored in the output.
  - No extra data structures are used except for the output.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the interval lists were *not* sorted?
  *Hint: Can you sort them first? How does this change time complexity?*
- How would you modify the code for open intervals (i.e., (a, b) vs [a, b])?
  *Hint: Overlap logic changes; you need to adjust the start and end comparisons.*
- If you wanted the *union* of intervals, not intersections, how would you change the approach?
  *Hint: This is the classic merge intervals problem.*

### Summary
This problem is a perfect illustration of the **two-pointer** pattern on sorted lists or arrays.  
By leveraging the sorted and disjoint properties of each interval list, we avoid unnecessary comparisons and maintain linear time complexity.  
This two-pointer technique frequently appears in problems related to interval merging, timeline sweeps, and array traversals—widely used in scheduling, event processing, or when merging sorted datasets.


### Flashcard
Use two pointers to scan both sorted interval lists; at each step, add intersection if intervals overlap, then advance pointer with smaller endpoint.

### Tags
Array(#array), Two Pointers(#two-pointers), Line Sweep(#line-sweep)

### Similar Problems
- Merge Intervals(merge-intervals) (Medium)
- Merge Sorted Array(merge-sorted-array) (Easy)
- Employee Free Time(employee-free-time) (Hard)
- Maximum Matching of Players With Trainers(maximum-matching-of-players-with-trainers) (Medium)