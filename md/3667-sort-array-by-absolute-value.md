### Leetcode 3667 (Easy): Sort Array By Absolute Value [Practice](https://leetcode.com/problems/sort-array-by-absolute-value)

### Description  
Given an array of integers, sort the array **in ascending order** by their absolute values.  
If two elements have the same absolute value, the **negative number appears before the positive** number.  
Return the sorted array in-place.

### Examples  

**Example 1:**  
Input: `[2, -7, -2, -2, 0, 2, 7]`  
Output: `[0, 2, -2, -2, 2, 7, -7]`  
*Explanation: The absolute values are `[2, 7, 2, 2, 0, 2, 7]`. Sorting by absolute, then by sign gives `[0, 2, -2, -2, 2, 7, -7]`.*

**Example 2:**  
Input: `[-1, 1, -1, 2]`  
Output: `[-1, -1, 1, 2]`  
*Explanation: Absolute values are `[1, 1, 1, 2]`. For equal absolute values (-1, 1), negative comes first. Two -1's, then 1, then 2.*

**Example 3:**  
Input: `[0, -3, -2, 2, 3, -3]`  
Output: `[0, -2, 2, -3, -3, 3]`  
*Explanation: Absolute values are `[0, 3, 2, 2, 3, 3]`. For abs=2, -2 before 2. For abs=3, -3 before 3. Output is `[0, -2, 2, -3, -3, 3]`.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  1. Create a list of tuples: each tuple contains (abs(x), sign(x), x).  
  2. Sort using this tuple, where abs(x) is primary, sign(x) (`-1` for negative, `1` for positive) is secondary.  
  3. Extract original values for output.

- **Optimal approach:**  
  Since built-in sort is typically not allowed, implement a **comparison-based sort** such as merge sort or quicksort.  
  - For comparing elements, use:  
    - abs(a) < abs(b) → a comes first  
    - abs(a) == abs(b) → smaller value (i.e. negative before positive) comes first  
  - This guarantees both the absolute and sign requirements.

- **Trade-offs:**  
  - Merge sort ensures stable sorting, and is easier to implement correctly for custom comparison.  
  - Quicksort might be less stable, but works as well (for this case stability is not strictly required since same absolute, negative always < positive).

### Corner cases to consider  
- Empty array (`[]`)
- Array with one element (`[5]`)
- All elements zero (`[0, 0, 0]`)
- Multiple elements with same absolute value, e.g. `[1, -1, 2, -2, -2]`
- Array with all positive or all negative numbers
- Very large/small integer values

### Solution

```python
def sort_by_absolute_value(nums):
    # Helper function for custom comparison
    def compare(a, b):
        abs_a, abs_b = abs(a), abs(b)
        if abs_a < abs_b:
            return -1
        elif abs_a > abs_b:
            return 1
        else:  # abs_a == abs_b
            if a < b:  # Place negative before positive
                return -1
            elif a > b:
                return 1
            else:
                return 0

    # Implement merge sort with this custom comparator
    def merge_sort(arr):
        if len(arr) <= 1:
            return arr

        mid = len(arr) // 2
        left = merge_sort(arr[:mid])
        right = merge_sort(arr[mid:])

        merged = []
        i, j = 0, 0

        while i < len(left) and j < len(right):
            if compare(left[i], right[j]) <= 0:
                merged.append(left[i])
                i += 1
            else:
                merged.append(right[j])
                j += 1

        # Append remaining elements
        merged.extend(left[i:])
        merged.extend(right[j:])
        return merged

    # Sort and update nums in-place
    sorted_nums = merge_sort(nums)
    for i in range(len(nums)):
        nums[i] = sorted_nums[i]
    return nums
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  - Merge sort divides the array and combines sorted parts in log-linear time.  
  - Each comparison is constant-time.

- **Space Complexity:** O(n)  
  - Extra storage for the merged arrays in each recursive call.  
  - In-place merge sort is harder but requires less space; typical recursive merge sort is O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large arrays when space is limited?  
  *Hint: Consider in-place sorting algorithms, e.g., in-place quicksort.*

- Can you generalize the sorting to other custom comparison rules?  
  *Hint: Parameterize comparator; test for other custom criteria.*

- What if you had to implement this for a linked list instead of an array?  
  *Hint: Adapt merge sort to work on linked lists (since merge sort doesn’t require random access).*

### Summary
This problem is a classic **custom sort** pattern, focusing on sorting first by absolute value, then by sign (negative before positive).  
Implementing a comparison-based sort (like merge sort) with a custom comparator is a common technique, and this pattern often appears when sorting needs to respect multiple attributes (lexical, dates, priorities, etc.).  
Understanding how to write and apply custom comparators is useful and portable to many interview and job scenarios.

### Tags

### Similar Problems
