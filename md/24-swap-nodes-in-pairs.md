### Leetcode 24 (Medium): Swap Nodes in Pairs [Practice](https://leetcode.com/problems/swap-nodes-in-pairs)

### Description  
Given a singly linked list, swap every two adjacent nodes and return its head.  
- You may not modify the values in the list's nodes, only change the links between nodes.
- The operation should be done in-place, using constant extra space.

In other words: *Given a list, transform `1 → 2 → 3 → 4` to `2 → 1 → 4 → 3`, always swapping every two adjacent nodes.*

### Examples  

**Example 1:**  
Input: `[1,2,3,4]`  
Output: `[2,1,4,3]`  
*Explanation: Swap 1 and 2, then swap 3 and 4.*

**Example 2:**  
Input: `[1,2,3]`  
Output: `[2,1,3]`  
*Explanation: Swap 1 and 2, but since 3 has no pair, it remains in place.*

**Example 3:**  
Input: `[1]`  
Output: `[1]`  
*Explanation: Only one node—no swap possible.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force intuition:**  
  I could try swapping the values in every pair, but the problem doesn't allow this—must swap links instead.
  
- **In-place link rewire:**  
  Since the list is singly, I can't look "backwards."  
  To swap every two adjacent nodes, keep track of:
    - The node just before the current pair (`prev`)
    - The first node in the pair (`first`)
    - The second node in the pair (`second`)
    - The next node after the pair (`next_pair`)
  Use a *dummy node* at the head to facilitate swapping the very first pair (no special case for head changes).

- **Iterate and swap:**  
  While there are at least two nodes left:
    - prev.next → second
    - first.next → second.next
    - second.next → first
    - Move prev forward to first (which is now second in the swapped pair)
    - Loop

- **Recursive approach:**  
  Optionally, can implement recursively: swap first two nodes and recursively swap the rest.

- **Why this approach?**  
  - Handles all cases uniformly, including head swaps.
  - O(n) time, O(1) extra space (with iterative).

### Corner cases to consider  
- Empty list (`[]`)
- Only one node (`[1]`)
- List length is odd (`[1,2,3]`)
- List length is even (`[1,2,3,4]`)
- Nodes containing duplicate values  
- All nodes are the same value

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def swapPairs(head):
    # Create a dummy to simplify edge swaps (handling head of list)
    dummy = ListNode(0)
    dummy.next = head
    prev = dummy

    # Traverse the list in pairs
    while prev.next and prev.next.next:
        # Identify nodes to swap
        first = prev.next
        second = first.next

        # 1. prev.next should point to second
        prev.next = second
        # 2. first.next should point to node after second
        first.next = second.next
        # 3. second.next should point to first
        second.next = first

        # Move prev forward to first (the end of this pair)
        prev = first

    # Return new head (dummy.next, in case head changed)
    return dummy.next
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each node is visited once, and each swap is O(1).
- **Space Complexity:** O(1) — Only a fixed number of pointers, no recursion (iterative version only).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you implement this recursively?  
  *Hint: Base case is list with 0 or 1 node. Swap first 2 nodes, then recursively swap the rest and connect them.*

- How would your algorithm change for a doubly linked list?  
  *Hint: Now you must also update the previous pointers for swapped nodes.*

- Can this be adapted to swap every k nodes instead of 2?  
  *Hint: Generalize group swapping—ensure each group of k nodes exists before swapping, and preserve relative order within and outside groups.*

### Summary
This problem is a classic *linked list manipulation* task. The key trick is to use a dummy node as a precursor to enable swapping the head without special-casing, and carefully update pointers to avoid losing track of nodes. This approach is a pattern common to other *pairwise or group manipulation* problems on linked lists, such as reversing nodes in k-groups or reordering nodes.