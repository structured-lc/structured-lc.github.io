### Leetcode 1243 (Easy): Array Transformation [Practice](https://leetcode.com/problems/array-transformation)

### Description  
Given an array of integers `arr`, transform the array so that on each day, for every element (except the first and last), you:
- Increase it by 1 if it's strictly less than both its neighbors.
- Decrease it by 1 if it's strictly greater than both its neighbors.
- Leave it unchanged otherwise.

Repeat this process "day by day" until no more changes occur. Return the resulting array.

### Examples  

**Example 1:**  
Input: `[6,2,3,4]`  
Output: `[6,3,3,4]`  
*Explanation:  
- Day 1: [6,2,3,4] → [6,3,3,4]  
  - arr[1]=2 < 6 and 2 < 3 ⇒ arr[1] becomes 3  
  - arr[2]=3 is not > both neighbors; no change  
- No further changes.*

**Example 2:**  
Input: `[1,6,3,4,3,5]`  
Output: `[1,4,4,4,4,5]`  
*Explanation:  
- Day 1: [1,6,3,4,3,5] → [1,5,4,3,4,5]  
  - arr[1]=6 > 1 and 6 > 3 ⇒ arr[1] becomes 5  
  - arr[2]=3 < 5 and 3 < 3 ⇒ arr[2] unchanged  
  - arr[3]=4 > 3 and 4 > 3 ⇒ arr[3] becomes 3  
  - arr[4]=3 < 3 and 3 < 5 ⇒ arr[4] unchanged  
- Day 2: [1,5,4,3,4,5] → [1,4,4,4,4,5]  
  - arr[1]=5 > 1 and 5 > 4 ⇒ arr[1] becomes 4  
  - arr[2]=4 is not < or > both; no change  
  - arr[3]=3 < 4 and 3 < 4 ⇒ arr[3] becomes 4  
  - arr[4]=4 is not < or > both; no change  
- No further changes.*

**Example 3:**  
Input: `[2,1,2,1,1,2,2,1]`  
Output: `[2,1,1,1,1,2,2,1]`  
*Explanation:  
- Day 1: [2,1,2,1,1,2,2,1] → [2,2,1,1,2,2,2,1]  
- Day 2: [2,2,1,1,2,2,2,1] → [2,2,1,1,2,2,2,1]  
- No further changes.*

### Thought Process (as if you’re the interviewee)  
- Start with a **brute-force simulation**: Each iteration ("day"), create a snapshot of the current array, then update every inner element (from arr[1] to arr[n-2]) using the previous day's snapshot.  
- On each update, check whether any change was made—if not, we can stop early.
- This simulates the problem exactly as described; there are no shortcuts because each transformation depends on neighbors' previous values.
- **Optimization** is difficult since each step is mutually dependent on surrounding (previous day) values, so no greedy or DP tricks. But, we can optimize storage by doing in-place transformation with a temp copy for the "previous day".
- The process stops in at most O(max(arr)×n) steps, guaranteed to halt as eventually the array stops changing.

### Corner cases to consider  
- Single element array, e.g. ``
- Two elements, e.g. `[2, 2]`
- All elements the same, e.g. `[3,3,3,3]`
- Already stable arrays: e.g. `[1,2,3,4]`
- Decreasing, increasing, or zigzag patterns
- Large values and negative values

### Solution

```python
def transformArray(arr):
    # Continue transforming until no changes occur
    while True:
        changed = False
        prev = arr[:]  # Snapshot of current day
        # Only transform from index 1 to n-2
        for i in range(1, len(arr)-1):
            if prev[i] < prev[i-1] and prev[i] < prev[i+1]:
                arr[i] += 1
                changed = True
            elif prev[i] > prev[i-1] and prev[i] > prev[i+1]:
                arr[i] -= 1
                changed = True
        # If no change, we're done
        if not changed:
            break
    return arr
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m), where n is the array length, and m is the maximum number of days needed, which is bounded by the maximum value difference between elements.
  - Each "day" costs O(n), and in every iteration at least one element gets closer to its neighbor value (monotonic convergence).
- **Space Complexity:** O(n), for the temporary array copy (`prev`).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to return all intermediate arrays, not just the last one?  
  *Hint: Keep a list of previous arrays at each step.*

- How would you optimize for very long arrays or extremely large numbers?  
  *Hint: Look for early stopping, or sparse updates where few elements can actually change.*

- Can you implement this as an in-place transformation to minimize space?  
  *Hint: You need the neighbors’ values from the previous state, so always make a copy or toggle between two buffers.*

### Summary
We used a straightforward **simulation** pattern: apply a rule repeatedly until no more changes are made. This deterministic simulation is a classic interview pattern, applicable in systems where updates depend on fixed left/right “neighbor” state (such as Conway’s Game of Life, heat flow, sandpile, etc). No advanced algorithmic tricks—just careful use of array copying and convergence checking.