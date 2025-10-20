### Leetcode 2956 (Easy): Find Common Elements Between Two Arrays [Practice](https://leetcode.com/problems/find-common-elements-between-two-arrays)

### Description  
Given two integer arrays, nums1 and nums2, return an array of two values:
- The count of elements in nums1 that also appear at least once in nums2.
- The count of elements in nums2 that also appear at least once in nums1.

In simpler terms: For each number in nums1, check if it's in nums2 at least once (count such nums1 values). Do the same for nums2 with respect to nums1.

### Examples  

**Example 1:**  
Input: `nums1 = [1,2,3], nums2 = [2,4]`  
Output: `[1,1]`  
*Explanation: 2 from nums1 exists in nums2, so answer1 = 1. 2 from nums2 exists in nums1, so answer2 = 1.*

**Example 2:**  
Input: `nums1 = [4,3,2,3], nums2 = [1,4,2,2]`  
Output: `[2,2]`  
*Explanation: 4 and 2 from nums1 exist in nums2 (answer1 = 2). 4 and 2 from nums2 exist in nums1 (answer2 = 2).*

**Example 3:**  
Input: `nums1 = [5,6,7], nums2 = [8,9]`  
Output: `[0,0]`  
*Explanation: No element from nums1 exists in nums2, and vice versa.*

### Thought Process (as if you’re the interviewee)  
First, I would consider the brute-force way:  
- For each element in nums1, scan all of nums2 to see if it’s present.  
- Repeat the same for nums2 with respect to nums1.  
- This method is O(n × m), which is inefficient for large arrays.

To optimize, I’d use sets:
- Store the unique values from nums2 in a set for fast membership testing.
- For each value in nums1, check if it exists in the nums2 set; count the number of such unique nums1 values.
- Repeat similarly: store nums1 as a set, then for each unique value in nums2, check if it is in nums1's set.
- This approach is O(n + m) time and avoids redundant checks.

I choose this set-based approach because lookups are O(1), space cost is reasonable, and it greatly simplifies the logic.

### Corner cases to consider  
- nums1 or nums2 is empty.
- All elements are the same in both arrays.
- No elements in common.
- Repeated elements (but only count unique appearances).
- Arrays of length 1.

### Solution

```python
def findIntersectionValues(nums1, nums2):
    # Use sets to store unique elements for fast lookup
    set1 = set(nums1)
    set2 = set(nums2)
    
    # Count how many unique values in nums1 are present in nums2
    count1 = 0
    for num in set1:
        if num in set2:
            count1 += 1

    # Count how many unique values in nums2 are present in nums1
    count2 = 0
    for num in set2:
        if num in set1:
            count2 += 1

    return [count1, count2]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n = len(nums1), m = len(nums2). Building both sets is O(n + m), and scanning through both for intersection checks is O(n + m).
- **Space Complexity:** O(n + m), for storing the sets containing all unique elements from nums1 and nums2.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the arrays are very large and elements are all within a small known range?
  *Hint: Use a fixed-size presence array (bucket or counting array) for even faster lookups and less memory overhead.*

- How would you return the actual common elements (not just their counts)?
  *Hint: Instead of counting, collect and return the intersection set itself.*

- What if you cannot use extra space and must do it in-place or with constant extra memory?
  *Hint: Consider sorting both arrays and using a two-pointer technique to find intersections.*

### Summary
This is a **hash set intersection** problem, using a common coding pattern for problems involving "presence in another collection." The set approach gives O(1) membership checks and O(n + m) runtime, which is optimal for unsorted arrays. Variations of this pattern apply to most array/set intersection, deduplication, and membership-check problems.


### Flashcard
Use sets to store unique elements from each array, then count intersections for O(n + m) time.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
