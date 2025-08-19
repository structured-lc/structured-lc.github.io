### Leetcode 2677 (Easy): Chunk Array [Practice](https://leetcode.com/problems/chunk-array)

### Description  
Given an array and a chunk size, divide the array into multiple subarrays (chunks) each with at most the given size. The final chunk may have fewer elements. The original array must remain unmodified.

### Examples  

**Example 1:**  
Input: `arr = [1,2,3,4,5], size = 2`  
Output: `[[1,2],[3,4],[5]]`  
*Explanation: Group the array into subarrays of size 2: first [1,2], then [3,4], finally [5].*

**Example 2:**  
Input: `arr = [8,9,10,11,12], size = 3`  
Output: `[[8,9,10],[11,12]]`  
*Explanation: The first chunk is [8,9,10], and the remaining is [11,12].*

**Example 3:**  
Input: `arr = , size = 7`  
Output: `[]`  
*Explanation: Since array length < size, the entire array goes into one chunk.*

### Thought Process (as if you’re the interviewee)  
First, I want to group the elements by moving through the array in steps of 'size', collecting chunks as I go. The simplest brute-force approach is to use a for-loop, stepping from i = 0 up to the end, increasing i by the chunk size each time. For each step, I extract the subarray from i to i+size (exclusive) and add it to the result. We stop once we've included all elements.

This approach is efficient as it directly builds the chunks in one pass. Alternatives like repeatedly popping elements from the array would mutate the input (not allowed), or using recursion adds unnecessary overhead.

The for-loop method is clear, simple, and O(n).

### Corner cases to consider  
- Empty array: input arr = [], size = 2 → should return [].
- Chunk size larger than array: arr = [3,4], size = 5 → should return [[3,4]].
- Chunk size is 1: arr = [1,2,3], size = 1 → should return [[1], [2], [3]].
- Chunk size equals array length: arr = [1,2], size = 2 → should return [[1,2]].
- Array elements can be negative or zero.
- Ensure the function does not modify the original array.

### Solution

```python
def chunk_array(arr, size):
    # Resultant list to store the chunks
    result = []
    # Iterate over arr from i=0 to end, stepping by size
    for i in range(0, len(arr), size):
        # Slice the array from i to i+size (exclusive)
        chunk = arr[i:i+size]
        # Add the chunk to the result
        result.append(chunk)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(arr). We visit each element exactly once when forming and copying to chunks.
- **Space Complexity:** O(n). The output stores all n elements in new lists, and each chunk references a new list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input is a very large stream that can’t fit in memory?
  *Hint: How would you output or yield one chunk at a time as you process the input?*

- How would you handle modifying the function to take a generator as input?
  *Hint: Consider using generators/yield to produce chunks lazily.*

- Can you implement this in-place (without extra memory)?
  *Hint: Is it possible if chunks must be returned, not just processed?*

### Summary
This problem is a classic example of the sliding window or fixed-size chunking technique. The core pattern—grouping contiguous elements—appears in data batching, pagination, and stream processing. It’s efficient, simple, and a useful building block for larger programs.

### Tags

### Similar Problems
