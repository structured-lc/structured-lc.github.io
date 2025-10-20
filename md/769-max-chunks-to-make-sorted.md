### Leetcode 769 (Medium): Max Chunks To Make Sorted [Practice](https://leetcode.com/problems/max-chunks-to-make-sorted)

### Description  
Given an array arr which is a permutation of [0, 1, ..., n-1], split the array into the largest possible number of consecutive "chunks" such that **independently sorting each chunk and concatenating them yields the fully sorted array**.  
Your task is to compute the maximum number of such chunks.

### Examples  

**Example 1:**  
Input: `[4,3,2,1,0]`  
Output: `1`  
Explanation:  
If you split anywhere, at least one chunk will contain numbers not in sorted order. For instance, splitting [4,3], [2,1,0] and sorting gives [3,4], [0,1,2] and concatenating forms [3,4,0,1,2], which is not fully sorted. The whole array must be a single chunk.

**Example 2:**  
Input: `[1,0,2,3,4]`  
Output: `4`  
Explanation:  
One possible split: [1,0], [2], [3], [4].  
- [1,0] sorts to [0,1], [2], [3], [4] are sorted. Concatenate to get [0,1,2,3,4] which is fully sorted.

**Example 3:**  
Input: `[0,2,1,3,5,4]`  
Output: `4`  
Explanation:  
Splitting as , [2,1], [3], [5,4]. Each chunk sorts to , [1,2], [3], [4,5] and concatenated yields [0,1,2,3,4,5], which is correct.

### Thought Process (as if you’re the interviewee)  
The brute-force way would be to try every possible split, sort each segment and check if concatenation results in a sorted array—this would be very slow.
  
There’s a crucial insight: since arr is a permutation of `[0, 1, ..., n-1]`, **all elements before a given index i must be able to form a perfectly continuous set if sorted**.

Track the maximum value seen so far as you iterate:
- For every position i, if the maximum value seen so far is exactly i, it means all elements from previous chunk end to i will organize themselves in locations ≤i when sorted—that is, they must together form the numbers 0..i in some order.
- Each such position is a valid "cut"—increase the chunk count.
  
This O(n) greedy approach is simple and reliable.

### Corner cases to consider  
- Empty array (not allowed in the constraints but think about it for robustness).
- Single element arrays: `` — should return 1.
- Already sorted: `[0,1,2,...,n-1]` — every element is its own chunk.
- Worst case: reversed array `[n-1,...,0]` — only one chunk for the entire array.

### Solution

```python
def maxChunksToSorted(arr):
    max_so_far = 0        # Largest value seen up to current index
    chunks = 0            # Number of valid chunks found

    for i, value in enumerate(arr):
        max_so_far = max(max_so_far, value)
        # If the max value so far equals current index, cut here
        if max_so_far == i:
            chunks += 1

    return chunks
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is length of arr. We pass through the array once, maintaining a running maximum.
- **Space Complexity:** O(1), only a few variables for counters and max tracking, no extra storage needed.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array can have duplicate values, or don't form a full permutation of 0..n-1?  
  *Hint: What property guarantees a correct chunk? Could you use prefix max and suffix min?*

- How would you modify the approach if the array could contain negative numbers or arbitrary integers?  
  *Hint: Consider tracking both prefix max and suffix min to find chunk boundaries.*

- Can you output the actual chunk subarrays (their boundaries), not just the count?  
  *Hint: Store cut indices when you make a chunk, then create slices.*

### Summary
This problem leverages a **prefix maximum / greedy partitioning** pattern, exploiting properties of permutations. This kind of approach is common in problems where you need to find where a set forms a valid segment for rearrangement or sorting (e.g. "partition labels", "groups of people standing in crowded line"). The running max trick generalizes to similar partitioning problems, especially in greedy or interval problems.


### Flashcard
Count a chunk whenever the max value seen so far equals the current index; this ensures all previous elements are in place.

### Tags
Array(#array), Stack(#stack), Greedy(#greedy), Sorting(#sorting), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Max Chunks To Make Sorted II(max-chunks-to-make-sorted-ii) (Hard)