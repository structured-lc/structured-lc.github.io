### Leetcode 1051 (Easy): Height Checker [Practice](https://leetcode.com/problems/height-checker)

### Description  
Given an array of **heights**, representing the current order of students in a line, determine how many students are not in the correct position if the students should be arranged in non-decreasing order of heights.  
To solve this, compare each student's current position to their position in a sorted version of the array, and count how many students are standing out of order.

### Examples  

**Example 1:**  
Input: `heights = [1,1,4,2,1,3]`  
Output: `3`  
*Explanation: Sorted order (expected): `[1,1,1,2,3,4]`.  
Compare element by element:
- 1 vs 1: OK
- 1 vs 1: OK
- 4 vs 1: mismatch
- 2 vs 2: OK
- 1 vs 3: mismatch
- 3 vs 4: mismatch  
Total mismatches: 3*

**Example 2:**  
Input: `heights = [5,1,2,3,4]`  
Output: `5`  
*Explanation: Sorted order: `[1,2,3,4,5]`.  
All elements are at the wrong position.*

**Example 3:**  
Input: `heights = [1,2,3,4,5]`  
Output: `0`  
*Explanation: The original array is already sorted, so no student is in the wrong position.*


### Thought Process (as if you’re the interviewee)  
My first step is to realize that the *expected* order is just the given heights array sorted in non-decreasing order.  
- If I compare the original array against a sorted copy, index by index, any difference implies that student is out of place.
- Brute-force: For each pair of indices, check if there's a mismatch. Since sorting costs O(n log n), we can do that and a single pass O(n) comparison; this is efficient for this problem size.
- Optimization: If all heights are within a known small range (like 1–100), I might use **counting sort** for O(n) sorting. But for an interview, the method above is clear and easily explainable.

### Corner cases to consider  
- Empty array: `heights = []`
- Single-element array: `heights = [x]`
- All elements identical: `heights = [2,2,2,2]`
- Already sorted array
- Strictly decreasing array
- Large input with all values in the smallest/largest range

### Solution

```python
def heightChecker(heights):
    # Step 1: Create a sorted copy ("expected" order)
    expected = sorted(heights)
    # Step 2: Count how many students are not in their correct place
    mismatch_count = 0
    for i in range(len(heights)):
        if heights[i] != expected[i]:
            mismatch_count += 1
    return mismatch_count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) — Sorting the array dominates, where n is number of students.
- **Space Complexity:** O(n) — One extra array (`expected`) is created for the sorted heights.

If **counting sort** is used (for small known ranges):  
- **Time Complexity:** O(n + k), where k = 100 if heights in [1,100].
- **Space Complexity:** O(n + k) — for count buckets and the output array.

### Potential follow-up questions (as if you’re the interviewer)  

- How can you optimize this if you know the heights always fit in a small range (for example, 1–100)?  
  *Hint: Counting sort can replace general-purpose sort for O(n) time.*

- Can you solve without creating an extra copy (`expected`) and only O(1) extra space?  
  *Hint: Can you use in-place counting or a two-pass method?*

- What would you do if the input array was too large to sort in memory (streaming input)?  
  *Hint: Consider whether you could process piecewise if only mismatches matter.*

### Summary
This is a classic application of the **sorting** and **comparison** pattern.  
- The problem tests your ability to compare an actual order to an expected one after sorting.
- The same approach arises in problems like checking if an array is sorted, or counting repositionings required for stable arrangement.  
- If the range is small and known, **counting sort** provides linear-time optimization.  
Pattern: "Sort and one-pass mismatch count" — frequently appears in array normalization, grading, or deviations-from-sorted-order interview problems.


### Flashcard
Compare the original heights array to its sorted version and count indices where values differ.

### Tags
Array(#array), Sorting(#sorting), Counting Sort(#counting-sort)

### Similar Problems
