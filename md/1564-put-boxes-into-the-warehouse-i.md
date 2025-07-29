### Leetcode 1564 (Medium): Put Boxes Into the Warehouse I [Practice](https://leetcode.com/problems/put-boxes-into-the-warehouse-i)

### Description  
Given `boxes` (array of widths) and `warehouse` (list of room heights as they appear in order), you want to put as many boxes into the warehouse as possible. Each box can go into a room only if its height is ≤ the room's height. Boxes can be rearranged in any order, but must fit through all rooms before their target. How many boxes can you put into the warehouse?

### Examples  

**Example 1:**  
Input: `boxes = [4,3,4,1], warehouse = [5,3,3,4,1]`  
Output: `3`  
*Explanation: Fit boxes of height 1, 3, 4 in rooms with heights 5, 3, 3.*

**Example 2:**  
Input: `boxes = [1,2,2,3,4], warehouse = [3,4,1,2]`  
Output: `3`  
*Explanation: Fit three smallest boxes into rooms: heights 3,4,1.*

**Example 3:**  
Input: `boxes = [3,5,5,2], warehouse = [2,1,3,4,5]`  
Output: `2`  
*Explanation: Can fit only two smallest boxes.*


### Thought Process (as if you’re the interviewee)  
Sort boxes to try the smallest first. Each warehouse room may impose a restrictive height due to a narrow passage. The actual height limit for each position is the minimum up to that room. So, process warehouse to create prefix minimums, and fit the smallest remaining box into the room from right to left. Greedily match smallest unchecked box to tightest room.


### Corner cases to consider  
- Boxes or warehouse empty
- Boxes larger than all warehouse heights
- All rooms have the same height
- Boxes can fit only at certain positions due to constraints


### Solution

```python
def maxBoxesInWarehouse(boxes, warehouse):
    boxes.sort()
    n = len(warehouse)
    prefixMin = [warehouse[0]] * n
    for i in range(1, n):
        prefixMin[i] = min(prefixMin[i-1], warehouse[i])

    res = 0
    boxIdx = 0
    for i in reversed(range(n)):
        if boxIdx < len(boxes) and boxes[boxIdx] <= prefixMin[i]:
            res += 1
            boxIdx += 1
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n) for sorting plus O(n) for passing through warehouse
- **Space Complexity:** O(n) for prefix mins array


### Potential follow-up questions (as if you’re the interviewer)  

- What if boxes must be put in warehouse from left to right?
  *Hint: Match smallest available box to each room as you go.*

- Can you do it in-place in warehouse?
  *Hint: Overwrite warehouse with running minima.*

- What if you have width and height for each box and room?
  *Hint: Two-dimension fit; consider both constraints together.*

### Summary
A greedy, sort-and-process pattern. Generating running minimums is common for window constraints, and greedy assignment of resources by size is useful in packing or scheduling problems.