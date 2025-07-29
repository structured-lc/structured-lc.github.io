### Leetcode 206 (Easy): Reverse Linked List [Practice](https://leetcode.com/problems/reverse-linked-list)

### Description  
Given the **head** of a singly linked list, reverse the list and return its new head.  
*In other words*: Flip the direction of all `next` pointers, so the tail becomes the new head and traversing through the updated `next` pointers yields the nodes in the original order but backwards.  
Example: If the input is `1 → 2 → 3 → 4 → 5`, return the head of the list `5 → 4 → 3 → 2 → 1`.


### Examples  

**Example 1:**  
Input: `head = [1,2,3,4,5]`  
Output: `[5,4,3,2,1]`  
*Explanation:*
```
Original: 1 → 2 → 3 → 4 → 5 → None
Step 1: 1's next → None, 2's next → 1
Step 2: 3’s next → 2
Step 3: 4’s next → 3
Step 4: 5’s next → 4
Final: 5 → 4 → 3 → 2 → 1 → None
```

**Example 2:**  
Input: `head = [1,2]`  
Output: `[2,1]`  
*Explanation:*  
```
1 → 2 → None  ➔  2 → 1 → None
```

**Example 3:**  
Input: `head = []`  
Output: `[]`  
*Explanation:*  
Input list is empty; output is also empty.


### Thought Process (as if you’re the interviewee)  

- **Initial idea**:  
  To reverse the list, I want to *change the direction* (the `next` pointers) of each node, so that each node points to its previous node rather than the next one as we traverse the original list.

- **Brute-force**:  
  A brute-force solution may involve copying the list into another data structure like a stack or an array, then popping/reading backwards and recreating a new list.  
  *But*: This uses O(n) extra space for storing nodes, and doesn't utilize the fact that linked lists can be manipulated in-place.

- **In-place iterative solution**:  
  - Maintain two pointers:  
    - `prev` (starts at None) — tracks the previous node in the reversal.
    - `curr` (starts at head) — traverses the original list.
  - For each step:  
    1. Save `curr.next` (so we don’t lose the rest of the list).
    2. Set `curr.next = prev` (reverse the link).
    3. Move `prev` and `curr` forward one step.
  - At the end, `prev` will be the new head.

- **Recursive solution**:  
  Recurse to the end of the list, then as recursion unwinds, set each node’s `next` pointer backward.  
  - This looks elegant but uses O(n) stack space, so iterative solution is preferred for truly large lists.

- **Why final approach?**  
  The **iterative in-place method** is preferred:  
  - **O(1)** extra space  
  - **O(n)** time  
  - Clean and easy to reason about

### Corner cases to consider  
- **Empty list** (`head = None`)
- **Single node** (`[x]`)
- **Two nodes** (`[a, b]`)
- **List with repeated/duplicate values**
- **Long input list**
- **Linked list where node values are negative, zero, or positive**

### Solution

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseList(head):
    prev = None           # Previous node, starts as None
    curr = head           # Current node, starts as head

    while curr:
        next_temp = curr.next    # Save the next node
        curr.next = prev         # Reverse the direction of the pointer
        prev = curr              # Move prev forward
        curr = next_temp         # Move curr forward
    # prev is the new head at the end
    return prev
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  *Every node is visited exactly once as we loop through the entire list.*

- **Space Complexity:** O(1)  
  *No extra data structures are used; only a few pointers for variables regardless of list size.*  
  *(Recursive approach would use O(n) space due to call stack.)*

### Potential follow-up questions (as if you’re the interviewer)  

- What if the list is *very large* and recursion stack overflows?
  *Hint: Consider iterative approach to avoid stack issues.*

- How would you reverse only the first _k_ nodes of the list?
  *Hint: Modify the loop to stop after k steps; keep track of the (k+1)-th node.*

- How would you reverse a *portion* of the linked list between positions _m_ and _n_?
  *Hint: Reverse pointers only between m and n using a similar loop, and relink edges appropriately.*

- Can you do this with a **doubly-linked list?**
  *Hint: Both next and prev pointers need to be swapped for each node.*

### Summary
This problem is a textbook example of the **iterative two-pointer pattern** for linked list manipulation.  
It is fundamental to master, as similar pointer-rewiring logic extends to more advanced problems like reversing sublists, copying complex linked lists, and detecting cycles.  
No extra space is needed, and the main challenge is tracking pointers correctly to avoid losing parts of the list.  
Common in many technical interviews to test basic understanding of linked lists and pointer manipulation.