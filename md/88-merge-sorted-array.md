### Leetcode 88 (Easy): Merge Sorted Array [Practice](https://leetcode.com/problems/merge-sorted-array)

### Description  
You’re given two **sorted integer arrays** and asked to merge them together into a single sorted array, in-place. The first array, **nums1**, has enough extra space (zeroes at the end) to hold all elements from both arrays. The number `m` represents the valid elements in `nums1`, and `n` represents the length of `nums2`.   
Your task is to **merge nums2 into nums1**, so that after the function, `nums1` contains all elements (from both) in sorted non-decreasing order and remains the same size (`m + n`). The merge should happen **in-place** in `nums1` (not returning a new array)[1][2][3].


### Examples  

**Example 1:**  
Input: `nums1 = [1,2,3,0,0,0]`, `m = 3`, `nums2 = [2,5,6]`, `n = 3`  
Output: `[1,2,2,3,5,6]`  
*Explanation: nums1's first 3 elements are [1,2,3], nums2's are [2,5,6]. Merge and sort in place to get [1,2,2,3,5,6].*

**Example 2:**  
Input: `nums1 = [1]`, `m = 1`, `nums2 = []`, `n = 0`  
Output: `[1]`  
*Explanation: No elements to merge from nums2. nums1 remains unchanged.*

**Example 3:**  
Input: `nums1 = `, `m = 0`, `nums2 = [1]`, `n = 1`  
Output: `[1]`  
*Explanation: nums1 has 0 valid elements and room for 1; nums2 has [1]. nums1 becomes [1].*


### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Copy all elements from nums2 to the end of nums1 (where zeros are), then sort the combined array.  
  - Downside: Sorting takes O((m+n)log(m+n)) time, and it’s not using the fact that both arrays are already sorted.
- **Optimized (in-place merge):**  
  - Since nums1 has enough space at the end, start **filling nums1 from the back**.
  - Use three pointers:
    - p1 = m - 1 (last valid position in nums1)
    - p2 = n - 1 (last element in nums2)
    - p = m + n - 1 (last position in nums1)
  - Compare nums1[p1] and nums2[p2], put the larger at nums1[p], decrement pointers.
  - Continue until either array is exhausted.
  - If nums2 still has elements left (nums1 is done), copy all remaining nums2 elements to start of nums1.
  - Doing it **backwards** avoids overwriting the elements of nums1 that haven’t been moved yet[3][4].

**Trade-off:**  
- This approach avoids extra space and leverages the arrays’ sorted property, working in O(m+n) time and O(1) space.


### Corner cases to consider  
- Either array empty (`m == 0` or `n == 0`).
- All elements in nums2 are smaller or larger than in nums1.
- Duplicates across both arrays.
- Large input, repeated numbers.
- nums1 only has zeroes (m=0), nums2 fills all.
- nums2 only has zeroes or minimal values.


### Solution

```python
def merge(nums1, m, nums2, n):
    # Start from the end of the valid ranges
    p1 = m - 1    # last valid element in nums1
    p2 = n - 1    # last element in nums2
    p = m + n - 1 # last position in nums1 (to fill)

    # Merge in reverse order
    while p1 >= 0 and p2 >= 0:
        if nums1[p1] > nums2[p2]:
            nums1[p] = nums1[p1]
            p1 -= 1
        else:
            nums1[p] = nums2[p2]
            p2 -= 1
        p -= 1

    # If any elements remain in nums2, copy them
    while p2 >= 0:
        nums1[p] = nums2[p2]
        p2 -= 1
        p -= 1
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(m + n).  
  Each element is looked at most once, merged into its final place.
- **Space Complexity:** O(1).  
  All operations are in-place in nums1; only a few integer pointers needed.


### Potential follow-up questions (as if you’re the interviewer)  

- What if nums1 had no extra space at the end?  
  *Hint: Would require O(n) extra memory or outputting a new array instead of in-place.*

- How would you merge k sorted arrays, not just 2?  
  *Hint: Use a heap/priority queue or repeated pairwise merge for k-way merging.*

- How does this strategy generalize for linked lists?  
  *Hint: You can’t fill “from the end,” so you’d build a new list or use a dummy node and merge from the front.*


### Summary

The key pattern used here is the **two-pointer, reverse filling in-place** merge—a classic for sorted arrays with overflow capacity. This efficiently merges the arrays in O(m+n) time and constant extra space, and is a staple in problems involving merging data while minimizing extra storage. This idea also shows up in external sorting, merge sort’s merge step, and merging intervals or lists.


### Flashcard
Merge from the end using three pointers, filling nums1 from the back to avoid overwriting unprocessed elements.

### Tags
Array(#array), Two Pointers(#two-pointers), Sorting(#sorting)

### Similar Problems
- Merge Two Sorted Lists(merge-two-sorted-lists) (Easy)
- Squares of a Sorted Array(squares-of-a-sorted-array) (Easy)
- Interval List Intersections(interval-list-intersections) (Medium)
- Take K of Each Character From Left and Right(take-k-of-each-character-from-left-and-right) (Medium)