### Leetcode 3682 (Medium): Minimum Index Sum of Common Elements [Practice](https://leetcode.com/problems/minimum-index-sum-of-common-elements)

### Description  
Given two lists of strings, **list1** and **list2**, find all strings that are present in both lists and have the **minimum sum of indices** (i + j, where string appears at index i in list1 and index j in list2).  
If there are multiple strings with the same minimum index sum, return all of them.  
The answer can be returned in any order.

### Examples  

**Example 1:**  
Input: `list1 = ["Shogun","Tapioca Express","Burger King","KFC"], list2 = ["Piatti","The Grill at Torrey Pines","Hungry Hunter Steakhouse","Shogun"]`  
Output: `["Shogun"]`  
*Explanation: "Shogun" appears at index 0 in list1 and index 3 in list2. Index sum = 0 + 3 = 3. No other common restaurant, so output is ["Shogun"].*

**Example 2:**  
Input: `list1 = ["Shogun","Tapioca Express","Burger King","KFC"], list2 = ["KFC","Shogun","Burger King"]`  
Output: `["Shogun"]`  
*Explanation: Common restaurants are "Shogun", "KFC", "Burger King".  
Indices for "Shogun": 0 + 1 = 1  
Indices for "KFC": 3 + 0 = 3  
Indices for "Burger King": 2 + 2 = 4  
Minimum index sum is 1 for "Shogun". Output ["Shogun"].*

**Example 3:**  
Input: `list1 = ["happy","sad","good"], list2 = ["sad","happy","good"]`  
Output: `["sad","happy"]`  
*Explanation:  
"happy": indices 0 + 1 = 1  
"sad": indices 1 + 0 = 1  
"good": indices 2 + 2 = 4  
Both "sad" and "happy" have the minimum sum 1. Output ["sad", "happy"].*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  Try every pair of elements: for each string in list1, scan through list2 and check if it's common. If so, compute index sum (i + j) and keep track of the minimum index sum and corresponding strings. This is O(N × M), which is inefficient for large lists.

- **Optimized approach:**  
  Instead, use a hash map to store each string from list1 with its index.  
  Then, iterate through list2; for each element, if it's in the map, compute the sum of indices.  
  Track:
    - `min_sum`: The minimum index sum found so far.
    - `result`: All strings that achieve this minimum index sum.
  For each common string:
    - If new sum < min_sum, clear result and add the string.
    - If sum == min_sum, add the string to result.
  This reduces time to O(N + M), since lookup in a hash map is O(1).

- **Trade-offs:**  
  The optimized approach uses extra memory for the hash map but gives faster lookup.  
  There are no recursion, no sorting required.

### Corner cases to consider  
- Both lists are empty (result should be [])
- No common elements (result should be [])
- Multiple strings share the same minimum index sum
- All strings are common and at different indices
- One list is much larger than the other
- Duplicate strings within a list (should not affect answer, as only the first occurrence is used)

### Solution

```python
def minimum_index_sum(list1, list2):
    # Map each string in list1 to its index
    index_map = {}
    for i, word in enumerate(list1):
        index_map[word] = i

    min_sum = float('inf')
    result = []

    # Traverse list2 and check for common strings
    for j, word in enumerate(list2):
        if word in index_map:
            idx_sum = index_map[word] + j
            # Found smaller index sum, clear previous results
            if idx_sum < min_sum:
                min_sum = idx_sum
                result = [word]
            # Same index sum as current min, append to results
            elif idx_sum == min_sum:
                result.append(word)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N + M), where N is length of list1 and M is length of list2  
  - Building index_map takes O(N)
  - Traversing list2 and checking hash map is O(M)

- **Space Complexity:**  
  O(N), used for the hash map to store indices from list1

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are *very large* lists (millions of entries)?
  *Hint: Can you create the index map for the smaller list to save space?*

- What if the input lists can contain duplicates?
  *Hint: Should you use only the first index? What if both lists have duplicates?*

- What if you want the actual pairs of indices for each result?
  *Hint: How would you modify the result structure to support this?*

### Summary
This problem is a textbook example of using a **hash map for efficient look-up and index tracking**.  
The coding pattern mirrors many "array intersection" or "first occurrence" style questions, where you preprocess one list for fast queries.  
You avoid brute-force nested loops and demonstrate optimization with O(N + M) time, and the technique applies to many similar array/string intersection problems.

### Tags

### Similar Problems
