### Leetcode 350 (Easy): Intersection of Two Arrays II [Practice](https://leetcode.com/problems/intersection-of-two-arrays-ii)

### Description  
Given two integer arrays, **nums1** and **nums2**, return their intersection—where *each element in the result must appear as many times as it shows up in both arrays*. You can return the result in any order. For example, if an element occurs twice in both arrays, it should appear twice in the output.

### Examples  

**Example 1:**  
Input: `nums1 = [1,2,2,1]`, `nums2 = [2,2]`  
Output: `[2,2]`  
*Explanation: Both arrays contain two 2s. The intersection keeps both of them, so the result is [2,2].*

**Example 2:**  
Input: `nums1 = [4,9,5]`, `nums2 = [9,4,9,8,4]`  
Output: `[4,9]`  
*Explanation: nums2 has two 4s and two 9s, but nums1 only has one of each, so the intersection is [4,9]. The order doesn't matter.*

**Example 3:**  
Input: `nums1 = [3,1,2]`, `nums2 = [1,1]`  
Output: `[1]`  
*Explanation: 1 appears once in nums1 and twice in nums2, so the intersection only includes it once (minimum of each count).*

### Thought Process (as if you’re the interviewee)  
First, consider the brute force solution: For each element in nums1, look for it in nums2, and remove it if found, add to result. This works but is O(n×m), which isn't efficient.

To optimize, I think of using a hash map (dictionary) to count the frequency of each element in one array (say, nums1). Then, as I traverse nums2, if the element exists in the map and its count is above zero, I add it to the result and decrease its count. This is efficient: counting is O(n), and traversing is O(m). Space is minimum of the array lengths, since the hash map only tracks the smaller array.

Alternatively, if arrays are already sorted or can be sorted, I could use two pointers: move pointers forward, collect intersection where elements match. This works in O(n log n + m log m) due to sorting.

I choose the hash map approach for general arrays, as it is easy to implement and has good performance.

### Corner cases to consider  
- One or both arrays are empty (should return an empty array)
- Arrays with no intersection (should return empty array)
- Arrays with all identical elements
- Arrays with negative numbers
- Arrays with only one element, or elements repeated multiple times

### Solution

```python
def intersect(nums1, nums2):
    # Always build the counter from the smaller array
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1  # swap so nums1 is smaller
    
    # Step 1: Count frequency of each number in nums1
    count = {}  # number -> frequency
    for num in nums1:
        count[num] = count.get(num, 0) + 1

    result = []
    # Step 2: For each number in nums2, if it's in count with freq > 0, append to result
    for num in nums2:
        if num in count and count[num] > 0:
            result.append(num)
            count[num] -= 1

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n and m are lengths of the two arrays. Counting (first for loop) is O(n), intersection build (second for loop) is O(m).
- **Space Complexity:** O(min(n, m)), because we only store counts for the smaller array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the arrays are sorted?
  *Hint: You can use two pointers to traverse both arrays in linear time without extra space beyond the output.*

- What if nums1 is stored on disk and can't be loaded into memory, while nums2 fits in memory?
  *Hint: Use a hash table for nums2, read nums1 in chunks, and check for matches.*

- What if you want to return only unique intersection elements (no duplicates in output)?
  *Hint: Use a set instead of counting occurrences.*

### Summary
This approach uses the **hash map counting pattern**, very common for intersection/union/count questions. This pattern is also useful for finding duplicates, grouping elements by frequency, and counting occurrences efficiently. It avoids sorting unless required, and handles all element types quickly and space-efficiently. If arrays are sorted or can be sorted easily, two pointers might be more space-efficient.


### Flashcard
Use a hash map to count frequencies in one array, then for each element in the other array, add to result if count > 0 and decrement; ensures correct duplicates and O(n) time.

### Tags
Array(#array), Hash Table(#hash-table), Two Pointers(#two-pointers), Binary Search(#binary-search), Sorting(#sorting)

### Similar Problems
- Intersection of Two Arrays(intersection-of-two-arrays) (Easy)
- Find Common Characters(find-common-characters) (Easy)
- Find the Difference of Two Arrays(find-the-difference-of-two-arrays) (Easy)
- Choose Numbers From Two Arrays in Range(choose-numbers-from-two-arrays-in-range) (Hard)
- Intersection of Multiple Arrays(intersection-of-multiple-arrays) (Easy)
- Minimum Common Value(minimum-common-value) (Easy)