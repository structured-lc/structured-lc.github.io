### Leetcode 2058 (Medium): Find the Minimum and Maximum Number of Nodes Between Critical Points [Practice](https://leetcode.com/problems/find-the-minimum-and-maximum-number-of-nodes-between-critical-points)

### Description  
Given the head of a singly linked list, you need to find two things:
- The **minimum** and **maximum** number of nodes between any two *critical points* in the list.
- A *critical point* is a node that is either a **local maxima** (value strictly greater than its neighbors) or a **local minima** (value strictly smaller than its neighbors).
- Only nodes that are not the first or last in the list can be critical points (since they don’t have two neighbors).
- If there are fewer than two critical points, return `[-1, -1]`.

### Examples  

**Example 1:**  
Input: `head = [3,1]`  
Output: `[-1, -1]`  
*Explanation: There are no critical points, so we return [-1, -1].*

**Example 2:**  
Input: `head = [5,3,1,2,5,1,2]`  
Output: `[1, 3]`  
*Explanation:  
Critical points at indices 1 (3), 2 (1), 4 (5), and 5 (1):  
- Min distance: between indices 1 and 2, also between 4 and 5, both are 1.  
- Max distance: between indices 1 and 4, distance is 3.*

**Example 3:**  
Input: `head = [1,2,3,2,1,2,3,2,1]`  
Output: `[1, 7]`  
*Explanation:  
Critical points at indices 1(2), 2(3), 3(2), 4(1), 5(2), 6(3), and 7(2).  
- Min distance: 1 (between several adjacent critical points).  
- Max distance: 7 (between index 1 and index 8).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force**:  
  Walk through the list, and for every node, check if it is a local maxima or minima by comparing with its previous and next nodes.  
  Record all positions where a critical point occurs.

- If there are fewer than 2 critical points, return [-1,-1].

- For the rest, find:
  - **Minimum distance**: compute the difference between all pairs of critical point indices, and take the minimum.
  - **Maximum distance**: difference between the first and last critical point indices.

- **Optimizing**:  
  Since all critical points' indices are added in order as we traverse, to find the min distance, just check the difference between each consecutive pair.  
  For max distance, just subtract the first from the last index.

- **Trade-offs**:  
  This approach only needs one pass over the list and an extra list for critical indices. It runs efficiently in O(n) time and uses O(k) extra space, where k is the number of critical points.

### Corner cases to consider  
- Less than 3 nodes: no possible critical point.
- Two or fewer critical points: answer is [-1,-1].
- Duplicate values: consecutive values equal, so cannot be a max or min.
- All values the same: no local minima or maxima.
- Negative numbers.
- Long list with all values increasing/decreasing: no local maxima/minima.

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def nodesBetweenCriticalPoints(head):
    # To keep track of the critical points' positions (as 0-based index)
    critical_indices = []
    
    prev = head
    curr = head.next
    idx = 1  # current node's index
    
    # Traverse while there is a next node (since curr needs next and prev)
    while curr and curr.next:
        # Check for local maxima or minima
        if (curr.val > prev.val and curr.val > curr.next.val) or \
           (curr.val < prev.val and curr.val < curr.next.val):
            critical_indices.append(idx)
        prev = curr
        curr = curr.next
        idx += 1

    # If fewer than 2 critical points, return [-1, -1]
    if len(critical_indices) < 2:
        return [-1, -1]
    
    min_dist = float('inf')
    # Go through consecutive critical indices for min distance
    for i in range(1, len(critical_indices)):
        min_dist = min(min_dist, critical_indices[i] - critical_indices[i - 1])
    
    max_dist = critical_indices[-1] - critical_indices[0]
    return [min_dist, max_dist]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Justification: We traverse the linked list once (O(n)), and then a single pass through the (at most n) critical points for min distance.

- **Space Complexity:** O(k)  
  Justification: Only extra storage is the list of critical point indices, where k ≤ n (number of nodes).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input is a doubly-linked list?  
  *Hint: You could access neighbors in constant time, but the approach is fundamentally the same.*

- Can you do this in-place without storing all critical point indices?  
  *Hint: Try storing only previous, first, and last critical indices while maintaining min distance so far.*

- How would your solution change if the list was circular?  
  *Hint: You may need to check if the "end connects to start" for critical points.*

### Summary
This problem uses the **one-pass array scan** pattern: you traverse the data once while recording positions meeting a specific local condition (local minima/maxima).  
The pattern is commonly used for problems involving local extrema, peaks, valleys, or finding distances between special elements in linked lists, arrays, or sequences.


### Flashcard
Identify critical points by comparing node values, then compute minimum and maximum distances between them.

### Tags
Linked List(#linked-list)

### Similar Problems
