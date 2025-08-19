### Leetcode 217 (Easy): Contains Duplicate [Practice](https://leetcode.com/problems/contains-duplicate)

### Description  
Given an array of integers, determine if the array contains any duplicates.  
Return **true** if any value appears at least twice; return **false** if every element is distinct.

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 3, 1]`  
Output: `True`  
*Explanation: The value 1 appears twice in the array, so return True.*

**Example 2:**  
Input: `nums = [1, 2, 3, 4]`  
Output: `False`  
*Explanation: All elements are unique, so return False.*

**Example 3:**  
Input: `nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]`  
Output: `True`  
*Explanation: The value 1 appears more than once, as do 3, 4, and 2, so return True.*

### Thought Process (as if you’re the interviewee)  
First, consider the brute-force approach: Check every pair in the array for equality. For each index i, compare `nums[i]` to each subsequent `nums[j]`, for all `j > i`. If any pair is equal, return True. While this is correct, it’s inefficient: O(n²) time complexity due to double-nested loops[3].  

An optimized approach is to use a **hash set** for constant-time lookups:  
- As you iterate through `nums`, check if the current number already exists in the set.  
  - If so, return True (duplicate found).
  - Otherwise, add it to the set and continue[1][2].  
This ensures you only visit each element once and each set operation is O(1), resulting in O(n) time and O(n) space.

You can also use sorting: sort the array, then check adjacent elements for equality. This reduces extra space to O(1) (if sorting in-place), but comes at the cost of O(n log n) time for sorting.

Finally, I would proceed with the hash set approach as it is the most straightforward and efficient for most cases.

### Corner cases to consider  
- Empty array (`[]`) → return False (no elements, thus no duplicates)
- Array with a single element (`[1]`) → return False
- Array with all elements the same (`[5, 5, 5]`) → return True
- Negative numbers or zeros
- Very large array (test efficiency)
- Already sorted input
- Array with different data types (though per problem, assume all elements are ints)

### Solution

```python
def contains_duplicate(nums):
    # Use a set to track unique numbers encountered so far
    seen = set()
    for num in nums:
        # If number already in set, duplicate found
        if num in seen:
            return True
        # Otherwise, add number to the set
        seen.add(num)
    # If no duplicates found, return False
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each element is checked and added to a set at most once. Set lookup and insertion are each O(1) on average (n = len(nums)).
- **Space Complexity:** O(n)  
  In the worst-case (all elements unique), the set may store all n elements.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve the problem if you cannot use extra space?  
  *Hint: Try sorting the array and comparing neighbors.*

- What if the array is so large it does not fit into memory (e.g., read from disk)?  
  *Hint: Consider using external sorting or a hash-based approach with chunking.*

- Can you return the first duplicate value instead of just True/False?  
  *Hint: Instead of returning True immediately, store and return the number when found.*

### Summary  
This problem uses the classic **Hash Set for duplicate detection** pattern. Scanning while tracking seen values ensures we detect duplicates efficiently.  
This coding pattern can be applied to other questions involving uniqueness or detecting repeats, such as finding the first repeating element or finding all duplicates in a list.

### Tags
Array(#array), Hash Table(#hash-table), Sorting(#sorting)

### Similar Problems
- Contains Duplicate II(contains-duplicate-ii) (Easy)
- Contains Duplicate III(contains-duplicate-iii) (Hard)
- Make Array Zero by Subtracting Equal Amounts(make-array-zero-by-subtracting-equal-amounts) (Easy)
- Find Valid Pair of Adjacent Digits in String(find-valid-pair-of-adjacent-digits-in-string) (Easy)