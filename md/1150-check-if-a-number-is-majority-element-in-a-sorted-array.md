### Leetcode 1150 (Easy): Check If a Number Is Majority Element in a Sorted Array [Practice](https://leetcode.com/problems/check-if-a-number-is-majority-element-in-a-sorted-array)

### Description  
Given a sorted array of integers `nums` and an integer `target`, determine if `target` is a *majority element*. A majority element is defined as an element that appears **more than** ⌊n/2⌋ times, where n is the length of `nums`. Return `True` if `target` is the majority, `False` otherwise.

### Examples  

**Example 1:**  
Input: `nums = [2,4,5,5,5,5,5,6,6]`, `target = 5`  
Output: `True`  
*Explanation: 5 appears 5 times in a list of length 9. Since 5 > 9/2 = 4.5, target is the majority.*

**Example 2:**  
Input: `nums = [10,100,101,101]`, `target = 101`  
Output: `False`  
*Explanation: 101 appears 2 times in a list of length 4. Since 2 > 2 is False, not a majority.*

**Example 3:**  
Input: `nums = [1,1,2,2,2,3,4]`, `target = 2`  
Output: `False`  
*Explanation: 2 appears 3 times in a list of length 7. Since 3 > 3.5 is False, not a majority.*

### Thought Process (as if you’re the interviewee)  
Since the array is **sorted**, finding how many times `target` appears can be done efficiently:

- **Brute-force:** Loop through and count occurrences.  
  - Time: O(n), but we can do better because array is sorted.

- **Optimized:** Use **binary search** to find the first and last position of `target`.
  - Count = last index - first index.
  - Check if count > ⌊n/2⌋.

Why this approach?
- Because the array is sorted, both lower and upper bounds for `target` can be found in O(log n) time.
- This is more efficient than O(n) counting.

**Trade-offs:**  
- O(log n) time complexity, O(1) extra space.
- The solution takes advantage of the input being sorted.

### Corner cases to consider  
- Empty array (`nums = []`).
- Array with no occurrence of `target`.
- All elements in `nums` equal to `target`.
- Array with only one element.
- Array where `target` is at start/end.
- Even and odd-length arrays.

### Solution

```python
def isMajorityElement(nums, target):
    # Helper to find first index ≥ x
    def lower_bound(array, x):
        left, right = 0, len(array)
        while left < right:
            mid = (left + right) // 2
            if array[mid] < x:
                left = mid + 1
            else:
                right = mid
        return left

    # Helper to find first index > x
    def upper_bound(array, x):
        left, right = 0, len(array)
        while left < right:
            mid = (left + right) // 2
            if array[mid] <= x:
                left = mid + 1
            else:
                right = mid
        return left

    n = len(nums)
    first = lower_bound(nums, target)
    last = upper_bound(nums, target)
    count = last - first

    return count > n // 2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n) — Two binary searches; each takes O(log n).
- **Space Complexity:** O(1) — Only a few variables used, no extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is not sorted?  
  *Hint: How would you count efficiently?*

- Can you solve it using a single pass (O(n))?  
  *Hint: Try to maintain a frequency counter.*

- Could you adapt this approach if more queries (many different targets) were asked on the same array?  
  *Hint: Preprocess with a hashmap of element counts for O(1) query time.*

### Summary
This problem demonstrates the **binary search lower/upper bound pattern** in sorted arrays—commonly used in element frequency queries or range search. It emphasizes improving brute-force O(n) solutions to O(log n) using sorted array properties, a recurring theme in problems involving frequency, range counting, or duplicates in sorted arrays.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
- Majority Element(majority-element) (Easy)
- Majority Element II(majority-element-ii) (Medium)