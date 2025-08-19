### Leetcode 768 (Hard): Max Chunks To Make Sorted II [Practice](https://leetcode.com/problems/max-chunks-to-make-sorted-ii)

### Description  
Given an **integer array** arr, divide it into the **largest possible number of contiguous chunks** such that when you **sort each chunk independently** and then **concatenate** them, the resulting array is **sorted**.  
Return the maximum number of chunks you can make.

Imagine you are trying to split the array into as many parts as possible, but after sorting each part and sticking the results together in original order, you must end up with the same as a globally sorted array.

### Examples  

**Example 1:**  
Input: `[5,4,3,2,1]`  
Output: `1`  
Explanation: Even if you try to split the array, sorting the chunks and concatenating won't produce `[1,2,3,4,5]` unless you keep the whole array as a single chunk.

**Example 2:**  
Input: `[2,1,3,4,4]`  
Output: `4`  
Explanation: One valid way to split: `[2,1]`, `[3]`, `[4]`, `[4]`.  
- `[2,1]` sorts to `[1,2]`
- `[3]` (already sorted)
- `[4]` (already sorted)
- `[4]` (already sorted)  
Concatenating them: `[1,2,3,4,4]`, which is sorted.

**Example 3:**  
Input: `[1,1,0,0,1]`  
Output: `2`  
Explanation: `[1,1,0,0,1]`  
- Split as `[1,1,0,0]`, `[1]`  
- `[1,1,0,0]` sorts to `[0,0,1,1]`, then adding `[1]` gives `[0,0,1,1,1]` (sorted).

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try every possible way to split the array into contiguous chunks, sort each piece, and check if concat + sort gives the original sorted array. But for arrays of size up to 2000, this is far too slow.  
- **Optimization:**  
To split as many times as possible, for each index, ask: can I partition here? The key insight is that for array position i, if the *maximum so far* (left of i) is ≤ the *minimum from i+1 to end* (right of i+1), then you can safely split after i.  
But, **with duplicates and unordered values**, we can't just check the value directly.  
- **Better approach:**  
  - For each index i, keep track of the max value seen so far from the left.
  - Also, for every position from right, precompute the min value seen from the right.
  - At a boundary where leftMax ≤ rightMin, we can split. Count splits.
  - For even more efficient O(n) and less code: use a **stack**. Whenever the incoming value is less than the current chunk's maximum, you must merge chunks.  
Stack size at the end = number of split chunks possible.

### Corner cases to consider  
- Empty array (should return 0)
- Single element array (should return 1)
- Arrays with all equal elements (e.g., `[1,1,1,1]`)
- Arrays already sorted, already reversed
- Duplicates in chunks
- Minimum and maximum possible values

### Solution

```python
def maxChunksToSorted(arr):
    # Stack to store the current max of each chunk
    stack = []
    for num in arr:
        # If current number starts a new chunk, just add to stack
        if not stack or num >= stack[-1]:
            stack.append(num)
        else:
            # Need to merge current chunk with previous chunks
            max_in_chunk = stack.pop()
            # Merge all chunks where the chunk's max is > current num
            while stack and stack[-1] > num:
                stack.pop()
            # Push the max of merged chunk back to stack
            stack.append(max_in_chunk)
    return len(stack)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each element is processed once, and potentially each is pushed/popped from stack only once.
- **Space Complexity:** O(n)  
  In worst case, stack could store all elements if strictly increasing.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to return the actual chunks, not just the count?  
  *Hint: Track chunk start and ending positions as you process the array.*

- Can you extend this to handle non-contiguous chunks under new rules?  
  *Hint: How would sorting non-contiguous chunks affect the solution?*

- How would your algorithm change if you could only make at most k chunks?  
  *Hint: How might you merge or limit the number of splits?*

### Summary
This solution uses a **monotonic stack** pattern to merge overlapping chunks:  
If the current number is "smaller" than what's in the stack, merge with previous chunk(s) to ensure that after sorting, the final concatenation is globally sorted.  
The pattern of maintaining prefix-max or monotonic stacks appears in other chunking, histogram, and subarray boundary problems — especially those involving order and partitioning logic.

### Tags
Array(#array), Stack(#stack), Greedy(#greedy), Sorting(#sorting), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Max Chunks To Make Sorted(max-chunks-to-make-sorted) (Medium)