### Leetcode 2540 (Easy): Minimum Common Value [Practice](https://leetcode.com/problems/minimum-common-value)

### Description  
Given two integer arrays sorted in non-decreasing order, return the **smallest integer** that appears in both arrays. If there is no common integer, return **-1**.  
You can assume both arrays are non-empty and contain values in the range 1 ≤ nums1[i], nums2[j] ≤ 10⁹.

### Examples  

**Example 1:**  
Input: `nums1 = [1,2,3], nums2 = [2,4]`  
Output: `2`  
*Explanation: The smallest value that appears in both arrays is 2.*

**Example 2:**  
Input: `nums1 = [1,2,3,6], nums2 = [2,3,4,5]`  
Output: `2`  
*Explanation: Both arrays contain 2 and 3; 2 is the smallest, so we return 2.*

**Example 3:**  
Input: `nums1 = [1,5,10], nums2 = [2,3,4]`  
Output: `-1`  
*Explanation: There is no value common to both arrays, so we return -1.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force approach would involve comparing each element of one array with all elements of the other, which would be O(m×n)—too slow for large arrays.

However, since both arrays are **sorted**, we can use the **two-pointer approach**:
- Start pointers at the beginning of each array.
- Compare elements. If equal, return that element.
- If nums1[i] < nums2[j], increment i; else, increment j.
- If end of either array is reached, return -1.  
This works efficiently in linear O(m+n) time.

This approach is optimal because we exploit the sorting to avoid unnecessary comparisons, guaranteeing that the first match is the minimum common value.

### Corner cases to consider  
- Arrays with no overlapping elements (output should be -1).
- Arrays where first element itself is the common value.
- Arrays of length 1.
- Arrays with all identical elements.
- Arrays with multiple common elements (should return the smallest).
- Large values and value at upper/lower boundary (e.g., 1, 10⁹).
- Arrays with duplicate values.

### Solution

```python
def get_common(nums1, nums2):
    # Initialize pointers for both arrays
    i = 0
    j = 0

    # Traverse both arrays with two pointers
    while i < len(nums1) and j < len(nums2):
        if nums1[i] == nums2[j]:
            # Found the smallest common value
            return nums1[i]
        elif nums1[i] < nums2[j]:
            # Move pointer i forward to catch up
            i += 1
        else:
            # Move pointer j forward to catch up
            j += 1

    # No common value found
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m+n), since each pointer traverses at most the length of its array.
- **Space Complexity:** O(1), as only pointers and a few variables are used for bookkeeping—no extra space proportional to input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the arrays are not sorted?
  *Hint: Can you preprocess them? What data structure could help?*
- How would you solve it if you had to find **all** common elements, not just the minimum?
  *Hint: Consider extending the two-pointer technique or using a hash set.*
- What if one array is much smaller than the other?
  *Hint: When is it better to use hashing or binary search?*

### Summary
This solution uses the classic two-pointer pattern for sorted arrays, minimizing comparisons by leveraging order. It’s a standard approach for “find intersection” or “merge” style problems, commonly seen in tasks such as merging sorted lists or finding intersecting elements between datasets. This pattern is broadly applicable whenever operations depend on sorted order.


### Flashcard
Use two pointers on sorted arrays, advancing the smaller one until a common value is found or one array is exhausted.

### Tags
Array(#array), Hash Table(#hash-table), Two Pointers(#two-pointers), Binary Search(#binary-search)

### Similar Problems
- Intersection of Two Arrays(intersection-of-two-arrays) (Easy)
- Intersection of Two Arrays II(intersection-of-two-arrays-ii) (Easy)