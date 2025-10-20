### Leetcode 1213 (Easy): Intersection of Three Sorted Arrays [Practice](https://leetcode.com/problems/intersection-of-three-sorted-arrays)

### Description  
Given three integer arrays, each sorted in strictly increasing order (no duplicates within the same array), find all values that appear in **all three arrays**. Return the result as a sorted list (which will be naturally sorted, since all three arrays are sorted).  
In an interview:  
*You are given three sorted lists. Return a list of elements present in all of them, in sorted order. How would you do this efficiently, leveraging the sorting?*

### Examples  

**Example 1:**  
Input: `arr1 = [1,2,3,4,5]`, `arr2 = [1,2,5,7,9]`, `arr3 = [1,3,4,5,8]`  
Output: `[1,5]`  
*Explanation: 1 and 5 are the only numbers found in all three arrays.*

**Example 2:**  
Input: `arr1 = [2,4,6]`, `arr2 = [1,3,5,7]`, `arr3 = [2,3,4,5]`  
Output: `[]`  
*Explanation: No element appears in all three arrays.*

**Example 3:**  
Input: `arr1 = [1]`, `arr2 = [1]`, `arr3 = [1]`  
Output: `[1]`  
*Explanation: There's only one element and it is present in all arrays.*

### Thought Process (as if you’re the interviewee)  
Let's start with the brute-force:  
- For every element in the first array, check if it exists in the second and third arrays (can use binary search since they're sorted). This would be O(n₁ × log n₂ + log n₃) where n₁ is length of arr1, etc, but it's not optimal.

But since all arrays are sorted, we can do better:
- Use a **three-pointer approach**:  
  - Start with i = 0 (arr1), j = 0 (arr2), k = 0 (arr3).  
  - Compare arr1[i], arr2[j], arr3[k].  
    - If they're *all equal*, collect that value and move all three pointers forward.
    - Else, advance the pointer(s) at the *smallest* value(s).
  - This way, we look at each element at most once: O(n₁ + n₂ + n₃), efficient and simple to code.  

Alternate: Use sets or dicts, but that adds unnecessary space and runtime, given the input is sorted.

### Corner cases to consider  
- Empty arrays: Any of arr1, arr2, arr3 is empty ⇒ output is [].
- No overlap: Arrays have no element in common.
- All arrays have all elements same (e.g., [1,2,3], [1,2,3], [1,2,3]).
- Different lengths.
- First match is at the end of the arrays.
- Arrays with just one element.

### Solution

```python
def arraysIntersection(arr1, arr2, arr3):
    # Initialize pointers for all arrays
    i, j, k = 0, 0, 0
    result = []
    # Loop until any pointer reaches the end
    while i < len(arr1) and j < len(arr2) and k < len(arr3):
        # If elements at all pointers are equal, collect the value
        if arr1[i] == arr2[j] == arr3[k]:
            result.append(arr1[i])
            i += 1
            j += 1
            k += 1
        else:
            # Advance the pointer(s) at the smallest value(s)
            min_val = min(arr1[i], arr2[j], arr3[k])
            if arr1[i] == min_val: i += 1
            if arr2[j] == min_val: j += 1
            if arr3[k] == min_val: k += 1
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n₁ + n₂ + n₃), where n₁, n₂, n₃ are the lengths of the input arrays.  
  Each pointer moves only forward; we never look backwards or revisit elements.
- **Space Complexity:** O(1) additional (excluding result). We use a few pointers and a result list that grows only with the number of shared elements (cannot be more than min(n₁, n₂, n₃)).

### Potential follow-up questions (as if you’re the interviewer)  

- What if there were **n sorted arrays** (not just 3)?  
  *Hint: Think of generalizing the pointer approach, or using a heap to track the minimum across n pointers.*

- What if **arrays were not sorted**?  
  *Hint: Sets/dictionaries can be used to track frequencies, or sort first, but increases complexity.*

- Can you do it **in-place** (modify input arrays) or with less space?  
  *Hint: Try minimizing the result storage or consider merging approaches if modifications are allowed.*

### Summary
We leveraged the property that all input arrays are sorted and applied a **multi-pointer (three-pointer)** technique to find common elements efficiently.  
This is a classic Two (or k) Pointer pattern—in general, used to merge or synchronize traversal across multiple sorted lists/arrays for intersection or union.  
This approach can be generalized to intersect k sorted arrays, with either pointers or a min-heap to keep in sync.


### Flashcard
Use three pointers (i, j, k) to traverse the sorted arrays in sync, collecting elements present in all three.

### Tags
Array(#array), Hash Table(#hash-table), Binary Search(#binary-search), Counting(#counting)

### Similar Problems
- Intersection of Two Arrays(intersection-of-two-arrays) (Easy)
- Intersection of Multiple Arrays(intersection-of-multiple-arrays) (Easy)