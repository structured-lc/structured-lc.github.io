### Leetcode 1887 (Medium): Reduction Operations to Make the Array Elements Equal [Practice](https://leetcode.com/problems/reduction-operations-to-make-the-array-elements-equal)

### Description  
You are given an array of integers. In one operation, you can choose the largest number in the array and reduce it to the next-largest unique value already present in the array (i.e., to the next unique smaller number). Your goal is to make all elements in the array equal using the minimum number of such operations.  
Return the minimum number of operations needed.

### Examples  

**Example 1:**  
Input: `nums = [5, 1, 3]`  
Output: `3`  
*Explanation:*
- Find largest (5), replace one 5 with 3: `[3, 1, 3]` (1 operation)
- Now largest is 3, replace one 3 with 1: `[1, 1, 3]` (2 operations)
- Repeat: `[1, 1, 1]` (3 operations total)

**Example 2:**  
Input: `nums = [1, 1, 1]`  
Output: `0`  
*Explanation:*
- All elements already equal; no operations needed.

**Example 3:**  
Input: `nums = [1, 1, 2, 2, 3]`  
Output: `4`  
*Explanation:*
- Replace a 3 with 2: `[1, 1, 2, 2, 2]` (1)
- Replace one 2 with 1 (repeat for each 2 not originally 1):
  - `[1, 1, 1, 2, 2]` (2)
  - `[1, 1, 1, 1, 2]` (3)
  - `[1, 1, 1, 1, 1]` (4)
- Total operations: 4

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Simulate each operation, repeatedly selecting the maximum and replacing it, but this is too slow for large arrays (O(n²)).
- **Optimized Approach:** Notice that reducing the largest element to the next largest repeats for each count of that number.
- Sort the array. For each unique value from smallest to largest, keep track of how many unique groups we have passed. For each number greater than the smallest, count its occurrences and for each such number add the current group count to our operations.
- This works because each group above the minimum needs to be reduced as many times as there are unique values below it.

**Trade-offs:**  
- Sorting the array is O(n log n), which is efficient enough.
- This avoids explicit simulation and relies on grouping and counting.

### Corner cases to consider  
- Empty array (though constraints likely forbid this, still check).
- All elements already equal: no operations.
- Only two distinct values.
- Very large arrays or large value ranges but few unique numbers.
- Array with just one element.

### Solution

```python
def reductionOperations(nums):
    # Sort the numbers to group identical values together
    nums.sort()
    operations = 0
    unique_seen = 0  # How many unique values we've passed

    # Iterate through the sorted array starting from 1 (second element)
    for i in range(1, len(nums)):
        # Each time we find a new unique value
        if nums[i] != nums[i-1]:
            unique_seen += 1
        # For every value after the first, add unique_seen to operations
        operations += unique_seen

    return operations
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) to sort the array. The subsequent pass is O(n).
- **Space Complexity:** O(1) additional space for variables (ignoring the input array and sort).

### Potential follow-up questions (as if you’re the interviewer)  

- Could you solve it without sorting?
  *Hint: Can counting sort or hash-map grouping help since value range is large?*

- What if you wanted to report which elements to replace at each move?
  *Hint: Track the indices or original positions with values.*

- How would you handle very large arrays with limited memory?
  *Hint: Process in chunks or exploit counting if value range is constrained.*

### Summary
The main approach is a "group counting after sorting" pattern: we process elements in order and accumulate the number of operations based on unique values encountered. This is a frequent strategy for problems involving reductions, merges, or aggregation by unique values. The solution avoids brute-force simulation by turning the problem into an efficient counting-with-sorting problem, a common technique in competitive programming and technical interviews.


### Flashcard
Sort the array and count reductions needed to make all elements equal.

### Tags
Array(#array), Sorting(#sorting)

### Similar Problems
