### Leetcode 2672 (Medium): Number of Adjacent Elements With the Same Color [Practice](https://leetcode.com/problems/number-of-adjacent-elements-with-the-same-color)

### Description  
You are given an integer `n` representing the length of an array, initially all elements are uncolored (`0`). You receive a list of `queries`, where each query specifies an index and a color to paint that index with. After each query, you need to determine how many pairs of **adjacent elements** have the **same nonzero color**. Return a list where the iᵗʰ value is the answer after the iᵗʰ query.

### Examples  

**Example 1:**  
Input: `n = 4`, `queries = [[0,1],[1,2],[2,2],[1,1],[2,1]]`  
Output: `[0,0,1,0,1]`  
Explanation:  
- Step 1: [1,0,0,0] → no adjacent pairs  
- Step 2: [1,2,0,0] → no adjacent pairs  
- Step 3: [1,2,2,0] → 2 and 2 are adjacent → 1 pair  
- Step 4: [1,1,2,0] → color at 1 is now 1, but no adjacent same nonzero pairs  
- Step 5: [1,1,1,0] → positions 0-1 and 1-2 are both 1, so 2 adjacent pairs, but they overlap, so result is 1 pair (positions 0-1 and 1-2)  

**Example 2:**  
Input: `n = 2`, `queries = [[0,1],[1,1],[1,2]]`  
Output: `[0,1,0]`  
Explanation:  
- Step 1: [1,0] → no adjacent pairs  
- Step 2: [1,1] → positions 0-1 are the same, so 1 pair  
- Step 3: [1,2] → colors differ, so 0 pairs  

**Example 3:**  
Input: `n = 1`, `queries = [[0,9],[0,5]]`  
Output: `[0,0]`  
Explanation:  
- Step 1:  → only one element, no adjacent pairs  
- Step 2: [5] → still one element, no adjacent pairs  

### Thought Process (as if you’re the interviewee)  
At first glance, this looks like we need to iterate through the whole array after each query to count adjacent pairs. However, that's inefficient: O(q × n) for q queries.

If we notice, when processing a query at index i, only the pairs (i-1, i) and (i, i+1) can be affected. We can update a running counter of "same color adjacent pairs" by checking these neighbors before and after the color change:

- Before updating, if (i-1, i) or (i, i+1) are matching in color (and color nonzero), decrement the count (since we are about to possibly break these pairs).
- After the update, if (i-1, i) or (i, i+1) are matching (and nonzero), increment the count.

This reduces the work per query to O(1), for O(q) total, plus O(n) for initial setup.

This is optimal because each query only influences adjacent pairs at most.

### Corner cases to consider  
- n = 1: No adjacent pairs possible, array remains single.
- Re-coloring to the same color: Should not double-increment.
- Re-coloring causing both loss and new formation of pairs.
- Colors may be very large, but are just labels.
- Painting index back to a color previously used at a neighbor.

### Solution

```python
def colorTheArray(n, queries):
    # Initialize the array with zeros (uncolored)
    arr = [0] * n
    ans = []
    pairs = 0  # counts adjacent same nonzero color pairs

    for idx, color in queries:
        # For each query, 'idx' is position, 'color' is new color
        
        # If the existing color is the same, answer doesn't change
        if arr[idx] == color:
            ans.append(pairs)
            continue

        # If changing, need to check left and right neighbors
        # Remove pairs formed with old color first
        if idx > 0 and arr[idx] != 0 and arr[idx] == arr[idx-1]:
            pairs -= 1
        if idx < n - 1 and arr[idx] != 0 and arr[idx] == arr[idx+1]:
            pairs -= 1

        arr[idx] = color  # Apply the color

        # Add pairs formed with new color
        if idx > 0 and arr[idx] == arr[idx-1] and arr[idx] != 0:
            pairs += 1
        if idx < n - 1 and arr[idx] == arr[idx+1] and arr[idx] != 0:
            pairs += 1

        ans.append(pairs)

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(q), where q = len(queries), as each query only checks at most two neighbor pairs and updates in O(1).
- **Space Complexity:** O(n + q), for the array of size n and the answer list of size q.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you want to support undoing a query?  
  *Hint: Consider keeping a history or copy-on-write for the changed positions.*

- What if the input array started out already colored with arbitrary colors?  
  *Hint: Initialize the running count by scanning adjacent pairs once at the beginning.*

- What if you wanted to return not the running count after each query, but just once at the end?  
  *Hint: You can process queries in batch and only track the last state.*

### Summary
This approach is an example of incremental counting and **sweep line/local pair maintenance**: only updates involving neighbors can affect the answer, leading to an efficient O(1) per query. Patterns like this apply in dynamic array queries, 1D cellular automata, and games with local neighbor effects.