### Leetcode 2363 (Easy): Merge Similar Items [Practice](https://leetcode.com/problems/merge-similar-items)

### Description  
Given two 2D integer arrays, **items1** and **items2**, each element is `[value, weight]`. For each unique value found across both arrays, sum all its weights. Return a list of `[value, total_weight]` for each unique value, sorted in ascending order by value.

### Examples  

**Example 1:**  
Input: `items1 = [[1,1],[4,5],[3,8]], items2 = [[3,1],[1,5]]`  
Output: `[[1,6],[3,9],[4,5]]`  
*Explanation: item 1 appears in both arrays, total weight = 1+5=6; item 3 appears in both arrays, total weight = 8+1=9; item 4 only in items1, weight = 5.*

**Example 2:**  
Input: `items1 = [[1,3],[2,2]], items2 = [[7,1],[2,3],[1,2]]`  
Output: `[[1,5],[2,5],[7,1]]`  
*Explanation: item 1: 3+2=5; item 2: 2+3=5; item 7: 1 (only in items2).*

**Example 3:**  
Input: `items1 = [[5,3]], items2 = [[5,5]]`  
Output: `[[5,8]]`  
*Explanation: item 5: 3+5=8; only one value overall.*

### Thought Process (as if you’re the interviewee)  
I need to merge the two lists by value, summing weights where values match.  
Brute-force: For each item in items1, scan items2 for the same value. This is inefficient: O(n\*m) time.  
Optimized approach:  
- Use a hash map (dictionary) to accumulate total weights for each value.
- Traverse both lists, update the map for each `[value, weight]` pair.
- At the end, build the result from the map, sort by key.  
This is efficient: O(N + M + K log K), where K is the number of unique values (usually ≤ 1000 per constraints).  
Since values appear to be bounded (e.g., 1 ≤ value ≤ 1000), we could also use a fixed-size array indexed by value (for even faster normalizing and sorting).

### Corner cases to consider  
- Both input lists are empty.
- Only one array is empty, the other contains items.
- All items have unique values (no merging).
- All items have the same value (fully merge).
- Duplicate values within one list (e.g., multiple [1, x] entries).
- Values at the bounds (1 or 1000).

### Solution

```python
def mergeSimilarItems(items1, items2):
    # Initialize array for value range as per constraints: 1 ≤ value ≤ 1000, so index up to 1000
    count = [0] * 1001

    # Accumulate weights from first list
    for value, weight in items1:
        count[value] += weight

    # Accumulate weights from second list
    for value, weight in items2:
        count[value] += weight

    # Collect [value, weight] sorted by value (as required), omit value=0
    result = []
    for value in range(1, 1001):
        if count[value] > 0:
            result.append([value, count[value]])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M + K), where N = len(items1), M = len(items2), and K = max possible value (up to 1000). Building the result is O(K).
- **Space Complexity:** O(K), for the count array. Input and output do not require extra space beyond reference.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the value range was unbounded (values can be much larger than 1000 or even negative)?
  *Hint: Use a hash map (dictionary) instead of a fixed-size array.*

- What if input lists are both sorted by value? Can you exploit this?
  *Hint: Merge with two pointers for a single linear pass, like in merge sort.*

- Can you handle the case where there are updates to the lists (insertions/deletions) between queries efficiently?
  *Hint: Use a more dynamic data structure (e.g., balanced BST, or maintain the sum with dict for each value).*

### Summary
This problem uses a **hash map accumulation pattern** (or, with value bounds, a counting array).  
It’s a classic instance of merging/aggregating items by key, which is common in database group-by, merging frequency arrays, or histogram/count-building tasks.    
If the value range is small and dense, a counting array is fastest; otherwise, dictionaries (maps) generalize to wider input domains.  
The coding pattern is highly reusable for aggregating properties by identifier.

### Tags
Array(#array), Hash Table(#hash-table), Sorting(#sorting), Ordered Set(#ordered-set)

### Similar Problems
- Merge Two 2D Arrays by Summing Values(merge-two-2d-arrays-by-summing-values) (Easy)