### Leetcode 1345 (Hard): Jump Game IV [Practice](https://leetcode.com/problems/jump-game-iv)

### Description  
You are given an array of integers. Starting at index 0, you want to reach the last index using the minimum number of jumps. On each move, you can:
- Jump to index i+1 if it exists,
- Jump to index i-1 if it exists,
- Jump to any index j where arr[j] == arr[i] and i ≠ j.

Find and return the minimum number of jumps needed to reach the last index of the array.

### Examples  

**Example 1:**  
Input: `arr = [100,-23,100,-23,100,-23,100,100,7,100]`  
Output: `3`  
*Explanation: Start at index 0 (100). Jump to index 2 (100, same value), then to index 7 (also 100), and finally to index 9. Total 3 jumps.*

**Example 2:**  
Input: `arr = `  
Output: `0`  
*Explanation: Already at the last index, no jumps needed.*

**Example 3:**  
Input: `arr = [7,6,9,6,9,6,9,7]`  
Output: `1`  
*Explanation: Jump directly from index 0 to index 7 (both are 7). Only 1 jump needed.*

### Thought Process (as if you’re the interviewee)  
- **Naive approach:** Try all possible paths recursively or with DFS, but this leads to a huge number of combinations and will not finish in time for large inputs.
- **BFS approach:** Whenever asked for minimum steps, especially with “jumps” or “moves”, BFS often fits well. Model each index as a node, where you can go to i+1, i-1, or any j with arr[j] == arr[i].  
- **Optimization:**  
  - To quickly find all indices with a specific value, preprocess the array to map values to their list of indices.
  - To avoid TLE for large arrays with many duplicates, after visiting all indices with a value, clear its list to avoid redundant future checks.
  - Use a visited set to prevent cycles or repeated work.
  - BFS ensures we always find the least number of steps since we expand nodes level by level.

*Trade-offs:*
- BFS+hashmap gives optimal time for this problem pattern.
- Space overhead comes mainly from the value-index map and BFS queue.

### Corner cases to consider  
- Array has only one element.
- All elements are identical.
- No duplicate values in the array.
- Multiple consecutive values are the same.
- Very large array with many repeated values.
- All jumps go out of bounds.
- Immediate reachability (arr == arr[n-1]).

### Solution

```python
def minJumps(arr):
    from collections import deque, defaultdict

    n = len(arr)
    if n <= 1:
        return 0  # No jumps needed

    # Map from value to all indices holding that value
    val_to_indices = defaultdict(list)
    for idx, val in enumerate(arr):
        val_to_indices[val].append(idx)

    # BFS initialization
    queue = deque([0])
    visited = set([0])
    steps = 0

    while queue:
        for _ in range(len(queue)):
            idx = queue.popleft()
            # Reached last index
            if idx == n - 1:
                return steps

            # Neighbors: i-1, i+1, and all j where arr[j] == arr[i]
            neighbors = []
            if idx - 1 >= 0:
                neighbors.append(idx - 1)
            if idx + 1 < n:
                neighbors.append(idx + 1)
            neighbors += val_to_indices[arr[idx]]

            for nei in neighbors:
                if nei not in visited:
                    visited.add(nei)
                    queue.append(nei)

            # Clear the list to prevent future redundant work
            val_to_indices[arr[idx]].clear()
        steps += 1

    # Should never reach here for valid inputs
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Each index and each value group is processed at most once.
  - BFS visits each node at most once and each branching operation (to i+1, i-1, same-value) is O(1) amortized because we clear the processed value group.

- **Space Complexity:** O(n)  
  - Stores mapping of values to indices (dict of lists), visited set, and BFS queue, all proportional to n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you are not allowed to jump to the same value indices?
  *Hint: Remove the arr[j] == arr[i] neighbor option and only use ±1 steps.*

- How would you handle if jumps could only be to indices with a value within k of arr[i]?  
  *Hint: Instead of checking only equal values, check for all values in the k-range by iterating or using a different map structure.*

- Can this approach be optimized for very large arrays and highly repetitive values?
  *Hint: Consider bidirectional BFS or limiting the duplicate value jumps to a subset as an extra optimization if not all are needed.*

### Summary
This problem is a classic example of **BFS for shortest path in an implicit graph**. Each array index is a graph node; edges exist to i±1 and all same-value indices. Hash-mapping values to indices and clearing them after expansion is key for efficiency. This pattern applies to many graph or board-jumping problems — for instance, word ladders, chess moves, and shortest escape paths in grids.

### Tags
Array(#array), Hash Table(#hash-table), Breadth-First Search(#breadth-first-search)

### Similar Problems
- Jump Game VII(jump-game-vii) (Medium)
- Jump Game VIII(jump-game-viii) (Medium)
- Maximum Number of Jumps to Reach the Last Index(maximum-number-of-jumps-to-reach-the-last-index) (Medium)