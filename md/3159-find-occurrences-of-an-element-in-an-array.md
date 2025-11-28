### Leetcode 3159 (Medium): Find Occurrences of an Element in an Array [Practice](https://leetcode.com/problems/find-occurrences-of-an-element-in-an-array)

### Description  
Given an integer array `nums` and a list of queries, each query contains an integer `x`. For each query, return a list of all indices where the element `x` occurs in `nums` in increasing order. If `x` does not occur, return an empty list.

You are required to process multiple queries efficiently.  
(Imagine in an interview: "Given an array, a lot of queries will arrive asking 'where does x appear in the array?'". Answer efficiently for each x.)

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,2,4,2], queries = [2,4]`  
Output: `[[1,3,5],[4]]`  
*Explanation: 2 appears at indices 1,3,5. 4 appears at index 4.*

**Example 2:**  
Input: `nums = [1,1,1], queries = [1,2]`  
Output: `[[0,1,2],[]]`  
*Explanation: 1 appears at indices 0,1,2. 2 does not exist in nums, so an empty list.*

**Example 3:**  
Input: `nums = [7,8,9], queries = [9,7,8]`  
Output: `[[2],,[1]]`  
*Explanation: 9 at index 2, 7 at index 0, 8 at index 1.*

### Thought Process (as if you’re the interviewee)  
A brute-force idea is:  
For every query, iterate through `nums` and collect the indices where the value equals the query value.  
But with multiple queries (potentially up to 10⁵), this approach could be very slow (O(q × n)).

A better approach is:  
- Preprocess the array: For each value in nums, store a list of all its indices.
- Build a hashmap: key = value, value = list of indices.
- For each query, just look up the hashmap.

This reduces the time complexity to O(n + q):

- Build the hashmap: O(n)
- Answer each query: O(1) per query (since each output is a list we've already built).

Trade-off:  
- Space: Need additional storage for the hashmap (but within O(n)).
- Much faster for repeated queries.

### Corner cases to consider  
- Empty nums array.
- Queries have values not in nums.
- Multiple same queries.
- nums contains only a single element.
- All elements in nums are the same.
- nums contains negative, zero, or large values.
- Queries array is empty.

### Solution

```python
def find_occurrences(nums, queries):
    # Step 1: Preprocess - build a hashmap from each value to its indices
    occurrences = {}
    for idx, num in enumerate(nums):
        if num not in occurrences:
            occurrences[num] = []
        occurrences[num].append(idx)

    # Step 2: For each query, return the list from the hashmap (or [])
    result = []
    for q in queries:
        if q in occurrences:
            result.append(occurrences[q])
        else:
            result.append([])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + q + total_k)  
  - n for building the hashmap (one pass through nums).  
  - q for iterating through queries.  
  - total_k = total number of occurrences across all queries (to output answer).
- **Space Complexity:** O(n + q + output size)  
  - O(n) for the hashmap.
  - O(q + output size) for the result.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is updated heavily between queries?  
  *Hint: Consider dynamic data structures; can we update our index mapping efficiently?*

- What if queries ask for the kᵗʰ occurrence of an element?  
  *Hint: Precompute and index each position occurrence.*

- How would you design for this if memory was constrained and n was very large?  
  *Hint: Think about on-disk data, or processing queries in streaming fashion.*

### Summary
This is an example of the "preprocess for fast queries" pattern, using a hashmap to store positions for each value, then answering lookups in O(1) for each query. It's related to indexing, frequency counting, or grouping patterns—frequently applied in problems involving repeated queries over static arrays.


### Flashcard
Preprocess: build a hashmap mapping each value to its list of indices; for each query, look up the hashmap and return the stored indices in O(1) per query.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
