### Leetcode 565 (Medium): Array Nesting [Practice](https://leetcode.com/problems/array-nesting)

### Description  
You're given an integer array `nums` of length `n`, where each `nums[i]` is a unique integer in the range `0` to `n-1`. The value at each index represents another index in the array, forming a "pointer". Starting from any index, you can jump to the next index indicated by the value at your current position. By doing this repeatedly, you eventually revisit a previously seen index, forming a cycle. The task is to find the length of the longest such cycle ("nest") in the array.

### Examples  

**Example 1:**  
Input: `nums = [5,4,0,3,1,6,2]`  
Output: `4`  
*Explanation: Start at index 0 → nums=5 → nums[5]=6 → nums=2 → nums[2]=0. This forms the cycle [0,5,6,2], so the length is 4.*

**Example 2:**  
Input: `nums = [1,0,3,4,2]`  
Output: `3`  
*Explanation: Starting at index 2: 2 → 3 → 4 → 2. The cycle [2,3,4] has length 3. The cycles starting at other indices are shorter.*

**Example 3:**  
Input: `nums = [0,1,2]`  
Output: `1`  
*Explanation: Each index points to itself, so each nest is just that index (cycle length 1).*

### Thought Process (as if you’re the interviewee)  
Brute-force:  
- For each index, follow the sequence nums[i], nums[nums[i]], ..., and count the length until you revisit a node (cycle detected).
- To avoid doing redundant work, mark visited indices, so you never recount a cycle starting from an element that is already part of a processed cycle.
- The brute-force approach could be O(n²) due to revisiting nodes multiple times, but marking visited nodes optimizes this.

Optimized Approach:  
- For each index, if it hasn't been visited yet, traverse the cycle from that index, counting its length and marking all its elements as visited to avoid reprocessing.
- Marking visited can be done in-place (e.g., by setting `nums[i]` to `n` if all values are < n).
- This ensures each element is visited only once, providing O(n) time complexity.

Trade-offs:  
- The in-place method avoids extra space but mutates the input array.  
- If input mutation isn't allowed, you can use a separate boolean visited array—same asymptotic complexity, slightly higher memory cost.

### Corner cases to consider  
- Empty array (should return 0)
- All elements point to themselves (e.g., [0,1,2,...]): every nest length is 1
- A single large cycle covering the whole array
- Multiple small, disjoint cycles
- Very large input array (to test efficiency)

### Solution

```python
def arrayNesting(nums):
    n = len(nums)
    max_length = 0

    for i in range(n):
        if nums[i] < n:  # Not visited
            start = i
            count = 0
            while nums[start] < n:
                temp = nums[start]
                nums[start] = n  # Mark visited
                start = temp
                count += 1
            max_length = max(max_length, count)
    return max_length
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Every index is visited at most once in total, as we mark them as visited immediately.
- **Space Complexity:** O(1) — No extra space is used if visited marking is done in-place by modifying the input. If marking cannot mutate the input, O(n) extra space is needed for a visited array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if mutation of the input array is prohibited?
  *Hint: Think about using a separate visited array and its space implications.*
  
- What if the array is not a permutation (elements may be missing or duplicated)?
  *Hint: Cycles might overlap or break. How would your logic change?*

- How would you handle the case where the values are arbitrarily large integers and not confined to 0 to n-1?
  *Hint: The mapping may not be valid; cycles may not be well-defined.*

### Summary
This problem is a classic example of **cycle detection** in an array, and the most efficient implementation uses in-place marking to avoid extra space, ensuring each node is processed exactly once. This technique is common in problems with permutation arrays, mapping cycles, or when detecting repeated work is key to reducing time complexity. The pattern applies in cycle finding, linked-list cycle detection, and in O(1) space traversals wherever array values carry index semantics.

### Tags
Array(#array), Depth-First Search(#depth-first-search)

### Similar Problems
- Nested List Weight Sum(nested-list-weight-sum) (Medium)
- Flatten Nested List Iterator(flatten-nested-list-iterator) (Medium)
- Nested List Weight Sum II(nested-list-weight-sum-ii) (Medium)