### Leetcode 1122 (Easy): Relative Sort Array [Practice](https://leetcode.com/problems/relative-sort-array)

### Description  
Given two integer arrays **arr1** and **arr2**, where the elements in **arr2** are distinct and every element in **arr2** also appears in **arr1**, sort **arr1** so that:  
- The relative order of elements in **arr1** is the same as in **arr2** for those elements that appear in **arr2**.  
- Elements in **arr1** not in **arr2** are placed at the end of **arr1**, sorted in ascending order.


### Examples  

**Example 1:**  
Input: `arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]`  
Output: `[2,2,2,1,4,3,3,9,6,7,19]`  
*Explanation: Elements in arr1 matching arr2 are reordered following arr2's order (all 2s, then 1, then 4, etc.). Remaining elements 7 and 19 placed in ascending order at the end.*

**Example 2:**  
Input: `arr1 = [28,6,22,8,44,17], arr2 = [22,28,8,6]`  
Output: `[22,28,8,6,17,44]`  
*Explanation: The elements 22,28,8,6 appear in arr2 and are placed first in that order. The rest (17 and 44) come last sorted ascending.*

**Example 3:**  
Input: `arr1 = [5,3,1,2,4], arr2 = [1,2,3]`  
Output: `[1,2,3,4,5]`  
*Explanation: Elements in arr2 appear first preserving their order; 4 and 5 do not appear in arr2, so they go at the end sorted ascending.*


### Thought Process (as if you’re the interviewee)  
The problem wants a customized sorting of **arr1** based on the order defined in **arr2**. A straightforward solution is:

- **Brute-force**: Scan **arr2** for each element and count occurrences in **arr1** for that element, then add results to output, finally add leftover elements sorted. This is inefficient due to repeated scanning of **arr1**.

- **Optimized approach**: Use a hashmap to count frequencies of all elements in **arr1**. Then iterate over **arr2** to append elements to the result in proper order using the counts. After that, collect leftover elements (not in **arr2**) and sort them ascending, then append to the result.

This final approach efficiently leverages the constraint that all arr2 elements are in arr1 and arr2 elements are distinct. It also avoids repeated scanning and sorts leftover elements only once.


### Corner cases to consider  
- **arr1 and arr2 both have minimum length (1)**  
- **arr1 contains all elements present in arr2 only** (no leftover elements)  
- **arr1 contains elements not present in arr2** (leftover elements to sort)  
- **arr1 and arr2 have elements in different orders**  
- **arr1 contains duplicates, arr2 elements are unique**  
- **arr1 or arr2 contain the maximum allowed values (e.g., 1000)**  
- Empty arrays (though constraints may disallow empty input)


### Solution

```python
def relativeSortArray(arr1, arr2):
    # Count frequencies of elements in arr1
    freq = {}
    for num in arr1:
        freq[num] = freq.get(num, 0) + 1

    result = []

    # Add elements in the order of arr2
    for num in arr2:
        count = freq.get(num, 0)
        result.extend([num] * count)
        freq[num] = 0  # Mark as used

    # Collect leftovers not in arr2 and sort them
    leftovers = []
    for num, count in freq.items():
        if count > 0:
            leftovers.extend([num] * count)
    leftovers.sort()

    # Append leftovers to result
    result.extend(leftovers)

    return result
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n = length of arr1. Building frequency map is O(n). Adding elements matching arr2 is O(m), where m = length of arr2 (≤ n). Sorting leftovers can be O(k log k), where k is leftover elements count. In worst case k = n, so sorting leftover dominates.

- **Space Complexity:** O(n) for frequency dictionary and result array storing all elements.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if arr2 was not guaranteed to have all elements present in arr1?  
  *Hint: Handle missing elements more carefully, possibly with default frequency 0.*

- Could you optimize the sorting of leftover elements if the value range is limited (e.g., 0 ≤ element ≤ 1000)?  
  *Hint: Use counting sort instead of comparison sort to reduce from O(k log k) to O(k).*

- How would you implement this if the inputs were streams and you could not store all elements to sort at once?  
  *Hint: Consider incremental sorting or outputting elements as counts are updated.*



### Summary  
This problem uses a classic sorting pattern customized by a given order array. The key is combining hashing for frequency counting and then ordering according to the reference array, followed by sorting leftovers. This technique is common in problems dealing with custom sorting conditions or frequency-based sorting (like top-K elements by frequency, or sorting by another sequence's order). It is efficient and leverages both hash maps and sorting in a combined approach.